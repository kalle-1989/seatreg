<?php

function seatreg_generate_registration_stringes() {
	$translations = new stdClass();
	$translations->illegalCharactersDetec = __('Illegal characters detected', 'seatreg');
	$translations->emailNotCorrect = __('Email address is not correct', 'seatreg');
	$translations->wrongCaptcha = __('Wrong code!', 'seatreg');
	$translations->somethingWentWrong = __('Something went wrong. Please try again', 'seatreg');
	$translations->selectionIsEmpty = __('Selection is empty', 'seatreg');
	$translations->youCanAdd_ = __('You can add ', 'seatreg');
	$translations->toCartClickTab = __(' to selection by clicking/tabbing them', 'seatreg');
	$translations->regClosedAtMoment = __('Registration is closed at the moment', 'seatreg');
	$translations->confWillBeSentTo = __('Confirmation will be sent to:', 'seatreg');
	$translations->confWillBeSentTogmail = __('Confirmation will be sent to (Gmail):', 'seatreg');
	$translations->gmailReq = __('Email (Gmail required)', 'seatreg');
	$translations->_fromRoom_ = __(' from room ', 'seatreg');
	$translations->_toSelection = __(' to selection?', 'seatreg');
	$translations->_isOccupied = __(' is occupied', 'seatreg');
	$translations->_isPendingState = __(' is in pending state', 'seatreg');
	$translations->regOwnerNotConfirmed = __('(registration owner has not confirmed it yet)', 'seatreg');
	$translations->selectionIsFull = __('Selection is full', 'seatreg');
	$translations->_isAlreadyInCart = __(' is already in cart!', 'seatreg');
	$translations->_regUnderConstruction = __('Registration under construction', 'seatreg');
	$translations->emptyField = __('Empty field', 'seatreg');
	$translations->remove = __('Remove', 'seatreg');
	$translations->add_ = __('Add ', 'seatreg');
	$translations->openSeatsInRoom_ = __('Open seats in room: ', 'seatreg');
	$translations->pendingSeatInRoom_ = __('Pending seats in room: ', 'seatreg');
	$translations->confirmedSeatInRoom_ = __('Confirmed seats in room: ', 'seatreg');
	$translations->seat = __('Seat', 'seatreg');
	$translations->firstName = __('Firstname', 'seatreg');
	$translations->lastName = __('Lastname', 'seatreg');
	$translations->eMail = __('Email', 'seatreg');
	$translations->this_ = __('This', 'seatreg');
    $translations->_selected = __(' selected', 'seatreg');

	return $translations;
}

function seatreg_generate_admin_strings() {
    $translations = new stdClass();
    $translations->hoverDeleteSuccess = __('Hover text deleted', 'seatreg');
    $translations->hoverTextAdded = __('Hover text added', 'seatreg');
    $translations->legendNameChanged = __('Legend name changed', 'seatreg');
    $translations->legendColorChanged = __('Legend color changed', 'seatreg');
    $translations->buildingGridUpdated = __('Building grid updated', 'seatreg');
    $translations->roomNameChanged = __('Room name changed', 'seatreg');
    $translations->roomNameSet = __('New Room added', 'seatreg');
    $translations->roomNotExist = __('Room does not exist', 'seatreg');
    $translations->seatNotExist = __('Seat dose not exist', 'seatreg');
    $translations->seatAlreadyBookedPending = __('Seat is already booked/pending', 'seatreg');
    $translations->errorBookingUpdate = __('Error updating booking', 'seatreg');
    $translations->hoverError = __('Error while creating hover', 'seatreg');
    $translations->legendChangeError = __('Error while changing legend', 'seatreg');
    $translations->legendNameTaken = __('Legend name is taken', 'seatreg');
    $translations->lagendNameMissing = __('Legend name missing!', 'seatreg');
    $translations->legendColorTaken = __('Legend color is taken. Choose another', 'seatreg');
    $translations->legendAddedTo_ = __('Legend added to ', 'seatreg');
    $translations->noPermToAddRoom = __('Dont have permissions to create room', 'seatreg');
    $translations->noPermToDel = __('Dont have permission do delete', 'seatreg');
    $translations->oneRoomNeeded = __('You must have at least on room', 'seatreg');
    $translations->alreadyInRoom = __('Already in this room', 'seatreg');
    $translations->allRoomsNeedName = __('All rooms must have name', 'seatreg');
    $translations->illegalCharactersDetec = __('Illegal characters detected', 'seatreg');
    $translations->missingName = __('Name missing', 'seatreg');
    $translations->cantDelRoom_ = __('You cant delete room ', 'seatreg');
    $translations->_cantDelRoomBecause = __(' because it contains pending or confirmed seats. You must remove them with manager first.', 'seatreg');
    $translations->roomNameMissing = __('Room name missing', 'seatreg');
    $translations->roomNameExists = __('Room name already exists. You must choose another', 'seatreg');
    $translations->liYouHaveSelectedSpan_ = __('<li>You have selected <span> ', 'seatreg');
    $translations->_boxesSpanLi = __(' box/boxes</span></li>', 'seatreg');
    $translations->toSelectOneBox_ = __('To select one box use ', 'seatreg');
    $translations->toSelectMultiBox_ = __('To select multiply boxes use ', 'seatreg');
    $translations->selectBoxesToAddHover = __('Select box/boxes to add hover text', 'seatreg');
    $translations->loading = __('Loading...', 'seatreg');
    $translations->selectBoxesToDelete = __('Select box/boxes you want to delete', 'seatreg');
    $translations->onlyPremMembUpImg = __('Only premium members can upload background-image', 'seatreg');
    $translations->fixNeededToSave = __('Fix needed to save!', 'seatreg');
    $translations->boxLimitExceeded = __('Box limit exeeded', 'seatreg');
    $translations->colorApplied = __('Color applied', 'seatreg');
    $translations->noLegendsCreated = __('You have not made and legends yet', 'seatreg');
    $translations->_noSelectBoxToAddLegend = __(' You have not selected any box/boxes to add legends', 'seatreg');
    $translations->_charRemaining = __(' characters remaining', 'seatreg');
    $translations->deleteRoom_ = __('Are you sure you want to delete room ', 'seatreg');
    $translations->unsavedChanges = __('Unsaved changes. You sure you want to leave?', 'seatreg');
    $translations->createLegend = __('Create new legend', 'seatreg');
    $translations->cancelLegendCreation = __('Cancel legend creation', 'seatreg');
    $translations->chooseLegend = __('Choose legend', 'seatreg');
    $translations->enterLegendName = __('Enter legend name', 'seatreg');
    $translations->ok = __('Ok', 'seatreg');
    $translations->cancel = __('Cancel', 'seatreg');
    $translations->unsavedChanges = __('Unsaved Changes', 'seatreg');
    $translations->_boxes = __(' boxes', 'seatreg');
    $translations->pendingSeat = __('Pending seat', 'seatreg');
    $translations->confirmedSeat = __('Confirmed seat', 'seatreg');
    $translations->save = __('Save', 'seatreg');
    $translations->saving = __('Saving...', 'seatreg');
    $translations->saved = __('Saved...', 'seatreg');
    $translations->room = __('room', 'seatreg');
    $translations->bookingUpdated = __('Booking updated', 'seatreg');
    $translations->notSet = __('Not set', 'seatreg');
    $translations->enterRegistrationName = __('Please enter registration name', 'seatreg');
    $translations->registrationNameLimit = __('Name must be between 1-255 characters', 'seatreg');


    return $translations;
}