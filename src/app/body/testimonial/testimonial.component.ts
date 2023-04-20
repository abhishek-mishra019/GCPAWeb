import { Component, OnInit } from '@angular/core';
import { TestimonialsServiceService } from 'src/app/services/testimonials/testimonials-service.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  constructor(public testimonialService:TestimonialsServiceService) { }

  ngOnInit(): void {
  }

}
