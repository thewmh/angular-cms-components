import {
  OC_TINYMCE_SECTION_WIDGET_ID,
  OC_TINYMCE_WIDGET_ATTRIBUTE
} from '../../constants/widget.constants';
import { isWidgetType } from '../../services/widget.service';

import tinymce from 'tinymce';

export default editor => {
  editor.ui.registry.addButton('oc-section', {
    text: 'Insert Section',
    onAction: () => {
      editor.settings.ordercloud
        .open_section_picker({ remoteCss: editor.settings.content_css[0] })
        .then(html => {
          editor.insertContent(
            `<div ${OC_TINYMCE_WIDGET_ATTRIBUTE}=${OC_TINYMCE_SECTION_WIDGET_ID}>
            ${html}
          </div>`
          );
        })
        .catch(ex => {
          if (ex === 'Cross click') {
            return;
          }
        });
    }
  });

  editor.ui.registry.addButton('oc-section-dates', {
    text: 'Date Settings',
    onAction: () => {
      const startDateAttribute = 'data-oc-start-date';
      const endDateAttribute = 'data-oc-end-date';
      let node = editor.selection.getNode();
      if (!isWidgetType(editor, node, OC_TINYMCE_SECTION_WIDGET_ID)) {
        node = editor.dom.getParent(
          node,
          `[${OC_TINYMCE_WIDGET_ATTRIBUTE}=${OC_TINYMCE_SECTION_WIDGET_ID}]`
        );
      }
      const startDate = editor.dom.getAttrib(node, startDateAttribute);
      const endDate = editor.dom.getAttrib(node, endDateAttribute);
      editor.settings.ordercloud
        .open_section_date_settings({
          startDate,
          endDate
        })
        .then((updated: any) => {
          editor.dom.setAttribs(node, {
            [startDateAttribute]: updated.startDate,
            [endDateAttribute]: updated.endDate
          });
          editor.execCommand('mceSelectNode', false, node);
        })
        .catch(ex => {
          if (ex === 'Cross click') {
            return;
          }
        });
    }
  });

  editor.ui.registry.addContextToolbar('oc-section', {
    predicate: node => isWidgetType(editor, node, OC_TINYMCE_SECTION_WIDGET_ID),
    items: 'oc-section-dates',
    position: 'node',
    scope: 'node'
  });

  editor.on('preInit', function() {
    function toggleContentEditableState(state) {
      return function(nodes) {
        let i = nodes.length,
          node;

        function toggleContentEditable(node) {
          node.attr('contenteditable', state ? 'true' : null);
        }

        while (i--) {
          node = nodes[i];

          if (isWidgetType(editor, node, OC_TINYMCE_SECTION_WIDGET_ID)) {
            node.attr('contenteditable', state ? 'false' : null);
            tinymce.each(node.getAll('h1'), toggleContentEditable);
            tinymce.each(node.getAll('h2'), toggleContentEditable);
            tinymce.each(node.getAll('h3'), toggleContentEditable);
            tinymce.each(node.getAll('h4'), toggleContentEditable);
            tinymce.each(node.getAll('h5'), toggleContentEditable);
            tinymce.each(node.getAll('h6'), toggleContentEditable);
            tinymce.each(node.getAll('p'), toggleContentEditable);
            tinymce.each(node.getAll('a'), toggleContentEditable);
            tinymce.each(node.getAll('button'), toggleContentEditable);
            tinymce.each(node.getAll('figure'), toggleContentEditable);
            tinymce.each(node.getAll('img'), toggleContentEditable);
          }
        }
      };
    }

    editor.parser.addAttributeFilter(
      OC_TINYMCE_WIDGET_ATTRIBUTE,
      toggleContentEditableState(true)
    );
    editor.serializer.addAttributeFilter(
      OC_TINYMCE_WIDGET_ATTRIBUTE,
      toggleContentEditableState(false)
    );
  });
};
