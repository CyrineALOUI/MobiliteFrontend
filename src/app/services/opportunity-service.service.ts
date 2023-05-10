import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opportunity } from '../model/opportunity';

@Injectable({
  providedIn: 'root'
})
export class OpportunityServiceService {

  constructor(private http:HttpClient) { }

  //Afficher liste des opportunites
  listOpportunities():Observable<Opportunity[]>{
    return this.http.get<Opportunity[]>('http://localhost:8098/MobiliteInternationale/retrieve-all-opportunities')
  }

  //Ajouter opportunity
  AddOpportunity(data : any) {
    return this.http.post('http://localhost:8098/MobiliteInternationale/addOpportunity',data)
  }

  //Supprimer opportunity par id
  deleteOpportunity(idOpportunity: any) {
    return this.http.delete('http://localhost:8098/MobiliteInternationale/remove-opportunity/' + idOpportunity)
  }

  //Modifier opportunity récupéré id
  updateOpportunity(idOpportunity:any , data:any){
    return this.http.put('http://localhost:8098/MobiliteInternationale/update-opportunity2/' + idOpportunity, data)
  }


  //Récupérer opportunity par id
  findById(idOpportunity:any):Observable<Opportunity> {
    return this.http.get<Opportunity>('http://localhost:8098/MobiliteInternationale/retrieve-opportunity/' + idOpportunity)
  }

  generateQRCode(idOpportunity: number): Observable<any> {
    return this.http.get('http://localhost:8098/MobiliteInternationale/generateQRCodeForOpportunity/' + idOpportunity, { responseType: 'blob' });
  }

  updateCandidacyStatusByOpportunity(idOpportunity: number) {
    return this.http.put('http://localhost:8098/MobiliteInternationale/update-candidacy-status_By_Opportunity/' + idOpportunity, null);
  }

  /* Statistique */ 
  getSpecialtiesStats(opportunities: Opportunity[]): {specialty: string, count: number}[] {
      const specialties: string[] = [];
      opportunities.forEach(opportunity => {
        if (!specialties.includes(opportunity.speciality)) {
          specialties.push(opportunity.speciality);
        }
      });

      const stats: {specialty: string, count: number}[] = [];
      specialties.forEach(specialty => {
        const count = opportunities.filter(opportunity => opportunity.speciality === specialty).length;
        stats.push({specialty, count});
      });

      return stats;
  }
  
}
