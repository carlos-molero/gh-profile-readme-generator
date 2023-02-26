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

import { Component, OnInit } from '@angular/core';
import Toast from 'bootstrap/js/dist/toast';
import { HighlightJS } from 'ngx-highlightjs';
import Markdown from 'src/providers/Markdown.provider';
import { languagesFrameworksAndLibrariesData } from './data';
import copy from 'copy-to-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mdContent: string = '';
  htmlContent: string = '';
  toast: Toast | undefined;
  toastMessage: string = '';
  toastType: string = '';
  editorToggled: boolean = false;
  currentLanguagesFrameworksAndLibrariesSectionMd = '';
  languagesFrameworksAndLibrariesDialogData =
    languagesFrameworksAndLibrariesData.sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  constructor(private readonly markdown: Markdown, private hljs: HighlightJS) {}

  ngOnInit(): void {
    Toast.Default.autohide = true;
    this.toast = new Toast(document.querySelector('#toast')! as HTMLElement);
  }

  onCopyBtnClick(): void {
    this.toastMessage = 'Copied to the clipboard!';
    this.toastType = 'success';
    copy(this.htmlContent);
    this.toast?.show();
  }

  onMdInput(content: string): void {
    this.updateHtmlContent(content);
  }

  updateHtmlContent(input: string): void {
    this.htmlContent = this.markdown.toHtml(input);
    setTimeout(() => {
      this.hljs.highlightAll().subscribe(() => {});
    }, 1);
  }

  addBlockElement(element: string | null): void {
    if (element) {
      let md: string = this.markdown.toMd(this.htmlContent);
      md += element;
      this.mdContent = md;
      this.updateHtmlContent(this.mdContent);
    }
  }

  addImagesElement({ title, urls }: { title: string; urls: string[] }): void {
    let element = `<!-- ${title} -->`;
    element += `\n\n## ${title}\n\n`;
    element += `${urls.map((url) => `![alt](<${url}> =50pxx50px)`).join('')}`;
    element += `<!-- ${title} -->`;

    if (this.currentLanguagesFrameworksAndLibrariesSectionMd !== '') {
      this.mdContent = this.mdContent.replace(
        this.currentLanguagesFrameworksAndLibrariesSectionMd,
        element
      );
    } else {
      this.mdContent += element;
    }
    this.currentLanguagesFrameworksAndLibrariesSectionMd = element;
    this.updateHtmlContent(this.mdContent);
  }

  toggleEditor(): void {
    this.editorToggled = !this.editorToggled;
  }
}
