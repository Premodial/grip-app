import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ControlsComponent } from '../../components/controls/controls.component';
import { MapMarkerComponent } from '../../components/map-marker/map-marker.component';
import { NetworkServicesModalComponent } from '../../components/NetworkServicesModal/NetworkServicesModal.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    ControlsComponent,
    MapMarkerComponent,
    NetworkServicesModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
