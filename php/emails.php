<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

function seatreg_send_booking_notification_email($registrationName, $bookedSeatsString, $emailAddress) {
    $message = esc_html__("Hello", 'seatreg') . "<br>" . sprintf(esc_html__("This is a notification email telling you that %s has a new booking", "seatreg"), esc_html($registrationName) ) . "<br><br> $bookedSeatsString <br><br>" . esc_html__("You can disable booking notification in options if you don't want to receive them.", "seatreg");
    $adminEmail = get_option( 'admin_email' );

    wp_mail($adminEmail, "$registrationName has a new booking", $message, array(
        "Content-type: text/html",
        "FROM: $adminEmail"
    ));
}