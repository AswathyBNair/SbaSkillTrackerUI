import { Component, OnInit } from '@angular/core';

import { SkillsService } from './skills.service';
import { Skill } from '../model/skill.model';
import { Data } from "../model/data.model";
import { CreateAssociateService } from '../create-associate/create-associate.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
form: FormGroup;
skill:Skill;
skills:Skill[];
private errorMessage: string;
  

  constructor(
    private skillsService: SkillsService,
    private formBuilder: FormBuilder,
     private createAssociateService: CreateAssociateService,
    private data:Data
  ) { }

  ngOnInit() {
   this.form = this.formBuilder.group({
      addSkillName: [null, Validators.required],
      skillName: [null, Validators.required]
      
    });

     this.form.controls["addSkillName"].setValue(this.data.skillName);

     this.createAssociateService.getSkills()  
      .subscribe(
          skills =>{
           this.skills = skills;
                    },
          error => this.errorMessage = error
      );



  }

 

  

  addSkill(skillName) {
 this.data.addSkill = "add";
      this.skill = new Skill();
      this.skill.skillName = skillName;
      this.skillsService.addSkill(this.skill)
        .subscribe(
        skills => {
          this.skills = skills;
          console.log(this.skills);
          
        },
        error => this.errorMessage = error
        );
    
  }



  editSkill(skillName) {
 this.data.addSkill = "edit";
      console.log("hii");
    
  }

  saveSkill(skill,newName) {

 skill.skillName = newName;
      alert("saved");
       this.skillsService.saveSkill(skill)
        .subscribe(
        skills => {
          this.skills = skills;
          console.log(this.skills);
          
        },
        error => this.errorMessage = error
        )
     this.data.addSkill = "add";
  }


  
  deleteSkill(skill) {
 
      console.log("delete");
      this.skillsService.deleteSkill(skill)
        .subscribe(
        skills => {
          this.skills = skills;
          console.log(this.skills);
          
        },
        error => this.errorMessage = error
        )
    
  }


}
