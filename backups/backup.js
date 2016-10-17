$(document).ready(function() {
	$('#searchBtn').click(function(){
		var $cardName = $('#searchBar').val().trim();
		nameSearch($cardName);
	});
	
	$('#searchBar').keypress(function(e){
		var key = e.which;
		if(key == 13) {
			var $cardName = $('#searchBar').val().trim();
			nameSearch($cardName);
		}
	});
	
	function nameSearch(searchVal) {
		$.ajax({
			url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" + searchVal + "?collectible=1", 
			headers: {"X-Mashape-Key": "cLj3oRncL9mshksGealkgpCzL8EUp10JZ3ujsng6iV3DvIRSrG"},
			dataType: 'json',
			type: 'GET',
			success: function(data){searchSuccess(data);},
			error: function(xhr, status, errorThrown) {
				alert("Sorry, there was a problem!");
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			}
		});
	}
	
	function searchSuccess (data) {
		$('#searchResults').empty();
		$.each(data, function(i, name) {
			var result = "<img width ='20%' src='" + name.img + "' />";
			$('#searchResults').append(result);
		});
	}
});