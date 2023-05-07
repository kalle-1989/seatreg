<?php
    function seatreg_shortcode( $atts ){
        $registrations = SeatregRegistrationRepository::getRegistrations();
        $shortcodeAtts = shortcode_atts( array(
            'code' =>  (is_array($registrations) && count($registrations)) ? $registrations[0]->registration_code : null,
            'height' => '700',
        ), $atts );
        $site_url = get_site_url();
        
        return "<iframe id='seatregFrameID' height='". (int)$shortcodeAtts['height'] . 'px' ."' style='width:100%' src='". $site_url ."/?seatreg=registration&c=". $shortcodeAtts['code'] ."'></iframe>";
    }
    add_shortcode( 'seatreg', 'seatreg_shortcode' );