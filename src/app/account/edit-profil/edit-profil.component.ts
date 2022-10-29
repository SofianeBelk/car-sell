import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit, OnChanges {

  @Input() currentUser!: User;

  usernameForm !: FormGroup;

  emailForm !: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initUsernameForm();
    this.initEmailForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  initUsernameForm(): void {
    this.usernameForm = this.formBuilder.group({
      username : ['',[Validators.required]]
    });
  }
  onEditUserName(modal: any): void{
    this.usernameForm.get('username')?.setValue(this.currentUser.displayName);
    this.modalService.open(modal, {centered: true})
  }

  initEmailForm(): void {
    this.emailForm = this.formBuilder.group({
      email : ['',[Validators.email,Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onEditEmail(modal: any): void{
    this.usernameForm.get('email')?.setValue(this.currentUser.email);
    this.modalService.open(modal, {centered: true})
  }

  onSubmitUsernameForm(): void {
    this.currentUser.updateProfile({
      displayName : this.usernameForm.value.username
    }).then(() =>{
      this.modalService.dismissAll();
    }).catch(console.error)
  }

  onSubmitEmailForm(): void {
    this.authService.signinUser(<string>this.currentUser.email,this.emailForm.value.password)
    .then(() => {
      this.currentUser.updateEmail(this.emailForm.value.email)
    .then(()=> {
      this.modalService.dismissAll();
      this.emailForm.reset();
    }).catch(console.error);
    }).catch(console.error)

  }

}
