# Block Environment Plugin

This plugin provides an example environment for building WordPress blocks. Developers looking to create their own blocks are free to duplicate this plugin's file structure, as well as the webpack and babel implementation, so they can get started on their block code right away. 

Inside this plugin, I've included two example blocks, both of which have files brimming with helpful comments. These will detail the important parts of each block's coding and configuration. To get the most out of these files, I recommend exploring ES6 and React (see Recomended Books and Courses). 

## Setup

1. Each folder in this repository is a plugin. After you pull this repo, drag the `block-environemnt` folder your local WordPress environment's `wp-content/plugins` folder.

2. Activate the plugin in your WordPress Dashboard. This will do the following
   - Enable the Presentation block for the Block Editor
   - Enable the Fortune Display theme block for the Full Site Editor. 
     - For this block to work properly, you will also need to drag the `fortune-post` folder into `wp-content/plugins`, and activate that plugin in the WordPress Dashboard. Your theme will also need to be compatible with the Full-Site Editor (see Important WordPress Documentation section).

3. To make edits to these blocks, or to create your own, you will need to do the following.
   1. In your CLI of choice, run `npm install` at the root of the `block-environemnt` folder (make sure you do this *after* it's in your WordPress environment's `wp-content/plugins` folder). 
   2. When you're working on edits to these examples or coding your own blocks, run `npx webpack -w`. This will fire webpack in watch mode, transpiling all of the code imported by `frontend.js` and `backend.js` in each block's directory. Otherwise, your code will not work in the browser.

## Included Blocks

### Presentation

Located in /blocks/presentation

The Presentation block allows the author to specify a title, description, and whether the block is featured.

### Fortune Display

Located in /blocks/fortune-display

This block is meant for use as part of a Full-Site Editor theme. Once placed in a theme template, it will display a random fortune from the site's collection of Fortune custom posts. (Make sure you activate the `fortune-post` plugin before you use this block. See item 2 of the Setup section).

## Making Your Own Blocks

I encourage you to use this environment to build your own blocks. Observe the directory structure for each block in the `/blocks` folder of the `block-environment` plugin. When you create your own block, simply include a new folder for your own block, and follow the structure of the examples. See how all the example files function, and include similar files for your blocks. 

As long as you include the import code in your block's `frontend.js` and `backend.js` files, this plugin's webpack script will know what code to transpile, so that your block can run in the browser. To fire this script, you must use a CLI to go to the root folder of the `block-environemnt` plugin, and use the following command: `npx webpack -w`. This will run webpack in watch mode, so you can continue to code and test it in the browser. (Be sure to fire the `npm install` command in `block-environment` folder if you have not already done so).

## Important WordPress Documentation

- [How-To Guide: Blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/)

- [Component Reference (for UI Layout and Attribute Manipulation)](https://developer.wordpress.org/block-editor/reference-guides/components/)

- [Block Theme Setup (Necessary for using Full-Site Editor)](https://developer.wordpress.org/themes/block-themes/block-theme-setup/)

## Recomended Tutorials, Books and Courses

### Block Building

- ["Building Custom Gutenberg Blocks: The Definitive Block Development Tutorial", tutorial by Carlo Daniele](https://kinsta.com/blog/gutenberg-blocks/)

### Full-Site Editing

- [*Full site editing for theme developers*, course by Carolina Nymark](https://fullsiteediting.com/courses/full-site-editing-for-theme-developers/)

- ["A Deep Introduction to WordPress Block Themes", tutorial by Ganesh Dahal](https://css-tricks.com/a-deep-introduction-to-wordpress-block-themes/)

### ES6 and React

To take advantage of WordPress Blocks, you will need some familiarity with ES6 and React. I personally found the following sources helpful.

- [*You Don't Know JS: ES6 & Beyond*, book by Kyle Simpson](https://learning.oreilly.com/library/view/you-dont-know/9781491905241/).

- [*JavaScript Everywhere: Building Cross-Platform Applications with GraphQL, React, React Native, and Electron*, book by Adam D. Scrott](https://learning.oreilly.com/library/view/javascript-everywhere/9781492046974/)

- [*Modern React with Redux*, course by Stephen Girder](https://www.udemy.com/course/react-redux/)

