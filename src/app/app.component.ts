import {Component, AfterViewInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'starwars-frontend';
  sidebarOpen = true;

  ngAfterViewInit() {
    this.generateGalaxyBackground();
  }

  generateGalaxyBackground() {
    const starfield = document.getElementById('starfield');
    if (starfield) {
      for (let i = 0; i < 120; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        star.style.animationDelay = (Math.random() * 3) + 's';
        starfield.appendChild(star);
      }
    }
  }
}
