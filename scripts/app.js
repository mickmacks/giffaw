console.log('working js');

var gifOffset = 0;

$(document).on("ready", function(){

	$('#searchButton').click(function(event) {

		event.preventDefault();
		$("#searchResults").empty();

		findImages();
		function findImages() {

			$.ajax({
				method: "GET",
				url: 'http://api.giphy.com/v1/gifs/search',
				data: $("form").serialize() + '&limit=100',
				dataType: 'json',
				success: onSuccess,
				error: onError
			});

			function onSuccess(json) {

				console.log(json);

				for (var i = 0; i < 25; i++) {
					
					var currImage = json.data[i].images.fixed_height.url;
					$("#searchResults").append("<img src='" + currImage + "'>");

				}
				
			}

			function onError(xhr, status, errorThrown) {
				alert("Sorry, there was a problem!");
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			}

		}

		gifOffset += 25;

		document.getElementById('loadMore').style.display = "block";

	});

	$('#loadMore').click(function(event) {

		event.preventDefault();

		findImages();
		function findImages() {

			$.ajax({
				method: "GET",
				url: 'http://api.giphy.com/v1/gifs/search',
				data: $("form").serialize() + '&limit=100' + '&offset=' + gifOffset,
				dataType: 'json',
				success: onSuccess,
				error: onError,
			});

			function onSuccess(json) {

				for (var i = 0; i < 25; i++) {
					
					var currImage = json.data[i].images.fixed_height.url;
					$("#searchResults").append("<img src='" + currImage + "'>");

				}
				
			}

			function onError(xhr, status, errorThrown) {
				alert("Sorry, there was a problem!");
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			}

		}

		gifOffset += 25;

	});


});
