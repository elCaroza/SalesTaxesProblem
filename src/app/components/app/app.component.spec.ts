import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app : AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  let de : DebugElement;
  let el : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule
      ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      app = fixture.componentInstance;
      el = fixture.nativeElement;
    });
  }));
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it('should have 2 "content-box" classes', async(() => {
    expect(el.querySelectorAll('.content-box').length).toBe(2);
  }));
});
