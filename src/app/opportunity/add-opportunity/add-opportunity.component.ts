import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpportunityServiceService } from '../../services/opportunity-service.service';

declare var $:any;

@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.scss']
})
export class AddOpportunityComponent implements OnInit {

  constructor(private opportunityService:OpportunityServiceService , private router:Router) { }

  ngOnInit(): void {
  }

  addOpportunity(opp:any){
    this.opportunityService.AddOpportunity(opp).subscribe(
    ()=>{
      this.router.navigate(['list_opportunity']);
      this.showNotification('top', 'center', 'success', 'Opportunity added successfully !');
    },
    (err)=>{
    }
  )

  }

  showNotification(from, align, type, message){
    const types = ['','info','success','warning','danger'];
  
    $.notify({
        icon: "pe-7s-bell",
        message: message
    },{
        type: types[type],
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
  }

}
