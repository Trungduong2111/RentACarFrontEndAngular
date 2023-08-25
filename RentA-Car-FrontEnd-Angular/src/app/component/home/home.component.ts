import { Component } from '@angular/core';
import { Car } from '../models/car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cars: Car[] = [];
  imageUrl: any;

}
