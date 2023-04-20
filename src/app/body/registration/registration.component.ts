import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { AddressContactComponent } from './address-contact/address-contact.component';
import { CategoryUploadComponent } from './category-upload/category-upload.component';
import { NgForm } from '@angular/forms';
import { FileData } from 'src/app/Interfaces/FileInterface';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { UpdateRegistrationService } from 'src/app/services/update-registration/update-registration.service';
import { countryToAlpha3 } from "country-to-iso";
import { phone } from 'phone';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  token: string | undefined;

  uid: string;
  name = '';
  dob = '';
  photoUpload: FileData = { FileUrl: '', ApplicantName: '', Date: '', Time: '', Uid: '', File: 'Photo' };
  profileUpload: FileData = { FileUrl: '', ApplicantName: '', Date: '', Time: '', Uid: '', File: 'Profile' };
  userUid = '';
  termsAndCond = false;
  validNumber = false;
  number: any;
  emailupdate = false;
  howHeard: string = ""
  // infoVisible:boolean = false;
  accessId: string = "";
  openForm: boolean = false;


  constructor(public registerService: RegisterServiceService, public router: Router, public authService: AuthServiceService, public popupService: PopupHandlerService, public fileUploadService: FileUploadService, public updateRegistration: UpdateRegistrationService, private route: ActivatedRoute) {
    this.token = undefined;
  }

  ngOnInit(): void {

    this.accessId = this.route.snapshot.params[ 'accessId' ];
    if (this.accessId != undefined && this.accessId == "893812739") {
      this.openForm = true;
    }

    this.authService.afauth.user.subscribe({
      next: (user) => {
        if (!user) {
          this.popupService.loginPopup = true;
        }
        // this.popup.popupEnable()
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('User fetched');
      }
    })
  }

  @ViewChild(PersonalDetailsComponent) personalDetails: any;
  @ViewChild(AddressContactComponent) adressComponent: any;
  @ViewChild(CategoryUploadComponent) categoryComponent: any;


  onSubmit(event: Event) {

    if (!this.authService.user) {
      this.popupService.loginPopup = true;
    }
    else {
      this.photoUpload.FileUrl = this.fileUploadService.photoUrl
      this.photoUpload.ApplicantName = this.personalDetails.firstName + ' ' + this.personalDetails.lastName
      this.photoUpload.Date = this.fileUploadService.photoDate
      this.photoUpload.Time = this.fileUploadService.photoTime

      this.profileUpload.FileUrl = this.fileUploadService.profileUrl
      this.profileUpload.ApplicantName = this.personalDetails.firstName + ' ' + this.personalDetails.lastName
      this.profileUpload.Date = this.fileUploadService.profileDate
      this.profileUpload.Time = this.fileUploadService.profileTime
      this.userUid = this.authService.user.uid
      if (this.categoryComponent.category == 'Others') this.categoryComponent.category = this.categoryComponent.otherCategory;
      this.registerService.register(this.uid, this.personalDetails.prefix, this.personalDetails.dob, this.personalDetails.firstName, this.personalDetails.lastName, this.personalDetails.gaurdFirst, this.personalDetails.gaurdLast, this.adressComponent.address, this.adressComponent.zip, this.number, this.adressComponent.email, this.adressComponent.school, this.adressComponent.country, this.adressComponent.state, this.categoryComponent.category, this.categoryComponent.achievement, this.photoUpload, this.profileUpload, this.categoryComponent.social, this.userUid, this.emailupdate, this.personalDetails.gender, this.personalDetails.relationship, this.howHeard)
    }
  }

  public send(form: NgForm, event: Event): void {
    this.registerService.invalidEmail = false;
    this.registerService.invalidNumber = false;
    this.registerService.fillAll = false;
    const alpha3 = countryToAlpha3(this.adressComponent.country);

    if (alpha3) {
      this.validNumber = phone(this.adressComponent.telephoneCode + this.adressComponent.number, { country: alpha3 }).isValid
      this.number = phone(this.adressComponent.telephoneCode + this.adressComponent.number, { country: alpha3 }).phoneNumber
    }

    if (this.adressComponent.country != "India") {
      this.adressComponent.state = '';
    }

    if ((this.personalDetails.prefix == '' || this.personalDetails.dob == '' || this.personalDetails.firstName == '' || this.personalDetails.lastName == '' || this.personalDetails.gaurdFirst == '' || this.adressComponent.country == '' || this.adressComponent.zip == '' || this.categoryComponent.category == '') && !this.termsAndCond) {
      this.registerService.fillAll = true;
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.adressComponent.email))) {
      this.registerService.invalidEmail = true;
      this.registerService.fillAll = true;
    }
    else if (!this.validNumber) {
      this.registerService.invalidNumber = true;
      this.registerService.fillAll = true;
    }
    else {
      if (form.invalid) {
        for (const control of Object.keys(form.controls)) {
          form.controls[control].markAsTouched();
        }
        return;
      }
      this.onSubmit(event);
      // console.debug(`Token [${this.token}] generated`);
    }
  }

  accepted() {
    this.termsAndCond = !this.termsAndCond;
  }

  emailUpdates() {
    this.emailupdate = !this.emailupdate;
  }

  // showInfo(){
  //   this.infoVisible = true;
  //  }
  //  hideInfo(){
  //   this.infoVisible = false;
  //  }

}
