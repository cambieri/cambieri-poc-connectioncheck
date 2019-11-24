import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedDataService } from '../services/shared-data.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  subscription: Subscription;

  constructor(private sharedDataService: SharedDataService) {
    this.subscription = this.sharedDataService.connectionObject$.subscribe(
      connectionObj => {
        alert(connectionObj.message);
        console.log(connectionObj);
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
