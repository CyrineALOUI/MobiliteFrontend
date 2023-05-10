import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidacy } from '../model/candidacy';

@Injectable({
  providedIn: 'root'
})
export class CandidacyServiceService {

  constructor(private http:HttpClient) { }

  //Afficher liste des candidacies
  listCandidacies():Observable<Candidacy[]>{
    return this.http.get<Candidacy[]>('http://localhost:8098/MobiliteInternationale/retrieve-all-candidacies')
  }

  //Supprimer candidacy par id
  deleteCandidacy(idCandidacy: any) {
    return this.http.delete('http://localhost:8098/MobiliteInternationale/remove-candidacy/' + idCandidacy)
  }

   //Récupérer candidacy par id
   findById(idCandidacy:any):Observable<Candidacy> {
    return this.http.get<Candidacy>('http://localhost:8098/MobiliteInternationale/retrieve-candidacy/' + idCandidacy)
  }


  //Ajouter candidacy
  addCandidacy(candidacy: Candidacy, file: File) {
    const formData = new FormData();
    formData.append('candidacy', JSON.stringify(candidacy));
    formData.append('file', file);

    return this.http.post<Candidacy>('http://localhost:8098/MobiliteInternationale/add-candidacy-file',formData);
  }

  calculateCandidacyScoreByOpportunity(idOpportunity: number, idCandidacy: number): Observable<number> {
    return this.http.get<number>('http://localhost:8098/MobiliteInternationale/calculateCandidacyScoreByOpportunity/' + idOpportunity + '/' + idCandidacy);
  }

}
