import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  tours: any[] = [];

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.fetchTours();
  }

  fetchTours() {
    this.tourService.getTours().subscribe({
      next: (data: any) => this.tours = data,
      error: (err) => console.error(err)
    });
  }

  deleteTour(id: string) {
    if (confirm('Are you sure you want to delete this tour?')) {
      this.tourService.deleteTour(id).subscribe({
        next: () => this.fetchTours(),
        error: (err) => console.error(err)
      });
    }
  }
}
