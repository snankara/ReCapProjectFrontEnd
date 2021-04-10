import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStrogeService } from 'src/app/services/local-stroge.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup
  customer:Customer
  user:User
  creditCard:CreditCard

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, 
              private authService:AuthService, private router:Router, private customerService:CustomerService, 
              private localStorageService:LocalStrogeService, private userService:UserService, private creditCardService:CreditCardService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email : ["", Validators.required],
      password : ["", Validators.required]
    })
  }

  getCustomerByEmail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response => {
      this.customer = response.data
      this.localStorageService.setLocalStorage(this.customer,"customer")
      this.getCustomerCreditCard();
    })
  }

  getUserByEmail(email:string){
    this.userService.getUserByMail(email).subscribe(response => {
      this.user = response.data
      this.localStorageService.setLocalStorage(this.user,"user")
    })
  }

  getCustomerCreditCard(){
    if (this.localStorageService.getLocalStorage("customer").cardId) {
      let cardId =this.localStorageService.getLocalStorage("customer").cardId 
      this.creditCardService.getCardById(cardId).subscribe(response => {
        this.localStorageService.setLocalStorage(response.data,"creditCard")
      })
  
    }
  }
  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message, "Başarılı !");
        this.getCustomerByEmail(loginModel.email)
        this.localStorageService.setLocalStorage(response.data.token,"token")
        // localStorage.setItem("token",response.data.token);
        this.getUserByEmail(loginModel.email)
        setTimeout(() => {this.router.navigate([""])}, 1000)
      },responseError => {
        this.toastrService.error(responseError.error, "Dikkat !")
      })
    }
  }
}
