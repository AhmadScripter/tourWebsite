import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-edit-tour',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-tour.component.html',
  styleUrl: './edit-tour.component.css'
})
export class EditTourComponent implements OnInit{
  tourForm: FormGroup;
  tourId: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tourService: TourService,
    private router: Router
  ) {
    this.tourForm = this.fb.group({
      location: [''],
      description: [''],
      img: [''],
      totalDays: [''],
      departureDay: [''],
      charges: this.fb.group({
        perHead: [''],
        perCouple: ['']
      })
    });
  }

  ngOnInit(): void {
    this.tourService.getTours().subscribe(
      (tours: any[]) => {
        const tour = tours.find(t => t._id === this.tourId);
        if (tour) this.tourForm.patchValue(tour);
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  updateTour() {
    this.tourService.updateTour(this.tourId, this.tourForm.value).subscribe({
      next: () => this.router.navigate(['/admin-dashboard']),
      error: (err) => console.error(err)
    });
  }
}
