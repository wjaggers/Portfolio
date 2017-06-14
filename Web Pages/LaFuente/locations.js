

  var map;

   function initMap() {
    var center = {lat: 39.100970, lng: -94.457675};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: center
    });
  }

  
  var alpha = ["A","B","C","D","E","F","G","H","I","J"];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'locations.json');

  xhr.onreadystatechange = function () {
	 if (xhr.readyState === 4) {
		const locations = JSON.parse(xhr.responseText);
		initMap();
		for (let x=0; x < locations.length; x++) {
			var locParent = document.getElementById("locations");		
			var locMarker = document.createElement("IMG");
			locMarker.setAttribute("class","marker");
			var index = alpha[x];
			var locSrc = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + index + "|FF0000|000000";
			locMarker.setAttribute("src",locSrc);
	    	locParent.appendChild(locMarker);

	    	var locData = document.createElement("B");
	   		locData.innerHTML=locations[x].location;
	   		locData.setAttribute("class", "locName");
	   		locParent.appendChild(locData); 

	   		var locAddr = document.createElement("P");
	   		locAddr.innerHTML = locations[x].streetAddr;
	   		locParent.appendChild(locAddr);

	   		var locCity= document.createElement("P");
	   		locCity.innerHTML = locations[x].cityStateZip;
	   		locParent.appendChild(locCity);

	   		var locPhone = document.createElement("P");
	   		locPhone.innerHTML = locations[x].phone;
			locParent.appendChild(locPhone);

	   		var locHrs1 = document.createElement("P");
 			locHrs1.innerHTML = locations[x].firstItem;
	   		locParent.appendChild(locHrs1);

	   		var locHrs2 = document.createElement("P");
	   		locHrs2.innerHTML = locations[x].secondItem;
	   		locParent.appendChild(locHrs2);

	   		if(locations[x].thirdItem !== "") { 
		   		var locHrs3 = document.createElement("P");
		   		locHrs3.innerHTML = locations[x].thirdItem;
		   		locParent.appendChild(locHrs3);
		   	}

	   		var lineBR = document.createElement("HR");
	   		lineBR.setAttribute("class","break");
	   		locParent.appendChild(lineBR);

	   		var marker = new google.maps.Marker({
	          position: {lat: locations[x].lat, lng: locations[x].long},
	          map: map,
	          label: index
	        });
	    }	
     }
};

  function sendAJAX() {
    xhr.send();
   }

 sendAJAX();

