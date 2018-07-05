
import { Skill } from '../model/skill.model';
import { Observable } from 'rxjs/Rx';
export class Employee {
    name: string;
    associate_id: string;
    email: string;
    pic:string;
    mobile:number;
    status:string;
    level:string;
    remark:string;
    strength:string;
    weakness:string;
    gender:string;
    skills:Skill[];
    allSkillsOfTheEmployee:string;
    constructor() {}
}
