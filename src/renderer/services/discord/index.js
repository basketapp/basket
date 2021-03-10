window.checkMessageCount = () => {
    const direct = document.querySelectorAll(
        '[class^="listItemWrapper"] [class^="numberBadge"]',
    ).length;
    const indirect = document.querySelectorAll(
        '[class^="guildsWrapper"] [class^="guild-"]+[class*="unread-"]',
    ).length;

    return direct + indirect;
};
