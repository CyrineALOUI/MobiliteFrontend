import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidacy } from 'app/model/candidacy';
import { Opportunity } from 'app/model/opportunity';
import { CandidacyServiceService } from 'app/services/candidacy-service.service';

@Component({
  selector: 'app-add-candidacy',
  templateUrl: './add-candidacy.component.html',
  styleUrls: ['./add-candidacy.component.scss']
})
export class AddCandidacyComponent implements OnInit {

  fileToUpload: File = null;
  
  constructor(private candidacyService: CandidacyServiceService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(candidacyForm: NgForm) {
    const { average_1year, average_2year, average_3year, score, speciality, opportunity, file } = candidacyForm.value;
    const candidacy = new Candidacy(average_1year, average_2year, average_3year, speciality, null, file);
  
    this.candidacyService.addCandidacy(candidacy, this.fileToUpload)
      .subscribe(savedCandidacy => {
        console.log('Candidacy added with ID:', savedCandidacy.idCandidacy);
        this.router.navigate(['list_candidacy']);
      });
  }
  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}

  



