<?php
/*
Plugin Name: Block Environment Plugin
Plugin Author: Steven Graboski
Version: 1
Description: An environment for creating WordPress Blocks
*/

namespace block_environment;

// Include the PHP configuration files for the blocks you write with this plugin.
require_once 'blocks/presentation/presentation.php';
require_once 'blocks/fortune-display/fortune-display.php';
