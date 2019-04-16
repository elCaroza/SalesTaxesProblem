/*
 * Main component of entire app
 */

import { Component, OnInit } from '@angular/core';
import { ManageDataService } from '../../services/manage-data.service';
import { IOutputs } from '../../models/interfaces';
import { OUTPUT_TITLE, INPUT_TITLE, PRICES_FIELD } from '../../models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  salesList : IOutputs;

  constructor( private manageData : ManageDataService ) {

    // Retrieve data from JSON
    this.manageData.get().subscribe( res => {
      this.salesList = res.salesList;
    });
  }

  ngOnInit(){

    // I choose to put snippet below here 'cause this component is re-used on testing
    if( this.manageData.config.mode == "serve" )
      this.manageData.set();
  }

  // Get title of the section INPUT/OUTPUT
  private getTitle = ( isOutput: boolean, index: number ) : string => {
    let counter = " ";
    if( index >= 0 ) counter += ( index + 1 );
    return ( isOutput ? OUTPUT_TITLE : INPUT_TITLE ) + counter;
  }

  // Select if get price for INPUT or OUTPUT
  private getPrice = ( isOutput: boolean, vector : any ) : number => {
    let price = vector[ (isOutput ? PRICES_FIELD.OUT : PRICES_FIELD.DEFAULT  ) ];
    return this.manageData.getNumberFixed( price );
  }
}
