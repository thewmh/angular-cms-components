import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PageEditorComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import piasSectionTemplates from './mock/pias-section-templates.constants';
import seSectionTemplates from './mock/se-section-templates.constants';

export default {
  title: 'Admin/Page Editor',
  component: PageEditorComponent,
  parameters: {
    component: PageEditorComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const NewPageExample = () => ({
  component: PageEditorComponent,
  props: {
    document: {
      ID: '',
      Doc: {
        Title: '',
        Url: '',
        Description: '',
        HeaderEmbeds: '',
        Content: ``,
        FooterEmbeds: '',
        Active: false,
        NavigationTitle: '',
      },
    },
    resourceType: 'Suppliers',
    resourceID: '41106',
    editorOptions: {
      ordercloud: {
        get_section_templates_callback: () =>
          Promise.resolve(seSectionTemplates),
      },
      content_css: [
        'https://sestorageprod.azureedge.net/buyerweb/styles.aa93dfa7591525f15e8b.css',
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        // 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});

export const EditPageExample = () => ({
  component: PageEditorComponent,
  props: {
    document: {
      ID: '4ad8bd98-3fe8-4caa-9402-0c8f2769d156',
      $schema:
        'https://marketplace-middleware-test.azurewebsites.net/schema-specs/5539d88d-2787-476c-9b61-cdadd181f12d',
      Doc: {
        Title: 'Locations',
        Url: 'locations',
        SiteUrl: 'https://www.my-awesome-website.com',
        Description: '',
        MetaImageUrl: '',
        HeaderEmbeds: 'console.log(\'logged from header\');',
        Content:
          '<h1>&nbsp;</h1>\n<h1><span style="color: #f1c40f;">LOCATIONS</span></h1>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-08-12" data-oc-end-date="2020-08-13">\n<div class="container">\n<div class="row align-items-center">\n<div class="col-xs-12 col-sm-12 col-md-6">\n<h4>Show row on: 08/12 to 08/13</h4>\n<p>Cras consequat faucibus purus, nec viverra elit molestie dictum. Nunc at tempor purus.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-secondary" href="#">Read More</a></div>\n<div class="col-xs-12 col-sm-12 col-md-6">\n<figure style="max-width: 100%;"><img style="max-width: 100%;" src="https://via.placeholder.com/600x250.png" /></figure>\n</div>\n</div>\n</div>\n</div>\n<p>&nbsp;</p>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-07-27" data-oc-end-date="2020-08-07">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1>Show on: 07/27 to 08/07&nbsp;</h1>\n<p>Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>\n</div>\n</div>',
        FooterEmbeds: 'console.log(\'logged from footer\');',
        Active: true,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
        LastUpdatedBy: 'Robert Watt',
        DateLastUpdated: '2020-07-30T21:48:54.957Z',
      },
    },
    resourceType: 'Suppliers',
    resourceID: '41106',
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});

export const WithImages = () => ({
  component: PageEditorComponent,
  props: {
    document: {
      ID: '4ad8bd98-3fe8-4caa-9402-0c8f2769d156',
      $schema:
        'https://marketplace-middleware-test.azurewebsites.net/schema-specs/5539d88d-2787-476c-9b61-cdadd181f12d',
      Doc: {
        Title: 'Locations',
        Url: 'locations',
        SiteUrl: 'https://www.my-awesome-website.com',
        Description: '',
        MetaImageUrl: '',
        HeaderEmbeds: 'console.log(\'logged from header\');',
        Content:
        "<p><img src=\"https://marktplacetest.blob.core.windows.net/assets-02aef4ce-2582-4417-bba4-41caec231527/de8fd7b4-7fa6-4070-9b8d-723bd5116944\" alt=\"products_greenfield.png\" width=\"1268\" height=\"746\" /></p>",
        FooterEmbeds: 'console.log(\'logged from footer\');',
        Active: true,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
        LastUpdatedBy: 'Robert Watt',
        DateLastUpdated: '2020-07-30T21:48:54.957Z',
      },
    },
    resourceType: 'Suppliers',
    resourceID: '41106',
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://piasstoragetest.azureedge.net/buyerweb/styles.9583bf217aedd7b22e76.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});

export const DeletePageExample = () => ({
  component: PageEditorComponent,
  props: {
    document: {
      ID: '4ad8bd98-3fe8-4caa-9402-0c8f2769d156',
      $schema:
        'https://marketplace-middleware-test.azurewebsites.net/schema-specs/5539d88d-2787-476c-9b61-cdadd181f12d',
      Doc: {
        Title: 'Locations',
        Url: 'locations',
        SiteUrl: 'https://www.my-awesome-website.com',
        Description: '',
        MetaImageUrl: '',
        HeaderEmbeds: 'console.log(\'logged from header\');',
        Content:
          '<h1>&nbsp;</h1>\n<h1><span style="color: #f1c40f;">LOCATIONS</span></h1>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-08-12" data-oc-end-date="2020-08-13">\n<div class="container">\n<div class="row align-items-center">\n<div class="col-xs-12 col-sm-12 col-md-6">\n<h4>Show row on: 08/12 to 08/13</h4>\n<p>Cras consequat faucibus purus, nec viverra elit molestie dictum. Nunc at tempor purus.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-secondary" href="#">Read More</a></div>\n<div class="col-xs-12 col-sm-12 col-md-6">\n<figure style="max-width: 100%;"><img style="max-width: 100%;" src="https://via.placeholder.com/600x250.png" /></figure>\n</div>\n</div>\n</div>\n</div>\n<p>&nbsp;</p>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-07-27" data-oc-end-date="2020-08-07">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1>Show on: 07/27 to 08/07&nbsp;</h1>\n<p>Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>\n</div>\n</div>',
        FooterEmbeds: 'console.log(\'logged from footer\');',
        Active: false,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
        LastUpdatedBy: 'Crhistian Ramirez',
        DateLastUpdated: '2020-07-29T02:28:01.114Z',
      },
    },
    resourceType: 'Suppliers',
    resourceID: '41106',
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});

export const NoInputs = () => ({
  component: PageEditorComponent,
  props: {
    renderSiteUrl: 'https://marketplace-buyer-ui-test.azurewebsites.net/',
    resourceType: 'ApiClients',
    resourceID: '41106',
    document: {
      ID: 'PjcKdK2dKECNcX8ond9g2A',
      Doc: {
        Title: 'Aug 14, 10:47am',
        Url: 'aug-14-10-47am',
        Description: '',
        MetaImageUrl: '',
        DateCreated: '2020-08-14T15:48:04.04Z',
        Author: 'DJ Steinmetz',
        DateLastUpdated: '2020-08-14T15:48:04.04Z',
        LastUpdatedBy: 'DJ Steinmetz',
        HeaderEmbeds: '',
        Content: '',
        FooterEmbeds: '',
        Active: false,
        NavigationTitle: '',
      },
      SchemaSpecUrl:
        'https://marketplace-middleware-test.azurewebsites.net/schema-specs/55c72ad7-e65c-4957-b545-0ba187188af8',
      History: {
        DateCreated: '2020-08-14T15:48:04.0239642+00:00',
        CreatedByUserID: 'v0jyyQfRxkmE5ZKS1qAegQ',
        DateUpdated: '2020-08-14T15:48:04.0239732+00:00',
        UpdatedByUserID: 'v0jyyQfRxkmE5ZKS1qAegQ',
      },
    },
  },
});

export const WithVideo = () => ({
  component: PageEditorComponent,
  props: {
    renderSiteUrl: 'https://marketplace-buyer-ui-test.azurewebsites.net/',
    resourceType: 'ApiClients',
    resourceID: '41106',
    document: {
      "ID":"0-7Pm63ckkKemcD1JrKx5Q",
      "Doc":{
         "Content":"<p>Once Upon A Child&reg; buys and sells gently used kids' clothing, shoes, toys, and baby gear. We pay you cash on the spot and provide a convenient way to recycle the items your children have outgrown, giving those items a second life. Every day you&rsquo;ll find an ever-changing selection of top name brands at up to 70% off regular retail prices. Get paid and save for being eco-friendly!</p>\n<p><img src=\"/users/ouac-20992/images/BuyProcess.png\" alt=\"\" width=\"681\" height=\"118\" /><img src=\"/users/ouac-20992/images/BuyProcess.png\" alt=\"\" width=\"681\" height=\"118\" /><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://cms-ordercloud.azureedge.net/assets-98c4f50e-1a2b-48ac-b1f3-78e77596187c/2852d57c-93bc-468a-82ed-01d92eb44789\" alt=\"Screen Shot 2020-12-06 at 8.37.28 PM.png\" width=\"700\" height=\"128\" /></p>\n<p style=\"text-align: center;\"><iframe title=\"How To Sell To Us\" src=\"https://www.youtube.com/embed/videoseries?list=PLDil4djtOFJxiSjdCC6ycYOnnLAL4PB6o\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe></p>\n<p>&nbsp;</p>\n<div data-oc-widget=\"oc-section\">\n<div id=\"rewards_template\" class=\"card__translucent p-5 m-3 m-sm-0\"><img src=\"https://cms-ordercloud.azureedge.net/assets-e9570aef-d953-4841-a57c-f8cf2ec2e451/374000d8-0ea5-4256-9aa9-af89c26312bd-m\" alt=\"fivestars.png\" width=\"100\" height=\"20\" />\n<h2 class=\"text-uppercase short-underline short-underline--double\">Get Rewarded</h2>\n<p>Earn points every time you shop for or sell gently used kid&rsquo;s items when you sign up for our rewards program. By signing up you&rsquo;ll get access to exclusive discounts, special promotions, store events, and more.</p>\n<div class=\"mt-2\"><a class=\"btn btn-sm btn-outline-primary mb-2\" href=\"[[REWARDS_URL]]\"> Sign up online </a>\n<p>OR BY TEXTING - [[REWARDS_CODE]] to <strong>578-277</strong></p>\n<small class=\"text-muted\">Standard message and data rates may apply. Text STOP to cancel or HELP for help. Go to fivestars.com/terms for terms and privacy.</small></div>\n</div>\n</div>\n<p>&nbsp;</p>",
         "FooterEmbeds":"",
         "HeaderEmbed":"",
         "NavigationTitle":"",
         "Title":"Home",
         "MetaTitle":"Buy & Sell Kids' Clothing, Shoes, Toys, Furniture, and Baby Gear | Once Upon A Child Nanaimo",
         "Url":"",
         "Description":"Once Upon A Child buys and sells gently used kids' clothing, shoes, toys, books, furniture, and baby gear, so you can recycle your children's nearly new items and get paid on the spot. Shop at Once Upon A Child to save up to 70% off regular retail prices.",
         "Active":true,
         "DateCreated":"2020-11-25T22:35:02.835Z",
         "DateLastUpdated":"2020-12-07T04:38:58.794Z",
         "Author":"Admin User",
         "LastUpdatedBy":"Kyla Christy"
      },
      "SchemaSpecUrl":"https://marketplace-middleware.azurewebsites.net/schema-specs/6bb85681-173b-4d2e-93aa-7a9ad62fff33",
      "History":{
         "DateCreated":"2020-11-25T22:35:48.6301283+00:00",
         "CreatedByUserID":"asnyder",
         "DateUpdated":"2020-12-07T04:38:59.2728131+00:00",
         "UpdatedByUserID":"Pwfh_P-nbkKAE8Txe6qO7A"
      }
   },
  },
});

