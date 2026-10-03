import { Component } from '@angular/core';
import { LucideSend, LucideMail } from '@lucide/angular';
import { GithubIconComponent, LogoIconComponent } from '@shared/ui/icons';
import { OutlineButtonDirective } from '@shared/ui/button';

@Component({
  selector: 'app-footer',
  imports: [LucideSend, LucideMail, GithubIconComponent, LogoIconComponent, OutlineButtonDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
