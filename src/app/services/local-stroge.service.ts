import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStrogeService {

  constructor() { }

  setLocalStorage<T = object,TKeyValue = string>(entity:T, keyValue:TKeyValue){
    localStorage.setItem(keyValue.toString(),JSON.stringify(entity))
  }

  getLocalStorage<TKeyValue = string>(keyValue:TKeyValue) {
    var customer = JSON.parse(localStorage.getItem(keyValue.toString()));
    return customer;
  }

  removeLocalStorage<TKeyValue = string>(keyValue:TKeyValue) {
    localStorage.removeItem(keyValue.toString())
  }
}
