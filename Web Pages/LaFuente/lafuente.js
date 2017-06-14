
	      function initMap() {
	        var center = {lat: 39.100970, lng: -94.457675};
	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 9,
	          center: center
	        });
	        var marker = new google.maps.Marker({
	          position: {lat: 38.982498, lng: -94.358643},
	          map: map,
	          label: "A"
	        });
	         var marker2 = new google.maps.Marker({
	          position: {lat: 38.852168, lng: -94.395841},
	          map: map,
	          label: "B"
	        });
	        var marker3 = new google.maps.Marker({
	          position: {lat: 38.934996, lng: -94.377852},
	          map: map,
	          label: "C"
	        });
	        var marker4 = new google.maps.Marker({
	          position: {lat: 39.371913, lng: -94.361302},
	          map: map,
	          label: "D"
	        });  
	        var marker5 = new google.maps.Marker({
	          position: {lat: 39.077302, lng: -94.378191},
	          map: map,
	          label: "E"
	        });
	        var marker6 = new google.maps.Marker({
	          position: {lat: 39.389015, lng: -94.583564},
	          map: map,
	          label: "F"
	        });
	        var marker7 = new google.maps.Marker({
	          position: {lat: 39.049675, lng: -94.449070},
	          map: map,
	           label: "G"
	       });
	        var marker8 = new google.maps.Marker({
	          position: {lat: 38.992576, lng: -94.711808},
	          map: map,
	          label: "H"
	       });
	      }


  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'locations.json');
//  xhr.onreadystatechange = function () {
//	 if (xhr.readyState === 4) {
//		const locations = JSON.parse(xhr.responseText);
//		var firstLoc = locations[0];

		for (x=0; x < 8; x++) {
			var locParent = document.getElementById("locations");		
			var locMarker = document.createElement("IMG");
			locMarker.setAttribute("class","marker");
			var locSrc = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + x + "|FF0000|000000";
			locMarker.setAttribute("src",locSrc);
	    	locParent.appendChild(locMarker);

	    	var locData = document.createElement("B");
	   		locData.innerHTML="Woods Chapel";
	   		locData.setAttribute("class", "locName");
	   		locParent.appendChild(locData); 

	   		var locAddr = document.createElement("P");
	   		locAddr.innerHTML = "917 NE Woods Chapel Rd";
	   		locParent.appendChild(locAddr);

	   		var locCity= document.createElement("P");
	   		locCity.innerHTML = "Lee's Summit, MO 64064";
	   		locParent.appendChild(locCity);

	   		var locPhone = document.createElement("P");
	   		locPhone.innerHTML = "(816) 524-2722";
			locParent.appendChild(locPhone);

	   		var locBrk = document.createElement("P");
			locBrk.innerHTML = " ";
			locParent.appendChild(locBrk);

	   		var locHrs1 = document.createElement("P");
 			locHrs1.innerHTML = "Mon - Thu 11:00AM - 9:30PM";
	   		locParent.appendChild(locHrs1);

	   		var locHrs2 = document.createElement("P");
	   		locHrs2.innerHTML = "Fri & Sat 11:00AM - 10:00PM";
	   		locParent.appendChild(locHrs2);

//	   		if(locations[i].thirdItem !== "") { 
		   		var locHrs3 = document.createElement("P");
		   		locHrs3.innerHTML = "Sun  11:30AM - 9:00PM";
		   		locParent.appendChild(locHrs3);
//		   	}
	   		var lineBR = document.createElement("HR");
	   		lineBR.setAttribute("class","break");
	   		locParent.appendChild(lineBR);

	    }	
 //    }
//  };

//  function sendAJAX() {
//    xhr.send();
//   }

	
// sendAJAX();

