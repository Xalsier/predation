export function simpleMarkdownParse(text) {
    let html = text;
    html = html.replace(/\n/g, '<br/>');
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    return html;
}
