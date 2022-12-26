<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

function seatreg_generate_registration_strings() {
	$translations = new stdClass();
	$translations->illegalCharactersDetec = esc_html__('Illegal characters detected', 'seatreg');
	$translations->emailNotCorrect = esc_html__('Email address is not correct', 'seatreg');
	$translations->somethingWentWrong = esc_html__('Something went wrong. Please try again', 'seatreg');
	$translations->selectionIsEmpty = esc_html__('Seat selection is empty', 'seatreg');
    $translations->selectionIsEmptyPlace = esc_html__('Place selection is empty', 'seatreg');
    $translations->youCanAdd_ = esc_html__('You can add ', 'seatreg');
    $translations->_toCartClickTab = esc_html__(' to selection by selecting boxes', 'seatreg');
	$translations->toCartClickTab = esc_html__(' to selection by clicking/tabbing them', 'seatreg');
	$translations->regClosedAtMoment = esc_html__('Registration is closed at the moment', 'seatreg');
	$translations->confWillBeSentTo = esc_html__('Confirmation will be sent to:', 'seatreg');
	$translations->confWillBeSentTogmail = esc_html__('Confirmation will be sent to (Gmail):', 'seatreg');
	$translations->gmailReq = esc_html__('Email (Gmail required)', 'seatreg');
	$translations->_fromRoom_ = esc_html__(' from room ', 'seatreg');
	$translations->_toSelection = esc_html__(' to booking?', 'seatreg');
	$translations->_isOccupied = esc_html__(' is occupied', 'seatreg');
	$translations->_isPendingState = esc_html__(' is in pending state', 'seatreg');
	$translations->regOwnerNotConfirmed = esc_html__('(registration admin has not confirmed it)', 'seatreg');
	$translations->selectionIsFull = esc_html__('Booking is full', 'seatreg');
    $translations->_isAlreadySelected = esc_html__(' is already selected!', 'seatreg');
	$translations->_regUnderConstruction = esc_html__('Under construction', 'seatreg');
	$translations->emptyField = esc_html__('Empty field', 'seatreg');
	$translations->remove = esc_html__('Remove', 'seatreg');
	$translations->add_ = esc_html__('Add ', 'seatreg');
	$translations->openSeatsInRoom_ = esc_html__('Open seats in the room: ', 'seatreg');
    $translations->openPlacesInRoom_ = esc_html__('Open places in the room: ', 'seatreg');
	$translations->pendingSeatInRoom_ = esc_html__('Pending bookings in the room: ', 'seatreg');
	$translations->confirmedSeatInRoom_ = esc_html__('Approved bookings in the room: ', 'seatreg');
	$translations->seat = esc_html__('seat', 'seatreg');
    $translations->place = esc_html__('place', 'seatreg');
	$translations->firstName = esc_html__('Firstname', 'seatreg');
	$translations->lastName = esc_html__('Lastname', 'seatreg');
	$translations->eMail = esc_html__('Email', 'seatreg');
	$translations->this_ = esc_html__('This ', 'seatreg');
    $translations->_selected = esc_html__(' selected', 'seatreg');
    $translations->_seatSelected = esc_html__(' seat selected', 'seatreg');
    $translations->_seatsSelected = esc_html__(' seats selected', 'seatreg');
    $translations->_placeSelected = esc_html__(' place selected', 'seatreg');
    $translations->_placesSelected = esc_html__(' places selected', 'seatreg');
    $translations->bookingsConfirmed = esc_html__('Your booking is approved', 'seatreg');
    $translations->bookingsConfirmedPending = esc_html__('Your booking is now in pending state. Registration admin needs to approve it', 'seatreg');
    $translations->selectingGuide = esc_html__('Select a seat you want to add to booking', 'seatreg');
    $translations->selectingGuidePlace = esc_html__('Select a place you want to add to booking', 'seatreg');
    $translations->Booked = esc_html__('Booked', 'seatreg');
    $translations->Pending = esc_html__('Pending', 'seatreg');
    $translations->maxSeatsToAdd = esc_html__('Total seats you can add to booking is ', 'seatreg');
    $translations->maxPlacesToAdd = esc_html__('Total places you can add to booking is ', 'seatreg');
    $translations->seatCosts_ = esc_html__('Booking this seat costs ', 'seatreg');
    $translations->placeCosts_ = esc_html__('Booking this place costs ', 'seatreg');
    $translations->bookingTotalCostIs_ = esc_html__('Booking total cost is ', 'seatreg');
    $translations->receiptSent = esc_html__('Booking receipt has been sent to your email', 'seatreg');
    $translations->payForBookingLink = esc_html__('Click the following link to pay for the booking', 'seatreg');
    $translations->yes = esc_html__('Yes', 'seatreg');
    $translations->no = esc_html__('No', 'seatreg');
    $translations->seatIsLocked = esc_html__('Seat is locked', 'seatreg');
    $translations->placeLocked = esc_html__('Place is locked', 'seatreg');
    $translations->pleaseEnterPassword = esc_html__('Please enter password', 'seatreg');
    $translations->passwordNotCorrect = esc_html__('Password is not correct', 'seatreg');

	return $translations;
}

