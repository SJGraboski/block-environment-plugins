<?php

/*
Plugin Name: Fortune Post
Plugin Author: Steven Graboski
Version: 1
Description: Create a Fortune Custom Post Type and two default fortunes. For use with the Fortune Display block example of the Block Environment plugin 
*/

// Register the fortune custom post type.
function register_custom_post_type() {
	
    // Create a custom post type. In the editor, only allow a single paragraph element (see "template" and "template lock" properties).
	$fortuneArgs = array(
		'labels'          => array(
			'name'          => 'Fortune',
			'singular_name' => 'Fortune',
			'add_new_item'  => 'Add a Fortune',
			'edit_item'     => 'Edit This Fortune',
		),
		'public'          => true,
		'publicly_queryable'  => true,
		'show_in_rest'    => true,
		'has_archive'     => true,
		'capability_type' => 'post',
		'supports'        => array('revisions', 'editor', 'custom-fields', 'title'),
		'template'        => array(
			array('core/paragraph', array()),
		),
		'template_lock'   => 'all',
	);
	register_post_type( 'fortune', $fortuneArgs );

    // Check for the existence of a published Fortune. If none, insert these two.
    $fortuneCount = wp_count_posts( 'fortune' );
    if ( !isset( $fortuneCount->publish ) || $fortuneCount->publish == 0 ) {
        wp_insert_post( array( 
            'post_type' => 'fortune',
            'post_title' => 'Good Fortune',
            'post_content' => "<!-- wp:paragraph -->
                <p>Good Fortune Awaits</p>
                <!-- /wp:paragraph -->",
            'post_status' => 'publish'
        ) );

        wp_insert_post( array( 
            'post_type' => 'fortune',
            'post_title' => 'Bad Fortune',
            'post_content' => "<!-- wp:paragraph -->
                <p>Uh oh, things aren't looking so great in the future!</p>
                <!-- /wp:paragraph -->",
            'post_status' => 'publish'
        ) );
    }
}
add_action( 'init', 'block_environment\register_custom_post_type' );