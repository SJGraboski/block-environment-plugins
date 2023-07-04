/* src/index.js
 * This file includes the code we write for telling WordPress
 * how the block should behave in the Block Editor.
 * */

// Grabs registerBlockType from wp.blocks (wp-blocks package, see presentation.php)
const { registerBlockType } = wp.blocks;

/* Grabs components for laying out the block and manipulating attributes.
 * These are all part of wp.blockEditor (wp-block-editor package, see presentation.php)
 * */
const {
	RichText,
    InnerBlocks,
    InspectorControls,
} = wp.blockEditor;

/* Grabs more components for laying out the block and manipulating attributes.
 * These are all part of wp.components (wp-components package, see presentation.php)
 * */
const {
	ToggleControl,
    Panel,
    PanelRow,
    PanelBody
} = wp.components;

/* This is where we register the block in our JavaScript.
 * Arg 1 is the name of the block. Generally 'plugin/block'.
 * Make sure you use the same name in your PHP file (see presentation.php)
 * */
registerBlockType('block-environment/presentation', 
{
    title: 'Presentation',
    category: 'text',
    attributes: {
        featured: {
            type: 'boolean',
            default: false
        },
        /* Since the text attributes will be part of the rendered HTML, 
         * we source them there. See the save property at the end of this file.
         * */
        title: {
            type: 'string',
            default: '',
            source: 'html',
            selector: '.title'
        },
        description: {
            type: 'string',
            default: '',
            source: 'html',
            selector: '.description'
        },
    },

    /* edit: this property handles how the block appears in the editor, 
     * and how the author will manipulate the block's attributes.
     * */
    edit: ({attributes, setAttributes}) => {
        return (
            <div>
                <p><strong>Presentation Details</strong></p>
                <div className="presentation-title">
                    {/* The RichText component appears as a single editable paragraph.
                      * The placeholder and tagName properties control the block's appearance in the editor.
                      * The value attribute is the value that should display. We tie it to our title attribute.
                      * onChange occurs whenever the author types anything in the field. When that happens,
                      * we use WordPress's setAttributes property to set the titlte attribute to the new value}
                      * */}
                    <RichText
                        placeholder="Enter the Presentation's Title"
                        tagName='h2'
                        value={attributes.title}
                        onChange={(newValue) => setAttributes({ title: newValue })}
                    />
                </div>
                <div className="presentation-description">
                    {/* The InnerBlocks Component allows us to add as many blocks as we need. 
                      * See the save property for how we keep track of this Component's value.
                      * */}
                    <InnerBlocks />
                </div>
                {/* The InspectorControls component allows us to edit
                  * what the right side of the Block Editor looks like
                  * when the author select the block.
                  * */}
                <InspectorControls>
                    <Panel>
                        <PanelBody>
                            <PanelRow>
                                {/* ToggleControl will appear as an on-and-off switch in the Block Editor.
                                  * The label property is the label that will appear above the field.
                                  * The value property will be a boolean, controlling whether the switch is on or off.
                                  * onChange will fire whenever the user activates the toggle. When they do, 
                                  * we tell setAttributes to take the current boolean value of the block's featured attribute,
                                  * and reverse it (false becomes true, true becomes false)
                                  * */}
                                <ToggleControl 
                                    label="Is This Featured?"  
                                    value={ attributes.featured }  
                                    onChange={ () => setAttributes( { featured: !attributes.featured } ) }
                                />
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
            </div>
        )   
    },

    /* save: this property handles how the block appears 
     * on the front-end of WordPress. See the source properties 
     * of the title and description attributes to see 
     * how we keep track of those values.
     * */
    save: ({attributes}) => {
        return (
            <div 
                className={ attributes.featured
                    ? 'wp-block-presentation featured-presentation'
                    : 'wp-block-presentation'
                }
            >
                <RichText.Content 
                    tagName="h2" 
                    className="title" 
                    value={ attributes.featured 
                        ? "Featured: " + attributes.title 
                        : attributes.title} 
                />
                <div className="description">
                    <InnerBlocks.Content />
                </div>
            </div>
        )
	}
});