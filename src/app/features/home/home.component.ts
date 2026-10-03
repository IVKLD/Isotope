import { Component } from '@angular/core';
import { HeroComponent } from '@features/hero/hero.component';
import { BentoGridComponent } from '@features/bento-grid/bento-grid.component';
import { SkillsMatrixComponent } from '@features/skills-matrix/skills-matrix.component';
import { AngularChoiceComponent } from '@features/angular-choice/angular-choice.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, BentoGridComponent, SkillsMatrixComponent, AngularChoiceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
