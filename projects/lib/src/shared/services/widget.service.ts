import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import {
  OC_TINYMCE_WIDGET_ATTRIBUTE, OC_TINYMCE_SECTION_WIDGET_ID, OC_TINYMCE_START_DATE_ATTRIBUTE,
  OC_TINYMCE_END_DATE_ATTRIBUTE
} from '../constants/widget.constants';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor() { }

  public applyDateRules(html: string): string {
    // add wrapper to the html to search on since find looks at children of that element
    const element = $(`<div>${html}</div>`);
    const sections = $(element).find(`[${OC_TINYMCE_WIDGET_ATTRIBUTE}='${OC_TINYMCE_SECTION_WIDGET_ID}']`);

    // determine which sections are invalid
    const now = this.getNowDate();
    const invalidSections = sections.filter((index, section) => {
      const startDate = section.attributes.getNamedItem(OC_TINYMCE_START_DATE_ATTRIBUTE)?.value;
      const endDate = section.attributes.getNamedItem(OC_TINYMCE_END_DATE_ATTRIBUTE)?.value;

      const tooEarly = startDate && startDate > now;
      const tooLate = endDate && endDate < now;

      return tooEarly || tooLate;
    });

    // remove any invalid sections
    invalidSections.each((index, section) => {
      section.remove();
    });

    // return string html
    return element.html();
  }

  // we want this attribute on admin because it lets the user edit any element that has it
  // but we don't want it on the buyer because they shouldn't be able to edit it
  public stripEditableAttributes(html: string): string {
    const element = $(`<div>${html}</div>`);
    element.find('*').removeAttr('contenteditable');
    return element.html();
  }

  private getNowDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }
}
