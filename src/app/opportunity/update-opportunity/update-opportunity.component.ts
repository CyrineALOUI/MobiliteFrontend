import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpportunityServiceService } from '../../services/opportunity-service.service';

declare var $:any;

@Component({
  selector: 'app-update-opportunity',
  templateUrl: './update-opportunity.component.html',
  styleUrls: ['./update-opportunity.component.scss']
})
export class UpdateOpportunityComponent implements OnInit {
  idOpportunity: string;
  opportunity: any;
  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private opportunityService:OpportunityServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      nameOpportunity: ['', Validators.required],
      speciality: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      typeOpportunity: ['', Validators.required],
      typeSelection: ['', Validators.required],
      capacity: ['', Validators.required],
      formula: ['', Validators.required],
      noteEliminatoire: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idOpportunity = this.activatedRoute.snapshot.paramMap.get("idOpportunity");
    this.opportunityService.findById(this.idOpportunity).subscribe(
      data => {
        this.opportunity = data;
        this.form.patchValue(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.opportunityService.updateOpportunity(this.idOpportunity, this.form.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['list_opportunity']);
        this.showNotification('top', 'center', 'success', 'Opportunity updated successfully !');
      },
      error => {
        console.log(error);
      }
    );
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
