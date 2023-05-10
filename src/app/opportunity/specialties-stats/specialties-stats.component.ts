import { Component, OnInit } from '@angular/core';
import { Opportunity } from 'app/model/opportunity';
import { OpportunityServiceService } from 'app/services/opportunity-service.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-specialties-stats',
  templateUrl: './specialties-stats.component.html',
  styleUrls: ['./specialties-stats.component.scss']
})
export class SpecialtiesStatsComponent implements OnInit {
  
  opportunities: Opportunity[];
  specialtiesStats: any[] = [];
  chart: Chart;

  constructor(private opportunityService: OpportunityServiceService) { }

  ngOnInit(): void {
     // Récupérer les opportunités depuis le service
     this.opportunityService.listOpportunities().subscribe(
      opportunities => {
        this.opportunities = opportunities;

        // Calculer les statistiques des spécialités
        this.specialtiesStats = this.opportunityService.getSpecialtiesStats(this.opportunities);

        // Afficher le graphique
        this.chart = new Chart('specialtiesChart', {
          type: 'bar',
          data: {
            labels: this.specialtiesStats.map(stat => stat.specialty),
            datasets: [{
              label: 'Nombre d\'opportunités',
              data: this.specialtiesStats.map(stat => stat.count),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  }


