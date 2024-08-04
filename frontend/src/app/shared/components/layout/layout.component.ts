import { Component,OnInit, OnDestroy } from '@angular/core';
import SidebarComponent from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.setLayout(false);
  }

  ngOnDestroy() {
    this.layoutService.setLayout(true);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.querySelector('app-sidebar')?.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open', this.isSidebarOpen);
    }
  }
}