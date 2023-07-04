<?php
/* presentation.php
 * The PHP configuration file for the Presentation block.
 * This block will display presentation information for the user.
 * 
 * This block includes the code necessary for tying all required
 * scripts and styles to the Presentation block.
 * */

namespace example_block\presentation;

// Block initialization function
function init() {

	// If site doesn't have block functionality, don't register the block.
	if ( !function_exists( 'register_block_type' ) ) {
		return;
	}

	// Grab the current directory path, based on this PHP file.
	$dir = dirname( __FILE__ );

	/* index.js: file we use for telling the Block Editor how the block works.
	 * When transpiled, the file we need will be located in the dist folder.
	 * */
	$index_js = 'dist/index.js';

	// Register this block's editor script with WordPress.
	wp_register_script(
		'presentation-script',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-components',
			'wp-block-editor' // Necessary block packages (see top of src/index.js).
		),
		filemtime( "$dir/$index_js" ) // if file changes, this will tell WP to not use the cached script.
	);

	// Just like we registered the editor script, we need to register any editing styles.
	$editor_css = 'dist/editor.css';
	wp_register_style(
		'presentation-style',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	// With all our scripts and styles registered, we can register the block itself.
	register_block_type(
		'block-environment/presentation', // Block's name. generally "plugin/block". Must match name in src/index.js.
		array(
			// Just add the names you registered for the editor script and editor style.
            'editor_script' => 'presentation-script',
            'editor_style' => 'presentation-style',

			// The attributes should be the same as you provided in src/index.js.
			'attributes' => array(
				'featured' => array(
					'type' => 'boolean',
					'default' => false
				),
				'title' => array(
					'type' => 'string',
					'default' => '',
					'source' =>'html',
					'selector' => '.title'
				),
				'description' => array(
					'type' => 'string',
					'default' => '',
					'source' => 'html',
					'selector' => '.description'
				),
			)
		)
	);
}

// Make sure to load the block initialization function on init.
add_action( 'init', 'example_block\presentation\init' );
