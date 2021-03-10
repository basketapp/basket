const ipcRenderer = require('electron').ipcRenderer;
const { v1: uuidv1 } = require('uuid');

class Notification {
    static permission = 'granted';

    constructor(title = '', options = {}) {
        this.title = title;
        this.options = options;
        this.notificationId = uuidv1();

        ipcRenderer.sendToHost(
            'notification',
            this.onNotify({
                title: this.title,
                options: this.options,
                notificationId: this.notificationId,
            }),
        );

        ipcRenderer.once(`notification-onclick:${this.notificationId}`, () => {
            if (typeof this.onclick === 'function') {
                this.onclick();
            }
        });
    }

    static requestPermission(cb = null) {
        if (!cb) {
            return new Promise((resolve) => {
                resolve(Notification.permission);
            });
        }

        if (typeof cb === 'function') {
            return cb(Notification.permission);
        }

        return Notification.permission;
    }

    addEventListener(arg1, arg2) {
        if (arg1 === 'click') {
            this.onclick = arg2;
        }
    }

    onNotify(data) {
        return data;
    }

    onClick() {}

    close() {}
}

window.Notification = Notification;
