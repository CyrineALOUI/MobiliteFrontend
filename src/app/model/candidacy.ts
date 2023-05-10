import { Opportunity } from "./opportunity";

export class Candidacy {
    idCandidacy:number;
    average_1year:number;
    average_2year:number;
    average_3year:number;
    score:number;
    speciality:string;
    status:string;
    opportunity: Opportunity; 
    file: File;

  
    constructor(average_1year: number, average_2year: number, average_3year: number, speciality: string, opportunity: Opportunity,file: File
      ) {
        this.average_1year = average_1year;
        this.average_2year = average_2year;
        this.average_3year = average_3year;
        this.speciality = speciality;
        this.opportunity = opportunity;
        this.file = file;
      }
}




