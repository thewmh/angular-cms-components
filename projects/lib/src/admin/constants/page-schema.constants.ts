export const PAGE_SCHEMA = {
  ID: 'cms-page-schema',
  RestrictedAssignmentTypes: [],
  Schema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'OrderCloud CMS Page Schema',
    type: 'object',
    properties: {
      Title: {
        type: 'string',
      },
      Url: {
        type: 'string',
      },
      SiteUrl: {
        type: 'string',
      },
      Description: {
        type: 'string',
      },
      MetaImageUrl: {
        type: 'string',
      },
      NoRobotsIndexing: {
        type: 'boolean',
      },
      DateCreated: {
        type: 'string',
      },
      Author: {
        type: 'string',
      },
      DateLastUpdated: {
        type: 'string',
      },
      LastUpdatedBy: {
        type: 'string',
      },
      HeaderEmbeds: {
        type: 'string',
      },
      Content: {
        type: 'string',
      },
      FooterEmbeds: {
        type: 'string',
      },
      Active: {
        type: 'boolean',
      },
      NavigationTitle: {
        type: 'string',
      },
    },
  },
};
