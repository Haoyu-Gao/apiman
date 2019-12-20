import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';

import { PasHeaderComponent } from './pas-header/pas-header.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiListComponent } from './api-list/api-list.component';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';
import {environment} from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { DeveloperComponent } from './developer/developer.component';
import { DeveloperListComponent } from './admin/developer-list.component';
import { CreateDeveloperComponent } from './admin/create-developer/create-developer.component';
import { ClientMappingComponent } from './admin/create-developer/client-mapping.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { EditDeveloperComponent } from './admin/edit-developer/edit-developer.component';


@NgModule({
  declarations: [
    AppComponent,
    PasHeaderComponent,
    ApiListComponent,
    AdminComponent,
    DeveloperComponent,
    DeveloperListComponent,
    CreateDeveloperComponent,
    ClientMappingComponent,
    EditDeveloperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    KeycloakAngularModule,
    MatListModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: 'APIMAN_UI_REST_URL',
      useValue: environment.apimanUiRestUrl
    },
    {
      provide: 'KEYCLOAK_AUTH_URL',
      useValue: environment.keycloakAuthUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
