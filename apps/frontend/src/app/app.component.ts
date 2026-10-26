import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasBackgroundComponent } from '@shared/ui/canvas-background.component';

@Component({
  selector: 'app-root',
  imports: [CanvasBackgroundComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
