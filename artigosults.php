<?php
/**
 * Plugin Name: ArtigoSults
 * Description: Sistema editorial.
 * Version: 0.1.0
 * Author: SULTS
 */

if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * 1. Carrega o Autoloader do Composer
 */
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

/**
 * 2. Inicializa o Plugin
 */
function artigosults_run() {
    if ( class_exists( 'ArtigoSults\\Core\\Plugin' ) ) {
        ( new ArtigoSults\Core\Plugin() )->run();
    }
}

artigosults_run();