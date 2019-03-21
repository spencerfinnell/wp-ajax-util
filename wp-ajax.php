<?php
/**
 * Plugin Name: WordPress AJAX Example.
 * Plugin Description: Example usage of wp.send https://github.com/WordPress/WordPress/blob/master/wp-includes/js/wp-util.js#L69
 */

add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_script(
    'wp-ajax-example',
    plugin_dir_url( __FILE__ ) . 'wp-ajax.js',
    [
      'wp-util',
    ],
    time(),
    true
  );
} );

add_action( 'wp_footer', function() {
?>

<form id="custom-form" method="post" action="">

  <div id="custom-form-response"></div>

  <input type="text" id="custom-field" name="custom-field" />
  <input type="submit" name="submit" />

</form>

<?php
} );

add_action( 'wp_ajax_wp-ajax-example', function() {
  $value = sanitize_text_field( $_POST[ 'fieldValue' ] );

  if ( '' === $value ) {
    return wp_send_json_error( [
      'message' => 'The field cannot be empty',
    ] );
  }

  if ( 'testing' === $value ) {
    return wp_send_json_error( [
      'message' => 'That is a lame value.',
    ], 401 );
  }

  return wp_send_json_success( [
    'message' => sprintf( 'Awesome value of: %s', $value ),
  ] );
} );
