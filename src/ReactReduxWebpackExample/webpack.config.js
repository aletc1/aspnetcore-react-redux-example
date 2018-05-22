const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        stats: { modules: false },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                "src": path.resolve('./src'),
                '../../theme.config$': path.resolve('./src/assets/semantic/theme.config.less')
            }
        },
        mode: isDevBuild ? 'development' : 'production',
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [

            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                //filename: isDevBuild ? '[name].css' : '[name].[hash].css',
                //chunkFilename: isDevBuild ? '[id].css' : '[id].[hash].css
                filename: 'site.css',
            }),
            new CheckerPlugin(),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
            //new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        ]
    });

    // Configuration for client-side bundle suitable for running in browsers
    var clientBundleOutputDir = './wwwroot/dist';
    var clientBundleConfig = merge(sharedConfig(), {
        entry: {
            'main-client': './src/boot-client.tsx'
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir)
        },
        module: {
            rules: [{
                    test: /\.(ts|tsx)$/,
                    exclude: /(node_modules|bower_components|typings)/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            // awesome-typescript-loader
                            //configFileName: path.join(__dirname, 'tsconfig.client.json'),
                            // ts-loader
                            configFile: path.join(__dirname, 'tsconfig.client.json'),
                            onlyCompileBundledFiles: true,
                            instance: 'ts-client',
                            context: __dirname,
                        }
                    }]
                },
                {
                    test: /\.md$/,
                    use: [{ loader: 'html-loader' }, { loader: 'markdown-loader' }]
                },
                {
                    test: /\.less$/,
                    use: [
                        isDevBuild ? 'style-loader' : MiniCssExtractPlugin.loader,
                        isDevBuild ? 'css-loader' : 'css-loader?minimize',
                        'less-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        isDevBuild ? 'style-loader' : MiniCssExtractPlugin.loader,
                        isDevBuild ? 'css-loader' : 'css-loader?minimize',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        isDevBuild ? 'style-loader' : MiniCssExtractPlugin.loader,
                        isDevBuild ? 'css-loader' : 'css-loader?minimize'
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: { limit: 25000 }
                    }
                },
                {
                    test: /(eot|woff|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
                    use: {
                        loader: 'file-loader',
                        options: { name: '[name].[ext]' } //?limit=100000'
                    }
                },
                {
                    test: /favicon\.ico$/,
                    loader: 'file-loader',
                    query: {
                        limit: 1,
                        name: '[name].[ext]',
                    },
                },
                {
                    test: /\.svg/,
                    use: {
                        loader: 'file-loader',
                        options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
                    }
                },
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, 'wwwroot', 'dist', '/vendor-manifest.json')),
                name: './manifest-dll.js',
                scope: 'flightsearch',
                sourceType: 'commonjs2'
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

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    var serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: {
            'main-server': './src/boot-server.tsx'
        },
        module: {
            rules: [{
                    test: /\.(ts|tsx)$/,
                    exclude: '/src/boot-client.tsx',
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            configFile: path.join(__dirname, 'tsconfig.client.json'),
                            onlyCompileBundledFiles: true,
                            instance: 'ts-client',
                            context: __dirname,
                        }
                    }]
                },
                {
                    test: /\.md$/,
                    use: [{ loader: 'html-loader' }, { loader: 'markdown-loader' }]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: { limit: 25000 }
                    }
                },
                {
                    test: /(eot|woff|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
                    use: {
                        loader: 'file-loader',
                        options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
                    }
                },
                {
                    test: /\.svg/,
                    use: {
                        loader: 'file-loader',
                        options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
                    }
                },
                {
                    test: /favicon\.ico$/,
                    loader: 'file-loader',
                    query: {
                        limit: 1,
                        name: '[name].[ext]',
                    },
                },
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.join(__dirname, 'src', 'dist', '/vendor-manifest.json')),
                name: './manifest-dll.js',
                scope: 'flightsearch',
                sourceType: 'commonjs2'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './src/dist')
        },
        target: 'node',
        devtool: 'source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};