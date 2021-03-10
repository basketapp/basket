/* eslint indent: 0 */ // --> OFF
import { isMac } from '../../environment';
import { locale, en, nl } from '../i18n';

const { Menu, shell } = require('electron');

const language = locale === 'en' ? en : nl;

class AppMenu {
    constructor(mainWindow, services) {
        const template = [
            ...(isMac
                ? [
                      {
                          label: 'app.name',
                          submenu: [
                              { role: 'about' },
                              { type: 'separator' },
                              {
                                  label: language.preferences,
                                  accelerator: 'CmdOrCtrl+,',
                                  click: async () => {
                                      mainWindow.webContents.send(
                                          'openPreferencesPanel',
                                      );
                                  },
                              },
                              { type: 'separator' },
                              { role: 'services' },
                              { type: 'separator' },
                              { role: 'hide' },
                              { role: 'hideothers' },
                              { role: 'unhide' },
                              { type: 'separator' },
                              { role: 'quit' },
                          ],
                      },
                  ]
                : []),
            {
                label: 'File',
                submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
            },
            {
                label: 'Edit',
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    ...(isMac
                        ? [
                              { role: 'pasteAndMatchStyle' },
                              { role: 'delete' },
                              { role: 'selectAll' },
                              { type: 'separator' },
                              {
                                  label: 'Speech',
                                  submenu: [
                                      { role: 'startspeaking' },
                                      { role: 'stopspeaking' },
                                  ],
                              },
                          ]
                        : [
                              { role: 'delete' },
                              { type: 'separator' },
                              { role: 'selectAll' },
                          ]),
                ],
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forcereload' },
                    { role: 'toggledevtools' },
                    {
                        label: language.open_service_developer_tools,
                        click: () => {
                            mainWindow.webContents.send(
                                'openServiceDeveloperTools',
                            );
                        },
                    },
                    { type: 'separator' },
                    {
                        label: language.menu_actual_size,
                        click: () => {
                            mainWindow.webContents.send('resetZoomLevel');
                        },
                        accelerator: `CmdOrCtrl+0`,
                    },
                    {
                        label: language.menu_zoom_in,
                        click: () => {
                            mainWindow.webContents.send('addZoomLevel');
                        },
                        accelerator: `CmdOrCtrl+=`,
                    },
                    {
                        label: language.menu_zoom_out,
                        click: () => {
                            mainWindow.webContents.send('substractZoomLevel');
                        },
                        accelerator: `CmdOrCtrl+-`,
                    },
                    { type: 'separator' },
                    { role: 'togglefullscreen' },
                ],
            },
            {
                label: 'Services',
                submenu: services.map((service) => ({
                    label: service.title,
                    accelerator:
                        service.index < 9
                            ? `CmdOrCtrl+${service.index + 1}`
                            : null,
                    enabled: service.enabled,
                    click: async () => {
                        mainWindow.webContents.send(
                            'changeService',
                            service.identifier,
                        );
                    },
                })),
            },
            {
                role: 'windowMenu',
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Github',
                        click: async () => {
                            await shell.openExternal(
                                'https://github.com/basketapp/basket',
                            );
                        },
                    },
                ],
            },
        ];

        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    }
}

export default AppMenu;
