import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userUpdateForm:FormGroup;
  customerUpdateForm:FormGroup;
  user:User;
  //customer:Customer;
  findex:number;


  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService,
    private activetedRoute: ActivatedRoute
    //private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.createUserUpdateForm();
    //this.createCustomerUpdateForm();
    this.getUser();
    //this.getCustomer();
    //this.getUserFindex();
    
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:[""],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
    });

    // this.userService.getByUserId(this.authService.getUserId()).subscribe(response => {
    //   this.userUpdateForm.patchValue({
    //   firstName: response.data.firstName,
    //   lastName:response.data.lastName,
    //   email:response.data.email,
      
    // });
    // console.log(response)
    // });
  }

  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      companyName:["",Validators.required]
    })
  }

  userUpdate(){
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value)
      userModel.id = this.authService.getUserId()
      this.userService.update(userModel).subscribe(response => {
        this.toastrService.success(response.message,"Successfully");
      },responseError => {
        this.toastrService.error(responseError.error,"Error")
      })
    }else{
      this.toastrService.error("Please fill the form completely","Error")
    }
  }

  getUser(){
    this.userService.getByUserId(this.authService.getUserId()).subscribe(response => {
      this.userUpdateForm.patchValue(response.data)

      // this.userUpdateForm.patchValue({
      //   //id:this.user.id,
      //   firstName: this.user.firstName,
      //   lastName:this.user.lastName,
      //   email:this.user.email,
          
      // });
    })
  }

  // getCustomer(){
  //   this.customerService.getCustomerById(this.authService.getUserId()).subscribe(response => {
  //     this.customer = response.data;
  //     this.customerUpdateForm.patchValue(response.data)
  //   })
  // }

  // customerUpdate(){
  //   if (this.customerUpdateForm.valid) {
  //     let customerModel = Object.assign({id:this.customer.id,userId:this.customer.userId},this.customerUpdateForm.value)
  //     this.customerService.update(customerModel).subscribe(response => {
  //       this.toastrService.success(response.message,"Successfully");
  //     },responseError => {
  //       this.toastrService.error(responseError.error,"Error")
  //     })
  //   }else{
  //     this.toastrService.error("Please fill the form completely","Error")
  //   }
  // }

  // getUserFindex(){
  //   this.userService.getUserFindexByUserId(this.authService.getUserId()).subscribe(response => {
  //     this.findex = response.data.findexPoint;
  //     console.log(response.data.findexPoint)
  //   })
  // }

}
