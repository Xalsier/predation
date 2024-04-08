export function simpleMarkdownParse(text) {
    let html = text;
    // Basic formatting (existing code)
    html = html.replace(/\n/g, '<br/>');
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    return html;
}

