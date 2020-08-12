function openPreviewModal(editor): () => void {
    return () => {
        const html = editor.getContent();
        const remoteCss = editor.settings.content_css[0];
        editor.settings.ordercloud.open_preview_modal({html, remoteCss});
    };
}


export default (editor, url) => {
    editor.ui.registry
        .addButton('oc-preview', {
            icon: 'preview',
            tooltip: 'Preview',
            onAction: openPreviewModal(editor),
        });
    editor.ui.registry.addMenuItem('oc-preview', {
        icon: 'preview',
        text: 'Preview',
        onAction: openPreviewModal(editor),
    });
};
