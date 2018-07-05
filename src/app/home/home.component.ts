import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Skill } from '../model/skill.model';
import { Level } from '../model/level.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { Data } from "../model/data.model";
import { CreateAssociateService } from '../create-associate/create-associate.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

 public doughnutChartLabels: string[] = ['HTML5', 'CSS3', 'Java', 'Spring', 'Spring Restful', 'Angular 1', 'Angular 2', 'React', 'Others'];
  public doughnutChartData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  public doughnutChartType: string = 'doughnut';


random: number;
 private html5: number = 0;
    private css3: number= 0 ;
     private java: number= 0;
      private spring: number = 0;
       private restful: number = 0;
        private angular1: number = 0;
         private angular2: number = 0;
          private react: number = 0;
employees: Employee[];
private errorMessage: string;

registeredCandidates: number;
  femaleCandidates: number = 0;
  maleCandidates: number;
  freshersCandidates: number;
  ratedCandidates: number = 0;
  femaleRatedCandidates: number = 0;
  maleRatedCandidates: number = 0;
  level1Candidates: number;
  level2Candidates: number;
  level3Candidates: number;
  ratedbothh:number;





  constructor(private homeService: HomeService,
  private router: Router,
   private formBuilder: FormBuilder,
  
   private createAssociateService: CreateAssociateService,
   private data: Data) { }

  ngOnInit() {

 
this.random = Math.random();
   this.homeService.viewallAssociates()  
      .subscribe(
          employees =>{
           this.employees = employees;
           this.setSkillString(employees);
           this.addChart(employees);
           this.charts();
           this.graphs(employees);
           
          },
          error => this.errorMessage = error
      );





      }


