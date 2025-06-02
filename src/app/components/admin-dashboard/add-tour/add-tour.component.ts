import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TourService } from '../../../services/tour.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-tour',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-tour.component.html',
  styleUrl: './add-tour.component.css'
})
export class AddTourComponent {
  tourForm!: FormGroup;
  selectedImage?: null | File;

  constructor(private fb: FormBuilder, private tourService: TourService, private router: Router) { }

  ngOnInit() {
    this.tourForm = this.fb.group({
      location: ['', Validators.required],
      departureDay: ['', Validators.required],
      totalDays: ['', [Validators.required, Validators.min(1)]],
      servicesProvided: ['', Validators.required],
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      dinner: ['', Validators.required],
      charges: this.fb.group({
        perHead: ['', [Validators.required, Validators.min(0)]],
        perCouple: ['', [Validators.required, Validators.min(0)]]
      }),
      placesToVisit: this.fb.array([this.fb.control('')]),
      description: ['', Validators.required]
    });
  }

  get placesToVisit(): FormArray {
    return this.tourForm.get('placesToVisit') as FormArray;
  }

  addPlace() {
    this.placesToVisit.push(this.fb.control(''));
  }

  removePlace(index: number) {
    if (this.placesToVisit.length > 1) {
      this.placesToVisit.removeAt(index);
    }
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  submitTour() {
    if (this.tourForm.invalid) return;

    const formData = new FormData();

    formData.append('location', this.tourForm.get('location')?.value);
    formData.append('departureDay', this.tourForm.get('departureDay')?.value);
    formData.append('totalDays', this.tourForm.get('totalDays')?.value);
    formData.append('servicesProvided', this.tourForm.get('servicesProvided')?.value);
    formData.append('description', this.tourForm.get('description')?.value);

    // Convert nested objects and arrays to JSON strings
    formData.append('charges', JSON.stringify(this.tourForm.get('charges')?.value));

    // MealProvided is separate controls, combine manually
    const mealProvided = {
      breakfast: this.tourForm.get('breakfast')?.value,
      lunch: this.tourForm.get('lunch')?.value,
      dinner: this.tourForm.get('dinner')?.value,
    };
    formData.append('mealProvided', JSON.stringify(mealProvided));

    formData.append('placesToVisit', JSON.stringify(this.placesToVisit.value));

    if (this.selectedImage) {
      formData.append('img', this.selectedImage);
    }

    this.tourService.createTour(formData).subscribe({
      next: res => {
        console.log('Tour created:', res);
        this.tourForm.reset();
        this.placesToVisit.clear();
        this.selectedImage = null;
        this.router.navigateByUrl('admin/dashboard')
      },
      error: err => console.error('Error:', err)
    });
  }

}
