import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HeadComponent } from '../head/head.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FootComponent } from '../foot/foot.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeadComponent,SidebarComponent,FootComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
