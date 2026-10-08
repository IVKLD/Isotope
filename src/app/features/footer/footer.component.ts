import { Component } from '@angular/core';
import { LucideSend, LucideMail } from '@lucide/angular';
import { GithubIconComponent, LogoIconComponent } from '@shared/ui/icons';
import { GhostButtonDirective, OutlineButtonDirective } from '@shared/ui/button';

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
