// Builds an array of geocode responses for the 5 cities.
var city = [
  {
    name: "Washington, DC",
    Status: {
      code: 200,
      request: "geocode"
    },
    Placemark: [
      {
        address: "Washington, DC, USA",
        population: "0.563M",
        Point: {
          coordinates: [-77.036667, 38.895000, 0]
        },
        AddressDetails: {
          Country: {
            CountryNameCode: "US",
            AdministrativeArea: {
            AdministrativeAreaName: "DC",
              Locality: {LocalityName: "Washington"}
            }
          }
        }
      }
    ]
  },
  {
    name: "Tokyo, Japan",
    Status: {
      code: 200,
      request: "geocode"
    },
    Placemark: [
      {
        address: "Tokyo, Japan",
        population: "12.527M",
        Point: {
          coordinates: [139.770004, 35.669998, 0]
        },
          AddressDetails: {
          Country: {
            CountryNameCode: "US",
            AdministrativeArea: {
              AdministrativeAreaName: "CA",
              Locality: {LocalityName: "Los Angeles"}
            }
          }
        }
      }
    ]
  },
  {
    name: "Paris, France",
    Status: {
      code: 200,
      request: "geocode"
    },
    Placemark: [
      {
        address: "Paris, France",
        population: "2.144M",
        Point: {
          coordinates: [2.351019, 48.856662, 0]
        },
        AddressDetails: {
          Country: {
            CountryNameCode: "FR",
            Locality: {LocalityName: "Paris"}
          }
        }
      }
    ]
  },
  {
    name: "Rome, Italy",
    Status: {
      code: 200,
      request: "geocode"
    },
    Placemark: [
      {
        address: "Rome, Italy",
        population: "2.553M",
        Point: {
          coordinates: [12.482181, 41.895431, 0]
        },
        AddressDetails: {
          Country: {
            CountryNameCode: "IT",
            Locality: {LocalityName: "Roma"}
          }
        }
      }
    ]
  },
  {
    name: "Berlin, Germany",
    Status: {
      code: 200,
      request: "geocode"
    },
    Placemark: [
      {
        address: "Berlin, Germany",
        population: "3.396M",
        Point: {
          coordinates: [13.411895, 52.523781, 0]
        },
        AddressDetails: {
          Country: {
            CountryNameCode: "DE",
            Locality: {LocalityName: "Berlin"}
          }
        }
      }
    ]
  },
  {
    name: "Madrid, Spain",
    Status: {
      code: 200,
      request: "geocode"
    },
    Placemark: [
      {
        address: "Madrid, Spain",
        population: "3.228M",
        Point: {
          coordinates: [-3.703270, 40.416712, 0]
        },
        AddressDetails: {
          Country: {
            CountryNameCode: "ES",
            Locality: {LocalityName: "Madrid"}
          }
        }
      }
    ]
  }
];


var map;
var geocoder;

// CapitalCitiesCache is a custom cache that extends the standard GeocodeCache.
// We call apply(this) to invoke the parent's class constructor.
function CapitalCitiesCache() {
  GGeocodeCache.apply(this);
}

// Assigns an instance of the parent class as a prototype of the
// child class, to make sure that all methods defined on the parent
// class can be directly invoked on the child class.
CapitalCitiesCache.prototype = new GGeocodeCache();

// Override the reset method to populate the empty cache with
// information from our array of geocode responses for capitals.
CapitalCitiesCache.prototype.reset = function() {
  GGeocodeCache.prototype.reset.call(this);
  for (var i in city) {
    this.put(city[i].name, city[i]);
  }
}

function initialize() {
  map = new GMap2(document.getElementById("map_canvas"));
  map.setCenter(new GLatLng(37.441944, -122.141944), 6);
  geocoder = new GClientGeocoder();
  geocoder.setCache(new CapitalCitiesCache());
}

function addAddressToMap(response) {
  map.clearOverlays();

  if (response && response.Status.code != 200) {
    alert("Unable to locate " + decodeURIComponent(response.name));
  } else {
    var place = response.Placemark[0];
    var point = new GLatLng(place.Point.coordinates[1],
                            place.Point.coordinates[0]);
    map.setCenter(point, 6);
    map.openInfoWindowHtml(point, "<b>City:</b> " + place.address
     + "<br><b>Population:</b> " + place.population);
  }
}

function findCity(which) {
  if (which != 0) {
    geocoder.getLocations(city[which - 1].name, addAddressToMap);
  }
}
