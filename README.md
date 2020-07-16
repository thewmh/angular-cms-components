# OrderCloud Angular CMS components

A component library that can be used to quickly integrate with the OrderCloud CMS API

## Requirements

* Angular version 10 - may work with older versions but has not been tested

## Installation
1. Install the component library
     ```
     npm i --save @ordercloud/angular-cms-components
     ```
2. Install the required peer dependencies
    ```
    npm i --save bootstrap @ng-bootstrap/bootstrap tinymce @tinymce/tinymce/angular axios case jquery marketplace-javascript-sdk ngx-spinner
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
4. In angular.json add an entry to the assets array
        - `{"glob": "**/*","input": "node_modules/tinymce","output": "/tinymce/"}`
5. In angular.json add two entries to the scripts array
        - `"node_modules/tinymce/tinymce.min.js"`
        - `"node_modules/marketplace-cms-components/plugin.min.js"`

Now you can use any of the components in your application

## 🚀 Releasing

Assuming you are a maintainer you can follow these instructions to release a new version of the library.

1. Verify the version has been bumped and adheres to [semantic versioning](https://semver.org/). Version should be updated in both package.json and projects/lib/package.json. Commit with format `:bookmark: {VERSION}`
2. Create and publish a new release on github
3. Publish on npm by running `npm run publish-please`
   - Defaults to pre-release. It is recommended to do a pre-release first to vet changes
   - For normal releases update the `publishTag` in `.publishrc` to `latest` and then run `npm run publish-please`
4. Have a beer!

If you need to override `publish-please` and just use `npm publish` you can do so by first removing `"prepublishOnly": "publish-please guard"` from package.json and then running `npm publish`
