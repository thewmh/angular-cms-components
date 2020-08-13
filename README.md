# OrderCloud Angular CMS components

A component library that can be used to quickly integrate with the OrderCloud CMS API

## Requirements

* Angular version 10 - may work with older versions but has not been tested

## Installation
1. Install the component library
     ```
     npm i --save @ordercloud/angular-cms-components@beta
     ```
2. Install the required peer dependencies
    ```
    npm i --save bootstrap @ng-bootstrap/ng-bootstrap tinymce @tinymce/tinymce-angular axios case jquery @ordercloud/headstart-sdk ordercloud-javascript-sdk ngx-spinner
    ```
3. In your module import either `CmsAdminModule` for access to admin/buyer components or `CmsBuyerModule` for just the buyer components. Here we're registering `CmsAdminModule` for access to all components
    ```typescript
    import { CmsAdminModule, Configuration } from '@ordercloud/angular-cms-components';

    @NgModule({
    declarations: [...],
    imports: [
        CmsAdminModule,
        ...
    ],
    providers: [...],
    bootstrap: [AppComponent]
    })
    export class AppModule {}
    ```

    If your app uses the [shared module pattern](https://www.pluralsight.com/guides/using-shared-modules-in-angular) you'll want to import it in your shared module *instead* (don't forget to export it as well)
    ```typescript
    import { CmsAdminModule, Configuration } from '@ordercloud/angular-cms-components';
    @NgModule({
    declarations: [...],
    imports: [
        CmsAdminModule,
        ...
    ],
    exports: [
        CmsAdminModule,
        ...
    ],
    providers: [...],
    })
    export class SharedModule {}
    ```

4. In angular.json add an entry to the assets array
    - `{"glob": "**/*","input": "node_modules/tinymce","output": "/tinymce/"}`
5. In the root of your app import tinymce and the ordercloud plugin for tinymce
    - ```typescript
        import 'tinymce/tinymce';
        import '@ordercloud/angular-cms-components/plugin.min.js';
    ```

Now you can use any of the components in your application

## 🚀 Releasing

Assuming you are a maintainer you can follow these instructions to release a new version of the library.

1. Add and commit your changes
2. Run `npm run build` to build docs
3. Verify the version has been bumped and adheres to [semantic versioning](https://semver.org/).
    - Version should be updated in both package.json and projects/lib/package.json.
    - Version update should be its own commit
    - Use following format for the commmit: `:bookmark: {VERSION}`
4. Push changes to master
5. Create and publish a new release on github
6. Publish on npm by running `npm run publish-please`
   - Defaults to pre-release. It is recommended to do a pre-release first to vet changes
   - For normal releases update the `publishTag` in `.publishrc` to `latest` and then run `npm run publish-please`
7. Have a beer!

If you need to override `publish-please` and just use `npm publish` you can do so by first removing `"prepublishOnly": "publish-please guard"` from package.json and then running `npm publish`
