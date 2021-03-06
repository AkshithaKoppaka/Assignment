import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  userForm: FormGroup;
  
  
  constructor(private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      phone: '',
      email: '',
      gender:'',
      addresses: this.fb.array([
          this.initAddress(),
      ])
  });
  }
  initAddress(): any {
    return this.fb.group({
      doorNo: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }
  addAddress() {
    // add address to the list
    const control = <FormArray>this.userForm.controls['addresses'];
    control.push(this.initAddress());
}

saveUser() {
  let userStr = this.userForm.get('name').value + '\n'
  + this.userForm.get('phone').value + '\n'
  + this.userForm.get('email').value + '\n'
  + this.userForm.get('gender').value + '\n';

  let i = 0;
  for (let address of this.userForm.get('addresses')['controls']) {
    i += 1;
    userStr += 'Address ' + i + '\n' + address.value.doorNo + '\n'
    + address.value.street + '\n'
    + address.value.area + '\n'
    + address.value.city + '\n'
    + address.value.pin + '\n';
  }

  window.alert(userStr);
}
}
