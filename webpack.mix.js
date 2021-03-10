const mix = require('laravel-mix');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = 'build/';

mix.setPublicPath(outputDir)
    .ts('src/renderer/renderer.js', outputDir)
    .ts('src/main/main.ts', outputDir)
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
                    { from: './src/renderer/app.html' },
                    { from: './src/renderer/resources/static', to: 'static' },
                    { from: './src/renderer/services', to: 'services' },
                    {
                        from: './src/renderer/library/preload/index.js',
                        to: 'services/preload.js',
                    },
                    {
                        from: './src/renderer/library/preload/notification.js',
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
    .vue({
        version: 3,
        globalStyles: './src/renderer/resources/sass/all.scss',
    })
    .options({
        extractVueStyles: true,
        vue: {
            compilerOptions: {
                isCustomElement: (tag) => tag === 'webview',
            },
        },
    });
