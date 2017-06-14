
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'locations.json');

  xhr.onreadystatechange = function () {
	 if (xhr.readyState === 4) {
		const locations = JSON.parse(xhr.responseText);

		for (let x=0; x < locations.length; x++) {
			var locParent = document.getElementById("contactLoc");		

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

	   		var lineBR = document.createElement("HR");
	   		lineBR.setAttribute("class","break");
	   		locParent.appendChild(lineBR);

	    }	
     }
};

  function sendAJAX() {
    xhr.send();
   }

 sendAJAX();

