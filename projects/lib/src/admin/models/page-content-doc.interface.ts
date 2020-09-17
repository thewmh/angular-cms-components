import { Asset, JDocument } from '@ordercloud/headstart-sdk';

export interface PageContentDoc {
  Url: string;
  SiteUrl: string;
  Title: string;
  Description: string;
  MetaImage?: Asset;
  DateCreated: string;
  Author: string;
  DateLastUpdated: string;
  LastUpdatedBy: string;
  Active: boolean;
  Content: string;
  NoRobotsIndexing?: boolean;
  HeaderEmbeds?: string;
  FooterEmbeds?: string;
  NavigationTitle?: string;
}
