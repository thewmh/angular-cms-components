import { HeadStartSDK } from '@ordercloud/headstart-sdk';
import * as HeadStartSDKInstance from '@ordercloud/headstart-sdk';

/**
 * TODO: I don't think this will be necessary once library is published
 * and we rely on shared instance but need for local development
 */
export default editor => {
  HeadStartSDKInstance.Configuration.Set({
    baseApiUrl: editor.settings.ordercloud.marketplaceUrl
  });
  HeadStartSDK.Tokens.SetAccessToken(editor.settings.ordercloud.access_token);
};
