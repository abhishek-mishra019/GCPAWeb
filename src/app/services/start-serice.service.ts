import { Injectable } from '@angular/core';
import { GalleryDashboardService } from './gallery/gallery-dashboard.service';
import { NewsServiceService } from './newsroom/news-service.service';
import { PartnerServiceService } from './partners/partner-service.service';
import { TestimonialsServiceService } from './testimonials/testimonials-service.service';
import { WpServiceService } from './wp-service/wp-service.service';

@Injectable({
  providedIn: 'root'
})
export class StartSericeService {

  constructor(private galleryService: GalleryDashboardService, 
    private testimonialService: TestimonialsServiceService, 
    private partnerService: PartnerServiceService, 
    private newsService: NewsServiceService,
    private wpService: WpServiceService) { }
    StartApplication(){
      this.galleryService.getphoto(0,20);
      this.testimonialService.getTestimonial();
      this.partnerService.getPartners();
      this.newsService.getnews();
      // this.wpService.getAllPosts();
      this.wpService.getParentingPosts();
      this.wpService.getPopularPosts();
      this.wpService.getHistoryPosts();
    }
}
