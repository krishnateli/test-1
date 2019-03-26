import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should update the showNo control with new input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.ticketBookingForm.controls.showNo.setValue('1');
    expect(component.ticketBookingForm.value['showNo']).toEqual('1');

    component.ticketBookingForm.controls.showNo.setValue('2');
    expect(component.ticketBookingForm.value['showNo']).toEqual('2');
  });

  it('should checkAvailability button should be called', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.ticketBookingForm.controls.showNo.setValue('1');
    fixture.detectChanges();
    spyOn(component, 'checkAvailability');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.checkAvailability).toHaveBeenCalled();
    });
  }));

  it("should get available seats in an array", () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.checkAvailability(1);
    expect(component.isSeatsAvailable).toBeTruthy;
    expect(component.seatsAvailable.length).toBeGreaterThanOrEqual(1);
  });

  // it("should bookShow", () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   component = fixture.componentInstance;
  //   component.ticketBookingForm.controls.showNo.setValue('1');
  //   component.ticketBookingForm.controls.showNo.setValue('A1, A2');
  //   fixture.detectChanges();
  //   component.bookShow();

  //   fixture.whenStable().then(() => {
  //     expect(component.bookShow).toHaveBeenCalled();
  //   });

  //   expect(component.isBooked).toBeTruthy;
  //   expect(component.totalRevenue['revenue']).toBeGreaterThanOrEqual(1);
  // });

});
