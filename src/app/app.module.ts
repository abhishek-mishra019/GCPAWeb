import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './body/home/banner/banner.component';
import { TestimonialsComponent } from './body/home/testimonials/testimonials.component';
import { SectionsComponent } from './body/home/testimonials/sections/sections.component';
import { Sections2Component } from './body/home/testimonials/sections2/sections2.component';
import { Sections3Component } from './body/home/testimonials/sections3/sections3.component';
import { LatestNewsComponent } from './body/home/latest-news/latest-news.component';
import { FeaturedInComponent } from './body/home/featured-in/featured-in.component';
import { FeaturedInSliderComponent } from './body/home/featured-in/featured-in-slider/featured-in-slider.component';
import { FooterComponent } from './footer/footer.component';
import { SponsersComponent } from './body/home/sponsers/sponsers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './body/home/home.component';
import { AboutComponent } from './body/about/about.component';
import {BodyComponent} from './body/body.component';
import { IntroComponent } from './body/about/intro/intro.component';
import { Routes,RouterModule } from '@angular/router';
import { WhatIsComponent } from './body/about/what-is/what-is.component';
import { MissionComponent } from './body/about/mission/mission.component';
import { VisionComponent } from './body/about/vision/vision.component';
import { HowItWorksComponent } from './body/how-it-works/how-it-works.component';
import { HowComponent } from './body/how-it-works/how/how.component';
import { CategoriesComponent } from './body/how-it-works/categories/categories.component';
import { PartnersComponent } from './body/partners/partners.component';
import { GalleryComponent } from './body/gallery/gallery.component';
import { NewsroomComponent } from './body/newsroom/newsroom.component';
import { TermsCondiComponent } from './body/terms-condi/terms-condi.component';
import { TestimonialComponent } from './body/testimonial/testimonial.component';
import { ContactComponent } from './body/contact/contact.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { LoginPageComponent } from './body/login-page/login-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { RegistrationComponent } from './body/registration/registration.component';
import { PopupComponent } from './body/registration/popup/popup.component';
import { PersonalDetailsComponent } from './body/registration/personal-details/personal-details.component';
import { AddressContactComponent } from './body/registration/address-contact/address-contact.component';
import { CategoryUploadComponent } from './body/registration/category-upload/category-upload.component';
import { CountryComponent } from './body/registration/address-contact/country/country.component';
import { NumberOfRegistrationsComponent } from './body/number-of-registrations/number-of-registrations.component';
import { ChatSupportComponent } from './body/contact/chat-support/chat-support.component';
import { SupportComponent } from './body/support/support.component';
import { DataTableComponent } from './body/common-tools/data-table/data-table.component';
import { PaymentComponent } from './body/payment/payment.component';
import { PaymentStatusComponent } from './body/payment-status/payment-status.component';
import { Section4Component } from './body/home/testimonials/section4/section4.component';
import { SupportPopupComponent } from './body/support/support-popup/support-popup.component';
import { SupportDetailsComponent } from './body/support/support-details/support-details.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { RawDataTableComponent } from './body/common-tools/raw-data-table/raw-data-table.component';
import { UserDataTableComponent } from './body/common-tools/user-data-table/user-data-table.component';
import { RegistrationDetailComponent } from './body/number-of-registrations/registration-detail/registration-detail.component';
import { RegistrationDataTableComponent } from './body/common-tools/registration-data-table/registration-data-table.component';
import { RegistrationDetailsAdminComponent } from './body/dashboard/registration-details-admin/registration-details-admin.component';
import { EditRegistrationComponent } from './body/dashboard/edit-registration/edit-registration.component';
import { LoaderComponent } from './body/loader/loader.component';
import { SponsorsPartnersComponent } from './body/dashboard/sponsors-partners/sponsors-partners.component';
import { NewPartnerComponent } from './body/dashboard/sponsors-partners/new-partner/new-partner.component';
import { TestimonialsDashboardComponent } from './body/dashboard/testimonials-dashboard/testimonials-dashboard.component';
import { NewTestimonialComponent } from './body/dashboard/testimonials-dashboard/new-testimonial/new-testimonial.component';
import { NewsroomDashboardComponent } from './body/dashboard/newsroom-dashboard/newsroom-dashboard.component';
import { NewNewsComponent } from './body/dashboard/newsroom-dashboard/new-news/new-news.component';
import { UserCardComponent } from './header/user-card/user-card.component';
import { GalleryDashboardComponent } from './body/dashboard/gallery-dashboard/gallery-dashboard.component';
import { NewPicComponent } from './body/dashboard/gallery-dashboard/new-pic/new-pic.component';
import { RegistrationDashboardComponent } from './body/dashboard/registration-dashboard/registration-dashboard.component';
import { UsersDashboardComponent } from './body/dashboard/users-dashboard/users-dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { EcommerceDashboardComponent } from './body/dashboard/ecommerce-dashboard/ecommerce-dashboard.component';
import { NewProductComponent } from './body/dashboard/ecommerce-dashboard/new-product/new-product.component';
import { NewImageComponent } from './body/dashboard/ecommerce-dashboard/new-product/new-image/new-image.component';
import { ProductDataTableComponent } from './body/common-tools/product-data-table/product-data-table.component';
import { ECommerceComponent } from './body/e-commerce/e-commerce.component';
import { ProductsComponent } from './body/e-commerce/products/products.component';
import { BlogComponent } from './body/blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';
import { EcommercePaymentStatusComponent } from './body/ecommerce-payment-status/ecommerce-payment-status.component';
import { BlogHomeComponent } from './body/blog-home/blog-home.component';
import { BlogHeaderComponent } from './body/blog-header/blog-header.component';
import { BlogFooterComponent } from './body/blog-footer/blog-footer.component';
import { GcpaBookComponent } from './body/blog-home/gcpa-book/gcpa-book.component';
import { ParentingComponent } from './body/blog-home/parenting/parenting.component';
import { PodcastComponent } from './body/blog-home/podcast/podcast.component';
import { PopularComponent } from './body/blog-home/popular/popular.component';
import { ProdigyHistoryComponent } from './body/blog-home/prodigy-history/prodigy-history.component';
import { ProdigyTalksComponent } from './body/blog-home/prodigy-talks/prodigy-talks.component';
import { TopCategoriesComponent } from './body/blog-home/top-categories/top-categories.component';
import { VideoBlogsComponent } from './body/blog-home/video-blogs/video-blogs.component';
import { ParentingPageComponent } from './body/parenting-page/parenting-page.component';
import { ProdigyHistoryPageComponent } from './body/prodigy-history-page/prodigy-history-page.component';
import { PopularPageComponent } from './body/popular-page/popular-page.component';
import { AllStoriesPageComponent } from './body/all-stories-page/all-stories-page.component';
import { OrdersComponent } from './body/dashboard/orders/orders.component';
import { OrderDataTableComponent } from './body/common-tools/order-data-table/order-data-table.component';
import { MyOrdersComponent } from './body/my-orders/my-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    TestimonialsComponent,
    SectionsComponent,
    Sections2Component,
    Sections3Component,
    LatestNewsComponent,
    FeaturedInComponent,
    FeaturedInSliderComponent,
    FooterComponent,
    SponsersComponent,
    HomeComponent,
    AboutComponent,
    BodyComponent,
    IntroComponent,
    WhatIsComponent,
    MissionComponent,
    VisionComponent,
    HowItWorksComponent,
    HowComponent,
    CategoriesComponent,
    PartnersComponent,
    GalleryComponent,
    NewsroomComponent,
    TermsCondiComponent,
    TestimonialComponent,
    ContactComponent,
    LoginPageComponent,
    RegistrationComponent,
    PopupComponent,
    PersonalDetailsComponent,
    AddressContactComponent,
    CategoryUploadComponent,
    CountryComponent,
    NumberOfRegistrationsComponent,
    ChatSupportComponent,
    SupportComponent,
    DataTableComponent,
    PaymentComponent,
    PaymentStatusComponent,
    // DataTableComponent,
    
    DataTableComponent,
    Section4Component,
    SupportPopupComponent,
    SupportDetailsComponent,
    DashboardComponent,
    RawDataTableComponent,
    UserDataTableComponent,
    RegistrationDetailComponent,
    RegistrationDataTableComponent,
    RegistrationDetailsAdminComponent,
    EditRegistrationComponent,
    LoaderComponent,
    SponsorsPartnersComponent,
    NewPartnerComponent,
    TestimonialsDashboardComponent,
    NewTestimonialComponent,
    NewsroomDashboardComponent,
    NewNewsComponent,
    UserCardComponent,
    GalleryDashboardComponent,
    NewPicComponent,
    RegistrationDashboardComponent,
    UsersDashboardComponent,
    EcommerceDashboardComponent,
    NewProductComponent,
    NewImageComponent,
    ProductDataTableComponent,
    ECommerceComponent,
    ProductsComponent,
    BlogComponent,  
    EcommercePaymentStatusComponent, BlogHomeComponent, BlogHeaderComponent, BlogFooterComponent, GcpaBookComponent, ParentingComponent, PodcastComponent, PopularComponent, ProdigyHistoryComponent, ProdigyTalksComponent, TopCategoriesComponent, VideoBlogsComponent, ParentingPageComponent, ProdigyHistoryPageComponent, PopularPageComponent, AllStoriesPageComponent, OrdersComponent, OrderDataTableComponent, MyOrdersComponent,
  ],
  imports: [
    MatDialogModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage())
  ],
  providers: [
    CookieService,
    { provide: RECAPTCHA_SETTINGS, useValue: {siteKey: environment.recaptcha.siteKey,} as RecaptchaSettings,},
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
