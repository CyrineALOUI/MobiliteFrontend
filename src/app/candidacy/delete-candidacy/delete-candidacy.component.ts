import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidacyServiceService } from 'app/services/candidacy-service.service';

@Component({
  selector: 'app-delete-candidacy',
  templateUrl: './delete-candidacy.component.html',
  styleUrls: ['./delete-candidacy.component.scss']
})
export class DeleteCandidacyComponent implements OnInit {

  idCandidacy:any;

  constructor(private candidacyService:CandidacyServiceService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.idCandidacy=this.activatedRoute.snapshot.params['idCandidacy']
    this.candidacyService.deleteCandidacy(this.idCandidacy).subscribe(
      ()=>{
        this.router.navigate(['list_candidacy'])
      }
    );
  }

}