addChart(employees){
  
  //chart start
 for (let emp of employees) {
 for(let empSkill of emp.skills){

if(empSkill.skillName.toLowerCase() == "html5"){
  this.html5 = this.html5 + empSkill.skillRating; 
}
else if(empSkill.skillName.toLowerCase() == "css3"){
  this.css3 = this.css3+ empSkill.skillRating;
}
else if(empSkill.skillName.toLowerCase() == "java"){
  this.java = this.java+ empSkill.skillRating;
  
}
else if(empSkill.skillName.toLowerCase() == "spring"){
  this.spring = this.spring+ empSkill.skillRating;
  
}
else if(empSkill.skillName.toLowerCase() == "restful"){
  this.restful = this.restful+ empSkill.skillRating;
  
}
else if(empSkill.skillName.toLowerCase() == "angular 1"){
  this.angular1 = this.angular1+ empSkill.skillRating;
  
}
else if(empSkill.skillName.toLowerCase() == "angular 2"){
  this.angular2 = this.angular2+ empSkill.skillRating;
  
}
else if(empSkill.skillName.toLowerCase() == "react"){
  this.react = this.react+ empSkill.skillRating;
  
}
 }
 }

}

      charts(){

      this.doughnutChartData = new Array<number>();
    this.doughnutChartLabels.forEach(element=>{

    if(element.toLowerCase() == "html5"){
      this.doughnutChartData.push(this.html5);
    }
    else if(element.toLowerCase() == "css3"){
    this.doughnutChartData.push(this.css3);
    }
    else if(element.toLowerCase() == "java"){
    this.doughnutChartData.push(this.java);
    }
    else if(element.toLowerCase() == "spring"){
    this.doughnutChartData.push(this.spring);
    }
    else if(element.toLowerCase() == "restful"){
    this.doughnutChartData.push(this.restful);
    }
    else if(element.toLowerCase() == "angular 1"){
    this.doughnutChartData.push(this.angular1);
    }
     else if(element.toLowerCase() == "angular 2"){
    this.doughnutChartData.push(this.angular2);
    }
     else if(element.toLowerCase() == "react"){
    this.doughnutChartData.push(this.react);
    }


    });
      }


      graphs(employees){
var female=0;
var femaleRated=0;
var male = 0;
var maleRated =0;
var ratedboth =0;
var freshers =0;
var level2 = 0;
var level3 = 0;

this.registeredCandidates = employees.length;
for(let emp of employees){
  if(emp.gender.toLowerCase() == "female"){
female++;
      if(emp.status.toLowerCase() =="red"){
      femaleRated++;
       ratedboth++;
      }
  }
  else if(emp.gender.toLowerCase() == "male"){
  male++;
      if(emp.status.toLowerCase() =="red"){
      maleRated++;
       ratedboth++;
      }
  }

  if(emp.level.toLowerCase() =="l1"){
  freshers++;
  }
  else if(emp.level.toLowerCase() =="l2"){
level2++;
  }
  else{
level3++;
  }
  
this.ratedbothh= ratedboth;

}
this.femaleCandidates = (female/this.registeredCandidates)*100;
    this.femaleCandidates = Math.round(this.femaleCandidates * 100) / 100;
    this.maleCandidates = (male/this.registeredCandidates)*100;
    this.maleCandidates = Math.round(this.maleCandidates * 100) / 100;
    this.freshersCandidates = (freshers/this.registeredCandidates)*100;
    this.freshersCandidates = Math.round(this.freshersCandidates * 100) / 100;

    if(this.ratedbothh!== 0){
    this.femaleRatedCandidates = (femaleRated/this.ratedbothh)*100;
    this.femaleRatedCandidates = Math.round(this.femaleRatedCandidates * 100) / 100;
    this.maleRatedCandidates = (maleRated/this.ratedbothh)*100;
    this.maleRatedCandidates = Math.round(this.maleRatedCandidates * 100) / 100;
    }
    else{
    this.femaleRatedCandidates=0;
    this.maleRatedCandidates=0;
    }
    this.level1Candidates = (freshers/this.registeredCandidates)*100;
    this.level1Candidates = Math.round(this.level1Candidates * 100) / 100;
    this.level2Candidates = (level2/this.registeredCandidates)*100;
    this.level2Candidates = Math.round(this.level2Candidates * 100) / 100;
    this.level3Candidates = (level3/this.registeredCandidates)*100;
    this.level3Candidates = Math.round(this.level3Candidates * 100) / 100;



      }




      setSkillString(employees) {
       for (let emp of employees) {
       let strongSkill:string;
       strongSkill='';
       for(let empSkill of emp.skills){
       if(empSkill.skillRating!== "0"){
       strongSkill= strongSkill+empSkill.skillName + " ,";
       }
       /*if(emp.skills.length>1){
	strongSkill=strongSkill+',';
       }*/
       }
    emp.allSkillsOfTheEmployee=strongSkill;
 	}
    }

  

  editEmployee(empId){
   this.data.mode = "edit";
for(let emp of this.employees){
if(emp.associate_id == empId ){
	 this.data.storage = {
            "name": emp.name,
            "associate_id": emp.associate_id,
            "email": emp.email,
            "pic":"pic" ,
            "mobile": emp.mobile,
            "status": emp.status,
            "level": emp.level,
            "remark": emp.remark,
            "strength": emp.strength,
            "weakness":emp.weakness,
            "gender": emp.gender,
            "allSkillsOfTheEmployee": emp.allSkillsOfTheEmployee,
            "skills": emp.skills
        }
}
}
 
        this.router.navigate(['/', 'create-associate']);
            
 }
deleteEmployee(associateId: string){

 this.createAssociateService.deleteEmployee(associateId)  
      .subscribe(
         result => {
                    alert(result);
                    this.navigateAway(result);
                },
                error => console.log(<any>error)
      );
this.homeService.viewallAssociates()  
      .subscribe(
          employees =>{
           this.employees = employees;
           this.setSkillString(employees);
           this.addChart(employees);
           this.charts();
           this.graphs(employees);
           
          },
          error => this.errorMessage = error
      );

        this.router.navigate(['/', 'home']);
            
 }

navigateAway(data) {
        if (data.status === 200) {
            this.router.navigate(['/', 'create-associate']);
        }
    }


viewEmployee(empId){
this.data.mode="view";
         this.data.mode = "edit";
for(let emp of this.employees){
if(emp.associate_id == empId ){
	 this.data.storage = {
            "name": emp.name,
            "associate_id": emp.associate_id,
            "email": emp.email,
            "pic":"pic" ,
            "mobile": emp.mobile,
            "status": emp.status,
            "level": emp.level,
            "remark": emp.remark,
            "strength": emp.strength,
            "weakness":emp.weakness,
            "gender": emp.gender,
            "allSkillsOfTheEmployee": emp.allSkillsOfTheEmployee,
            "skills": emp.skills
        }
}
}
 
        this.router.navigate(['/', 'create-associate']);
            
 }

 addEmployee(){
  this.data.mode = "add";
        this.router.navigate(['/', 'create-associate']);
            
 }

}
