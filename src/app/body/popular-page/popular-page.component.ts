import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { WpServiceService } from 'src/app/services/wp-service/wp-service.service';

@Component({
  selector: 'app-popular-page',
  templateUrl: './popular-page.component.html',
  styleUrls: ['./popular-page.component.css']
})
export class PopularPageComponent implements OnInit {

  slug: String;
  post:any;
  allPosts: any;
  content:any;
  postReady: boolean;
  constructor(private route: ActivatedRoute, public functions: AngularFireFunctions, public wpService: WpServiceService, public router:Router) { }

  ngOnInit(): void {
    this.postReady = false;
  this.slug = this.route.snapshot.params['slug'];
  // this.getPost();
  this.getAllPosts();
  }

  getPost(){
    this.wpService.getPost(this.slug);
    this.wpService.postObservable.subscribe(data=>{
    this.post = data;
    this.post = this.post[0];
    this.postReady = true;
    
    })
    
  }

  getAllPosts(){
    this.wpService.getAllPosts();
    this.wpService.allPostObservable.subscribe(data=>{
      this.allPosts = data;
      this.allPosts=this.allPosts.filter((obj:any)=>{
        return (obj.categories.includes(52)&&obj.id!=235153)
      })
    })
  }


}
