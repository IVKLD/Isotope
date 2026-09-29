import { Component } from '@angular/core';
import { CanvasBackgroundComponent } from '@components/canvas-background/canvas-background.component';
import { HeaderComponent } from '@components/header/header.component';
import { HeroComponent } from '@components/hero/hero.component';
import { BentoGridComponent } from '@components/bento-grid/bento-grid.component';
import { SkillsMatrixComponent } from '@components/skills-matrix/skills-matrix.component';
import { FooterComponent } from '@components/footer/footer.component';
import { AngularChoiceComponent } from '@components/angular-choice/angular-choice.component';

@Component({
  selector: 'app-root',
  imports: [
    CanvasBackgroundComponent,
    HeaderComponent,
    HeroComponent,
    BentoGridComponent,
    SkillsMatrixComponent,
    AngularChoiceComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
