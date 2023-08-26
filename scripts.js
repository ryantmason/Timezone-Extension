
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

    const mapsApiKey = 'AIzaSyA6LXL7L2bzcy1evbjJha4E8RB_7K0t7rs';

    //Convert address to coordinates using Geocoding API
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${mapsApiKey}`;

    $.get(geocodingUrl, function(geocodingData) {
    if (geocodingData.status === 'OK') {
        const coordinates = geocodingData.results[0].geometry.location;
        const lat = coordinates.lat;
        const lng = coordinates.lng;

        //Get time zone using Time Zone API
        const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${mapsApiKey}`;


        $.get(timezoneUrl, function(timezoneData) {
        const timeZoneId = timezoneData.timeZoneId;
        const timeZoneName = timezoneData.timeZoneName;

        
        var rawOffset = new Date();
        const convertOffset = rawOffset / 4;

        $('#result').html(`Raw Offset: ${rawOffset} Converted Offset: ${convertOffset}`); //TESTING

        $('#result').html(`Time Zone ID: ${timeZoneId}<br>Time Zone Name: ${timeZoneName}`);

        $('#result').html(`Time Zone ID: ${timeZoneId}<br>Time Zone Name: ${timeZoneName}`);
        });
    } else {
        $('#result').text('Error Retrieving Time Zone');
    }
    });
});
});
