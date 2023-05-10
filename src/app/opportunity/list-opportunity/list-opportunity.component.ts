import { Component, OnInit } from '@angular/core';
import { Opportunity } from '../../model/opportunity';
import { OpportunityServiceService } from '../../services/opportunity-service.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

declare var $:any;

@Component({
  selector: 'app-list-opportunity',
  templateUrl: './list-opportunity.component.html',
  styleUrls: ['./list-opportunity.component.scss']
})
export class ListOpportunityComponent implements OnInit {

  list!:Opportunity[];
  searchTerm: string;
  searchedOpportunities: Opportunity[];
  qrCodeImage: string;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  
  constructor(private opportunityService:OpportunityServiceService,private router: Router) { }

  ngOnInit(): void {
    // Afficher la liste des opportunites
    this.opportunityService.listOpportunities().subscribe(
      (data) => {
        this.list = data;
        this.searchedOpportunities = data; // initialisation de searchedOpportunities
        
        const currentDate = new Date().toISOString().slice(0, 10); // Obtenir la date actuelle au format "YYYY-MM-DD"       
        // Parcourir chaque opportunité et comparer la date de fin avec la date actuelle
        for (const opportunity of this.list) {
          const endDate = new Date(opportunity.endDate);
          if (currentDate <= opportunity.endDate) { // Utiliser "<=" plutôt que "<" pour inclure le jour de fin
            opportunity.availability = "Available";
          } else {
            opportunity.availability = "Not available";
          }
        }
      },

      (error) => {
        console.log(error);
      }
    );
  }
  
/*Recherche dynamique*/
  onSearch() {
    if (this.searchTerm) { // si le terme de recherche est non nul
      this.searchedOpportunities = this.list.filter(opp =>
        opp.nameOpportunity.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.speciality.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.typeOpportunity.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.typeSelection.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        opp.startDate.toString().includes(this.searchTerm.toLowerCase()) ||
        opp.endDate.toString().includes(this.searchTerm.toLowerCase()) ||
        opp.availability.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else { // sinon, afficher toutes les opportunités
      this.searchedOpportunities = this.list;
    }
  }
  

/*Redirection add*/
  onAddOpportunity() {
    this.router.navigateByUrl('/add_opportunity');
  }


  deleteOpportunity(idOpportunity: number) {
    this.opportunityService.deleteOpportunity(idOpportunity).subscribe(
      resp => {
        console.log(resp);
 
        // Recharger la page
        location.reload();
        // Afficher une notification de réussite
        this.showNotification('top', 'center', 'danger', 'Opportunity deleted successfully !');
      },
      err => {
        console.log(err);
      }
    );
  }

/*Generer qrCode */
generateQRCode(opportunity: Opportunity): void {
  this.opportunityService.generateQRCode(opportunity.idOpportunity).subscribe(
    data => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([data]));
      reader.onloadend = () => {
        opportunity.qrCodeImage = reader.result as string;
      };
    },
    error => {
      console.log(error);
    }
  );
}

/*Generer PDF */
generatePdf(idOpportunity: number) {

  //Récuperer l'id de l'opportunité
  const opportunity = this.list.find(o => o.idOpportunity === idOpportunity);

  // Utiliser jsPDF pour générer le PDF
  const doc = new jsPDF();
  const fond = new Image();
  fond.src = '/assets/img/fond-pdf.png';
  doc.addImage(fond, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
  doc.text('A new opportunity called ' + '"' + opportunity.nameOpportunity + '"' + ' is now available.', 30, 75);
  doc.text('We believe this opportunity is a great fit for you,', 40, 90);
  doc.text('and we encourage you to take advantage of it.', 41, 105);
  doc.text('For further details, please scan the QR code below.', 37, 120);
  doc.setTextColor(255, 0, 0);
  doc.text('Deadline : ' + opportunity.endDate, 76, 138);

  //Insérer l'image du QR Code dans le PDF
  const qrCodeUrl = 'http://localhost:8098/MobiliteInternationale/generateQRCodeForOpportunity/' + idOpportunity; // remplacer par l'URL de votre API QR Code
  doc.addImage(qrCodeUrl, 'PNG', 75, 145, 60, 60);

  // Enregistrer le fichier PDF
  doc.save('opportunity-' + idOpportunity + '.pdf');
}



updateCandidacyStatus(idOpportunity: number) {
  this.opportunityService.updateCandidacyStatusByOpportunity(idOpportunity)
    .subscribe(() => {
      console.log('Candidacy status updated successfully.');
    }, error => {
      console.error('Error occurred while updating candidacy status:', error);
    });
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
