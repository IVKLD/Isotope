import { Component } from '@angular/core';
import { LucideSend, LucideMail } from '@lucide/angular';
import { GithubIconComponent } from '@shared/ui/icons/github-icon.component';
import { LogoIconComponent } from '@shared/ui/icons/logo-icon.component';
import { GhostButtonDirective } from '@shared/ui/button/ghost-button.directive';
import { OutlineButtonDirective } from '@shared/ui/button/outline-button.directive';

@Component({
  selector: 'app-footer',
  imports: [
    LucideSend,
    LucideMail,
    GithubIconComponent,
    LogoIconComponent,
    OutlineButtonDirective,
    GhostButtonDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
