import { JDocument } from '@ordercloud/headstart-sdk';

export interface PageContentDoc {
  Url: string;
  SiteUrl: string;
  Title: string;
  Description: string;
  MetaImageUrl: string;
  DateCreated: string;
  Author: string;
  DateLastUpdated: string;
  LastUpdatedBy: string;
  Active: boolean;
  Content: string;
  HeaderEmbeds?: string;
  FooterEmbeds?: string;
  NavigationTitle?: string;
}
