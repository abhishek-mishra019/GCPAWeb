import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { WpServiceService } from 'src/app/services/wp-service/wp-service.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  slug: String;
  post: any;
  allPosts: any;
  content: any;
  postReady: boolean;
  constructor(private route: ActivatedRoute, public functions: AngularFireFunctions, public wpService: WpServiceService, public router: Router) { }

  ngOnInit(): void {
    this.postReady = false;
    this.slug = this.route.snapshot.params['slug'];
  }
}
