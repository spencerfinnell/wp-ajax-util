/* global wp */

( function() {
  // Get our form.
  var customForm = document.getElementById( 'custom-form' );

  if ( ! customForm ) {
    return;
  }

  // Listen for submission.
  customForm.addEventListener( 'submit', function( e ) {
    e.preventDefault();

    // Find where to output a response.
    var responseContainer = document.getElementById( 'custom-form-response' );

    // Send a POST AJAX request.
    // This automatically references the correct AJAX URL.
    wp.ajax.send( 'wp-ajax-example', {

      // Pass data to request.
      data: {
        fieldValue: document.getElementById( 'custom-field' ).value,
      },

      // What is called when wp_send_json_success( array( 'message' => 'My Message' ) ) is returned.
      // The PHP array is automatically mapped to the value passed to the function.
      success: function( response ) {
        responseContainer.style.color = 'green';
        responseContainer.innerHTML = response.message;
      },

      // What is called when wp_send_json_error() is returned.
      // What is called when there is a network issue.
      error: function( response ) {
        responseContainer.style.color = 'red';

        // What is called when wp_send_json_error( '', 500 ) is returned.
        if ( response.status ) {
          responseContainer.innerHTML = response.responseJSON.data.message;

        // What is called when wp_send_json_error() is returned.
        } else {
          responseContainer.innerHTML = response.message;
        }
      },
    } );
  } );
} )();
