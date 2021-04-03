import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cardNumber:string;
  nameOnTheCard:string;
  cardExpirationDate:string;
  cardCvv:string;
  moneyInTheCard:number;

  customer:Customer;
  creditCard:CreditCard; 
  rental:Rental;
  car:Car;
  carDetail:CarDetail={car:[],carImages:[]};
  paymentAmount: number = 0;
  cardExist:boolean;
  getCustomerId:number;

  constructor(private activatedRoute:ActivatedRoute, private rentalService:RentalService, private carService:CarService, private customerService:CustomerService,
              private creditCardService:CreditCardService, private router:Router, private toastrService:ToastrService, private carDetailService:CarDetailService
    ) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params => {
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId; 
        this.getCustomerById(this.getCustomerId)
        this.getCarDetails();
      }
    }) 
  }

getCarDetails(){
  this.carDetailService.getCarDetails(this.rental.carId).subscribe(response => {
    this.carDetail.car = response.data.car;
    this.calculatePayment();
  })
}

getCustomerById(customerId:number){
  this.customerService.getCustomerById(customerId).subscribe(response => {
    this.customer = response.data[0]
  })
}
calculatePayment(){
  var returnDate = new Date(this.rental.returnDate.toString());
  var rentDate = new Date(this.rental.rentDate.toString());
  var difference = returnDate.getTime() - rentDate.getTime();
  
  var rentDays = Math.ceil(difference/(1000 * 3600 * 24));

  this.paymentAmount = rentDays * this.carDetail.car[0].dailyPrice;

  if(this.paymentAmount <= 0){
    this.toastrService.error("Hatalı İşlem !")
  }
}

async rentACar(){
  let verifyCreditCard:CreditCard = {
    cardNumber : this.cardNumber,
    nameOnTheCard : this.nameOnTheCard,
    cardExpirationDate : this.cardExpirationDate,
    cardCvv : this.cardCvv
  }

   this.cardExist = await this.isCardExist(verifyCreditCard)
  if(this.cardExist){
    this.creditCard = await this.getByCardNumber(this.cardNumber);

    if(this.creditCard.moneyInTheCard as number >= this.paymentAmount){
      this.creditCard.moneyInTheCard = this.creditCard.moneyInTheCard as number - this.paymentAmount;

      if(this.updateCard(this.creditCard)){

        this.rentalService.addRental(this.rental);
        this.toastrService.success("İşlem Başarılı!");
        this.router.navigate(['/brands/'])
        this.toastrService.info("Anasayfaya Yönlendiriliyorunuz...")  
      }
      else {
        this.toastrService.error("Sistem Hatası !");
      }
    }
    else {
      this.toastrService.error("Yetersiz Bakiye");
    }

  }
  else {
    this.toastrService.error("Kart Bilgilerinizi Kontrol Ediniz !");
  }
}

 async isCardExist(creditCard:CreditCard){
  return (await this.creditCardService.verifyCard(creditCard).toPromise());
}

async getByCardNumber(cardNumber:string){
  return (await this.creditCardService.getByCardNumber(cardNumber).toPromise()).data;
}

async updateCard(creditCard:CreditCard){
  return (await this.creditCardService.updateCard(creditCard).toPromise()).success;
}
  // getCarDetails(){
  //   this.carDetailService.getCarDetails()
  // }
}
