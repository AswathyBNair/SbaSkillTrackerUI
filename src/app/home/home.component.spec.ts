import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';
import { HomeService } from './home.service';
import { Data } from "../model/data.model";
import { CreateAssociateService } from '../create-associate/create-associate.service';

import { Employee } from '../model/employee.model';
import { Skill } from '../model/skill.model';
import { Level } from '../model/level.model';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [RouterModule.forRoot([]),
        FormsModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        ChartsModule,
        HttpModule,
        HttpClientModule
      ],
      declarations: [ HomeComponent ],
      providers: [ChartsModule,
      HomeService,
      CreateAssociateService,
      Data,
      Employee,
      Skill,
      Level,
      { provide: APP_BASE_HREF, useValue: '/' },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
