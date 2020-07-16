declare const tinymce: any;
import 'jquery';
import 'slick-carousel';
import InsertCarousel from './components/InsertCarousel/InsertCarousel';
import InsertProduct from './components/InsertProduct/InsertProduct';
import InsertRow from './components/InsertRow/InsertRow';
import MarketplaceSdk from './config/MarketPlaceSdk.config';
import InsertSection from './components/InsertSection/InsertSection';

tinymce.PluginManager.add('ordercloud', function(editor, url) {
  InsertCarousel(editor, url);
  MarketplaceSdk(editor);
  InsertProduct(editor, url);
  InsertRow(editor, url);
  InsertSection(editor);
});
