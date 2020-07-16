import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, takeWhile, filter } from 'rxjs/operators';

@Component({
  selector: 'cms-asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.scss']
})
export class CmsAssetSearchComponent implements OnInit, OnDestroy {
  @Input() assetType;
  alive = true;
  @Input()
  placeholderText?: string;
  @Input()
  searchTerm?: string;
  @Output()
  searched = new EventEmitter<string>();
  form: FormGroup;
  previousSearchTerm = '';

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({ search: this.searchTerm || '' });
    this.onFormChanges();
    this.onQueryParamChanges();
  }

  onFormChanges() {
    this.form.controls['search'].valueChanges
      .pipe(
        filter((searchTerm) => {
          const searchTermChanged = searchTerm !== this.previousSearchTerm;
          return searchTermChanged;
        }),
        debounceTime(500),
        takeWhile(() => this.alive)
      )
      .subscribe((searchTerm) => {
        this.previousSearchTerm = searchTerm;
      });
  }

  search() {
    const searchTerm = this.form.controls.search.value;
    // emit as undefined if empty string so sdk ignores parameter completely
    this.searched.emit(searchTerm || undefined);
  }

  onQueryParamChanges() {
    // clear search bar if products are no longer filtered by search term

  }

  showClear(): boolean {
    return this.form.get('search').value !== '';
  }

  clear(): void {
    this.form.setValue({ search: '' });
    this.search();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
