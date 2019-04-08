function myMap() {

    let latitude = document.getElementById("lat").value;
    let longitude = document.getElementById("lng").value;
    var myLatLng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
        
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Home location'
    });
}





function getLatLng() {
  // var address = document.getElementById('address').value;
  let address = "24 butler st, salam nh";
  console.log(address);
  alert(address);
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      console.log("this is gecoding");
      console.log(results);
      let LatLng = results[0].geometry.location;
      alert(LatLng);
      // resultsMap.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //   map: resultsMap,
      //   position: results[0].geometry.location
      // });
      // alert(LatLng.split(","));
    
      let lat = document.getElementById("lat");
      let lng = document.getElementById("lng");
      alert(lat.value);
      lat.value = "LatLng";
      lng.value = "LatLng2";
      alert(lat.value);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }24
  });
}

