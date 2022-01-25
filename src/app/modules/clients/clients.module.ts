import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClientsComponent } from './components/clients/clients.component';
import { CreateClientComponent } from './components/create/create.component';
import { UpdateClientComponent } from './components/update/update.component';

import { ClientService } from './store/services/clients.service';

const routes = [
  {
    path: 'clients',
    component: ClientsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ClientService],
  declarations: [
    ClientsComponent,
    CreateClientComponent,
    UpdateClientComponent
  ]
})
export class ClientsModule {}
