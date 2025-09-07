import { Component } from '@angular/core';
import { LoginForm } from "../login-form/login-form";
import { RegisterForm } from "../register-form/register-form";

@Component({
  selector: 'app-register-page',
  imports: [ RegisterForm],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {

}
