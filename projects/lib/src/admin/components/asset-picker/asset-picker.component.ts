import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketplaceSDK } from 'marketplace-javascript-sdk';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, takeWhile, filter } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'cms-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.scss']
})
export class CmsAssetPickerComponent implements OnInit, OnDestroy {
  loading = true;
  alive = true;
  previousSearchTerm = ''
  searchForm: FormGroup
  list: any;
  parameters = {
    page: 1,
    pageSize: 10,
    filters: {}
  }

  constructor(
    public modal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private spinner: NgxSpinnerService
    ) { }

  

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({search: ''})
    this.onFormChanges();
    this.changePage(1);
  }

  onFormChanges() {
    this.searchForm.controls['search'].valueChanges
      .pipe(
        filter((searchTerm) =>  searchTerm !== this.previousSearchTerm),
        debounceTime(500),
        takeWhile(() => this.alive)
      )
      .subscribe((searchTerm) => {
        this.previousSearchTerm = searchTerm;
        this.search();
      });
  }

  search() {
    // undefined if empty string so sdk ignores parameter completely
    const searchTerm = this.searchForm.controls.search.value || undefined;
    this.parameters.filters['Title'] = searchTerm;
    this.changePage(1);
  }

  changePage(page: number) {
    this.loading = true;
    this.spinner.show();
    this.parameters.page = page;
    return MarketplaceSDK.Assets.List(this.parameters)
      .then(assetList => {
        this.list = assetList;
      })
      .catch(e => {
        if(e.response.status === 401) {
          alert('Access forbidden');
        } else {
          alert(e.message);
        }
      })
      .finally(() => {
        this.loading = false;
        this.spinner.hide()
      })
  }
  
  ngOnDestroy() {
    this.alive = false;
  }
}
