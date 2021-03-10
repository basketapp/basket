export default function GetWebview(identifier: string): null | Element {
    const container = document.getElementById(identifier);

    if (container === null) {
        return null;
    }

    const webview = container.querySelector('webview');

    return webview;
}
