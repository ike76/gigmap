

$(function(){

// class GigObject {
// 	constructor(gig) {
// 		let {lineup, datetime, offers, venue, } = gig;
// 		this.lineup = lineup;
// 		this.venue = venue;
// 		this.datetime = datetime;
// 		this.offers = offers;
// 		// console.log(`venue: ${venue.name}`)
// 	}
// 	formatDate(datetime) {

// 	}
// }

// searchbox listener
$('.artistSearch').on('submit', function(event){
	event.preventDefault();
	let queryBox = $(this).find('#artistSearchBox');
	let artistQuery = queryBox.val();
	queryBox.val('');
	handleSearch(artistQuery); //hereafter known as 'aq'
})

function handleSearch(aq){
	callBandsInTown(aq);
}


function callBandsInTown(aq){
	let app_id = 'iketown';
	let biturl = `https://rest.bandsintown.com/artists/${aq}/events`
	$.getJSON(biturl, {app_id: app_id}, function(json, textStatus) {
			console.log(json)
			displayGigsList(json)
			createMap(json);
	});
}

function displayGigsList(json){

	$('h2.band-name').html(json[0].lineup[0])
	let $list = $('ul.gig-list');
	$list.html(''); // empty list of prev search results.
	json.forEach(gig=>{
		$list.append(formatGig(gig));
	})
}

function formatGig(gigObj){
	let cityName = gigObj.venue.city;
	let state = gigObj.venue.region;
	let venueName = gigObj.venue.name;
	let date = moment(gigObj.datetime);
	let country = (gigObj.venue.country === "United States") ? "" : `, ${gigObj.venue.country}`;

	return `<li>
				<h4>${cityName}, ${state}${country}</h4>
				<hr>
				<p>${venueName}</p>
				<p>${date.format('MMM Do, YYYY | h:mm a')}</p>
			</li>`
};

let map;
function createMap(json){
	let uluru = {lat: -25.363, lng: 131.044};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	let marker = new google.maps.Marker({
		position: uluru,
		map: map
	})
	let marker2 = new google.maps.Marker({position: {lat: -25, lng: 131}, map: map})
	let latLngArray = makeLatLngArray(json);
	function makeLatLngArray(json){
		let latLngArray = [];
		json.forEach(gig=> latLngArray.push({lat: Number(gig.venue.latitude), lng: Number(gig.venue.longitude) }))
		return latLngArray;
	}
	// map.fitLatLngBounds(latLngArray); // make map the right size

	// json.forEach(gig=> addGigToMap(gig));

	// function drawPolyline(json){

	// }
	
	// function addGigToMap(gig){
	// 	map.addMarker({
	// 		lat: gig.venue.latitude ,
	// 		lng:  gig.venue.longitude,
	// 		title: gig.venue.name ,
	// 		click: function(e) {
	// 			alert('you clicked it');
	// 		}
	// 	})
	// }
}
// function createMap(json){
// 	var map = new GMaps({
// 	      el: '#map',
// 	      lat: -12.043333,
// 	      lng: -77.028333
// 	    });
// 	let latLngArray = makeLatLngArray(json);
// 	map.fitLatLngBounds(latLngArray); // make map the right size

// 	json.forEach(gig=> addGigToMap(gig));

// 	function drawPolyline(json){

// 	}
// 	function makeLatLngArray(json){
// 		let latLngArray = [];
// 		json.forEach(gig=> latLngArray.push({lat: Number(gig.venue.latitude), lng: Number(gig.venue.longitude) }))
// 		return latLngArray;
// 	}
	
// 	function addGigToMap(gig){
// 		map.addMarker({
// 			lat: gig.venue.latitude ,
// 			lng:  gig.venue.longitude,
// 			title: gig.venue.name ,
// 			click: function(e) {
// 				alert('you clicked it');
// 			}
// 		})
// 	}
// }


//end jQuery call
});