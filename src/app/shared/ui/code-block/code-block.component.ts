import { Component, computed, input } from '@angular/core';
import { highlightSnippet } from '@shared/ui/syntax-highlighter';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss'
})
export class CodeBlockComponent {
  public readonly code = input.required<string>();
  public readonly language = input<string>('typescript');
  public readonly showLineNumbers = input<boolean>(false);

  protected readonly highlightedCode = computed(() => {
    return highlightSnippet(this.code().trim(), this.language());
  });

  protected readonly lines = computed(() => {
    return this.highlightedCode().split('\n');
  });
}
