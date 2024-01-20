import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Global Child Prodigy Awards';
  blog="/blog"
  constructor(public router: Router){
    this.addGAScript();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // gtag('config', environment.firebase.measurementId, { 'page_path': event.urlAfterRedirects });
      }      
    });
  }
  
  ngOnInit(): void {
  }
  copyprevent(){
    return false;
  }

  /** Add Google Analytics Script Dynamically */
  addGAScript() {
    let gtagScript: HTMLScriptElement = document.createElement('script');
    gtagScript.async = true;
    // gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.firebase.measurementId;
    document.head.prepend(gtagScript);
    /** Disable automatic page view hit to fix duplicate page view count  **/
    // gtag('config', environment.firebase.measurementId, { send_page_view: false });
  }
}
