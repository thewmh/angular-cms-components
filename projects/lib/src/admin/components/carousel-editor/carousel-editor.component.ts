import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CmsAssetPickerComponent } from '../asset-picker/asset-picker.component';
import { CarouselSlide } from '../../models/carousel-slide.interface';
import { v4 as guid } from 'uuid';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-carousel-editor',
  templateUrl: './carousel-editor.component.html',
  styleUrls: ['./carousel-editor.component.scss']
})
export class CmsCarouselEditorComponent implements OnInit {
  slideEditForm: FormGroup;
  carouselSettingsForm: FormGroup;
  selectedSlide: CarouselSlide;
  subs = new Subscription();
  CAROUSEL_SLIDES = 'CAROUSEL_SLIDES'

  slides: CarouselSlide[] = [];
  carouselSettings = {
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 1,
    autoplay: true,
    infinite: true,
    dots: true,
    arrows: true,
    centerMode: false,
    fade: true
  };
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public zone: NgZone
  ) { }

  ngOnInit(): void {
    this.carouselSettingsForm = this.formBuilder.group(this.carouselSettings)
    this.slideEditForm = this.formBuilder.group({ Heading: '', Subheading: '', ActionText: '', ActionUrl: '' })
    this.onSlideEditFormChanges();
    this.onCarouselSettingsFormChanges();
  }

  onSlideEditFormChanges() {
    this.slideEditForm.valueChanges.subscribe(formValues => {
      const index = this.getSlideIndex(this.selectedSlide)
      this.slides[index] = { ...this.selectedSlide, ...formValues }
    })
  }

  onCarouselSettingsFormChanges() {
    this.carouselSettingsForm.valueChanges.subscribe(formValues => {
      this.carouselSettings = formValues;
    })
  }

  addCarousel() {
    const carouselId = `oc-carousel-${guid()}`;
    const html = this.buildCarouselHtml.bind(this)(carouselId)
    this.modal.close(html);
  }

  buildCarouselHtml(carouselId) {
    return `
    <div class="carousel-wrapper" contenteditable="false">
      <div id="${carouselId}">
        ${this.slides.map(slide => {
          return `
            <div class="c-slide-container">
              <img src="${slide.ImageUrl}" title="${slide.ImageTitle}"/>
              ${slide.Heading ? `<h1>${slide.Heading}</h1>` : ``}
              ${slide.Subheading ? `<h2>${slide.Heading}</h2>` : ``}
              ${slide.ActionUrl && slide.ActionText ? `<a href="${slide.ActionUrl}">${slide.ActionText}</a>` : ``}
            </div>
            `
        }).join('')}
      </div>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
    <script>
      $(document).ready(function() {
        $('#${carouselId}').slick({slidesToShow: 3});
      });
    </script>
    </div>
    `
  }

  deleteSlide(slide: CarouselSlide) {
    this.slides = this.slides.filter(s => s.ID !== slide.ID)
    if (this.isSelected(slide)) {
      delete this.selectedSlide;
      if (this.slides.length) {
        this.selectedSlide = this.slides[this.slides.length - 1];
      }
    }
  }

  openAssetPicker() {
    const modalRef = this.modalService.open(CmsAssetPickerComponent, {
      size: 'xl',
      centered: true,
      backdropClass: 'oc-tinymce-modal_backdrop',
      windowClass: 'oc-tinymce-modal_window'
    });
    modalRef.result.then(asset => {
      const slide = {
        ID: guid(),
        ImageTitle: asset.Title,
        ImageUrl: asset.Url
      };
      this.slides.unshift(slide);
      this.selectSlide(slide);
    })
  }

  getSlideIndex(slide: CarouselSlide) {
    return this.slides.map(a => a.ID).indexOf(slide.ID);
  }

  isSelected(slide: CarouselSlide) {
    if (!slide) {
      return false;
    }
    if (!this.selectedSlide) {
      return false;
    }
    return this.selectedSlide.ID === slide.ID;
  }

  selectSlide(slide: CarouselSlide) {
    this.selectedSlide = slide;
    this.slideEditForm.controls['Heading'].setValue(slide.Heading)
    this.slideEditForm.controls['Subheading'].setValue(slide.Subheading)
    this.slideEditForm.controls['ActionText'].setValue(slide.ActionText)
    this.slideEditForm.controls['ActionUrl'].setValue(slide.ActionUrl)
  }

}
