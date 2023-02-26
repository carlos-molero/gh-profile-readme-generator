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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type SelectImagesDialogItem = {
  value: string;
  label: string;
  checked: boolean;
};
@Component({
  selector: './select-images-dialog-component',
  templateUrl: './select-images-dialog-component.html',
  styleUrls: ['./select-images-dialog-component.scss'],
})
export class SelectImagesDialogComponent implements OnInit {
  @Input() id: string = '';
  @Input() values: SelectImagesDialogItem[] = [];
  @Input('section-title') sectionTitle: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() confirmButtonTxt: string = 'Add';
  @Input() cancelButtonTxt: string = 'Cancel';

  @Output() onSubmitEvent = new EventEmitter<{
    title: string;
    urls: string[];
  }>();

  form: HTMLFormElement | null = null;
  submitBtn: HTMLButtonElement | null = null;

  ngOnInit(): void {
    this.form = document.querySelector('.form');
    this.submitBtn = document.querySelector("[rel='js-submit-btn']");
    this.submitBtn?.addEventListener('click', () => {
      this.onSubmit();
    });
  }

  onSubmit(): void {
    const formData = new FormData(this.form!);
    const data = Object.fromEntries(formData as any);
    this.onSubmitEvent.emit({
      title: this.sectionTitle,
      urls: Object.keys(data).map((k: string) => data[k]),
    });
  }
}
