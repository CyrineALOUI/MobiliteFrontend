import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportunityServiceService } from '../../services/opportunity-service.service';

@Component({
  selector: 'app-delete-opportunity',
  templateUrl: './delete-opportunity.component.html',
  styleUrls: ['./delete-opportunity.component.scss']
})
export class DeleteOpportunityComponent implements OnInit {

  idOpportunity:any;

  constructor(private opportunityService:OpportunityServiceService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.idOpportunity=this.activatedRoute.snapshot.params['idOpportunity']
    this.opportunityService.deleteOpportunity(this.idOpportunity).subscribe(
      ()=>{
        this.router.navigate(['list_opportunity'])
      }
    );
  }

}
