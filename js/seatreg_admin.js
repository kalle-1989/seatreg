(function($) {
	var canvasSupport = ($('html').hasClass('no-canvas') ? false : true);
	var bookingOrderInManager = null;
		
	//console.log('jQuery version: ' + $.fn.jquery);
	//console.log('jQUery UI version ' + $.ui.version);

	var translator = {
		translate: function(translationKey) {
			if(WP_Seatreg.translations && WP_Seatreg.translations.hasOwnProperty(translationKey)) {
				return WP_Seatreg.translations[translationKey];
			}
		}
	};

	window.seatreg = {
		builder: null,
		selectedRegistration: null,
		bookings: []
	};

	$('.time-stamp').each(function() {
		$(this).text(timeStampToDateString($(this).text()));
	});

	function seaterg_admin_ajax(action, code, data) {
		return $.ajax({
				url: ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: action,
					security: WP_Seatreg.nonce,
					code: code,
					data: data
				}
			});
	}

	function seaterg_admin_ajax2(action, code, data) {
		return $.ajax({
				url: ajaxurl,
				type: 'POST',
				data: {
					action: action,
					security: WP_Seatreg.nonce,
					code: code,
					data: data
				}
			});
	}

	function seatreg_edit_booking(action, code, editInfo ) {
		return $.ajax({
				url: ajaxurl,
				type: 'POST',
				data: {
					action: action,
					security: WP_Seatreg.nonce,
					code: code,
					fname: editInfo.firstName,
					lname: editInfo.lastName,
					room: editInfo.seatRoom,
					seatnumber: editInfo.seatNumber,
					seatid: editInfo.seatId,
					bookingid: editInfo.bookingId,
					customfield: editInfo.customFieldData,
					id: editInfo.id,
				}
			});
	}

	function seatreg_send_test_email(email) {
		return $.ajax({
			url: ajaxurl,
			type: 'POST',
			data: {
				action: 'seatreg_send_test_email',
				security: WP_Seatreg.nonce,
				email: email
			}
		});
	}

	function seatreg_admin_ajax_error(jqXHR, textStatus, errorThrown) {
		console.log('error');
		console.log(textStatus);
		console.log(errorThrown);
		console.log(jqXHR);
	}

	function seatreg_clear_builder_data() {
		window.seatreg.builder.clearRegistrationData();
		window.seatreg.bookings = [];
		window.seatreg.selectedRegistration = null;
		window.seatreg.selectedRegistrationName = null;
	}

	function timeStampToDateString(timeStampText) {
		if(!isNaN(timeStampText)) {
			var date = new Date(parseInt(timeStampText));

			return date.format("d.M.Y H:i");
		}
		
		return timeStampText;
	}

	$('#create-registration-form').on('submit', function(e) {
		var newRegistrationName = $('#new-registration-name').val();

		if(newRegistrationName === '') {
			e.preventDefault();
			alertify.error(translator.translate('enterRegistrationName'));
		}else if(newRegistrationName.length > 255) {
			e.preventDefault();
			alertify.error(translator.translate('registrationNameLimit'));
		}
	});

	$('.seatreg-map-popup-btn').on('click', function() {
		seatreg_clear_builder_data();
		var code = $(this).data('map-code');
		var promise = seaterg_admin_ajax('get_seatreg_layout_and_bookings', code, null);

		promise.done(function(data) {
			if(data._response.type == 'ok') {
				if(data._response.data.bookings.length > 0) {
					var arrLen = data._response.data.bookings.length;

					for(var i = 0; i < arrLen; i++) {
						window.seatreg.bookings.push( data._response.data.bookings[i] );
					}
				}

				if(data._response.data.uploadedImages.length > 0) {
					window.seatreg.uploadedImages = data._response.data.uploadedImages;
				}
				
				if(data._response.data.registration[0].registration_layout == null) {
					window.seatreg.selectedRegistration = code;
					$('.reg-title-name').text(data._response.data.registration[0].registration_name);
				
					$('.seatreg-builder-popup').css({'display': 'block'});
					window.seatreg.builder.syncData(null);
				}else {
					window.seatreg.selectedRegistration = code;
					window.seatreg.settings = {
						paypal_payments: data._response.data.registration[0].paypal_payments
					};
					$('.reg-title-name').text(data._response.data.registration[0].registration_name);
				
					$('.seatreg-builder-popup').css({'display': 'block'});
					window.seatreg.builder.syncData( $.parseJSON(data._response.data.registration[0].registration_layout) );
				}
			}
		});
		promise.fail = seatreg_admin_ajax_error;
	});

$('.builder-popup-close').on('click', function() {
	if( window.seatreg.builder.needToSave == true) {
		alertify.set({ 
			labels: {
		    	ok     : translator.translate('yes'),
		    	cancel: translator.translate('no')
			},
			buttonFocus: "cancel"  
		});

		alertify.confirm(translator.translate('unsavedChanges'),function(e) {
			if (e) {
				$('.seatreg-builder-popup').css({'display':'none'});
				window.seatreg.builder.clearRegistrationData();
			} 
		});
	}else {
		$('.seatreg-builder-popup').css({'display':'none'});
		seatreg_clear_builder_data();
	}
});

$('#registration-start-timestamp').datepicker({
	altField: '#start-timestamp',
	altFormat: '@',
	dateFormat: 'dd.mm.yy'
}).on('keyup', function() {
	if($(this).val() == '') {
		$('#start-timestamp').val('');
	}
});

$('#registration-end-timestamp').datepicker({
	altField: '#end-timestamp',
	altFormat: '@',
	dateFormat: 'dd.mm.yy'
}).on('keyup', function() {
	if($(this).val() == '') {
		$('#end-timestamp').val('');
	}
});

$('.datepicker-altfield').each(function() {
	if( $(this).val() != '' ) {
		var date = new Date(parseInt( $(this).val() ));
		var formattedDate = date.format("d.m.Y");
		$(this).prev('.option-datepicker').val(formattedDate);
	}
});

//add registration code to href in map builder
$('#registration-link').on('click', function() {
	var href = $(this).attr('href').split('?')[0];
	
	$(this).attr('href', href + '?seatreg=registration&c=' + seatreg.selectedRegistration);
});

$('.tab-container').easytabs({
	animate: false,
	animationSpeed: 0
}); 

$('#existing-regs-wrap').on('click', '.room-list-item', function() {
	var code = $('#seatreg-reg-code').val();
	var target = $(this).attr('data-stats-target');
	var overViewContainer = $(this).closest('.reg-overview');
	overViewContainer.append($('<img>').attr('src', WP_Seatreg.plugin_dir_url + 'img/ajax_loader.gif').addClass('ajax_loader'));

	var promise = seaterg_admin_ajax2('seatreg_get_room_stats', code, target);

	promise.done(function(data) {
		overViewContainer.replaceWith(data).promise().done(function() {
			$('#existing-regs-wrap .reg-overview').find('.time-stamp').each(function() {
				$(this).text(timeStampToDateString($(this).text()));
			});

			var donutWrapper = $('#existing-regs-wrap').find('.reg-overview-donuts');		
			var doughnutData = [
				{
					value: parseInt(donutWrapper.find('.seats-total-don').val()),
					color:"#61B329"
				},
				{
					value : parseInt(donutWrapper.find('.seats-bron-don').val()),
					color : "#FFFF00"
				},
				{
					value : parseInt(donutWrapper.find('.seats-taken-don').val()),
					color : "red"
				}
			
			];

			if( canvasSupport) {
				var ctx = donutWrapper.find('.stats-doughnut').get(0).getContext("2d");
				var myNewChart = new Chart(ctx).Doughnut(doughnutData,{animation: false});
			}

		});
		
	});
	promise.fail = seatreg_admin_ajax_error;
});

$('.reg-overview-donuts').each(function() {
	var donutWrapper = $(this);
	var doughnutData = [
		{
			value: parseInt(donutWrapper.find('.seats-total-don').val()),
			color:"#61B329"
		},
		{
			value : parseInt(donutWrapper.find('.seats-bron-don').val()),
			color : "#FFFF00"
		},
		{
			value : parseInt(donutWrapper.find('.seats-taken-don').val()),
			color : "red"
		}
	
	];

	if(canvasSupport) {
		var ctx = donutWrapper.find('.stats-doughnut').get(0).getContext("2d");
		var myNewChart = new Chart(ctx).Doughnut(doughnutData,{animation: false});
	}			
});

/*
==================================================================================================================================================================================================================
Booking manager
==================================================================================================================================================================================================================
*/

function managerSearch() {
	var code = $('#seatreg-reg-code').val();
	var searchTerm = $('.manager-search').val();
	var wrapper = $('#seatreg-booking-manager .seatreg-tabs-content');
	wrapper.append($('<img>').attr('src', WP_Seatreg.plugin_dir_url + 'img/ajax_loader.gif').addClass('ajax_loader'));
	var promise = seaterg_admin_ajax2('seatreg_search_bookings', code, {searchTerm: searchTerm ,orderby: bookingOrderInManager});

	promise.done(function(data) {
		wrapper.empty().html(data).promise().done(function() {
			wrapper.find('.tab-container').easytabs({
				animate: false,
				animationSpeed: 0
			});
		});
	});

	promise.fail = seatreg_admin_ajax_error;
}

$('#seatreg-booking-manager').on('click','.manager-box-link', function() {
	var code = $('#seatreg-reg-code').val();
	var searchTerm = $('.manager-search').val();
	var orderBy = $(this).attr('data-order');
	bookingOrderInManager = orderBy;
	var wrapper = $('#seatreg-booking-manager .seatreg-tabs-content');
	wrapper.append($('<img>').attr('src', WP_Seatreg.plugin_dir_url + 'img/ajax_loader.gif').addClass('ajax_loader'));

	var promise = seaterg_admin_ajax2('seatreg_get_booking_manager', code, {searchTerm: searchTerm, orderby: orderBy});

	promise.done(function(data) {
		wrapper.empty().html(data).promise().done(function() {
			wrapper.find('.tab-container').easytabs({
				animate: false,
				animationSpeed: 0
				//updateHash: false
			});
		});
	});
	
	promise.fail = seatreg_admin_ajax_error;
});

//remove input check from other option
$('#seatreg-booking-manager').on('click', '.bron-action', function() {
	var check = $(this);
	var bookingId = check.closest('.reg-seat-item').find('.booking-identification').val();
	check.closest('.action-select').find('.bron-action').not(check).prop('checked', false);
	var confirmCheck = check.closest('.reg-seat-item').find('.bron-action[data-action=confirm]').is(':checked');
	var delCheck = check.closest('.reg-seat-item').find('.bron-action[data-action=del]').is(':checked');
		
	$(this).closest('.tab_container').find('.bron-action').not(check).each(function() {
		if( $(this).closest('.reg-seat-item').find('.booking-identification').val() == bookingId ) {
			$(this).closest('.reg-seat-item').find('.bron-action[data-action=del]').prop('checked', delCheck);
			$(this).closest('.reg-seat-item').find('.bron-action[data-action=confirm]').prop('checked', confirmCheck);
		}
	});
});

$('#seatreg-booking-manager').on('click', '.show-more-info', function() {
	$(this).parent().find('.more-info').slideToggle();
});

//when search bookings
$('#seatreg-booking-manager').on('click', '.search-button', function() {
	managerSearch();
});

$('#seatreg-booking-manager').on('keydown', '.manager-search', function(e) {
	if(e.key === "Enter") {
		managerSearch();
	}
});


//chen confirm or del bookings
$('#seatreg-booking-manager').on('click', '.action-control', function(e) {
	var button = $(this);
	var data = [];
	var code = $('#seatreg-reg-code').val();
	var searchTerm = $('.manager-search').val();
	var wrapper = $('#seatreg-booking-manager .seatreg-tabs-content');
	
	wrapper.append($('<img>').attr('src', WP_Seatreg.plugin_dir_url + 'img/ajax_loader.gif').addClass('ajax_loader'));
	button.parent().find('.reg-seat-item').each(function() {
		$(this).find('.bron-action').each(function() {
			if($(this).prop('checked')) {
				if($(this).attr('data-action') == 'del') {
					data.push({
						booking_id: $(this).val(),
						action: 'del',
						room_name: $(this).closest('.reg-seat-item').find('.seat-room-box').text(),
						seat_nr: $(this).closest('.reg-seat-item').find('.seat-nr-box').text()
					});
				}else if($(this).attr('data-action') == 'confirm') {
					data.push({
						booking_id: $(this).val(),
						action: 'conf',
						room_name: $(this).closest('.reg-seat-item').find('.seat-room-box').text(),
						seat_nr: $(this).closest('.reg-seat-item').find('.seat-nr-box').text()
					});
				}
			}
		});
	});

	var promise = seaterg_admin_ajax2('seatreg_confirm_del_bookings', code, {searchTerm: searchTerm ,orderby: bookingOrderInManager, actionData: JSON.stringify(data)});

	promise.done(function(data) {
		wrapper.empty().html(data).promise().done(function() {
			wrapper.find('.tab-container').easytabs({
				animate: false,
				animationSpeed: 0
				//updateHash: false
			});
		});
	});

	promise.fail = seatreg_admin_ajax_error;
});

//booking edit click. Show edit modal
$('#seatreg-booking-manager').on('click', '.edit-btn',function() {
	var info = $(this).parent();
	var modal = $('#edit-modal');
	var modalCutsom = $('#modal-body-custom');
	modalCutsom.empty();
	modal.find('#edit-seat').val(info.find('.seat-nr-box').text());
	modal.find('#edit-room').val(info.find('.seat-room-box').text());
	modal.find('#edit-fname').val(info.find('.f-name').val());
	modal.find('#edit-lname').val(info.find('.l-name').val());
	modal.find('#modal-code').val($(this).attr('data-code'));
	modal.find('#booking-id').val($(this).attr('data-booking'));
	modal.find('#r-id').val($(this).attr('data-id'));
	info.find('.custom-field').each(function() {
		var type = $(this).data('type');

		if(type === "check") {
			var isChecked = $(this).find('.custom-field-value').data('checked') === true ? 'checked' : '';

			modalCutsom.append('<div class="modal-custom" data-type="check"><label for="'+ $(this).find('.custom-field-label').text() +'" class="modal-custom-l"><h5>'+ $(this).find('.custom-field-label').text() +'</h5></label><br><input type="checkbox" id="'+ $(this).find('.custom-field-label').text() +'" class="modal-custom-v" ' + isChecked +' /></div>');
		}else if(type === "sel") {
			var selectOptions = $(this).find('.custom-field-value').data('options');
			var selectedOption = $(this).find('.custom-field-value').text().trim();

			if(Array.isArray(selectOptions)) {
				modalCutsom.append('<div class="modal-custom"><label class="modal-custom-l" for="'+ $(this).find('.custom-field-label').text() +'"><h5>'+ $(this).find('.custom-field-label').text() + '</h5></label><br><select id="'+ $(this).find('.custom-field-label').text() +'" class="modal-custom-v">' +  selectOptions.map((option) => {
					if(option === selectedOption) {
						return '<option selected>' + option + '</option>';
					}
					return '<option>' + option + '</option>';
				})  + '</select>' + '</div>');
			}

		}else {
			modalCutsom.append('<div class="modal-custom"><label class="modal-custom-l" for="'+ $(this).find('.custom-field-label').text() +'"><h5>'+ $(this).find('.custom-field-label').text() +'</h5></label><br><input type="text" id="'+ $(this).find('.custom-field-label').text() +'" class="modal-custom-v" value="'+ $(this).find('.custom-field-value').text() +'" /></div>');
		}
	});

	$('#edit-room-error, #edit-seat-error').text('');
	modal.modal('show');
});

$('#seatreg-booking-manager').on('click', '#edit-update-btn', function() {
	$(this).css('display','none').after('<img src="' + WP_Seatreg.plugin_dir_url + 'img/ajax_loader_small.gif' + '" alt="Loading..." class="ajax-load" />');
	var subBtn = $(this);
	var modal = $('#edit-modal');
	var customFields = [];
	var code = $('#seatreg-reg-code').val();
	var seat_number = modal.find('#edit-seat').val();
	var seat_room = modal.find('#edit-room').val(); 
	var first_name = modal.find('#edit-fname').val();
	var last_name = modal.find('#edit-lname').val();

	$('#edit-room-error, #edit-seat-error').text('');
	if(seat_number == '') {
		$('#edit-seat-error').text('No seat');
		subBtn.css('display','inline').next().css('display','none');

		return;
	}
	if(seat_room == ''){
		$('#edit-room-error').text('No room');
		subBtn.css('display','inline').next().css('display','none');

		return;
	}

	if(first_name == ''){
		$('#edit-fname-error').text('First name empty');
		subBtn.css('display','inline').next().css('display','none');

		return;
	}
	if(last_name == ''){
		$('#edit-lname-error').text('Last name empty');
		subBtn.css('display','inline').next().css('display','none');

		return;
	}

	modal.find('.modal-custom').each(function() {
		var custObj = {};

		if($(this).find('.modal-custom-v').val() != 'Not set' && $(this).find('.modal-custom-v').val() != '') {
			var type = $(this).data('type');

			custObj['label'] = $(this).find('.modal-custom-l h5').text();
			
			if(type === 'check') {
				custObj['value'] = $(this).find('.modal-custom-v').is(':checked') ? '1' : '0';
			}else if(type === 'sel') {
				custObj['value'] = $(this).find('.modal-custom-v').find(":selected").text();
			}else {
				custObj['value'] = $(this).find('.modal-custom-v').val();
			}
			
			customFields.push(custObj);
		}
	});

	editInfo = {
		'firstName': first_name,
		'lastName': last_name,
		'bookingId': $('#booking-id').val(),
		'seatId': $('#r-id').val(),
		'customFieldData': JSON.stringify(customFields),
		'seatNumber': seat_number,
		'seatRoom': seat_room,
		'id': $('#r-id').val(),
	}

	var promise = seatreg_edit_booking('seatreg_edit_booking', code, editInfo);

	promise.done(function(data) {
		subBtn.css('display','inline').next().css('display','none');
		
		if(data.status == 'updated') {
			var bookingLoc = $('#r-id').val();
			var bookingInfo = $('#seatreg-booking-manager .edit-btn[data-id="'+ bookingLoc +'"]').parent();
			bookingInfo.find('.seat-nr-box').text(seat_number);
			bookingInfo.find('.seat-room-box').text(seat_room);
			bookingInfo.find('.seat-name-box').attr('title', first_name + ' ' + last_name).find('.full-name').text(first_name + ' ' + last_name);
			bookingInfo.find('.f-name').val(first_name);
			bookingInfo.find('.l-name').val(last_name);

			//correct custom fields
			var a = customFields.length;
			bookingInfo.find('.custom-field').each(function() {
				var found = false;

				for(var i = 0; i < a; i++) {
					if($(this).find('.custom-field-label').text() == customFields[i]['label']) {
						found = true;

						if( $(this).data('type') === 'check') {
							if(customFields[i]['value'] === '1') {
								$(this).find('.custom-field-value').replaceWith('<i class="fa fa-check custom-field-value" data-type="check" data-checked="true" aria-hidden="true"></i>');
							}else {
								$(this).find('.custom-field-value').replaceWith('<i class="fa fa-times custom-field-value" data-type="check" data-checked="false" aria-hidden="true"></i>');
							}
						}else {
							$(this).find('.custom-field-value').text(customFields[i]['value']);
						}
						
						break;
					}
				}

				if(!found) {
					$(this).find('.custom-field-value').text(translator.translate('notSet'));
				}
			});
			alertify.success(translator.translate('bookingUpdated'));

		}else {
			if(data.status == 'room-searching') {
				$('#edit-room-error').text(translator.translate('roomNotExist'));
				alertify.error(translator.translate('roomNotExist'));
			}
			if(data.status == 'seat-nr-searching') {
				$('#edit-seat-error').text(translator.translate('seatNotExist'));
				alertify.error(translator.translate('seatNotExist'));
			}
			if(data.status == 'seat-booked') {
				$('#edit-seat-error').text(translator.translate('seatAlreadyBookedPending'));
				alertify.error(translator.translate('seatAlreadyBookedPending'));
			}
			if(data.status == 'update failed') {
				alert(translator.translate('errorBookingUpdate'));
			}
			if(data.status == 'custom field validation failed') {
				alert('Custom field validation failed');
			}
		}
	});

	promise.fail = seatreg_admin_ajax_error;
});

//text, xlsx and pdf 
$('.seatreg_page_seatreg-management').on('click', '.file-type-link', function(e) {
	e.preventDefault();

	var _href = $(this).attr('href');

	alertify.set({ buttonFocus: "ok" });
	alertify.set({ labels: {
		ok     : translator.translate('ok'),
		cancel : translator.translate('cancel')
	} });

	alertify.confirm( 
	"<div class='booking-status-check-wrap'><label>" + translator.translate('showPendingBookings') + "<input type='checkbox' id='show-pending' checked /></label></div>" +
	"<div class='booking-status-check-wrap'><label>" + translator.translate('showApprovedBookings') + "<input type='checkbox' id='show-confirmed' checked /></label></div>", function (e) {

	    if (e) {
	    	if($('#show-pending').is(':checked')) {
	    		_href += '&s1';
			}
			
	    	if($('#show-confirmed').is(':checked')) {
	    		_href += '&s2';
			}
			
	    	window.open(_href,'_blank');
	    }
	});
});

/*Settings page custom fields functions*/
$('.seatreg_page_seatreg-options .apply-custom-field').on('click', function(e) {
		e.preventDefault();

		var labelElem = $(this).closest('.cust-field-create').find('.cust-input-label');
		var label = labelElem.val().trim();
		var selectedSelect = $(this).closest('.cust-field-create').find('.custom-field-select').find(':selected').attr('data-type');
		var existElems = $(this).closest('.user-custom-field-options').find('.existing-custom-fields');

		if(label === '') {
			alertify.error(translator.translate('pleaseEnterName'));
			labelElem.focus();

			return;
		}

		if( existElems.find('[data-label="' + label + '"]').length ) {
			alertify.error(translator.translate('nameAlreadyUsed'));

			return;
		}

		if(selectedSelect != 'select') {
			seatreg_insert_custom_field(label, selectedSelect, [], existElems);
			$(this).parent().find('.cust-input-label').val('');			
		}else {
			var cusOptions = $(this).closest('.user-custom-field-options').find('.existing-options').find('.option-value');

			if(cusOptions.length == 0) {
				alertify.error(translator.translate('pleaseAddAtLeastOneOption'));
				$(this).prev().find('.option-name').focus();
				
				return;
			}

			var options = [];
			cusOptions.each(function() {
				options.push($(this).text());
			});

			seatreg_insert_custom_field(label, selectedSelect, options, existElems);
			$(this).parent().find('.cust-input-label, .option-name').val('');
			$(this).parent().find('.existing-options').empty();
		}
});

function seatreg_insert_custom_field(label,type,options, placeToPut) {
		var containerDiv = $('<div class="custom-container" data-label="'+ label +'"></div>');

		if(type == 'field') {
			var cusLabel = $('<label><span class="l-text">'+ label +'</span><input type="text"/></label><i class="fa fa-times-circle remove-cust-item"></i>'); 
			containerDiv.attr('data-type','text').append(cusLabel);
		}else if(type == 'checkbox') {
			var cusLabel = $('<label><span class="l-text">'+ label +'</span><input type="checkbox"/></label><i class="fa fa-times-circle remove-cust-item"></i>'); 
			containerDiv.attr('data-type','check').append(cusLabel);

		}else if(type == 'select') {
			var lab = $('<label><span class="l-text">'+ label + '</span></label>'); 
			var sel = $('<select></select>');
			var arrlen = options.length;

			for(var i = 0; i < arrlen;i++) {
				sel.append('<option>' + options[i] + '</option>');
			}
			var remBtn = '<i class="fa fa-times-circle remove-cust-item"></i>';
			lab.append(sel,remBtn);
			containerDiv.attr('data-type','sel').append(lab);
		}	
		placeToPut.append(containerDiv);
}



$('.seatreg_page_seatreg-options .custom-field-select').on('change', function() {
	var createBox = $('.seatreg_page_seatreg-options .cust-field-create');

	if($(this).find(":selected").attr('data-type') == 'field') {
		createBox.find('.select-radio-create').css('display','none');
	}else if($(this).find(":selected").attr('data-type') == 'checkbox') {
		createBox.find('.select-radio-create').css('display','none');
	}else if($(this).find(":selected").attr('data-type') == 'select') {
		createBox.find('.select-radio-create').css('display','block');
	}
});

$('.seatreg_page_seatreg-options .add-select-option').on('click', function(e) {
		e.preventDefault();
        var selectOptionValue = $(this).prev().find('.option-name').val();

		if( selectOptionValue === '' ) {
			alertify.error(translator.translate('pleaseEnterOptionValue'));
			$(this).prev().focus();

			return;
		}

		$(this).prev().prev().append('<li class="select-option"><span class="option-value">'+ $(this).prev().find('.option-name').val() +'</span><i class="fa fa-times-circle remove-cust-item"></i></li>');
});


$('.seatreg_page_seatreg-options .existing-custom-fields').on('click','.remove-cust-item', function() {
	if(window.confirm(translator.translate('areYouSure'))) {
		$(this).closest('.custom-container').remove();
	}		
});

$('.seatreg_page_seatreg-options .cust-field-create').on('click','.remove-cust-item', function() {	
	if(window.confirm(translator.translate('areYouSure'))) {
		$(this).parent().remove();
	}
});

function SeatregCustomField(label, type, options) {
		this.label = label;
		this.type = type;
		this.options = options;
}

//when user submits seatreg settings. First generate #custom-fields hidden input value. 
$('#seatreg-settings-submit').on('click', function(e) {
	var customFieldArray = [];  //array to store custom inputs

	if($('#paypal').is(":checked")) {
		if($('#paypal-business-email').val() === "") {
			e.preventDefault();
			alertify.error(translator.translate('pleaseEnterPayPalBusinessEmail'));

			return true;
		}
		if($('#paypal-button-id').val() === "") {
			e.preventDefault();
			alertify.error(translator.translate('pleaseEnterPayPalButtonId'));

			return true;
		}
		if($('#paypal-currency-code').val() === "") {
			e.preventDefault();
			alertify.error(translator.translate('pleaseEnterPayPalCurrencyCode'));

			return true;
		}
	}

	$('#seatreg-settings-form .custom-container').each(function() {
 			if($(this).attr('data-type') != 'sel') {
 				customFieldArray.push(new SeatregCustomField($(this).find('.l-text').text(), $(this).attr('data-type'), []));
 			}else {
 				var optArr = [];

 				$(this).find('option').each(function() {
 					optArr.push($(this).text());
				 });
				 
 				customFieldArray.push(new SeatregCustomField($(this).find('.l-text').text(), $(this).attr('data-type'), optArr));
 			}	
 	}); 
 	$('#custom-fields').val(JSON.stringify( customFieldArray) );  //set #custom-fields hidden input value
});

$('#seatreg-send-test-email').on('click', function(e) {
	e.preventDefault();
	var enteredEmail = $('#test-email-address').val();
	var emailReg = /^\S+@\S+$/;

	if(!emailReg.test(enteredEmail)) {
		alertify.error(translator.translate('emailNotCorrect'));
		$('#test-email-address').focus();

		return false;
	}else {
		var $sendTestEmailBtn = $('#seatreg-send-test-email');
		var btnText = $sendTestEmailBtn.val();	
		var enteredEmail = $('#test-email-address').val();
		var promise = seatreg_send_test_email(enteredEmail);
		$sendTestEmailBtn.val(translator.translate('pealseWait'));

		promise.done(function(data) {
			$sendTestEmailBtn.val(btnText);

			if(data._response.type === 'error') {
				alertify.error(translator.translate('emailSendingFailed'));
			}else {
				alertify.success(translator.translate('checkEmailAddress'));
			}
		});
	}
});

})(jQuery);


