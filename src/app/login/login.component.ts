import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;
  signInStat = false;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('loginStatus')=='loggedIn'){
      this.signInStat= true;
    }
    this.signinForm = this.formBuilder.group({
      userid:['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    if( this.signinForm.value.userid == JSON.parse(localStorage.getItem('userData')!).email || this.signinForm.value.userid == JSON.parse(localStorage.getItem('userData')!).phone){
      localStorage.setItem('loginStatus','loggedIn');
      alert('Welcome Back '+JSON.parse(localStorage.getItem('userData')!).firstname +'. Sign in Successful');
      this.router.navigate(['/']);
    }else{
      alert('Username/Password may be incorrect.')
    }
  }

}
