import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cms-page-preview-renderer',
  templateUrl: './page-preview-renderer.component.html',
  styleUrls: ['./page-preview-renderer.component.scss']
})
export class PagePreviewRendererComponent implements OnInit {
  @Input() html: string;
  @Input() height: number;
  @Input() width: number;
  @Input() remoteCss?: string; // optional

  @ViewChild('iframe', { read: ElementRef }) iframeElement: ElementRef<
    HTMLIFrameElement
  >;
  contentHeight: number;
  iframeSource: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (!this.height || !this.width) {
      throw new Error('Missing required parameter for component cms-page-preview-render. Check that html, height, and width are defined.');
    }
    if (this.remoteCss) {
      this.iframeSource = this.initIframeSource();
    }
  }

  initIframeSource(): SafeUrl {
    const documentSource = `
    <!DOCTYPE html>
    <html>
      <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      ${this.remoteCss ? `<style>@import url('${this.remoteCss}'); img { width: 100% !important; height: auto !important; } </style>` : ''}
      </head>
      <body style="padding-top:0 !important;">${this.html}</body>
      </html>`;
    const blob = new Blob([documentSource], { type: 'text/html' });
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(blob)
    );
  }

  onIframeLoaded(): void {
    if (this.iframeElement) {
      const iframeDoc = this.iframeElement.nativeElement.contentWindow.document;
      this.contentHeight = iframeDoc.body.clientHeight;
    }
  }
}
