jQuery(document).ready(function($) {

	/**
	 *	Process request to dismiss our admin notice
	 */
	$('#jetpack-notice .notice-dismiss').click(function() {

		//* Data to make available via the $_POST variable
		data = {
			action: 'ixion_jetpack_admin_notice',
			ixion_jetpack_admin_nonce: ixion_jetpack_admin.ixion_jetpack_admin_nonce
		};

		//* Process the AJAX POST request
		$.post( ajaxurl, data );

		return false;
	});
});