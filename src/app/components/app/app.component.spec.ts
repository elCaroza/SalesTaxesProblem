import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProviderTesting_ManagerDataService, TestingConfig } from '../../models/app.config';
import { ManageDataService } from '../../services/manage-data.service';
import { TestingComponent } from '../../testing/components/testing.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app : TestingComponent;
  let fixture : ComponentFixture<TestingComponent>;
  let de : DebugElement;
  let el : HTMLElement;
  let service : ManageDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestingComponent,
        AppComponent
      ],
      imports: [
        BrowserModule
      ],
      providers: [
        ProviderTesting_ManagerDataService,
        ManageDataService
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(TestingComponent);
      app = fixture.componentInstance;
      el = fixture.nativeElement;
      de = fixture.debugElement;
      fixture.detectChanges();

      service = de.injector.get(ManageDataService);
      service.get().subscribe( (result) => {
        // Reload if subscriber receive new data!
        fixture.detectChanges();
      });
    });

  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should have 2 "content-box" classes', async(() => {
    let boxes = el.querySelectorAll('.content-box');
    for(var i=0; i<boxes.length; i++){
      boxes.item( i ).classList.add( TestingConfig.css )
    }
    expect(boxes.length).toBe(2);
  }));
});
