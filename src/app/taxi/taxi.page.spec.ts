import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TaxiPage } from './taxi.page';

describe('TaxiPage', () => {
  let component: TaxiPage;
  let fixture: ComponentFixture<TaxiPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: { queryParams: of({}) } }],
    });
    fixture = TestBed.createComponent(TaxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
