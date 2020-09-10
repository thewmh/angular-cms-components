declare const tinymce: any;
import InsertCarousel from './components/InsertCarousel/InsertCarousel';
import InsertProduct from './components/InsertProduct/InsertProduct';
import InsertRow from './components/InsertRow/InsertRow';
import InsertSection from './components/InsertSection/InsertSection';
import PagePreview from './components/PagePreview/PagePreview';
import cmsUploadCommand from './services/cms.service';

tinymce.PluginManager.add('ordercloud', function (editor, url) {
  InsertCarousel(editor, url);
  InsertProduct(editor, url);
  InsertRow(editor, url);
  InsertSection(editor);
  PagePreview(editor, url);
  editor.addCommand('ocAssetUploader', cmsUploadCommand);
});
