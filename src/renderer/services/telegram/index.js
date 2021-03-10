window.checkMessageCount = () => {
    const allChats = document.querySelectorAll(
        '.im_dialog_badge:not(.ng-hide):not(.im_dialog_badge_muted)',
    );
    let messageCount = 0;

    allChats.forEach((chat) => {
        messageCount += parseInt(chat.innerHTML);
    });

    return messageCount;
};
