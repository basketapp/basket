const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const SELECTOR_CHANNELS_UNREAD =
    '.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted)';

window.checkMessageCount = () => {
    const allMessages = document.querySelectorAll(SELECTOR_CHANNELS_UNREAD);

    let messageCount = 0;
    allMessages.forEach((chat) => {
        const mentionBadge = chat.querySelector('[data-qa="mention_badge"]');

        let addCount = 1;
        if (mentionBadge) {
            addCount = parseInt(mentionBadge.innerHTML);
        }

        messageCount += addCount;
    });

    return messageCount;
};

// Source: https://github.com/meetfranz/recipe-slack/blob/master/webview.js
const getTeamIcon = function getTeamIcon(count = 0) {
    let countTeamIconCheck = count;
    let bgUrl = null;

    const teamMenu = document.getElementsByClassName(
        'p-ia__sidebar_header__button',
    )[0];
    if (teamMenu) {
        teamMenu.click();

        const icon = document.querySelector('.c-team_icon');
        if (icon) {
            bgUrl = window
                .getComputedStyle(icon, null)
                .getPropertyValue('background-image');
            bgUrl = /^url\((['"]?)(.*)\1\)$/.exec(bgUrl);
            bgUrl = bgUrl ? bgUrl[2] : '';
        }

        setTimeout(() => {
            document.querySelector('.ReactModal__Overlay').click();
        }, 10);
    }

    countTeamIconCheck += 1;

    if (bgUrl) {
        ipcRenderer.sendToHost('update-icon', bgUrl);
    } else if (countTeamIconCheck <= 5) {
        setTimeout(() => {
            getTeamIcon(countTeamIconCheck + 1);
        }, 2000);
    }
};

setTimeout(() => {
    getTeamIcon();
}, 4000);
