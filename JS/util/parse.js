export function simpleMarkdownParse(text) {
    let html = text;

    // Basic formatting (existing code)
    html = html.replace(/\n/g, '<br/>');
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

    // Profile image formatting
    html = html.replace(/FUWA:/g, '<span class="webnovel-profile-img"><img src="https://hunt.predation.jp/CA/1.png" alt="Fuwa Profile"></span> FUWA:'); 
    html = html.replace(/NAORI:/g, '<span class="webnovel-profile-img"><img src="https://hunt.predation.jp/CA/2.png" alt="Fuwa Profile"></span> NAORI:'); 

    return html;
}

