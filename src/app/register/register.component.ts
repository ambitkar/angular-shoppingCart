import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  loginStatus = "loggedIn";
  regdStat = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('loginStatus') != null) {
      this.regdStat = true;
    }
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: [''],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      phone: ['', Validators.compose([Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      Validators.minLength(10),])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')])],
    });
  }

  onSubmit() {
    localStorage.setItem("userData", JSON.stringify(this.registrationForm.value));
    localStorage.setItem('loginStatus', this.loginStatus);
    alert('Sign Up Successfull!!');
    this.router.navigate(['/'])
  }

}
