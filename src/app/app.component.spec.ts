import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpModule } from '@angular/http';



describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
 
beforeEach(() => {
    fixture = TestBed.configureTestingModule({
    imports: [ FormsModule,HttpModule ,ReactiveFormsModule,RouterTestingModule],
      declarations: [ AppComponent],
      
    })
    .createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });
it('should create an instance', () => {
      expect(component).toBeDefined();
    });

    
});