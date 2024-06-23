import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import {SwiperContainer} from 'swiper/element/bundle';
import {SwiperOptions} from 'swiper/types';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent {
 //-----------------------------------Atributos---------------------------------
 swiperPrincipal=signal<SwiperContainer|null>(null);
//------------------------------------Métodos--------------------------------------
 //#region Swipers
 ngOnInit(): void {
 }
 inicializarSwiperPrincipal(){
  const swiperPrincipalElementConstrutor= document.querySelector('.swiper-principal');
  const swiperPrincipalOptions:SwiperOptions={
    pagination:{
      clickable:true
    },
    navigation: {
      enabled:true
    }
  };
  if(swiperPrincipalElementConstrutor){
    Object.assign(swiperPrincipalElementConstrutor, swiperPrincipalOptions);
  }
  this.swiperPrincipal.set(swiperPrincipalElementConstrutor as SwiperContainer);
  this.swiperPrincipal()?.initialize();
}

}
