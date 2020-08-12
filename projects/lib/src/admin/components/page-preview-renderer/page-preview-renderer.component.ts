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
  @Input() remoteCss: string; // optional

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
    const documentSource = `<?xml version="1.0" encoding="UTF-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      ${this.remoteCss ? `<style>@import url('${this.remoteCss}');</style>` : ''}
      </head>
      <body style="padding-top:0 !important;">${this.html}</body>
      </html>`;
    const blob = new Blob([documentSource], { type: 'application/xhtml+xml' });
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
