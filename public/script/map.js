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
