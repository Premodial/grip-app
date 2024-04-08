import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapService } from './core/map/map-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ControlsComponent } from './components/controls/controls.component';
import { MapMarkerComponent } from './components/map-marker/map-marker.component';
import { NetworkServicesModalComponent } from './components/NetworkServicesModal/NetworkServicesModal.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { firebaseConfig } from './environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ControlsComponent,
    MapMarkerComponent,
    NetworkServicesModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [MapService],
  bootstrap: [AppComponent, HomeComponent],
})
export class AppModule { }
