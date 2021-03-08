const mix = require('laravel-mix');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('vuetifyjs-mix-extension');

const outputDir = 'build/';

mix.setPublicPath(outputDir)
    .ts('src/renderer.js', outputDir)
    .ts('src/main.ts', outputDir)
    .ts('src/library/menu/webviewContext.js', outputDir + 'services')
    .webpackConfig({
        target: 'electron-renderer',
        module: {
            rules: [
                {
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    exclude: /node_modules/,
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                    },
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/app.html' },
                    { from: './src/resources/static', to: 'static' },
                    { from: './src/services', to: 'services' },
                    {
                        from: './src/library/preload/index.js',
                        to: 'services/preload.js',
                    },
                    {
                        from: './src/library/preload/notification.js',
                        to: 'services',
                    },
                    { from: './package.json' },
                ],
            }),
        ],
        node: {
            global: true,
            __dirname: true,
            __filename: true,
        },
    })
    .vuetify('vuetify-loader')
    .vue({
        version: 2,
        globalStyles: './src/resources/sass/all.scss',
    })
    .options({
        extractVueStyles: true,
    });
