import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  content=[
    {
      hovering:false,
      src:'../../../../assets/icons/acting_theatre.webp',
      head:'Acting & Theatre',
      para:'Skills to create a masterpiece comes with great practice and hard work. Present your masterpiece to the world here!'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/art.webp',
      head:'Art',
      para:'You go high and feel the best when you dance? Present to us your best moves and we’ll fall for you.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/cooking.webp',
      head:'Cooking',
      para:'Good players inspire themselves, great players inspire others. All sports are covered here!.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/dance.webp',
      head:'Dance',
      para:'Rhythms are everything to you? Let the world hear and applaud your talent here!'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/education.webp',
      head:'Education',
      para:'Are you a mastermind? Reveal your brilliance and be a whiz in math! Show the validity of your skill.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/entertainment.webp',
      head:'Entertainment',
      para:'Skills to create a masterpiece comes with great practice and hard work. Bring out the Picasso!'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/entrepreneurship.webp',
      head:'Entrepreneurship',
      para:'Hey junior Einstein! Experimenting and messing around with every object around you has been your interest?'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/fashion.webp',
      head:'Fashion',
      para:'Your ability to learn is worthy and so is your hard work. Your education never goes out in vain. Join hands to teach us the better.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/gaming.webp',
      head:'Gaming',
      para:'Fabricate the tale that you have reserved in your terrific mind and let the world explore you. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/innovation_technology.webp',
      head:'Innovation and Technology',
      para:'Put life to your work with innovation. Bring out the genius ideas that you own forward! Apply today.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/intelligence_memory.webp',
      head:'Intelligence and Memory - IQ',
      para:'We are living technology! Any sufficiently advanced technology creates magic. Come forward, stun us.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/language.webp',
      head:'Language',
      para:'Flatter our minds while you shutter the lens. Let the beauty of life be captured.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/magician.webp',
      head:'Magician',
      para:'The only thing better than singing would be ‘more singing’. This is the chance to mesmerize us with not just your voice but technique.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/mentoring_teaching.webp',
      head:'Mentoring and Teaching',
      para:'Want to work for the society and benefit more people through your initiatives, come we will provide your work the recognition it needs.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/music_singing.webp',
      head:'Music and singing',
      para:'Your ability to learn is worthy and so is your hard work. Your education never goes out in vain. Join hands to teach us the better.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/photography.webp',
      head:'Photography',
      para:'Magic is believing in yourself, If you can do that you can make anything happen. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/public_speaker.webp',
      head:'Public Speaker & Presenter',
      para:'You are only given a little spark of madness. You must not lose it.'
    },
    {
      hovering:false,
      src:'../../../../assets/icons/social_environment.webp',
      head:'Social and Environment',
      para:'Talent has no bounds and so is our categories. Present the best of what you are in any domain that amazes us. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/space_science_astronomy.webp',
      head:'Space Science & Astronomy',
      para:'Talent has no bounds and so is our categories. Present the best of what you are in any domain that amazes us. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/sports.webp',
      head:'Sports',
      para:'Talent has no bounds and so is our categories. Present the best of what you are in any domain that amazes us. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/writing_ poetry.webp',
      head:'Writing & Poetry',
      para:'Talent has no bounds and so is our categories. Present the best of what you are in any domain that amazes us. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/yoga_fitness.webp',
      head:'Yoga & Fitness',
      para:'Talent has no bounds and so is our categories. Present the best of what you are in any domain that amazes us. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/youtube_influencer.webp',
      head:'Social Media Influencer',
      para:'Talent has no bounds and so is our categories. Present the best of what you are in any domain that amazes us. '
    },
    {
      hovering:false,
      src:'../../../../assets/icons/other.webp',
      head:'Other',
      para:'Talent has no bounds and so is our categories. Present the best of what you are in any domain that amazes us. '
    },
    
  ]
  
  constructor() {}

  ngOnInit(): void {
  }

}
