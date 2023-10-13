import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './body/about/about.component';
import { ContactComponent } from './body/contact/contact.component';
import { GalleryComponent } from './body/gallery/gallery.component';
import { HomeComponent } from './body/home/home.component';
import { HowItWorksComponent } from './body/how-it-works/how-it-works.component';
import { LoginPageComponent } from './body/login-page/login-page.component';
import { NewsroomComponent } from './body/newsroom/newsroom.component';
import { PartnersComponent } from './body/partners/partners.component';
import { TermsCondiComponent } from './body/terms-condi/terms-condi.component';
import { TestimonialComponent } from './body/testimonial/testimonial.component';
import { RegistrationComponent } from './body/registration/registration.component';
import { NumberOfRegistrationsComponent } from './body/number-of-registrations/number-of-registrations.component';
import { PaymentComponent } from './body/payment/payment.component';
import { PaymentStatusComponent } from './body/payment-status/payment-status.component'
import { SupportComponent } from './body/support/support.component';
import { SupportDetailsComponent } from './body/support/support-details/support-details.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { RegistrationDetailComponent } from './body/number-of-registrations/registration-detail/registration-detail.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RegistrationDetailsAdminComponent } from './body/dashboard/registration-details-admin/registration-details-admin.component';
import { EditRegistrationComponent } from './body/dashboard/edit-registration/edit-registration.component';
import { SponsorsPartnersComponent } from './body/dashboard/sponsors-partners/sponsors-partners.component';
import { TestimonialsDashboardComponent } from './body/dashboard/testimonials-dashboard/testimonials-dashboard.component';
import { NewsroomDashboardComponent } from './body/dashboard/newsroom-dashboard/newsroom-dashboard.component';
import { GalleryDashboardComponent } from './body/dashboard/gallery-dashboard/gallery-dashboard.component';
import { RegistrationDashboardComponent } from './body/dashboard/registration-dashboard/registration-dashboard.component';
import { UsersDashboardComponent } from './body/dashboard/users-dashboard/users-dashboard.component';
import { EcommerceDashboardComponent } from './body/dashboard/ecommerce-dashboard/ecommerce-dashboard.component';
import { ECommerceComponent } from './body/e-commerce/e-commerce.component';
import { ProductsComponent } from './body/e-commerce/products/products.component';
import { BlogComponent } from './body/blog/blog.component';
import { EcommercePaymentStatusComponent } from './body/ecommerce-payment-status/ecommerce-payment-status.component';
import { BlogHomeComponent } from './body/blog-home/blog-home.component';
import { ParentingComponent } from './body/blog-home/parenting/parenting.component';
import { ParentingPageComponent } from './body/parenting-page/parenting-page.component';
import { ProdigyHistoryComponent } from './body/blog-home/prodigy-history/prodigy-history.component';
import { ProdigyHistoryPageComponent } from './body/prodigy-history-page/prodigy-history-page.component';
import { PopularPageComponent } from './body/popular-page/popular-page.component';
import { AllStoriesPageComponent } from './body/all-stories-page/all-stories-page.component';
import { MyOrdersComponent } from './body/my-orders/my-orders.component';
import { CategoriesComponent } from './body/how-it-works/categories/categories.component';
import { CategoryComponentComponent } from './body/category-component/category-component.component';
import { AmpRedirectComponent } from './body/amp-redirect/amp-redirect.component';
import { TagComponent } from './body/tag/tag.component';
import { PrivacyPolicyComponent } from './body/privacy-policy/privacy-policy.component';
import { FaqComponent } from './body/faq/faq.component';
import { SupportDetailsAdminComponent } from './body/dashboard/support-admin/support-details-admin/support-details-admin.component';
import { GCPA2022Component } from './body/gcpa2022/gcpa2022.component';
import { GCPA2020Component } from './body/gcpa2020/gcpa2020.component';
import { BetaV1Component } from './body/Registration/beta-v1/beta-v1.component';
import { ResetPasswordComponent } from './body/login-page/reset-password/reset-password.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'how-it-works',component:HowItWorksComponent},
  {path:'partners',component:PartnersComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'newsroom',component:NewsroomComponent},
  {path:'terms-conditions',component:TermsCondiComponent},
  {path:'testimonial',component:TestimonialComponent},
  {path:'contact',component:ContactComponent},
  // {path:'LoginPage', component: LoginPageComponent},
  {path:'Registration', component: RegistrationComponent},
  {path:'Registration/BetaV1', component: BetaV1Component},
  {path:'Registration/BetaV1/:accessId', component: RegistrationComponent},
  {path:'MyRegistrations', component: NumberOfRegistrationsComponent},
  {path:'payment/:registrationId', component: PaymentComponent},
  {path:'paymentStatus/:orderId/:paymentId/:signature/:id', component: PaymentStatusComponent},
  {path:'OrderStatus/:orderId/:paymentId/:signature/:id', component: EcommercePaymentStatusComponent},
  {path:'supportPage', component: SupportComponent},
  {path:'supportDetails/:ticketId', component: SupportDetailsComponent,canActivate: [AngularFireAuthGuard]},
  {path:'dashboard', component:DashboardComponent},
  {path:'dashboard/supportAdmin/:ticketId', component:SupportDetailsAdminComponent,canActivate: [AngularFireAuthGuard]},
  {path:'registrationDetail/:uid', component:RegistrationDetailComponent, canActivate: [AngularFireAuthGuard]},
  {path:'registrationDetailAdmin/:uid', component:RegistrationDetailsAdminComponent, canActivate: [AngularFireAuthGuard]},
  {path:'editRegistration/:uid', component:EditRegistrationComponent, canActivate: [AngularFireAuthGuard]},
  {path:'sponsorspartners', component:SponsorsPartnersComponent},
  {path:'testimonialsDashboard', component:TestimonialsDashboardComponent},
  {path:'newsroomDashboard', component:NewsroomDashboardComponent},
  {path:'galleryDashboard', component:GalleryDashboardComponent},
  {path:'registrationDashboard', component:RegistrationDashboardComponent},
  {path:'usersDashboard', component:UsersDashboardComponent},
  {path:'ecommerceDashboard', component:EcommerceDashboardComponent },
  {path:'ecommerce', component:ECommerceComponent },
  {path:'gcpa2022', component:GCPA2022Component},
  {path:'gcpa2020', component:GCPA2020Component},
  {path:'products/:productId/:productName', component:ProductsComponent, canActivate: [AngularFireAuthGuard] },
  {path:'blog', component:BlogHomeComponent},
  {path:'blog/parenting', component:ParentingPageComponent},
  {path:'blog/prodigy-history', component:ProdigyHistoryPageComponent},
  {path:'blog/popular', component:PopularPageComponent},
  {path:'blog/all-stories', component:AllStoriesPageComponent},
  {path:'blog/entertainment', component:CategoryComponentComponent},
  {path:'blog/entertainment/acting', component:CategoryComponentComponent},
  {path:'blog/entertainment/painting', component:CategoryComponentComponent},
  {path:'blog/entertainment/youtuber', component:CategoryComponentComponent},
  {path:'blog/entertainment/singer', component:CategoryComponentComponent},
  {path:'blog/entertainment/dance', component:CategoryComponentComponent},
  {path:'blog/entertainment/music', component:CategoryComponentComponent},
  {path:'blog/education', component:CategoryComponentComponent},
  {path:'blog/education/science', component:CategoryComponentComponent},
  {path:'blog/education/language', component:CategoryComponentComponent},
  {path:'blog/education/innovation', component:CategoryComponentComponent},
  {path:'blog/amazing-facts', component:CategoryComponentComponent},
  {path:'blog/tag/:tag/amp', component:TagComponent},
  {path:'blog/tag/:tag/feed', component:TagComponent},
  {path:'blog/tag/:tag', component:TagComponent},
  {path:'blog/:slug/amp', component:AmpRedirectComponent},
  {path:'blog/:slug/feed', component:AmpRedirectComponent},
  {path:'blog/:slug', component:BlogComponent},
  {path:'myOrders', component:MyOrdersComponent},
  {path:'privacy-policy', component:PrivacyPolicyComponent},
  {path:'faq', component:FaqComponent},
  {
    path: 'auth',
    children: [
      {
        path: 'resetPass',
        component: ResetPasswordComponent,
        data: { title: 'Reset Password' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
