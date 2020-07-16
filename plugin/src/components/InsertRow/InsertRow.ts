import {
  OC_TINYMCE_WIDGET_ATTRIBUTE,
  OC_TINYMCE_ROW_WIDGET_ID,
  OC_TINYMCE_COL_WIDGET_ID
} from '../../constants/widget.constants';
import { isWidgetType } from '../../services/widget.service';

declare const tinymce: any;

const colMarkup = `
  <div class="col" style="border:1px dashed #ddd" contenteditable="true" ${OC_TINYMCE_WIDGET_ATTRIBUTE}="${OC_TINYMCE_COL_WIDGET_ID}"></div>
`;

const rowMarkup = `
  <div class="row" ${OC_TINYMCE_WIDGET_ATTRIBUTE}="${OC_TINYMCE_ROW_WIDGET_ID}">${colMarkup}</div>
`;
export default (editor, url) => {
  editor.ui.registry.addMenuItem('oc-row', {
    text: 'Insert Row',
    onAction: () => {
      return tinymce.activeEditor.insertContent(rowMarkup);
    }
  });

  editor.ui.registry.addButton('oc-row-remove', {
    icon: 'remove',
    tooltip: 'Remove Row',
    onAction: () => {
      const node = tinymce.activeEditor.selection.getNode();
      const query = tinymce.dom.DomQuery(node);
      query.remove();
      tinymce.activeEditor.execCommand('mceRemoveNode');
    }
  });

  editor.ui.registry.addButton('oc-col-add', {
    text: 'Add Column',
    icon: 'plus',
    onAction: () => {
      const node = tinymce.activeEditor.selection.getNode();
      node.append(tinymce.activeEditor.dom.createFragment(colMarkup));
      // return tinymce.activeEditor.parser.parse(node);
      // tinymce.activeEditor.execCommand('');
    }
  });

  editor.ui.registry.addButton('oc-col-remove', {
    icon: 'remove',
    tooltip: 'Remove Column',
    onAction: () => {
      const node = tinymce.activeEditor.selection.getNode();
      const query = tinymce.dom.DomQuery(node);
      query
        .parentsUntil('.row')
        .first()
        .remove();
      tinymce.activeEditor.execCommand('mceRemoveNode');
    }
  });

  editor.ui.registry.addButton('oc-col-edit', {
    icon: 'edit-block',
    text: 'Edit',
    tooltip: 'Edit Column',
    onAction: editColumn
  });

  function parseColData(node) {
    const classes = tinymce.activeEditor.dom
      .getAttrib(node, 'class')
      .split(' ');

    function buildResponsiveRegex(size?: string) {
      if (!size) return new RegExp('(col-\\d)|(col)$\\b');
      return new RegExp(`(col-${size}$)|(col-${size}-(\\d{1,2}))$\\b`);
    }

    const regexPatterns = {
      default: buildResponsiveRegex(),
      xs: buildResponsiveRegex('xs'),
      sm: buildResponsiveRegex('sm'),
      md: buildResponsiveRegex('md'),
      lg: buildResponsiveRegex('lg'),
      xl: buildResponsiveRegex('xl')
    };

    const responsiveClasses = {
      default: classes.find(c => regexPatterns.default.test(c)),
      xs: classes.find(c => regexPatterns.xs.test(c)),
      sm: classes.find(c => regexPatterns.sm.test(c)),
      md: classes.find(c => regexPatterns.md.test(c)),
      lg: classes.find(c => regexPatterns.lg.test(c)),
      xl: classes.find(c => regexPatterns.xl.test(c))
    };

    const sizeRegexPattern = new RegExp('(\\d{1,2})$');

    Object.keys(responsiveClasses).forEach(k => {
      if (!responsiveClasses[k]) {
        responsiveClasses[k] = '';
        return;
      }
      const split = responsiveClasses[k].split('-');
      responsiveClasses[k] = sizeRegexPattern.test(responsiveClasses[k])
        ? split.length > 2
          ? split[2]
          : split[1]
        : 'auto';
    });

    console.table(responsiveClasses);
    return responsiveClasses;
  }

  function editColumn() {
    const node = tinymce.activeEditor.selection.getNode();
    const data = parseColData(node);
    const sizes = Object.keys(data);
    const labelMap = {
      default: 'All Sizes',
      xs: 'Mobile Devices',
      sm: 'Tablets',
      md: 'Laptops',
      lg: 'Desktops',
      xl: 'Large Desktops'
    };
    tinymce.activeEditor.windowManager.open({
      title: 'Edit Column',
      body: {
        type: 'panel',
        items: sizes.map(s => {
          return {
            type: 'selectbox', // component type
            name: s, // identifier
            label: labelMap[s],
            size: 1, // number of visible values (optional)
            items: [
              { value: '', text: 'None' },
              { value: 'auto', text: 'Auto' },
              { value: '1', text: '1/12' },
              { value: '2', text: '2/12' },
              { value: '3', text: '3/12' },
              { value: '4', text: '4/12' },
              { value: '5', text: '5/12' },
              { value: '6', text: '6/12' },
              { value: '7', text: '7/12' },
              { value: '8', text: '8/12' },
              { value: '9', text: '9/12' },
              { value: '10', text: '10/12' },
              { value: '11', text: '11/12' },
              { value: '12', text: '12/12' }
            ]
          };
        })
      },
      initialData: data,
      buttons: [
        {
          type: 'cancel',
          text: 'Close'
        },
        {
          type: 'submit',
          text: 'Save',
          primary: true
        }
      ],
      onSubmit: api => onSubmitEditColumn(api, node)
    });
  }

  function onSubmitEditColumn(api, node) {
    const data = api.getData();
    const classes: string[] = [];

    Object.entries(data).forEach(([k, v]: [string, string]) => {
      if (!v) return;
      classes.push(
        `col${
          v === 'auto' && k === 'default'
            ? ''
            : `-${k === 'default' ? v : `${k}-${v}`}`
        }`
      );
    });

    //if there aren't any selections, go back to the default auto class
    if (!classes.length) {
      classes.push('col');
    }
    tinymce.activeEditor.dom.setAttrib(node, 'class', classes.join(' '));
    console.log('classes', classes);
    api.close();
  }

  editor.ui.registry.addContextToolbar('oc-col', {
    predicate: node => isWidgetType(editor, node, OC_TINYMCE_COL_WIDGET_ID),
    items: 'oc-col-remove | oc-col-edit',
    position: 'node',
    scope: 'node'
  });

  editor.ui.registry.addContextToolbar('oc-row', {
    predicate: node => isWidgetType(editor, node, OC_TINYMCE_ROW_WIDGET_ID),
    items: 'oc-row-remove | oc-col-add',
    position: 'node',
    scope: 'node'
  });

  editor.on('preInit', function() {
    function toggleContentEditableState(state) {
      return function(nodes) {
        let i = nodes.length,
          node;

        while (i--) {
          node = nodes[i];

          if (isWidgetType(editor, node, OC_TINYMCE_ROW_WIDGET_ID)) {
            node.attr('contenteditable', state ? 'false' : null);
            node.attr(
              'style',
              state ? 'border: 1px dashed #ddd; padding:8px 0;' : null
            );
          }
          if (isWidgetType(editor, node, OC_TINYMCE_COL_WIDGET_ID)) {
            node.attr('contenteditable', state ? 'true' : null);
            node.attr('style', state ? 'border: 1px dashed #ddd;' : null);
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
