import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js'
import { DashboardService } from '../../services/dashboard.service';
Chart.register(...registerables);

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
//#region variables
videojuegosVentas:any;
videojuegosRecaudacion:any;
//Métodos
constructor(private dashboard_service:DashboardService){

}

ngOnInit():void{
  //Obtener data
  this.dashboard_service.getVideojuegosVentas().subscribe(res=>{
    this.videojuegosVentas= res;
    console.log( this.videojuegosVentas);
  });

  this.dashboard_service.getVideojuegosRecaudacion().subscribe(res=>{
    this.videojuegosRecaudacion= res;
  });
}


}
