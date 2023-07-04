/* src/index.js
 * The JavaScript configuration file for the Fortune Display block.
 * This block will display a random fortune from the current site's
 * collection of fortune custom posts.
 * 
 * This file includes the code we write for telling WordPress
 * how the block should behave in the Block Editor.
 * */

// Grabs registerBlockType from wp.blocks (wp-blocks package, see presentation.php)
const { registerBlockType } = wp.blocks;

/* Grabs the serverSideRender component from the wp object
 * and gives it the alias ServerSideRender (components should be uppercased).
 * This is useful for displaying blocks in the editor that we render with PHP.
 * (Part of the wp-server-side-render render package, see fortune-display.php.)
 * */
const { serverSideRender: ServerSideRender } = wp;

/* Grabs the InspectorControls component rendering on the right-side panel in the Block Editor.
 * Part of wp.blockEditor (wp-block-editor package, see presentation.php)
 * */
const { InspectorControls } = wp.blockEditor;

/* Grabs more components for laying out the block and manipulating attributes.
 * These are all part of wp.components (wp-components package, see presentation.php)
 * */
const {
    TextControl,
    Panel,
    PanelRow,
    PanelBody
} = wp.components;

/* This is where we register the block in our JavaScript.
 * Arg 1 is the name of the block. Generally 'plugin/block'.
 * Make sure you use the same name in your PHP file (see presentation.php)
 * */
registerBlockType('block-environment/fortune-display', {
    title: 'Fortune',
    category: 'theme',
    attributes: {
        prefix: {
            type: 'string',
            default: 'Fortune'
        },
    },
    /* edit: this property handles how the block appears in the editor, 
     * and how the author will manipulate the block's attributes.
     * */
    edit: ({attributes, setAttributes}) => {
        return (
            <div>
                {/* The ServerSideRender component displays the block in the editor
                  * with the same html that will render on the front-end of WordPress.
                  * It accomplishes this with a call to the server to render the block, hence the name.
                  * */ }
                <ServerSideRender
                    block="block-environment/fortune-display"
                    attributes={ attributes }
                />
                {/* The InspectorControls component allows us to edit
                  * what the right side of the Block Editor looks like
                  * when the author select the block.
                  * */}
                <InspectorControls>
                    <Panel>
                        <PanelBody>
                            <PanelRow>
                                {/* TextControl is a component for grabbing a string of text from the author.
                                  * The label property is the label that appears above the component's field.
                                  * The value property is tied to the block's prefix attribute.
                                  * The function specified in onChange fires whenever the user changes the value of the field.
                                  * In this case, the function will set the block's prefix attribute to the newest value of the field.
                                  * */ }
                                <TextControl 
                                    label="Prefix"  
                                    value={ attributes.prefix }  
                                    onChange={ (newValue) => setAttributes( { prefix: newValue } ) }
                                />
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
            </div>
        )   
    },
    /* save: this property handles how the block appears on the front-end of WordPress.
     * In this case, we return null, as we're rendering this block with PHP.
     * */
    save: (props) => null
});