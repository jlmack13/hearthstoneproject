$(document).ready(function() {
	$('#resultsPanel').hide(); //hide the counter until the search is complete
	$('#searchBtn').click(function(){
		var $cardName = $('#searchBar').val().trim();
		var $dropMenu = $('#dropMenu').val();
		nameSearch($cardName, $dropMenu);
		
	});
	
	$('#searchBar').keypress(function(e){
		var key = e.which;
		if(key == 13) {
			var $cardName = $('#searchBar').val().trim();
			var $dropMenu = $('#dropMenu').val();
			nameSearch($cardName, $dropMenu);
		}
	});
	
	function nameSearch(searchVal, searchType) {
		if (searchType == "Card Name") {
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" + searchVal + "?collectible=1", 
				headers: {"X-Mashape-Key": "cLj3oRncL9mshksGealkgpCzL8EUp10JZ3ujsng6iV3DvIRSrG"},
				dataType: 'json',
				type: 'GET',
				success: function(data){searchSuccess(data);},
				error: function(xhr, status, errorThrown) {
					alert("Sorry, there was a problem! Are you sure you selected the right search type?");
					console.log("Error: " + errorThrown);
					console.log("Status: " + status);
					console.dir(xhr);
				}
			});
		}
		else if (searchType == "Card Set") {
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/" + searchVal + "?collectible=1", 
				headers: {"X-Mashape-Key": "cLj3oRncL9mshksGealkgpCzL8EUp10JZ3ujsng6iV3DvIRSrG"},
				dataType: 'json',
				type: 'GET',
				success: function(data){searchSuccess(data);},
				error: function(xhr, status, errorThrown) {
					alert("Sorry, there was a problem! Are you sure you selected the right search type?");
					console.log("Error: " + errorThrown);
					console.log("Status: " + status);
					console.dir(xhr);
				}
			});
		}
		else if (searchType == "Class Name") {
			var $newName = formatSearch(searchVal); 
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" +  $newName + "?collectible=1", 
				headers: {"X-Mashape-Key": "cLj3oRncL9mshksGealkgpCzL8EUp10JZ3ujsng6iV3DvIRSrG"},
				dataType: 'json',
				type: 'GET',
				success: function(data){searchSuccess(data);},
				error: function(xhr, status, errorThrown) {
					alert("Sorry, there was a problem! Are you sure you selected the right search type?");
					console.log("Error: " + errorThrown);
					console.log("Status: " + status);
					console.dir(xhr);
				}
			});
		}
		else if (searchType == "Rarity") {
			var $newName = formatSearch(searchVal); 
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/" +  $newName + "?collectible=1", 
				headers: {"X-Mashape-Key": "cLj3oRncL9mshksGealkgpCzL8EUp10JZ3ujsng6iV3DvIRSrG"},
				dataType: 'json',
				type: 'GET',
				success: function(data){searchSuccess(data);},
				error: function(xhr, status, errorThrown) {
					alert("Sorry, there was a problem! Are you sure you selected the right search type?");
					console.log("Error: " + errorThrown);
					console.log("Status: " + status);
					console.dir(xhr);
				}
			});
		}
		else if (searchType == "Type (mech, beast, etc.)") {
			var $newName = formatSearch(searchVal); 
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/races/" +  $newName + "?collectible=1", 
				headers: {"X-Mashape-Key": "cLj3oRncL9mshksGealkgpCzL8EUp10JZ3ujsng6iV3DvIRSrG"},
				dataType: 'json',
				type: 'GET',
				success: function(data){searchSuccess(data);},
				error: function(xhr, status, errorThrown) {
					alert("Sorry, there was a problem! Are you sure you selected the right search type?");
					console.log("Error: " + errorThrown);
					console.log("Status: " + status);
					console.dir(xhr);
				}
			});
		}
	}
	
	function searchSuccess (data) {
		var $totalResults = 0;
		$('#searchResults').empty();
		$.each(data, function(i, name) {
			var result = "<img width ='20%' src='" + name.img + "' />";
			$('#searchResults').append(result);
			$totalResults ++;
		});
		$('#resultsPanel').show();
		document.getElementById("numResults").innerHTML = "Your search returned " + $totalResults + " item(s)."
	}
	
	function formatSearch (name) {
		var newName = name.toLowerCase();
		return newName.charAt(0).toUpperCase() + newName.slice(1);
	}
});