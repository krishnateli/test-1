import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  showDetails: any = {
    'show1': ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
    'show2': ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B2', 'B3', 'B4', 'B5', 'B6', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
    'show3': ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
    'ticketCost': {
      'platinum': 320,
      'gold': 280,
      'silver': 240
    },
    'taxes': {
      'servicetax': 14,
      'swachhbharatcess': 0.5,
      'krishikalyancess': 0.5
    }
  }

  constructor() { }

  getShowDetails() {
    return this.showDetails;
  }

  getShowSeats(sno) {
    return this.showDetails['show' + sno];
  }

  getTicketCost(ticketType) {
    return this.showDetails['ticketCost'][ticketType];
  }

  getTaxes(taxType) {
    return this.showDetails['taxes'][taxType];
  }

}
