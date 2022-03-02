import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  public userLogin: string[] = ['admin', '12345'];

  @Input() visible: boolean = false;
  @Output() isAdmin = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.userLogin[0] === this.loginForm.value.user && this.userLogin[1] === this.loginForm.value.password) {
      alert("Login satisfactorio");
      this.loginForm.reset();
      this.isAdmin.emit(true);
    } else {
      alert("Usuario o contraseña erróneos, intente nuevamente");
    }
  }

}
