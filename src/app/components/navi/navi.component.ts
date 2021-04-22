import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStrogeService } from 'src/app/services/local-stroge.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  state:boolean;
  user:User
  customer : Customer

  constructor(private customerService:CustomerService, private localStorageService:LocalStrogeService, private router:Router) { }

  ngOnInit(): void {
    let customer = this.localStorageService.getLocalStorage("customer");
    if (customer != null) {
      this.getCustomerByMail(customer.email);
    }
      this.isAuthenticated();
  } 

  getCustomerByMail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response => {
      this.customer = response.data
    })
  }

  isAuthenticated(){
    this.localStorageService.getLocalStorage("token") ? this.state=true : this.state= false;
  }

  loginPage(){
    this.router.navigate(["login"])
  }
  logOut(){
    console.log("Logout !");
    this.localStorageService.clear() 
    window.location.reload();
  }
}
