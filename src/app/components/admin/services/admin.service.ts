import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ClientSearchResult, Developer} from '../../../services/api-data.service';
import {HttpClient} from '@angular/common/http';
import {KeycloakInteractionService} from './keycloak-interaction.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  /**
   * Constructor of Admin Service
   * @param http Http Client
   * @param keycloak Keycloak Interaction Service
   * @param apiMgmtUiRestUrl Api Management UI REST Url
   */
  constructor(private http: HttpClient,
              private keycloak: KeycloakInteractionService, @Inject('API_MGMT_UI_REST_URL')
              private apiMgmtUiRestUrl: string) {
  }

  /**
   * Get all available developers
   */
  public getAllDevelopers() {
    const url = this.apiMgmtUiRestUrl + '/developers';
    return this.http.get(url) as Observable<Array<Developer>>;
  }

  /**
   * Get developer by developer id
   * @param developerId The developer id
   */
  public getDeveloper(developerId: string) {
    const url = this.apiMgmtUiRestUrl + '/developers/' + developerId;
    return this.http.get(url) as Observable<Developer>;
  }

  /**
   * Get all keycloak users
   */
  public getKeycloakUsers() {
    return this.keycloak.getAllUsers();
  }

  /**
   * Create new developer
   * @param developer the developer to create
   * @param keycloakUserId the id of the keycloak user
   */
  public createNewDeveloper(developer: Developer, keycloakUserId: string) {
    // observer insert developer to API-Mgmt
    // response has developer object
    const url = this.apiMgmtUiRestUrl + '/developers';
    const insertToApiMgmt = this.http.post(url, developer) as Observable<Developer>;
    // observer to add keycloak user to developer portal group
    const addDevPortalGroupToUser = this.keycloak.addDevPortalGroupToUser(keycloakUserId);

    // 1. insert developer to API-Mgmt
    return insertToApiMgmt.pipe(mergeMap(insertedDeveloper => {
      // 2. add devPortal group and add client role to keycloak user
      return addDevPortalGroupToUser
        .pipe(map(() => insertedDeveloper));
    }), catchError((err, caught) => {
      // rollback keycloak user if developer cannot created at API-Mgmt
      // we just remove the group mapping
      // TODO REMOVE THIS COMFORT FEATURE IN FUTURE
      this.keycloak.removeDevPortalGroupFromUser(keycloakUserId).subscribe();
      throw err;
    }));
  }

  /**
   * Update a developer
   * @param developer the developer to update
   */
  public updateDeveloper(developer: Developer) {
    const url = this.apiMgmtUiRestUrl + '/developers/' + developer.id;
    return this.http.put(url, {
      name: developer.name,
      clients: developer.clients
    });
  }

  /**
   * Delete a developer
   * @param developer the developer to update
   */
  public deleteDeveloper(developer: Developer) {
    const url = this.apiMgmtUiRestUrl + '/developers/' + developer.id;
    return this.http.delete(url);
  }

  /**
   * Get all available clients
   */
  public getAllClients() {
    const url = this.apiMgmtUiRestUrl + '/search/clients';
    const searchQuery = {
      filters: [{
        name: 'name',
        value: '*',
        operator: 'like'
      }],

      paging: {
        page: '1',
        pageSize: '10000'
      }
    };
    return (this.http.post(url, searchQuery) as Observable<ClientSearchResult>)
      .pipe(mergeMap(searchResult => searchResult.beans.length > 0 ? searchResult.beans : of(null)));
  }
}
