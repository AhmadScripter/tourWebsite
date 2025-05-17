import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  samplePlans = [
    {
      title: 'Hunza Valley',
      description: 'Snow-capped peaks and unforgettable views.',
      image: '/assets/plans/p2.jpeg'
    },
    {
      title: 'Kashmir',
      description: 'A hidden gem full of green hills and rivers.',
      image: '/assets/plans/p1.jpeg'
    },
    {
      title: 'Kalam',
      description: 'Explore history, food, and architecture.',
      image: '/assets/plans/p3.jpeg'
    }
  ];

  natures = [
    {img: 'assets/nature/n23.jpeg'},
    {img: 'assets/nature/n24.jpeg'},
    {img: 'assets/nature/n3.jpeg'},
    {img: 'assets/nature/n4.jpeg'},
    {img: 'assets/nature/n5.jpeg'},
    {img: 'assets/nature/n6.jpeg'},
    {img: 'assets/nature/n7.jpeg'},
    {img: 'assets/nature/n8.jpeg'},
    {img: 'assets/nature/n9.jpeg'},
    {img: 'assets/nature/n10.jpeg'},
    {img: 'assets/nature/n11.jpeg'},
    {img: 'assets/nature/n12.jpeg'},
    {img: 'assets/nature/n13.jpeg'},
    {img: 'assets/nature/n14.jpeg'},
    {img: 'assets/nature/n15.jpeg'},
    {img: 'assets/nature/n16.jpeg'},
    {img: 'assets/nature/n17.jpeg'},
    {img: 'assets/nature/n18.jpeg'},
    {img: 'assets/nature/n19.jpeg'},
    {img: 'assets/nature/n20.jpeg'},
    {img: 'assets/nature/n21.jpeg'},
    {img: 'assets/nature/n22.jpeg'},
    {img: 'assets/nature/n1.jpeg'},
    {img: 'assets/nature/n2.jpeg'},
    {img: 'assets/nature/n25.jpeg'},
    {img: 'assets/nature/n26.jpeg'},
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 3,
        spaceBetween: 5,
        loop: true,
        centeredSlides: false,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          520: { slidesPerView: 2 },
          950: { slidesPerView: 3 },
        },
      });
    }
  }
}
