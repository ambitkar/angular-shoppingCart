import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
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
      address: this.formBuilder.array([
        this.getAdrresForm()
      ]),
      password: ['', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')])],
      confirm_password: ['', [Validators.required]],
      role:['',[Validators.required]]
    }, {validator: this.passwordConfirming});
    
    //console.log(this.address.controls[0].get('at')?.hasError('required'));

  }
  getAdrresForm(): any {
    return this.formBuilder.group({
      at: ['', Validators.compose([Validators.required])],
      pin: ['', [Validators.required, Validators.pattern('[0-9]{6}')]]
    });
  }

  get address(): FormArray {
    return this.registrationForm.get("address") as FormArray
  }

  addAddressRow() {
    this.address.push(this.getAdrresForm());
    console.log(this.address)
  }
  rmvAddressRow(i: any) {
    // const control = <FormArray>this.registrationForm.controls['address'];
    // control.removeAt(i);
    this.address.removeAt(i);
  }

  onSubmit() {
    localStorage.setItem("userData", JSON.stringify(this.registrationForm.value));
    localStorage.setItem('loginStatus', this.loginStatus);
    alert('Sign Up Successfull!!');
    if(this.registrationForm.controls.role.value == 'Buyer'){
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/seller-home']);
    }
  }

  passwordConfirming(frm: FormGroup){
    return frm.get('password')?.value === frm.get('confirm_password')?.value
       ? null : {'mismatch': true};
  }

}