function seatreg_generate_admin_strings() {
    $translations = new stdClass();
    $translations->hoverDeleteSuccess = esc_html__('Hover text deleted', 'seatreg');
    $translations->hoverTextAdded = esc_html__('Hover text added', 'seatreg');
    $translations->legendNameChanged = esc_html__('Legend name changed', 'seatreg');
    $translations->legendColorChanged = esc_html__('Legend color changed', 'seatreg');
    $translations->buildingGridUpdated = esc_html__('Building grid updated', 'seatreg');
    $translations->roomNameChanged = esc_html__('Room name changed', 'seatreg');
    $translations->roomNameSet = esc_html__('New room added', 'seatreg');
    $translations->roomNotExist = esc_html__('Room does not exist', 'seatreg');
    $translations->seatNotExist = esc_html__('Seat does not exist', 'seatreg');
    $translations->seatIdNotExist = esc_html__('Seat id dose not exist', 'seatreg');
    $translations->seatAlreadyBookedPending = esc_html__('Seat is already booked/pending', 'seatreg');
    $translations->errorBookingUpdate = esc_html__('Error updating booking', 'seatreg');
    $translations->hoverError = esc_html__('Error while creating hover', 'seatreg');
    $translations->legendChangeError = esc_html__('Error while changing legend', 'seatreg');
    $translations->legendNameTaken = esc_html__('Legend name is taken', 'seatreg');
    $translations->lagendNameMissing = esc_html__('Legend name missing!', 'seatreg');
    $translations->legendColorTaken = esc_html__('Legend color is taken. Choose another', 'seatreg');
    $translations->legendAddedTo = esc_html__('Legend added to', 'seatreg');
    $translations->oneRoomNeeded = esc_html__('You must have at least on room', 'seatreg');
    $translations->alreadyInRoom = esc_html__('Already in this room', 'seatreg');
    $translations->allRoomsNeedName = esc_html__('All rooms must have name', 'seatreg');
    $translations->illegalCharactersDetec = esc_html__('Illegal characters detected', 'seatreg');
    $translations->missingName = esc_html__('Name missing', 'seatreg');
    $translations->cantDelRoom_ = esc_html__('You can\'t delete room ', 'seatreg');
    $translations->_cantDelRoomBecause = esc_html__(' because it contains pending or confirmed seats. You must remove them with manager first.', 'seatreg');
    $translations->roomNameMissing = esc_html__('Room name missing', 'seatreg');
    $translations->roomNameExists = esc_html__('Room name already exists. You must choose another', 'seatreg');
    $translations->youHaveSelected = esc_html__('You have selected', 'seatreg');
    $translations->_boxesSpanLi = esc_html__(' box/boxes</span></li>', 'seatreg');
    $translations->toSelectOneBox_ = esc_html__('To select one box use ', 'seatreg');
    $translations->toSelectMultiBox_ = esc_html__('To select multiple boxes use ', 'seatreg');
    $translations->selectBoxesToAddHover = esc_html__('Select box/boxes to add hover text', 'seatreg');
    $translations->selectBoxesToAddColor = esc_html__('Select box/boxes to add color', 'seatreg');
    $translations->loading = esc_html__('Loading...', 'seatreg');
    $translations->selectBoxesToDelete = esc_html__('Select box/boxes you want to delete', 'seatreg');
    $translations->colorApplied = esc_html__('Color applied', 'seatreg');
    $translations->noLegendsCreated = esc_html__('You have not made and legends yet', 'seatreg');
    $translations->_noSelectBoxToAddLegend = esc_html__(' You have not selected any box/boxes to add legends', 'seatreg');
    $translations->_charRemaining = esc_html__(' characters remaining', 'seatreg');
    $translations->deleteRoom_ = esc_html__('Are you sure you want to delete room ', 'seatreg');
    $translations->unsavedChanges = esc_html__('Unsaved changes. You sure you want to leave?', 'seatreg');
    $translations->createLegend = esc_html__('Create new legend', 'seatreg');
    $translations->cancelLegendCreation = esc_html__('Cancel legend creation', 'seatreg');
    $translations->chooseLegend = esc_html__('Choose legend', 'seatreg');
    $translations->enterLegendName = esc_html__('Enter legend name', 'seatreg');
    $translations->ok = esc_html__('Ok', 'seatreg');
    $translations->cancel = esc_html__('Cancel', 'seatreg');
    $translations->open = esc_html__('Open', 'seatreg');
    $translations->boxes = esc_html__('boxes', 'seatreg');
    $translations->box = esc_html__('box', 'seatreg');
    $translations->noBoxesSelected = esc_html__('No boxes selected', 'seatreg');
    $translations->pendingSeat = esc_html__('Pending seat', 'seatreg');
    $translations->pendingPlace = esc_html__('Pending place', 'seatreg');
    $translations->confirmedSeat = esc_html__('Approved seat', 'seatreg');
    $translations->confirmedPlace= esc_html__('Approved place', 'seatreg');
    $translations->save = esc_html__('Save', 'seatreg');
    $translations->saving = esc_html__('Saving...', 'seatreg');
    $translations->saved = esc_html__('Saved', 'seatreg');
    $translations->room = esc_html__('room', 'seatreg');
    $translations->bookingUpdated = esc_html__('Booking updated', 'seatreg');
    $translations->notSet = esc_html__('Not set', 'seatreg');
    $translations->enterRegistrationName = esc_html__('Please enter registration name', 'seatreg');
    $translations->registrationNameLimit = esc_html__('Name must be between 1-255 characters', 'seatreg');
    $translations->pleaseEnterName = esc_html__('Please enter name', 'seatreg');
    $translations->pleaseEnterOptionValue = esc_html__('Please enter option value', 'seatreg');
    $translations->areYouSure = esc_html__('Are you sure?', 'seatreg');
    $translations->pleaseAddAtLeastOneOption = esc_html__('Please add at least one option', 'seatreg');
    $translations->nameAlreadyUsed = esc_html__('Name already used', 'seatreg');
    $translations->noBgImageInRoom = esc_html__('Current room does not have background image', 'seatreg');
    $translations->removeFromRoom = esc_html__('Remove from room', 'seatreg');
    $translations->choosePictureToUpload = esc_html__('Choose a picture to upload', 'seatreg');
    $translations->imageNameIllegalChar = esc_html__('Image name contains illegal characters', 'seatreg');
    $translations->addToRoomBackground = esc_html__('Add to room background', 'seatreg');
    $translations->remove = esc_html__('Remove', 'seatreg');
    $translations->showPendingBookings = esc_html__('Show pending bookins', 'seatreg');
    $translations->showApprovedBookings = esc_html__('Show approved bookings', 'seatreg');
    $translations->pleaseEnterPayPalBusinessEmail = esc_html__('Please enter PayPal business email', 'seatreg');
    $translations->pleaseEnterPayPalButtonId = esc_html__('Please enter PayPal button id', 'seatreg');
    $translations->pleaseEnterPayPalCurrencyCode = esc_html__('Please enter currency code', 'seatreg');
    $translations->pleaseEnterStripeApiKey = esc_html__('Please enter Stripe API key', 'seatreg');
    $translations->pricesAdded = esc_html__('Prices added', 'seatreg');
    $translations->noSeatsSelected = esc_html__('No seats/places selected!', 'seatreg');
    $translations->emailNotCorrect = esc_html__('Email address is not correct', 'seatreg');
    $translations->checkEmailAddress = esc_html__('Check your email address', 'seatreg');
    $translations->emailSendingFailed= esc_html__('Email sending failed', 'seatreg');
    $translations->pealseWait= esc_html__('Please wait', 'seatreg');
    $translations->yes = esc_html__('Yes', 'seatreg');
    $translations->no = esc_html__('No', 'seatreg');
    $translations->noActivityLogged = esc_html__('No activity logged', 'seatreg');
    $translations->bookingStatusUpdated = esc_html__('Booking status updated', 'seatreg');
    $translations->newBookingWasAddedRefreshingThaPage = esc_html__('Booking was added. Page will refresh in a second', 'seatreg');
    $translations->duplicateSeatDetected = esc_html__('Duplicate seat detected!', 'seatreg');
    $translations->emailTemplateNotCorrect = esc_html__('Email template is missing required keywords', 'seatreg');
    $translations->lockSeat = esc_html__('Lock seat', 'seatreg');
    $translations->setPassword = esc_html__('Set password', 'seatreg');
    $translations->changesApplied = esc_html__('Changes applied', 'seatreg');

    return $translations;
}