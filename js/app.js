$(document).ready(function () {
	var bugs_data = [];

	function getBugsDataFromFile() {
		var promise = $.ajax({
			url: 'data/bugs/bugs.json',
			dataType: 'json',
			type: 'GET',
			async: false
		});
		return promise;
	}

	getBugsDataFromFile().done(function(data) {
		$('#card').html($.templates('#card-tmpl').render(data));
		//$.templates('#card-tmpl').link('#card', data);
	});

	$('#search-bar').keyup(function(event) {
		var input = $(this).val();
		//console.log($(this).val().length);
		// if (input.length === 0) {
		// 	//console.log('empty');
		// 	$('.collection-card').show();
		// }
		$('.collection-card').show().each(function(index, element) {
			var name = $(this).children('div').children('div:eq(0)').children('.name').text();
			console.log(input);
			console.log(name);

			if (name.indexOf(input) === -1) {
				$('.collection-card:eq(' + index + ')').hide();
			}
		});
	});


});