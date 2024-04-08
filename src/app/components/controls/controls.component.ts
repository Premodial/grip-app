import { Component } from '@angular/core';
import { MapService } from 'src/app/core/map/map-data.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  isCoverageShown: boolean = false; // Tracks the visibility state of the coverage layer

  constructor(private mapService: MapService) {}

  toggleLayer(): void {
    this.isCoverageShown = !this.isCoverageShown; // Toggle the visibility state
    this.mapService.toggleLayerVisibility('geojson-layer'); // Toggle the actual layer visibility
  }

  toggleTheme(): void {
    this.mapService.toggleTheme();
  }
}
