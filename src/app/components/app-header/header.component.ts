/*
 * Copyright 2020 Scheer PAS Schweiz AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import { faUserCircle, faCaretDown, faInfo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public faUserCircle = faUserCircle;
  public faCaretDown = faCaretDown;
  public faInfo = faInfo;
  public faSignOutAlt = faSignOutAlt;
  public user: string = this.keycloak.getKeycloakInstance().profile.firstName + ' ' + this.keycloak.getKeycloakInstance().profile.lastName;

  constructor(private keycloak: KeycloakService) {}

  /**
   * Logout a user and clear the session tokens
   */
  public logout() {
    sessionStorage.clear();
    this.keycloak.getKeycloakInstance().logout({
      redirectUri: location.href
    });
  }
}
