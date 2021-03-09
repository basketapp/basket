/*
 * This file will be pre-loaded directly without going through webpack.
 */

const electron = require('electron');
const path = require('path');
const fs = require('fs-extra');
// eslint-disable-next-line no-unused-vars
const Notification = require('./notification'); // Is actually used.

const ipcRenderer = electron.ipcRenderer;

// Set empty functions for when there is no recipe available
// or specific functions aren't used.

// chekMessageCount should return the amount of unread messages
// this will be set in the unread bubble
window.checkMessageCount = () => {};

// Delay initializing because otherwise the init-recipe
// event will fail to trigger.
setTimeout(() => ipcRenderer.sendToHost('init'), 100);

ipcRenderer.once('init-recipe', (channel, message) => {
    // Require recipe for this specific service.
    // eslint-disable-next-line
    require(path.join(__dirname, message.recipe));

    // Inject CSS if there is a service css file
    const cssPath = path.join(__dirname, message.recipe, 'style.css');

    fs.access(cssPath, fs.F_OK, (err) => {
        // If file doesn't exist show in log.
        if (err) {
            console.log('No style.css found, will not be loaded.');
            return;
        }

        // If the file does exist create style element in head
        const styles = document.createElement('style');

        const cssFile = fs.readFileSync(cssPath);
        styles.innerHTML = cssFile.toString();

        document.querySelector('head').appendChild(styles);
    });
});

setInterval(() => {
    const messageCount = window.checkMessageCount();

    ipcRenderer.sendToHost(
        'message-count',
        Number.isNaN(messageCount) ? 0 : messageCount,
    );
}, 1000);

window.addEventListener('contextmenu', () => {
    const selectedText = window.getSelection().toString();

    if (selectedText.length) {
        ipcRenderer.send('show-context-menu', selectedText);
    }
});
