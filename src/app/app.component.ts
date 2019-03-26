import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ticketBookingForm = new FormGroup({
    showNo: new FormControl(''),
    seats: new FormControl('')
  });

  isSeatsAvailable: boolean = false;
  isTotalRevenue: boolean = false;
  isBooked: boolean = false;
  seatsAvailable = [];
  errorMsg: string = "";
  totalRevenue = {};
  currentRevenue: any = {};

  constructor(private dataService: DataService) {
    this.totalRevenue["revenue"] = 0;
    this.totalRevenue["servicetax"] = 0;
    this.totalRevenue["swachhbharatcess"] = 0;
    this.totalRevenue["krishikalyancess"] = 0;
    this.currentRevenue = {...this.totalRevenue};
  }

  checkAvailability(showno) {
    this.errorMsg = '';
    this.seatsAvailable = this.dataService.getShowSeats(showno);
    if (this.seatsAvailable && this.seatsAvailable.length > 0) {
      this.isSeatsAvailable = true;
    } else {
      this.errorMsg = "Invalid show no.";
    }
  }

  bookShow() {
    this.errorMsg = '';
    this.currentRevenue["revenue"] = 0;
    this.currentRevenue["servicetax"] = 0;
    this.currentRevenue["swachhbharatcess"] = 0;
    this.currentRevenue["krishikalyancess"] = 0;
    this.seatsAvailable = this.dataService.getShowSeats(this.ticketBookingForm.value.showNo);
    let bookSeats = this.ticketBookingForm.value.seats.split(",");
    if (bookSeats.every(el => this.seatsAvailable.includes(el.trim()))) {
      bookSeats.map((el) => {
        if (this.seatsAvailable.indexOf(el.trim()) != -1) {
          this.seatsAvailable.splice(this.seatsAvailable.indexOf(el.trim()), 1);
          if (el.trim().charAt(0) == 'A') {
            this.currentRevenue.revenue += this.dataService.getTicketCost("platinum");
          } else if (el.trim().charAt(0) == 'B') {
            this.currentRevenue.revenue += this.dataService.getTicketCost("gold")
          } else {
            this.currentRevenue.revenue += this.dataService.getTicketCost("silver")
          }
          this.currentRevenue.servicetax += this.currentRevenue.revenue / 100 * this.dataService.getTaxes("servicetax");
          this.currentRevenue.swachhbharatcess += this.currentRevenue.revenue / 100 * this.dataService.getTaxes("swachhbharatcess");
          this.currentRevenue.krishikalyancess += this.currentRevenue.revenue / 100 * this.dataService.getTaxes("krishikalyancess");
        }
      });
      this.isBooked = true;
      this.updateTotalRevenue();
    } else {
      let seatsNotvailable: string = '';
      bookSeats.map((el) => {
        !this.seatsAvailable.includes(el.trim()) ? seatsNotvailable += el : '';
      })
      this.errorMsg = seatsNotvailable + " Not available, Please select different seats";
    }
  }

  updateTotalRevenue() {
    for (let revenueKey in this.totalRevenue) {
      this.totalRevenue[revenueKey] += this.currentRevenue[revenueKey];
    }
  }

  showTotalRevenue() {
    this.isTotalRevenue = true;
  }
}
