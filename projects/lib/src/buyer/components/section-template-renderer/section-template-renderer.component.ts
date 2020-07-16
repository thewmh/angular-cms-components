import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'cms-section-template-renderer',
  templateUrl: './section-template-renderer.component.html',
  styleUrls: ['./section-template-renderer.component.scss']
})
export class CmsSectionTemplateRendererComponent implements OnInit, OnChanges {
  @Input() html: string;
  @Input() selected: boolean;
  @Input() remoteCss: string;
  @ViewChild('iframe', { read: ElementRef }) iframeElement: ElementRef<
    HTMLIFrameElement
  >;
  @Input() previewWidth: number;
  @Input() previewTransformRatio: number;
  iframeSource: SafeUrl;
  height: number;
  rootHeight: number;
  transform: string;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.remoteCss) {
      this.iframeSource = this.initIframeSource();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkPreviewTransformRatio(changes);
    this.checkRemoteCss(changes);
  }

  checkPreviewTransformRatio(changes: SimpleChanges) {
    if (
      (changes.previewTransformRatio &&
        changes.previewTransformRatio.currentValue !==
          changes.previewTransformRatio.previousValue) ||
      (changes.height &&
        changes.height.currentValue !== changes.height.previousValue)
    ) {
      this.transform = `scale(${this.previewTransformRatio})`;
      this.rootHeight = this.previewTransformRatio * (this.height + 4);
    }
  }

  checkRemoteCss(changes: SimpleChanges) {
    if (
      changes.remoteCss &&
      !changes.remoteCss.firstChange &&
      changes.remoteCss.currentValue !== changes.remoteCss.previousValue
    ) {
      this.iframeSource = this.initIframeSource();
    }
  }

  initIframeSource(): SafeUrl {
    const documentSource = `<?xml version="1.0" encoding="UTF-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <style>@import url('${this.remoteCss}');</style>
      </head>
      <body style="padding-top:0 !important;">${this.html}</body>
      </html>`;
    const blob = new Blob([documentSource], { type: 'application/xhtml+xml' });
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(blob)
    );
  }

  onIframeLoaded() {
    if (this.iframeElement) {
      const iframeDoc = this.iframeElement.nativeElement.contentWindow.document;
      this.height = iframeDoc.body.clientHeight;
      this.rootHeight = (this.height + 4) * this.previewTransformRatio;
    }
  }
}
