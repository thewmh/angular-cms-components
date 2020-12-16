import { ContentManagementClient } from '@ordercloud/cms-sdk';

export default function cmsUploadCommand(
  ignorethisparam,
  { blobInfo, successCallback, errorCallback }
) {
  const filename = blobInfo.filename();
  ContentManagementClient.Assets.Upload({
    Active: true,
    File: blobInfo.blob(),
    FileName: filename,
    Title: filename.split('.')[0],
  })
    .then((response) => {
      successCallback(response.Url);
    })
    .catch((err) => {
      console.log(err);
      errorCallback((e) => {
        console.log(e);
        alert('There was an error uploading image');
      });
    });
}
