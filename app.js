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
	setHeader(aq)
	callBandsInTown(aq);
}

function setHeader(aq){
	$('h1.js-artist-query').html(aq); // this should come from the results, not the query
}

function callBandsInTown(aq){
	let app_id = 'iketown';
	let biturl = `https://rest.bandsintown.com/artists/${aq}/events`
	$.getJSON(biturl, {app_id: app_id}, function(json, textStatus) {
			console.log(json)
			displayGigsList(json)
	});
}

// function makeGigObjects(json){
// 	let gigArray = json.map(gig => new GigObject(gig))
// 	console.log(gigArray);

// }
function displayGigsList(json){
	let $list = $(ul.gig-list);
	json.forEach(gig=>{
		$list.append(formatGig(gig));
	})
}

formatGig(gigObj){
	let cityName = gigObj.venue.city;
	let state = gigObj.venue.region;
	let venueName = gigObj.venue.name;

	return `<li>
				<h4>${cityName}, ${state}</h4>
				<hr>
				<p>${venueName}</p>
				<p>Jan 25th, 2018 7:30pm</p>
			</li>`
}









//end jQuery call
});