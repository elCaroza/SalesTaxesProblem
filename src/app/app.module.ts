// Angular dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Config
import { ProviderServe_ManagerDataService } from './models/app.config';

// Components
import { AppComponent } from './components/app/app.component';

// Services
import { ManageDataService } from './services/manage-data.service';
import { TestingComponent } from './testing/components/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ProviderServe_ManagerDataService,
    ManageDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
