<?php
/* fortune-display.php
 * The PHP configuration file for the Fortune Display block.
 * This block will display a random fortune from the current site's
 * collection of fortune custom posts.
 * 
 * This block includes the code necessary for tying all required
 * scripts and styles to the Fortune Display block. It also includes
 * a render function that will grab post information and display it
 * on the front-end of WordPress.
 * */

namespace block_environment\fortune_display;

// Block initialization function
function init() {

	// If site doesn't have block functionality, don't register the block.
	if ( ! function_exists( 'register_block_type' ) ) {
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
		'fortune-display-script',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-components',
			'wp-block-editor',
			'wp-server-side-render' // Necessary block packages (see top of src/index.js).
		),
		filemtime( "$dir/$index_js" ) // If file changes, this will tell WP to not use the cached script.
	);

	// Just like we registered the editor script, we need to register any editing styles.
	$editor_css = 'dist/style.css';
	wp_register_style(
		'fortune-display-style',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	// We register the front-end styling, too. If we had front-end JS, same thing.
	$style_css = 'dist/editor.css';
	wp_register_style(
		'fortune-display-editor-style',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	// With all our scripts and styles registered, we can register the block itself.
	register_block_type(
		'block-environment/fortune-display', // Block's name. generally "plugin/block". Must match name in src/index.js.
		array(
			// Just add the names you registered for the editor script and editor style.
            'editor_script' => 'fortune-display-script',
			'editor_style' => 'fortune-display-editor-style',
			'style' => 'fortune-display-style',
			'render_callback' => 'block_environment\fortune_display\render', // See bottom of this file.

			// The attributes should be the same as you provided in src/index.js.
			'attributes' => array(
				'prefix' => array(
					'type' => 'string',
					'default' => 'Fortune'
				),
			),
			
		)
	);
}

// Make sure to load the block initialization function on init.
add_action( 'init', 'block_environment\fortune_display\init' );

// The render function for the block.
function render( $attributes ) {
	
	// Grab all published fortunes.
	$allFortunes = get_posts( array(
		'post_type' => 'fortune',
		'posts_per_page' => -1,
		'post_status' => 'publish'
	) );

	// If we have no fortunes, return nothing.
	if ( empty( $allFortunes ) ) {
		return '';
	}

	// Select a random fortune from the list.
	$fortune = $allFortunes[rand( 0, ( count( $allFortunes ) - 1 ) )];

	// Grab the prefix from our block attributes.
	$prefix = $attributes['prefix'];

	// Strip any tags from the post that aren't strong or em (should be a lone paragraph tag).
	$theFortune = strip_tags( $fortune->post_content, '<strong> <em>' );

	// Wrap the fortune in html that includes the prefix.
	$html = "<div class='wp-block-fortune'>
		<p><span class='prefix'>" . $prefix . ":</span> " . $theFortune . "</p>
	</div>";

	/* Return the block html. 
	 * This value is what the block will render out as on the front-end of WordPress.
	 * */
	return $html;
}