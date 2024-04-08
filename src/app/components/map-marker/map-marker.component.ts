import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-marker',
  template: ``, // No template required
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnChanges {
  @Input() map?: mapboxgl.Map;
  @Input() location?: mapboxgl.LngLatLike;
  @Input() message?: string;

  private marker?: mapboxgl.Marker;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected', changes); // Debugging line to see changes
  
    if (changes['location'] && this.location) {
      // Check if location specifically changed
      if (this.location !== changes['location'].previousValue) {
        console.log('Location changed', this.location); // Debugging line
        this.addOrUpdateMarker();
      }
    }
  }
  
  

  private addOrUpdateMarker(): void {
    if (!this.map || !this.location) {
      console.warn("Map or location is undefined. Cannot add or update marker.");
      return;
    }
  
    // Create a custom HTML element for the marker
    const el = document.createElement('div');
    el.className = 'my-custom-marker';
    el.style.width = '30px'; // Example size
    el.style.height = '30px'; // Example size
    el.style.backgroundColor = '#007cbf'; // Example color
    el.style.borderRadius = '50%'; // Makes the marker a circle
    el.style.border = '3px solid #fff'; // Example border
  
    // If marker already exists, just update its position
    if (this.marker) {
      this.marker.setLngLat(this.location);
    } else {
      // Use the custom element for the marker
      this.marker = new mapboxgl.Marker(el,  { anchor: 'bottom', offset: [0, -15] })
        .setLngLat(this.location)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(this.message || 'Location details'))
        .addTo(this.map);
    }
  }
  
  
}
