import { MarketplaceSDK } from 'marketplace-javascript-sdk';
import * as MarketplaceSdkInstance from 'marketplace-javascript-sdk';

/**
 * TODO: I don't think this will be necessary once library is published
 * and we rely on shared instance but need for local development
 */
export default editor => {
  MarketplaceSdkInstance.Configuration.Set({
    baseApiUrl: editor.settings.ordercloud.marketplaceUrl
  });
  MarketplaceSDK.Tokens.SetAccessToken(editor.settings.ordercloud.access_token);
};
