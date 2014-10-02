$(document).ready(function () {
	var bugs_data = [];

	var getBugsDataFromFile = function() {
		var promise = $.ajax({
			url: 'data/bugs/bugs.json',
			dataType: 'json',
			type: 'GET',
			async: false
		});

		return promise;
	}


	var insertBugsData = function(data) {
		$.each(data, function(index, element) {
			$('.data').append(bugsDataTemplate(element));
		})
	}

	var BUG_IMG_PATH = 'data/bugs/icons/';
	var BUG_IMG_PREFIX = 'acnl_bug_';


	var collectionListTemplate = function(bugObject) {
		var img_url = BUG_IMG_PATH + BUG_IMG_PREFIX + bugObject.no + '.png';
		var html = '';
		html += '<a class="list-group-item clearfix collection-img" href="#' + bugObject.no + '">';
		html += '<div class="pull-left"><img src="' + img_url + '" /></div>';
		html += '<div class="pull-left collection-name">';
		html += '<h4 class="list-group-item-heading">' + bugObject.name + '</h4>';
		html += '<p class="list-group-item-text">' + bugObject.price + 'ベル</p>';
		html += '</div>';
		// html += '<div class="pull-left">';
		// html += '<div class="label label-info">Own</div>';
		// html += '<div class="label label-default">Musemu</div>';
		// html += '</div>';
		html += '</a>';

		return html;		
	}

	var addBugsDataToList = function(data) {
		$.each(data, function(index, element) {
			$('#bugs_list').append(collectionListTemplate(element));
		});
	}

	var addBugsDataToCard = function(data) {
		$.each(data, function(index, element) {
			//console.log(element['name']);
			$('#name').text(element.name);
			$('#price').text(element.price);
			$('#location').text(element.location);
		})		
	}

	getBugsDataFromFile().done(function(data) {

		//addBugsDataToCard(data);
		data.sort(function(a, b) {
			return a.no - b.no;
		})
		bugs_data = data;
		//console.log(data);
		addBugsDataToList(data);
		// insertBugsData(data);
		// addBugsCollectionTable();
	});


	var detailTitleArray = [
		'名前', '売値', '出現場所', '出現期間', '出現時間帯', '出現条件'
	]

	var detailTemplate = function(name, value) {
		var html = '';
		html += '<li href="#" class="list-group-item">';
		html += '<h4 class="list-group-item-heading">' + name + '</h4>';
		html += '<p class="list-group-item-text">' + value + '</p>';
		html += '</li>';

		return html;
	}

	var getBugObject = function(bugNo) {
		var bugObject = {};
		$.each(bugs_data, function(index, element) {
			if (element['no'][0] === bugNo) {
				bugObject = element
				return false;
			}
		})

		return bugObject;
	}

	var getBugDetail = function(bugObject) {
		$('#bug_detail').append(detailTemplate(detailTitleArray[0], bugObject['name'][0]));
		$('#bug_detail').append(detailTemplate(detailTitleArray[1], bugObject['price'][0]));
		$('#bug_detail').append(detailTemplate(detailTitleArray[2], bugObject['location'][0]));
		$('#bug_detail').append(detailTemplate(detailTitleArray[3], bugObject['time_of_year'][0]));
		$('#bug_detail').append(detailTemplate(detailTitleArray[4], bugObject['time_of_day'][0]));
		$('#bug_detail').append(detailTemplate(detailTitleArray[5], bugObject['condition'][0]));
	}

	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		$('#bug_detail').empty();
		//console.log($(this).attr('href')[1]);
		var bugNo = $(this).attr('href').substring(1, $(this).attr('href').length);
		var bugObject = getBugObject(bugNo);
		//console.log(bugObject);
		$.cookie('bugNo', bugNo);
		getBugDetail(bugObject);
		//console.log(bugNo)
	});

	// var detailSelector = $('.detail-card');
	// $(window).scroll(function() {
	// 	detailSelector.stop().animate({'marginTop': ($(window).scrollTop() + 20) + 'px'}, 500);
	// });

	if ($.cookie('bugNo') != undefined) {
		var bugObject = getBugObject($.cookie('bugNo'));
		//console.log(bugObject);
		getBugDetail(bugObject);
		$('#bugs_list').height($('.detail-card').height());
	}
	else {
		var bugObject = getBugObject(1);
		//console.log(bugObject);
		getBugDetail(bugObject);
		$('#bugs_list').height($('.detail-card').height());	
	}

});