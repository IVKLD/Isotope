import { Component } from '@angular/core';
import { LucideSend, LucideMail } from '@lucide/angular';
import { GithubIconComponent } from '@components/icons/github-icon.component';

@Component({
  selector: 'app-footer',
  imports: [LucideSend, LucideMail, GithubIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
