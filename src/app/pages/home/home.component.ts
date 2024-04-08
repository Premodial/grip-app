import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapService } from 'src/app/core/map/map-data.service';
import { FeatureCollection, Geometry, Polygon, MultiPolygon, Feature} from 'geojson';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { UserService } from 'src/app/core/user/user.service';
// Declaration allows use of the global `google` object provided by Google Maps API without TypeScript compilation errors.
declare var google: any;

/**
 * HomeComponent initializes the map and handles user interactions related to location selection and service availability checking.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  // Stores user-selected location as understood by Mapbox.
  selectedLocation?: mapboxgl.LngLatLike;
  lastSearchedAddress?: string; // Declare the property to store the last searched address
  isLoadingServices: boolean = true; // Tracks if the service check is in progress


  // Message indicating network service coverage at the selected location.
  coverageMessage?: string;

  // Flag controlling visibility of the modal displaying available network services.
  showModal: boolean = false;

  // List of available services at the selected location.
  availableServices: { name: string }[] = [];

  constructor(public mapService: MapService, private http: HttpClient, private userService: UserService) {}

  handleModalClosed(): void {
    this.showModal = false; // Ensure the modal is hidden when closed
  }


  /**
   * Initializes the map and sets up the GeoJSON layer and autocomplete functionality.
   */
  ngOnInit(): void {
    this.mapService.buildMap().then(() => {
      // Attempt to load GeoJSON data for coverage areas from a local asset.
      this.http.get<FeatureCollection<Geometry>>('assets/data/irregular_polygon_10km_radius.geojson').subscribe(
        data => {
          this.mapService.addGeoJsonLayer(data, 'Coverage Area');
        },
        err => {
          console.error('Error loading GeoJSON:', err);
        }
      );

      // Set up Google Places Autocomplete for address search.
      this.initAutocomplete();
    });
  }

  /**
   * Initializes Google Places Autocomplete on the search input field.
   */
  initAutocomplete(): void {
    if (typeof google !== 'undefined') {
      const input = document.getElementById('autocomplete') as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ['address_components', 'geometry', 'icon', 'name'],
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        this.isLoadingServices = true;
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        // Updates the selectedLocation with coordinates from the chosen place.
        this.selectedLocation = [place.geometry.location.lng(), place.geometry.location.lat()];
        this.lastSearchedAddress = place.formatted_address; // This line updates the lastSearchedAddress


        // Checks if the selected location is within a coverage area and updates the UI accordingly.
        const point = turf.point(this.selectedLocation);
        if (this.mapService.geojsonData) {
          const isInside = this.checkPointInsideGeoJSON(point, this.mapService.geojsonData);
          this.coverageMessage = isInside ? 'There is coverage at this location.' : 'There is no coverage at this location.';
          
          this.showModal = true;
          if (isInside) {
            // Fetches available services for the location and prepares to show them in a modal.
            this.availableServices = this.getAvailableServicesAtLocation(point);
          }
        }
        this.isLoadingServices = false;
      });
    }
  }

  /**
   * Determines whether a given point lies within any polygon or multipolygon in the GeoJSON data.
   * @param {turf.helpers.Feature<turf.helpers.Point>} point The point to check.
   * @param {FeatureCollection<Geometry>} geojsonData The GeoJSON data containing coverage areas.
   * @returns {boolean} True if the point is inside any coverage area, false otherwise.
   */
  private checkPointInsideGeoJSON(point: any, geojsonData: FeatureCollection): boolean {
    for (const feature of geojsonData.features) {
        // Ensure the geometry is either Polygon or MultiPolygon before proceeding
        if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
            // Type assertion to specify the geometry type explicitly
            const polygonFeature = feature as Feature<Polygon | MultiPolygon>;
            
            if (turf.booleanPointInPolygon(point, polygonFeature)) {
                return true; // The point is inside the polygon/multipolygon
            }
        }
    }
    return false; // The point is not inside any polygon or multipolygon
  }


  /**
   * Placeholder function to determine available services at a given location.
   * @param {turf.helpers.Feature<turf.helpers.Point>} point The point for which to find services.
   * @returns {{ name: string }[]} An array of available services at the point.
   */
  private getAvailableServicesAtLocation(point: turf.helpers.Feature<turf.helpers.Point>): { name: string }[] {
    // Implementation should query an actual data source or service.
    return [{ name: 'LTE' }, { name: 'Fiber Home' }, { name: 'Fiber Business' }];
  }

   /**
   * Calls UserService to log out the current user and navigate to the login page.
   */
   logout(): void {
    this.userService.logout().subscribe({
      error: (error: any) => console.error('Logout failed', error)
    });
  }
}
