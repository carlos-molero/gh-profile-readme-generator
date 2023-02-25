/**
 * MIT License
 * Copyright (c) 2023 Carlos Molero Mata
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Component } from '@angular/core';
import { HighlightJS } from 'ngx-highlightjs';
import Markdown from 'src/providers/Markdown.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mdContent: string = '';
  htmlContent: string = '';
  editorToggled: boolean = false;
  constructor(private readonly markdown: Markdown, private hljs: HighlightJS) {}

  updateHtmlContent(input: string): void {
    this.htmlContent = this.markdown.toHtml(input);
    setTimeout(() => {
      this.hljs.highlightAll().subscribe(() => {});
    }, 1);
  }

  addBlockElement(content: string | null): void {
    if (content) {
      let md: string = this.markdown.toMd(this.htmlContent);
      md += content;
      this.mdContent = md;
      this.updateHtmlContent(md);
    }
  }

  toggleEditor(): void {
    this.editorToggled = !this.editorToggled;
  }
}
