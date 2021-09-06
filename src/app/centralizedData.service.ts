import { Injectable } from "@angular/core"

@Injectable({providedIn: 'root'})
export class CentralData {

  private classes:string[] = ['Warrior','Ranger','Sorceress','Berserker','Tamer','Musa',
  'Maehwa','Valkerie', 'Kunoicihi', 'Ninja','Wizard','Witch','Dark Knight',
   'Striker','Mystic','Archer','Lahn','Shai', 'Guardian', 'Hashashin','Nova',
   'Sage','Corsair']

   getClasses(){
    //  return a copy of all classes
     return [...this.classes]
   }


}
