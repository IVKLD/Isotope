import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasBackgroundComponent } from '@shared/ui/canvas-background.component';
import { HeaderComponent } from '@features/header/header.component';
import { FooterComponent } from '@features/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [CanvasBackgroundComponent, HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
