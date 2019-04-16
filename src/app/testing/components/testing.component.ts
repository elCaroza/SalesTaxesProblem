/*
 * This component is avaiable just on testing mode!
 */

import { Component, OnInit } from '@angular/core';
import { ManageDataService } from '../../services/manage-data.service';
import { IOutputs } from '../../models/interfaces';

@Component({
  selector: 'testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  salesList : IOutputs;
  taxes;
  updateTime;

  constructor(private manageData : ManageDataService) {
    this.manageData.get().subscribe( res => {
      this.taxes = res.taxes;
      this.salesList = res.salesList;
      this.updateTime = res.updateTime;
    });
  }

  ngOnInit() {
    this.newRandomize();
  }

  newRandomize = () : void => {
    this.manageData.set();
  }
}
