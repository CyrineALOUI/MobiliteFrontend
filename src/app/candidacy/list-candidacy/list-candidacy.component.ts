import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidacy } from 'app/model/candidacy';
import { Opportunity } from 'app/model/opportunity';
import { CandidacyServiceService } from 'app/services/candidacy-service.service';

@Component({
  selector: 'app-list-candidacy',
  templateUrl: './list-candidacy.component.html',
  styleUrls: ['./list-candidacy.component.scss']
})
export class ListCandidacyComponent implements OnInit {

  list!:Candidacy [];
  searchTerm: string;
  searchedCandidacies: Candidacy[];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private candidacyService:CandidacyServiceService,private router: Router) { }

  ngOnInit(): void {
    //Afficher la liste des candidacies
    this.candidacyService.listCandidacies().subscribe(

      (data)=>{
      this.list=data;
      this.searchedCandidacies = data; 
      
      }
    );
  }

  /*Redirection add*/
  onAddCandidacy() {
    this.router.navigateByUrl('/add_candidacy');
  }

  /*delete candidacy*/
  deleteCandidacy(idCandidacy: number) {
    location.reload();

    this.candidacyService.deleteCandidacy(idCandidacy).subscribe(
        (resp) => {
            console.log(resp);

        },
        (err) => {
            console.log(err);
        }
    );
    
  }

  calculateScore(idOpportunity: number, idCandidacy: number): void {
  this.candidacyService.calculateCandidacyScoreByOpportunity(idOpportunity, idCandidacy)
    .subscribe(score => {
      const candidacy = this.list.find(c => c.idCandidacy === idCandidacy);
      candidacy.score = score;
    });
}

/*Recherche dynamique*/
onSearch() {
  if (this.searchTerm) { // si le terme de recherche est non nul
    this.searchedCandidacies = this.list.filter(c =>
      c.speciality.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.opportunity.nameOpportunity.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } else { // sinon, afficher toutes les opportunités
    this.searchedCandidacies = this.list;
  }
}


/*Pagination*/
getTotalPages() {
  const totalItems = this.list.length; 
  const itemsPerPage = this.itemsPerPage; 
  return Math.ceil(totalItems / itemsPerPage);
}

getPages(): number[] {
  let pages: number[] = [];
  const totalPages = this.getTotalPages();
  const currentPage = this.currentPage;
  const maxPages = 5;

  if (totalPages <= maxPages) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);
    pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    
    const hasLeftSpill = startPage > 1;
    const hasRightSpill = totalPages - endPage > 0;
    const spillOffset = maxPages - (endPage - startPage + 1);

    if (hasLeftSpill && !hasRightSpill) {
      const extraPages = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
      pages = [...extraPages, ...pages];
    } else if (!hasLeftSpill && hasRightSpill) {
      const extraPages = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
      pages = [...pages, ...extraPages];
    } else if (hasLeftSpill && hasRightSpill) {
      const leftSpill = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
      const rightSpill = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
      pages = [...leftSpill, ...pages, ...rightSpill];
    }
  }

  return pages;
}

}
