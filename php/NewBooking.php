<?php

//===========
/*for confirm seat selection*/
//===========

require_once('Booking.php');
require_once('emails.php');
require_once('./util/registration_time_status.php');

class NewBooking extends Booking {
	public $reply;
	protected $_valid = true;
	protected $_confirmationCode;
	protected $_bookings;
	protected $_registrationLayout;
	protected $_registrationCode;
	protected $_registrationStartTimestamp;
	protected $_registrationEndTimestamp;
	protected $_registrationPassword = null;  //registration password if set. null default
	protected $_isRegistrationOpen = true;
	protected $_bookindId;
	protected $_registrationOwnerEmail;
	protected $_maxSeats = 1;  //how many seats per booking can be booked
	protected $_gmailNeeded = false;  //require gmail address from registrants
	
	public function __construct($code){
		$this->_confirmationCode = $code;
	}

	protected function getBookings() {
		//find out if confirmation code is in db and return all bookings with that code
		global $wpdb;
		global $seatreg_db_table_names;

		$rows = $wpdb->get_results( $wpdb->prepare(
			"SELECT * FROM $seatreg_db_table_names->table_seatreg_bookings
			WHERE conf_code = %s",
			$this->_confirmationCode
		) );

		if(count($rows) == 0) {
			$this->reply = 'Nothing to confirm.<br>This request is confirmed/expired/deleted.<br>';
			$this->_valid = false;
		}else {
			$this->_bookings = $rows; 
			$this->_registrationCode = $this->_bookings[0]->seatreg_code; 
			$this->_bookingId = $this->_bookings[0]->booking_id;
		}
	}

	public function confirmBookings() {
		global $wpdb;
		global $seatreg_db_table_names;

		$wpdb->update( 
			$seatreg_db_table_names->table_seatreg_bookings,
			array( 
				'status' => $this->_insertState
			), 
			array('booking_id' => $this->_bookingId), 
			'%d',
			'%s'
		);

		if($this->_insertState == 1) {
			echo 'Thank you. <br>';
			echo 'You booking is now in pending state. Registration owner must confirm it.<br><br>';
		}else {
			echo 'Thank you. <br>';
			echo 'You booking is now confirmed.<br><br>';
		}
		$seatsString = $this->generateSeatString();
		echo $seatsString;

		if($this->_sendNewBookingNotificationEmail) {
			sendBookingNotificationEmail($this->_registrationName, $seatsString, $this->_sendNewBookingNotificationEmail);
		}
	}

	public function startConfirm() {
		$this->getBookings();

		//1 step. Does confirmation code exist?
		if($this->_valid == false) {
			echo $this->reply;
			return;
		}

		//2 step. Get registration with options
		$this->getRegistrationAndOptions();

		//3 step. Is registtration open?
		if(!$this->_isRegistrationOpen) {
			echo 'Registration is closed at the moment';
			return;
		}
		$registrationTimeCheck = registrationTimeStatus($this->_registrationStartTimestamp, $this->_registrationEndTimestamp);
		if($registrationTimeCheck != 'run') {
			echo 'Registration is not open (time)';
			return;
		}

		//4 step. Check if all selected seats are ok
		$seatsStatusCheck = $this->doSeatsExistInRegistrationLayoutCheck();
		if($seatsStatusCheck != 'ok') {
			echo $seatsStatusCheck;
			return;
		}

		//5 step. Check if seat/seats is already bron or taken
		$seatsOpenCheck = $this->isAllSelectedSeatsOpen(); 
		if($seatsOpenCheck != 'ok') {
			echo $seatsOpenCheck;
			exit();
		}	

		//6 step. confirm bookings
		$this->confirmBookings();  //this also updates structure

		echo '<br/>Thank you';
	}
}