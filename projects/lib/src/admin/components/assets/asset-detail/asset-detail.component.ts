import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Asset, HeadStartSDK } from '@ordercloud/headstart-sdk';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  PatternValidator,
} from '@angular/forms';

@Component({
  selector: 'cms-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss'],
})
export class AssetDetailComponent implements OnInit, OnChanges {
  @Input() asset: Asset;
  @Input() tagOptions: string[] = [];
  @Output() saveClick = new EventEmitter();
  @Output() assetDeleted = new EventEmitter();
  @Output() closeClick = new EventEmitter();

  @ViewChild('assetImageView') assetImageView: ElementRef;
  @ViewChild('confirmModalTemplate') confirmTemplate: ElementRef;
  confirmDeleteModal: NgbModalRef;
  assetForm: any;
  loaded = false;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (changes.asset && !changes.asset.firstChange) {
      this.loaded = false;
      this.initializeForm();
      this.assetImageView.nativeElement.scrollTop = 0;
    }
  }

  initializeForm() {
    this.assetForm = Object.assign({}, this.asset);
  }

  handleTagToggle(tag: string) {
    if (!this.assetForm.Tags) {
      this.assetForm.Tags = [tag];
    } else {
      const selectedIndex = this.assetForm.Tags.findIndex((t) => t === tag);
      if (selectedIndex < 0) {
        this.assetForm.Tags.push(tag);
      } else {
        this.assetForm.Tags.splice(selectedIndex, 1);
      }
    }
  }

  confirmDelete() {
    this.confirmDeleteModal = this.modalService.open(this.confirmTemplate);
  }

  get hasChanges() {
    return JSON.stringify(this.asset) !== JSON.stringify(this.assetForm);
  }

  handleDeleteAsset() {
    HeadStartSDK.Assets.Delete(this.asset.ID).then(() => {
      this.assetDeleted.emit(this.asset);
      this.confirmDeleteModal.close();
    });
  }
}
