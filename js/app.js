$(document).ready(function () {
	var bugsOwnArray = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	var bugsMuseumArray = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	function getBugsDataFromFile() {
		var promise = $.ajax({
			url: 'data/bugs/bugs.json',
			dataType: 'json',
			type: 'GET',
			async: false
		});
		return promise;
	}

	function getFishesDataFromFile() {
		var promise = $.ajax({
			url: 'data/fishes/fishes.json',
			dataType: 'json',
			type: 'GET',
			async: false
		});
		return promise;
	}

	function getSeafoodsDataFromFile() {
		var promise = $.ajax({
			url: 'data/seafoods/seafoods.json',
			dataType: 'json',
			type: 'GET',
			async: false
		});
		return promise;
	}

	// console.log(window.location.href);
	// console.log(window.location.pathname.split('/')[2]);


	if (window.location.pathname.split('/')[2] === 'bug.html') {
		getBugsDataFromFile().done(function(data) {
			$('#card').html($.templates('#card-tmpl').render(data));
			console.log(data.length);
			//$.templates('#card-tmpl').link('#card', data);
		});
	}

	if (window.location.pathname.split('/')[2] === 'fish.html') {
		getFishesDataFromFile().done(function(data) {
			$('#card').html($.templates('#card-tmpl').render(data));
			console.log(data.length);
			//$.templates('#card-tmpl').link('#card', data);
		});
	}

	if (window.location.pathname.split('/')[2] === 'seafood.html') {
		getSeafoodsDataFromFile().done(function(data) {
			$('#card').html($.templates('#card-tmpl').render(data));
			console.log(data.length);
			//$.templates('#card-tmpl').link('#card', data);
		});
	}



	$('#search-bar').keyup(function(event) {
		var input = $(this).val();
		$('.collection-card').show().each(function(index, el) {
			if ($(this).is(':visible')) {
				var name = $(this).children('div').children('div:eq(0)').children('.name').text();
				console.log(input);
				console.log(name);

				if (name.indexOf(input) === -1) {
					$('.collection-card:eq(' + index + ')').hide();
				}
			}
		});
		// $('.collection-card').show().each(function(index, element) {
		// 	var name = $(this).children('div').children('div:eq(0)').children('.name').text();
		// 	console.log(input);
		// 	console.log(name);

		// 	if (name.indexOf(input) === -1) {
		// 		$('.collection-card:eq(' + index + ')').hide();
		// 	}
		// });
	});

	// var hiddenCardSelector = [];
	// $('#filter-own').click(function(event) {
	// 	if ($(this).prop('checked')) {
	// 		// console.log($('.check-status > label:nth-child(1)'));
	// 		$('.collection-card').each(function(index, el) {
	// 			if ($(this).is(':visible')) {
	// 				hiddenCardSelector = [];
	// 				if (!$('.check-status > label:nth-child(1):eq(' + index + ') > input[type=checkbox]').prop('checked')) {
	// 					hiddenCardSelector.push($('.collection-card:eq(' + index + ')'));
	// 					$(this).hide();
	// 				}
	// 			}
	// 		});
	// 	} else {
	// 		console.log(hiddenCardSelector);
	// 		$('.collection-card').show();
	// 	}
	// });

	// function updateFilterCard (type) {
	// 	var filterId = null;
	// 	var checkboxOrder = 0;
	// 	if (type === 'own') {
	// 		filterId = '#filter-own';
	// 		checkboxOrder = 1;
	// 	} else if (type === 'museum') {
	// 		filterId = '#filter-museum';
	// 		checkboxOrder = 2;
	// 	}

	// 	if ($(filterId).prop('checked')) {
	// 		// console.log($('.check-status > label:nth-child(1)'));
	// 		$('.collection-card').each(function(index, el) {
	// 			if ($(this).is(':visible')) {
	// 				if (!$('.check-status > label:nth-child(' + checkboxOrder + '):eq(' + index + ') > input[type=checkbox]').prop('checked')) {
	// 					$(this).hide();
	// 				}
	// 			}
	// 		});
	// 	} else {
	// 		$('.collection-card').show();
	// 	}		
	// }

	// $('#filter-museum').click(function(event) {
	// 	if ($(this).prop('checked')) {
	// 		// console.log($('.check-status > label:nth-child(1)'));
	// 		$('.collection-card').each(function(index, el) {
	// 			if ($(this).is(':visible')) {
	// 				if (!$('.check-status > label:nth-child(2):eq(' + index + ') > input[type=checkbox]').prop('checked')) {
	// 					$(this).hide();
	// 				}
	// 			}
	// 		});
	// 	} else {
	// 		$('.collection-card').show();
	// 	}
	// });

	$('.check-status > label > input[type=checkbox]').on('itemCheckboxChanged', itemCheckedHandler)


	$('.check-status > label > input[type=checkbox]').click(function(event) {
		$(this).trigger('itemCheckboxChanged', [$(this).attr('data-type'), $(this).val(), $(this).prop('checked')]);
	});


	function itemCheckedHandler (event, type, no, checked) {
		console.log(type);
		console.log(no);
		console.log(checked);

		if (type === 'own') {
			if (checked) {
				bugsOwnArray[no - 1] = 1;
			} else {
				bugsOwnArray[no - 1] = 0;
			}
			console.log(bugsOwnArray);
		} else if (type === 'museum') {
			if (checked) {
				bugsMuseumArray[no - 1] = 1;
			} else {
				bugsMuseumArray[no - 1] = 0;
			}
			console.log(bugsMuseumArray);
		}
	}






	/* Dropbox setup */

	// var APP_KEY = 'en6zleikr2tu4v9';

	// var client = new Dropbox.Client({key: APP_KEY});
	// //console.log(client);

	// client.authDriver(new Dropbox.AuthDriver.Popup({
	// 	receiverUrl: window.location.href + 'oauth_receiver.html'
	// }));

	// // Try to finish OAuth authorization.
	// client.authenticate({interactive: false}, updateAuthenticationStatus);

	// $('#dropbox-btn').click(function(event) {
	// 	event.preventDefault();
	// 	client.authenticate();
	// });

	// function updateAuthenticationStatus (error, client) {
	// 	if (!client.isAuthenticated()) {
	// 		console.log('Authentication fail');
	// 	} else {
	// 		console.log('Authentication ok');
	// 	}

	// 	client.getAccountInfo(function(error, info) {
	// 		console.log(info.name);
	// 	})

	// 	var datastoreManager = client.getDatastoreManager();
	// 	var datastore = null;
	// 	datastoreManager.datastoreListChanged.addListener(function(event) {
	// 		var infos = event.getDatastoreInfos();
	// 		$.each(infos, function(index, val) {
	// 			console.log(val.getId());
	// 			datastoreManager.deleteDatastore(val.getId(), function() {});
	// 		});
	// 	});

	// 	// datastoreManager.createDatastore(function(error, ds) {
	// 	// 	// console.log(ds.getId());
	// 	// 	if (datastore !== null && datastore.getId() !== ds.getId()) {
	// 	// 		datastore.close();
	// 	// 		datastore = null;
	// 	// 	}
	// 	// 	datastore = ds;
	// 	// 	datastore.setTitle('Bugs');
	// 	// });

	// }

	// $('#dropbox-logout').click(function(event) {
	// 	client.signOut();
	// 	window.location.reload();
	// });

});