import 'tinymce/tinymce';
import '../../../../plugin/dist/plugin.min.js';
import { HeadStartSDK } from '@ordercloud/headstart-sdk';
import * as HeadStartSDKInstance from '@ordercloud/headstart-sdk';

HeadStartSDKInstance.Configuration.Set({
  baseApiUrl: 'https://marketplace-middleware-test.azurewebsites.net',
});
HeadStartSDK.Tokens.SetAccessToken(
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJjcmhpc3RpYW5zdXBwbGllcjQxMTA2IiwiY2lkIjoiN2UwZmQ2MmItOWRkOS00OTM5LTllMGItMjZkODgyZmMzNTA4IiwiaW1wIjoiMTAwNSIsInUiOiIxODEyNjMwIiwidXNydHlwZSI6InN1cHBsaWVyIiwicm9sZSI6WyJBZG1pblVzZXJSZWFkZXIiLCJCdXllclJlYWRlciIsIkJ1eWVyVXNlclJlYWRlciIsIkNhdGFsb2dSZWFkZXIiLCJGdWxsQWNjZXNzIl0sImlzcyI6Imh0dHBzOi8vYXV0aC5vcmRlcmNsb3VkLmlvIiwiYXVkIjoiaHR0cHM6Ly9hcGkub3JkZXJjbG91ZC5pbyIsImV4cCI6MTU5NzE5MTk0MywibmJmIjoxNTk3MTYzMTQzfQ.YtkP7PCVKe7eFdoRfEbHtN0lqb0ozUE8cUYdjQ2D8kU'
);
