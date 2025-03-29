export function removeFirstTag(html: string): string {
    const startTag = html.indexOf('<');
    
    if (startTag !== -1) {
        const endTag = html.indexOf('>', startTag);
        
        if (endTag !== -1) {
            return html.slice(0, startTag) + html.slice(endTag + 1);
        }
    }

    return html;
}