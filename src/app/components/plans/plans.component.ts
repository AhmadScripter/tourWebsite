import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plans',
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
  plans = [
    {
      title: 'Kashmir',
      description: 'Explore the majestic mountains and valleys of the North.',
      duration: '3 Days / 2 Nights',
      price: 'PKR 13,800',
      image: '/assets/plans/p1.jpeg'
    },
    {
      title: 'Hunza',
      description: 'Relax on serene beaches with crystal clear waters.',
      duration: '5 Days / 4 Nights',
      price: 'PKR 21,800',
      image: '/assets/plans/p2.jpeg'
    },
    {
      title: 'Kalam',
      description: 'Discover the rich heritage and history of ancient cities.',
      duration: '3 Days / 2 Nights',
      price: 'PKR 13,800',
      image: '/assets/plans/p3.jpeg'
    },
    {
      title: 'Fairy',
      description: 'Discover the rich heritage and history of ancient cities.',
      duration: '5 Days / 4 Nights',
      price: 'PKR 21,800',
      image: '/assets/plans/p4.jpeg'
    },
  ];

}
