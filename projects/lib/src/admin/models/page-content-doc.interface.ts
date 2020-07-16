import { ContentDoc } from './content-doc.interface';

export interface PageContentDoc extends ContentDoc {
  Url: string;
  SiteUrl: string;
  Title: string;
  Description: string;
  MetaImageUrl: string;
  DateLastUpdated: string;
  Active: boolean;
  Content: string;
  HeaderEmbeds?: string;
  FooterEmbeds?: string;
  NavigationTitle?: string;
}
