import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Skill } from '../model/skill.model';
import { Level } from '../model/level.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateAssociateService } from './create-associate.service';
import { Data } from "../model/data.model";
import { SkillsService } from '../skills/skills.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-create-associate',
  templateUrl: './create-associate.component.html',
  styleUrls: ['./create-associate.component.css']
})
export class CreateAssociateComponent implements OnInit {
skills:Skill[];
newSkill:Skill;
lvl:Level;
employee: Employee = new Employee();
allSkills: Skill[];
form: FormGroup;
level:string;
file:File;
 private errorMessage: string;
localUrl: any;
alreadyPresent: boolean;

  constructor( 
  private createAssociateService: CreateAssociateService,
  private skillsService:SkillsService,
  private router: Router,
   private formBuilder: FormBuilder,
   private data:Data) {}

  ngOnInit() {

   this.createAssociateService.getSkills()  
      .subscribe(
          allSkills =>{
           this.allSkills = allSkills;
           this.resetSkills();
           this.poulateEditDetails();
          },
          error => this.errorMessage = error
      );


this.form = this.formBuilder.group({
      Name: [null, Validators.required],
      associateID: [null, Validators.required],
      gender: [null, Validators.required],
      emailId: [null, Validators.required],
      mobilenumber: [null, Validators.required],
      image: [null, Validators.required],
     green : [null, Validators.required],
      blue: [null, Validators.required],
      red: [null, Validators.required],
      remark: [null, Validators.required],
      strength: [null, Validators.required],
      weakness: [null, Validators.required],
       skill: [null, Validators.required],
       addSkil:[null, Validators.required]

       
     
    });


  
/*var btnContainer = document.getElementById("buttonId");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    
  });
}*/




  }
addEmployee(){
this.employee.name =this.form.controls["Name"].value;
this.employee.associate_id=this.form.controls["associateID"].value;
this.employee.email=this.form.controls["emailId"].value;
this.employee.pic=this.form.controls["image"].value;
this.employee.mobile=this.form.controls["mobilenumber"].value;
if(this.form.controls["blue"].value===true){
  this.employee.status="blue";
  }else if(this.form.controls["red"].value===true){
  this.employee.status="red";
  }else{
  this.employee.status="green";
  }
this.employee.skills=this.allSkills;
this.employee.level=document.getElementsByClassName("active")[1].innerHTML;
this.employee.remark=this.form.controls["remark"].value;
this.employee.strength=this.form.controls["strength"].value;
this.employee.weakness=this.form.controls["weakness"].value;
this.employee.gender=this.form.controls["gender"].value;


this.createAssociateService.addAssociate(this.file, this.employee).subscribe(
                result => {
                    alert(result);
                    this.navigateAway(result);
                },
                error => console.log(<any>error)
            );


 alert(this.employee.name);
 
 }



clickedL1(){
  var button = document.getElementById("l1");
  button.className=button.className+" active";
  document.getElementById("l2").className=document.getElementById("l2").className.replace(" active", "");
  document.getElementById("l3").className=document.getElementById("l3").className.replace(" active", "");
}

clickedL2(){
  var button = document.getElementById("l2");
  button.className=button.className+" active";
  document.getElementById("l1").className=document.getElementById("l1").className.replace(" active", "");
  document.getElementById("l3").className=document.getElementById("l3").className.replace(" active", "");
}

clickedL3(){
  var button = document.getElementById("l3");
  button.className=button.className+" active";
  document.getElementById("l2").className=document.getElementById("l2").className.replace(" active", "");
  document.getElementById("l1").className=document.getElementById("l1").className.replace(" active", "");
}


 poulateEditDetails(){
 if(this.data.mode=="edit"){
 this.form.controls["Name"].setValue(this.data.storage.name);
 this.form.controls["associateID"].setValue(this.data.storage.associate_id);
 this.form.controls["emailId"].setValue(this.data.storage.email);

 this.localUrl = "http://localhost:8090/skilltracker/getimage/" + this.data.storage.associate_id;


 //this.form.controls["image"].setValue(this.data.storage.pic);
 this.form.controls["mobilenumber"].setValue(this.data.storage.mobile);
 if(this.data.storage.status == "green")
 {
 this.form.controls["green"].setValue(true);
 }
 else if(this.data.storage.status == "blue"){
 this.form.controls["blue"].setValue(true);
 
 }
 else{
 this.form.controls["red"].setValue(true);
 }

 if(this.data.storage.level=="L1"){
 document.getElementById("l1").className=document.getElementById("l1").className+" active";
 }
 else if(this.data.storage.level=="L2"){
 document.getElementById("l2").className=document.getElementById("l2").className+" active";
 }
 else{
 document.getElementById("l3").className=document.getElementById("l3").className+" active";
 }
 //this.allSkills = this.data.storage.skills;

 for (let skill of this.allSkills) {
    for(let empSkill of this.data.storage.skills){
    if(empSkill.skillId == skill.skillId){
    skill.skillRating = empSkill.skillRating;
    }
    }
 }
 this.form.controls["remark"].setValue(this.data.storage.remark);
 this.form.controls["strength"].setValue(this.data.storage.strength);
 this.form.controls["weakness"].setValue(this.data.storage.weakness);
 this.form.controls["gender"].setValue(this.data.storage.gender);
 }

 }

 reset(){
 this.form.reset();
 this.resetSkills();
 
 }

navigateAway(data) {
        if (data.status === 200) {
            this.router.navigate(['/', 'home']);
        }
    }
 showImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
            }
            this.file = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]);
        }
    }


 cancel(){
   this.router.navigate(['/', 'home']);
 }

 addSkill(skillName){
  this.data.addSkill = "add";
   this.alreadyPresent = false;
for (let skill of this.allSkills) {
   if(skill.skillName.toLowerCase()==skillName.toLowerCase()){
  this.alreadyPresent = true;
   }
 }
           if(!this.alreadyPresent){
           this.data.skillName=   skillName;  
  this.router.navigate(['/', 'skill']);
  }
  else{
  alert("skill already present");
  }

 }

delEmployee(associateId: string){

 this.createAssociateService.deleteEmployee(associateId)  
      .subscribe(
         result => {
                    alert(result);
                    this.navigateAway(result);
                },
                error => console.log(<any>error)
      );


        this.router.navigate(['/', 'home']);
            
 }



resetSkills(){
   for (let skill of this.allSkills) {
    skill.skillRating  = 0;
 }

}



setSkillValue(id,value){
    alert(value);
    for (let skill of this.allSkills) {
  if(skill.skillId === id){
  skill.skillRating  = value;
  }
}

}




}
