import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-auth-info',
  templateUrl: './edit-auth-info.component.html',
  styleUrls: ['./edit-auth-info.component.scss']
})
export class EditAuthInfoComponent implements OnInit {

  @Input() currentUser!: User;

  passwordForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm(): void{
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPasswordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onEditPassword(modal: any): void{
    this.modalService.open(modal, {centered: true});
  }

  onSubmitPasswordForm(): void{
    this.authService.signinUser(<string>this.currentUser.email, this.passwordForm.value.oldPassword)
    .then(()=>{
      this.currentUser.updatePassword(this.passwordForm.value.newPassword)
      .then(() => {
        this.passwordForm.reset();
        this.modalService.dismissAll();
      }).catch(console.error)
    }).catch(console.error);
  }

}
