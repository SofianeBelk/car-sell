import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { EditAuthInfoComponent } from './edit-auth-info/edit-auth-info.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent,
    EditProfilComponent,
    EditAuthInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
