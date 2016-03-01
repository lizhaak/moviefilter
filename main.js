'use strict';

var $movie = [];

$(document).ready(init);

function init(){
	$('.alert-warning').hide();
	$('.alert-danger').hide();
	$('#find').click(movieTitle);
}

function movieTitle() {
	$('.alert-warning').hide();
	$('.alert-danger').hide();
	$( ':input[required]').each( function () {
    if (this.value.trim() === '') {
        $('.alert-warning').show();
    } else {
			  var $movieTitle = $('#titleSearch').val();
			  var $movieYear = $('#yearSearch').val();
			  var $categoryType = $('#typeSearch').val();
				$.ajax({
					method: 'GET',
					url: `http://www.omdbapi.com/?s=${$movieTitle}&y=${$movieYear}&type=${$categoryType}&plot=short&r=json`,
					success: function(data) {
						if(data.Response === "False") {
							$('.alert-danger').show();
						} else {
								var dataSearch = data.Search;
								console.log('dataSearch', dataSearch);
								var movieTitle = dataSearch[0].Title;
								var movieYear = dataSearch[0].Year;
								var movieType = dataSearch[0].Type;
								var moviePoster = dataSearch[0].Poster;
								var imbdID = dataSearch[0].imdbID;
								$('#title').text("Title: " + movieTitle);
								$('#year').text("Movie Year: " + movieYear);
								$('#type').text("Category Type: " + movieType);
								$('#poster').append(`<img class="movieImg" src="${moviePoster}" />`);
								$('#imbdID').text("IMBd ID: " + `http://www.imdb.com/title/${imbdID}`).attr(href, `http://www.imdb.com/title/${imbdID}`);
							}
					},
					error: function(err) {
						console.log('error', err);
					}	
				});
		 	} 	
	});
}