import { Document } from '@ordercloud/headstart-sdk';

export interface PageContentDoc extends Document {
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
