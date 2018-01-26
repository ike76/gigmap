

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
const store = {} // global store variable

$('.artistSearch').on('submit', function(event){
	event.preventDefault();
	let queryBox = $(this).find('#artistSearchBox');
	let artistQuery = queryBox.val();
	queryBox.val('');
	handleSearch(artistQuery); //hereafter known as 'aq'
})

//gig list listener
$('.gig-list').on('click', 'h4', function(event){
	let gigId = $(this).attr('gigId');
	openLightbox(gigId);
})


function openLightbox(gigId){
	$.featherlight($('#mylightbox'))
}

function handleSearch(aq){
	getArtistEvents(aq);
	getArtistInfo(aq);
}

function getArtistInfo(aq){
	let app_id = 'iketown';
	let biturl = `https://rest.bandsintown.com/artists/${aq}`
	$.getJSON(biturl, {app_id: app_id}, (data) => { store.artistInfo = data} )
	console.log(store.artistInfo);
}

function getArtistEvents(aq){
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
				<a><h4 gigId="${gigObj.id}">${cityName}, ${state}${country}</h4></a>
				<hr>
				<p>${venueName}</p>
				<p>${date.format('MMM Do, YYYY | h:mm a')}</p>
			</li>`
};


let map;
const markerArray = [];

function createMap(json){
	let uluru = {lat: -25.363, lng: 131.044};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	// let marker = new google.maps.Marker({
	// 	position: uluru,
	// 	map: map
	// })
	// let marker2 = new google.maps.Marker({position: {lat: -25, lng: 131}, map: map})
	let bounds = new google.maps.LatLngBounds();

	json.forEach(gig=> {
		addGigToMap(gig);
		bounds.extend({lat: Number(gig.venue.latitude), lng: Number(gig.venue.longitude) })
	});
	map.fitBounds(bounds);

	
	function addGigToMap(gig){
		let marker = new google.maps.Marker({
			position: {
				lat: Number(gig.venue.latitude),
				lng:  Number(gig.venue.longitude)
			},
			animation: google.maps.Animation.DROP,
			map: map,
		})
		// map.addMarker({
			
		// 	title: gig.venue.name ,
		// 	click: function(e) {
		// 		alert('you clicked it');
		// 	}
		// })
	}
}

fakeIt();

function fakeIt(){
// fake stuff so we don't have to call bands in town every time something changes
const dummyJson = $.parseJSON(`[
  {
    "id": "20011430",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20011430?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-02-13T19:30:00",
    "description": "The Beach Boys",
    "venue": {
      "name": "Ruth Eckerd Hall",
      "latitude": "27.976034",
      "longitude": "-82.704614",
      "city": "Clearwater",
      "region": "FL",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/20011430?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20935400",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20935400?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-02-14T19:30:00",
    "description": "",
    "venue": {
      "name": "Van Wezel Performing Arts Center",
      "latitude": "27.3396",
      "longitude": "-82.539597",
      "city": "Sarasota",
      "region": "FL",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20300668",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20300668?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-02-15T19:00:00",
    "description": "",
    "venue": {
      "name": "Sunrise Theatre",
      "latitude": "27.4461",
      "longitude": "-80.3358",
      "city": "Fort Pierce",
      "region": "FL",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19484280",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19484280?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-02-16T20:00:00",
    "description": "",
    "venue": {
      "name": "Kravis Center",
      "latitude": "26.706281",
      "longitude": "-80.059191",
      "city": "West Palm Beach",
      "region": "FL",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19484298",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19484298?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-02-18T19:00:00",
    "description": "",
    "venue": {
      "name": "Artis-Naples",
      "latitude": "26.215989",
      "longitude": "-81.803976",
      "city": "Naples",
      "region": "FL",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "21044500",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/21044500?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2018-01-11T16:00:00",
    "datetime": "2018-02-24T19:30:00",
    "description": "The Mesquite ISD Education Foundation's Annual Gala features The Beach Boys this year. Come see a great concert and help support the educational programs provided by the Foundation",
    "venue": {
      "name": "Mesquite Arena",
      "latitude": "32.7628662",
      "longitude": "-96.6260801",
      "city": "Mesquite",
      "region": "TX",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/21044500?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19997242",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19997242?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-10-05T10:00:00",
    "datetime": "2018-03-01T19:30:00",
    "description": "THE BEACH BOYS",
    "venue": {
      "name": "Visalia Fox Theatre",
      "latitude": "36.3862",
      "longitude": "-119.369904",
      "city": "Visalia",
      "region": "CA",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/19997242?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "18847305",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/18847305?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-06-09T19:00:00",
    "datetime": "2018-03-03T20:00:00",
    "description": "",
    "venue": {
      "name": "Fred Kavli Theatre-Thousand Oaks Civic Arts Plaza",
      "latitude": "34.175071",
      "longitude": "-118.849491",
      "city": "Thousand Oaks",
      "region": "CA",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/18847305?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "21129787",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/21129787?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-03-04T15:00:00",
    "description": "",
    "venue": {
      "name": "McCallum Theatre",
      "latitude": "33.7222222",
      "longitude": "-116.3736111",
      "city": "Palm Desert",
      "region": "CA",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20624216",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20624216?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-12-01T16:00:00",
    "datetime": "2018-03-09T19:00:00",
    "description": "The Beach Boys Reserve Seated Event Doors 6pm / Show 7pm",
    "venue": {
      "name": "Missouri Theatre",
      "latitude": "39.7658108",
      "longitude": "-94.8510479",
      "city": "St Joseph",
      "region": "MO",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/20624216?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19769937",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19769937?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-09-15T14:00:00",
    "datetime": "2018-03-17T19:30:00",
    "description": "Performed in the Full Round Everyone needs a ticket regardless of Age Interested in VIP Membership and Premium Seating for our events? For information please call 516-247-5211 Members get the best seats! .",
    "venue": {
      "name": "NYCB Theatre at Westbury",
      "latitude": "40.7751713",
      "longitude": "-73.5605532",
      "city": "Westbury",
      "region": "NY",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/19769937?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19228032",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19228032?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-07-20T15:00:00",
    "datetime": "2018-03-18T19:00:00",
    "description": "",
    "venue": {
      "name": "Ulster Performing Arts Center",
      "latitude": "41.929119",
      "longitude": "-74.004568",
      "city": "Kingston",
      "region": "NY",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/19228032?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19583489",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19583489?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-08-24T14:00:00",
    "datetime": "2018-03-20T19:30:00",
    "description": "",
    "venue": {
      "name": "Scottish Rite Auditorium",
      "latitude": "39.9143873",
      "longitude": "-75.0849289",
      "city": "Collingswood",
      "region": "NJ",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/19583489?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19744040",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19744040?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-09-15T16:00:00",
    "datetime": "2018-03-21T19:00:00",
    "description": "",
    "venue": {
      "name": "Count Basie Theatre",
      "latitude": "40.349097",
      "longitude": "-74.069947",
      "city": "Red Bank",
      "region": "NJ",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/19744040?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19316922",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19316922?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-03-22T19:30:00",
    "description": "",
    "venue": {
      "name": "Luhrs Center",
      "latitude": "40.041401",
      "longitude": "-77.496696",
      "city": "Shippensburg",
      "region": "PA",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19152334",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19152334?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-07-13T14:00:00",
    "datetime": "2018-03-23T19:30:00",
    "description": "",
    "venue": {
      "name": "The Santander Performing Arts Center",
      "latitude": "40.337512",
      "longitude": "-75.926022",
      "city": "Reading",
      "region": "PA",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/19152334?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "19152344",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/19152344?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-07-13T14:00:00",
    "datetime": "2018-03-24T19:00:00",
    "description": "",
    "venue": {
      "name": "F. M. Kirby Center",
      "latitude": "41.2453832",
      "longitude": "-75.8818108",
      "city": "Wilkes-Barre",
      "region": "PA",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/19152344?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20016505",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20016505?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-09-29T14:00:00",
    "datetime": "2018-05-12T20:00:00",
    "description": "",
    "venue": {
      "name": "Ohio Theatre",
      "latitude": "39.9602755",
      "longitude": "-82.9991748",
      "city": "Columbus",
      "region": "OH",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20886663",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20886663?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-06-01T19:30:00",
    "description": "",
    "venue": {
      "name": "Holland Performing Arts Center",
      "latitude": "41.262299",
      "longitude": "-95.934998",
      "city": "Omaha",
      "region": "NE",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20884256",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20884256?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-06-02T19:30:00",
    "description": "",
    "venue": {
      "name": "Holland Performing Arts Center",
      "latitude": "41.262299",
      "longitude": "-95.934998",
      "city": "Omaha",
      "region": "NE",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20884202",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20884202?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-06-03T14:00:00",
    "description": "",
    "venue": {
      "name": "Holland Performing Arts Center",
      "latitude": "41.262299",
      "longitude": "-95.934998",
      "city": "Omaha",
      "region": "NE",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20302985",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20302985?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-06-05T19:00:00",
    "description": "",
    "venue": {
      "name": "Chester Fritz Auditorium",
      "latitude": "46.806522",
      "longitude": "-100.782924",
      "city": "Grand Forks",
      "region": "ND",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "21278181",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/21278181?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "",
    "datetime": "2018-06-06T19:30:00",
    "description": "",
    "venue": {
      "name": "Washington Pavilion of Arts & Science",
      "latitude": "43.588902",
      "longitude": "-96.721901",
      "city": "Sioux Falls",
      "region": "SD",
      "country": "United States"
    },
    "offers": [],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20037294",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20037294?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-10-06T16:00:00",
    "datetime": "2018-06-07T19:00:00",
    "description": "",
    "venue": {
      "name": "La Crosse Center",
      "latitude": "43.81224",
      "longitude": "-91.25567",
      "city": "La Crosse",
      "region": "WI",
      "country": "United States"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/20037294?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  },
  {
    "id": "20771943",
    "artist_id": "1921",
    "url": "https://www.bandsintown.com/e/20771943?app_id=gigMapThinkful&came_from=267",
    "on_sale_datetime": "2017-12-07T12:10:00",
    "datetime": "2018-06-15T17:30:00",
    "description": "As the event takes place within a Historic Royal Palace there are a number of restrictions that we ask all guests to observe: - Barbecues are not permitted anywhere within the Palace Grounds - No hampers, large items or bags are permitted within the concert auditorium - A complimentary ‘left-picnic’ facility will be available within the Palace Gardens while you enjoy the concert - No smoking, drinking or eating is permitted inside the Palace including the courtyards and the concert auditorium - No audio-visual equipment or umbrellas are permitted to be used once inside the Palace, including the courtyards and the concert auditorium - All tickets are allocated seats which includes entrance to the Palace Gardens from 5.30pm. Free car parking is available for all ticket holders from 5pm. Please click here to see the full T&Cs [link: https://hamptoncourtpalacefestival.com/terms-conditions]",
    "venue": {
      "name": "Hampton Court",
      "latitude": "51.403813",
      "longitude": "-0.33767",
      "city": "London",
      "region": "",
      "country": "United Kingdom"
    },
    "offers": [
      {
        "type": "Tickets",
        "url": "https://www.bandsintown.com/t/20771943?app_id=gigMapThinkful&came_from=267",
        "status": "available"
      }
    ],
    "lineup": [
      "The Beach Boys"
    ]
  }
]`); // sample stuff 
displayGigsList(dummyJson)
createMap(dummyJson)
console.log(dummyJson);	
}

//end jQuery call
});