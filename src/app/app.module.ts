// Angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './components/app/app.component';

// Services
import { ManageDataService } from './services/manage-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ManageDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
