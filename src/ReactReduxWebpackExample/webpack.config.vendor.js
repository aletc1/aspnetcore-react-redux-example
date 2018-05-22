const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    const sharedConfig = {
        stats: { modules: false },
        resolve: {
            alias: {
                "src": path.resolve('./src'),
                '../../theme.config$': path.resolve('./src/assets/semantic/theme.config.less')
            }
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                     MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: { name: '[name].[ext];', limit: 25000 }
                }
            },
            {
                test: /(eot|woff|svg|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
                use: {
                    loader: 'file-loader',
                    options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
                }
            }
            ]
        },
        entry: {
            vendor: [
                "semantic-ui-less/semantic.less",
                //'bootstrap',
                //'bootstrap/dist/css/bootstrap.css',
                //path.join(__dirname, 'src', 'sass', 'font-awesome.scss'),
                //'domain-task',
                //'event-source-polyfill',
                'history',
                //'jquery',
                'react',
                'react-dom',
                'react-router',
                'react-redux',
                'redux',
                'redux-thunk',
                'react-router-dom',
                'react-router-redux',
            ],
        },
        output: {
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "vendor.css"
            }),
            //new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"',
            }),
        ]
    };
    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        plugins: [
            new webpack.DllPlugin({
                context: __dirname,
                name: '[name]_[hash]',
                path: path.join(__dirname, 'wwwroot', 'dist', 'vendor-manifest.json'),
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
        ] : [
                // Plugins that apply in production builds only
                new CompressionPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$|\.css|\.svg$/,
                    threshold: 10240,
                    minRatio: 0.8
                }),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                })
            ]),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ]
        },
        devtool: 'source-map'
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: path.join(__dirname, 'src', 'dist'),
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [

            ],
        },
        entry: { vendor: ['aspnet-prerendering', 'react-dom/server'] },
        plugins: [
            new webpack.DllPlugin({
                context: __dirname,
                name: '[name]_[hash]',
                path: path.join(__dirname, 'src', 'dist', 'vendor-manifest.json'),
            }),
        ],
        devtool: 'source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
    //return [clientBundleConfig];
};