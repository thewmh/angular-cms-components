import { Asset } from '@ordercloud/cms-sdk'

export interface PageContentDoc {
  Url: string;
  SiteUrl: string;
  Title: string;
  MetaTitle: string;
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
