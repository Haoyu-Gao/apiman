import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiDataService, Developer} from '../../api-data.service';
import {DeveloperImpl} from '../../../developerImpl';
import {DeveloperListComponent} from '../developer-list.component';
import {ClientMappingComponent} from './client-mapping.component';
import {ClientMappingImpl} from '../../../client-mapping-impl';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-developer',
  templateUrl: './create-developer.component.html',
  styleUrls: ['./create-developer.component.scss']
})
export class CreateDeveloperComponent {

  name = new FormControl('');

  @ViewChild('clientmapping', {static: false}) clientMapping: ClientMappingComponent;

  constructor(private apiDataService: ApiDataService, private router: Router) { }

  insertDeveloper() {
    const developerToCreate = new DeveloperImpl();
    developerToCreate.name = this.name.value;
    developerToCreate.clients = [];
    this.clientMapping.assignedClients.forEach(client => {
      developerToCreate.clients.push(new ClientMappingImpl(client.id, client.organizationName));
    });
    this.apiDataService.createNewDeveloper(developerToCreate)
      .subscribe(createdDeveloper => {
        this.name.reset();
        this.clientMapping.reset();
        this.router.navigate(['/admin']);
      });
  }
}
