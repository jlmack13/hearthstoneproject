$(document).ready(function() {
	$('#resultsPanel').hide(); //hide the counter until the search is complete
	$('#setMenu').hide();
	$('#rarityMenu').hide();
	$('#typeMenu').hide();
	$('#classMenu').hide();
	$('#dropMenu').click(function () {
		var $dropMenu = $('#dropMenu').val();
		if ($dropMenu == "Card Set") {
			$('#setMenu').show();
			$('#classMenu').hide();
			$('#searchBar').hide();
			$('#rarityMenu').hide();
			$('#typeMenu').hide();
		}
		else if ($dropMenu == "Class Name") {
			$('#classMenu').show();
			$('#setMenu').hide();
			$('#searchBar').hide();
			$('#rarityMenu').hide();
			$('#typeMenu').hide();
		}
		else if ($dropMenu == "Rarity") {
			$('#rarityMenu').show();
			$('#classMenu').hide();
			$('#setMenu').hide();
			$('#searchBar').hide();
			$('#typeMenu').hide();
		}
		else if ($dropMenu == "Type (mech, beast, etc.)") {
			$('#typeMenu').show();
			$('#rarityMenu').hide();
			$('#classMenu').hide();
			$('#setMenu').hide();
			$('#searchBar').hide();
		}
		else {
			$('#searchBar').show();
			$('#setMenu').hide();
			$('#classMenu').hide();
			$('#rarityMenu').hide();
			$('#typeMenu').hide();
		}
	});
	$('#searchBtn').click(function(){
		var $dropMenu = $('#dropMenu').val();
		var $cardName = $('#searchBar').val().trim();
		if ($dropMenu == "Card Set") {
			var $searchBy = $('#secondMenu').val();
			nameSearch($cardName, $dropMenu, $searchBy);
		}
		else if ($dropMenu == "Class Name") {
			var $searchBy = $('#thirdMenu').val();
			nameSearch($cardName, $dropMenu, $searchBy);
		}
		else if ($dropMenu == "Rarity") {
			var $searchBy = $('#fourthMenu').val();
			nameSearch($cardName, $dropMenu, $searchBy);
		}
		else if ($dropMenu == "Type (mech, beast, etc.)") {
			var $searchBy = $('#fifthMenu').val();
			nameSearch($cardName, $dropMenu, $searchBy);
		}
		else {
			nameSearch($cardName, $dropMenu);
		}
		
		
	});
	
	$('#searchBar').keypress(function(e){
		var key = e.which;
		if(key == 13) {
			var $cardName = $('#searchBar').val().trim();
			var $dropMenu = $('#dropMenu').val();
			nameSearch($cardName, $dropMenu);
		}
	});
	
	function nameSearch(searchVal, searchType, searchBy) {
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
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/" + searchBy + "?collectible=1", 
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
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/" +  searchBy + "?collectible=1", 
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
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/" +  searchBy + "?collectible=1", 
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
			$.ajax({
				url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/races/" +  searchBy + "?collectible=1", 
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