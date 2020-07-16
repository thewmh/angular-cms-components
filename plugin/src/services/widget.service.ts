import { OC_TINYMCE_WIDGET_ATTRIBUTE } from '../constants/widget.constants';

export const isWidgetType = (editor: any, node: any, type: string) => {
  let widgetName =
    typeof node.attr === 'function'
      ? node.attr(OC_TINYMCE_WIDGET_ATTRIBUTE)
      : editor.dom.getAttrib(node, OC_TINYMCE_WIDGET_ATTRIBUTE);
  const re = new RegExp(`\\b${type}\\b`);
  return widgetName && re.test(widgetName);
};

export default {
  isWidgetType
};
