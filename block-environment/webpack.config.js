/* webpack.config.js
 * Running this file will transpile the JS code necessary for your blocks
 * and process your block's SASS code into minified CSS. 
 * 
 * It will take the files imported by the frontend.js and backend.js scripts,
 * located in the root of each folder you include in this plugin's block directory.
 * */
const {
    lstatSync,
    readdirSync,
    existsSync
} = require('fs');

const {
    join,
    normalize,
} = require('path');

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Part 1: File Seeking
 * These functions will search the folders included in the block directory
 * for frontend.js and backend.js files.
 * */

// Filter function to check whether a block directory has JSX for the editor (back end)
const block_has_be_files = source => {
    let hasRF = true;
    if (!lstatSync(source).isDirectory() || !existsSync(source + normalize('/backend.js'))) {
        hasRF = false;
    }
    return hasRF;
}

// Filter function to check whether a block directory has JSX for the site's front-end
const block_has_fe_files = source => {
    let hasRF = true;
    if (!lstatSync(source).isDirectory() || !existsSync(source + normalize('/frontend.js'))) {
        hasRF = false;
    }
    return hasRF;
}

// function: given a list of sources, filter any of the ones without back-end JS
const get_be_dirs = (blockdir) => {
    lists = readdirSync(blockdir).map(name => join(blockdir, name)).filter(block_has_be_files);
    return lists;
}

// function: given a list of sources, filter any of the ones without front-end JS
const get_fe_dirs = (blockdir) => {
    lists = readdirSync(blockdir).map(name => join(blockdir, name)).filter(block_has_fe_files);
    return lists;
}

// Now cull together two lists, each consisting of either front-end or back-end JS.
// We will take care of these paths in the webconfig export.
const block_directory = `${__dirname}/blocks`;
const be_directories = get_be_dirs(block_directory);
const fe_directories = get_fe_dirs(block_directory);

/* 2. Configuration for transpiling backend (index.js, editor.css) and frontend (script.js ,style.css)
 * */
const be_exports = be_directories.map(dir => {
    return ({
        context: dir,
        devtool: 'source-map',
        mode: 'production',
        entry: './backend.js',
        output: {
            path: dir + normalize('/dist'),
            filename: 'index.js'
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    options: {
                        plugins: [
                            ["@babel/plugin-transform-react-jsx", {
                                "pragma": "wp.element.createElement",
                                "pragmaFrag": "wp.element.Fragment"
                            }],
                            ["@babel/plugin-transform-classes"]
                        ],
                        presets: ['@babel/preset-env']
                    },
                }]
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'editor.css'
            }),
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            "default",
                            {
                                discardComments: { removeAll: true },
                            },
                        ],
                    },
                }),
            ],
        }
    })
});

const fe_exports = fe_directories.map(dir => {
    return ({
        context: dir,
        devtool: 'source-map',
        mode: 'production',
        entry: './frontend.js',
        output: {
            path: dir + normalize('/dist'),
            filename: 'script.js'
        },
        module: {
            rules: [{
                    test: /\.jsx?$/,
                    use: [{
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                ["@babel/plugin-transform-react-jsx", {
                                    "pragma": "wp.element.createElement",
                                    "pragmaFrag": "wp.element.Fragment"
                                }],
                                ["@babel/plugin-transform-classes"]
                            ],
                            presets: ['@babel/preset-env']
                        },
                    }]
                },
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: "css-loader", options: { sourceMap: true } },
                        { loader: "sass-loader", options: { sourceMap: true } },
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            "default",
                            {
                                discardComments: { removeAll: true },
                            },
                        ],
                    },
                }),
            ],
        }
    })
});

/* 4. Merge and Export
 * */
const theExports = [...be_exports, ...fe_exports];
console.debug(theExports);
module.exports = theExports;