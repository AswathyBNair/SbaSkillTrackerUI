import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CreateAssociateComponent } from './create-associate/create-associate.component';
import { HomeComponent } from './home/home.component';
import { ImageUploadModule } from "angular2-image-upload";
import { CreateAssociateService } from './create-associate/create-associate.service';
import { HomeService } from './home/home.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Data } from "./model/data.model";
import { SkillsService } from './skills/skills.service';
import { SkillsComponent } from './skills/skills.component';
import { ChartsModule } from 'ng2-charts';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-associate', component: CreateAssociateComponent },
  { path: 'home', component: HomeComponent },
 { path: 'skill', component: SkillsComponent }
 
];

@NgModule({
  declarations: [
    AppComponent,
   CreateAssociateComponent,
   SkillsComponent,
    HomeComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ChartsModule,
    ImageUploadModule.forRoot()
   
  ],
   providers: [
   SkillsService,
    CreateAssociateService,
    HomeService,
    Data
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
