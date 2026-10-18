import { Component } from '@angular/core';
import { HeroComponent } from '@features/hero/hero.component';
import { SkillsMatrixComponent } from '@features/skills-matrix/skills-matrix.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, SkillsMatrixComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
