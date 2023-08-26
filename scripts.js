
//ensure all resources in document are ready to be displayed
$(document).ready(function() {

// function that will execute when convertBtn(button id) in html is pressed
$('#convertBtn').click(function() {

    // constant for address
    const address = $('#address').val();

    // Ensure address entry is not blank
    if (address === '') {

    $('#result').text('Please Enter an Address');
    return;
    }
    // api key (needs to be hidden)
    const mapsApiKey = 'AIzaSyA6LXL7L2bzcy1evbjJha4E8RB_7K0t7rs';

    //Convert address to coordinates using Geocoding API
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${mapsApiKey}`;

    // function that gets lng/lat from geocoding API URL
    $.get(geocodingUrl, function(geocodingData) {

    // check that geocodingData was succesfully retrieved
    if (geocodingData.status === 'OK') {

        // create coordinates const that retrieves coordinate data for respective address
        const coordinates = geocodingData.results[0].geometry.location;

        // create longitude and latitude consts
        const lat = coordinates.lat;
        const lng = coordinates.lng;

        //Get time zone using API call with retrieved lng/lat
        const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${mapsApiKey}`;

        // function that gets timezoneData from Time Zone API URL
        $.get(timezoneUrl, function(timezoneData) {

        // create timeZoneId const (Ex. America/Los_Angeles)     
        const timeZoneId = timezoneData.timeZoneId;
        const parts = timeZoneId.split('/'); // Split the string into an array using '/'
        const timeZoneCity = parts[1];

        if (timeZoneCity.includes('_')){
            
            //const cparts = timeZoneCity.split('_');
            //const timeZoneCity = cparts[0] + cparts[1];

            $('#test').html(`TEST CITY NAME: ${timeZoneCity}`);
        }

        // create timeZoneName const (Ex. Pacific Daylight Time)
        const timeZoneName = timezoneData.timeZoneName;

        const rawOffset = timezoneData.rawOffset;
            
        const rawOffsetHours = rawOffset / 3600;
        const isPositive = rawOffsetHours >= 0;
        const absHours = Math.abs(rawOffsetHours);
        const minutes = (absHours - Math.floor(absHours)) * 60;

        const offsetSign = isPositive ? "+" : "-";
        const offsetHours = Math.floor(absHours);
        const offsetMinutes = Math.floor(minutes);

        const convertOffset = `(UTC${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')})`;

        // Display (UTC-00:00) Time Zone Name - majorCityName
        $('#result').html(`${convertOffset} ${timeZoneName} - ${timeZoneCity}`);

        });
    } else {
        $('#result').text('Error Retrieving Time Zone');
    }
    });
});
});
