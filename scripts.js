
$(document).ready(function() {
$('#convertBtn').click(function() {
    const address = $('#address').val();
    if (address === '') {
    $('#result').text('Please enter an address.');
    return;
    }

    const mapsApiKey = '';

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

        $('#result').html(`Time Zone ID: ${timeZoneId}<br>Time Zone Name: ${timeZoneName}`);
        });
    } else {
        $('#result').text('Geocoding API request failed. Please check your address or API key.');
    }
    });
});
});
