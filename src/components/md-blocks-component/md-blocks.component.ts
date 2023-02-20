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

import { Component, EventEmitter, Output } from '@angular/core';

type Block = {
  label: string;
  content: string;
};

type BlockSection = {
  title: string;
  blocks: Block[];
};

@Component({
  selector: 'md-blocks-component',
  templateUrl: './md-blocks.component.html',
  styleUrls: ['./md-blocks.component.less'],
})
export class MdBlockComponent {
  data: BlockSection[] = [
    {
      title: 'Profile readme',
      blocks: [
        {
          label: 'Greeting',
          content: `# Hello, I'm (name) :wave:`,
        },
      ],
    },
    {
      title: 'Basic',
      blocks: [
        {
          label: 'H1 Heading',
          content: '# H1 heading',
        },
        {
          label: 'H2 Heading',
          content: '## H2 heading',
        },
        {
          label: 'H3 Heading',
          content: '### H3 heading',
        },
        {
          label: 'Link',
          content: '[label](href)',
        },
        {
          label: 'Image',
          content: '![alt](src)',
        },
        {
          label: 'Table',
          content: `
| H | H | H | H |
| :---: | :---: | :---: | :---: |
|  |  |  | |
    `,
        },
      ],
    },
  ];

  @Output() onClickEvent = new EventEmitter<string | null>();

  onClick(e: Event): void {
    const target = e.target as HTMLElement;
    const content: string | null = target.getAttribute('data-content');
    this.onClickEvent.emit(content);
  }
}
