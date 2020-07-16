# OrderCloud Angular CMS components

A component library that can be used to quickly integrate with the OrderCloud CMS API

## Requirements

* Angular version 10 - may work with older versions but has not been tested

## Installation
1. Install the component library
     ```
     npm i @ordercloud/angular-cms-components
     ```
2. Install the required peer dependencies
    ```
    npm i bootstrap @ng-bootstrap/bootstrap tinymce @tinymce/tinymce/angular axios case jquery marketplace-javascript-sdk ngx-spinner
    ```
3. In your root app module import either `CmsAdminModule` for access to admin/buyer components or `CmsBuyerModule` for just the buyer components. Here we're registering `CmsAdminModule` for access to all components
    ```typescript
    import { CmsAdminModule, Configuration } from '@ordercloud/angular-sdk';

    @NgModule({
    declarations: [...],
    imports: [
        CmsAdminModule.forRoot(),
        ...
    ],
    providers: [...]
    bootstrap: [AppComponent]
    })
    export class AppModule {}
    ```

Now you can use any of the components in your application
