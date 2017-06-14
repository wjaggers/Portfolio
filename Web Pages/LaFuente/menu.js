const catagories = [];

function getColor(color) {
	switch (color) {
		case "red":
			return "#cc2a36";
			break;
		case "purple":
			return "#800080";
			break;
		case "green":
			return "#008744";
			break;
		case "blue":
			return "#0057e7";
			break;
		case "yellow":
			return "#f3f713";
			break;
		default:
			return "black"; 		
	}
}

$(document).ready(function(){
 setInterval('cycleImages()', 3000);
})

function cycleImages(){
      var $active = $('#cycler .active');
      var $next = ($active.next().length > 0) ? $active.next() : $('#cycler img:first');
      $next.css('z-index',2);									//move the next image up the pile
      $active.fadeOut(1500,function(){							//fade out the top image
	 	 $active.css('z-index',1).show().removeClass('active');	//reset the z-index and unhide the image
         $next.css('z-index',3).addClass('active');				//make the next image the top one
      });
    }

var xhr = new XMLHttpRequest();
xhr.open('GET', 'categories.json');

xhr.onreadystatechange = function () {
 if (xhr.readyState === 4) {
	categories = JSON.parse(xhr.responseText);
 }
}

function sendAJAX() {
    xhr.send();
}

sendAJAX();


function menuClick(e) {
	var category = e.srcElement;
	var menuItem = category.id;
	var item = categories[menuItem];

	var topNode = document.getElementById("menuArea");
	while (topNode.firstChild) {
	    topNode.removeChild(topNode.firstChild);
	}
	
	color = getColor(item.color);
	var catImg = document.createElement("IMG");
	var imgSrc = "Images/fuente" + item.color + ".png";
	catImg.setAttribute("src",imgSrc);
	catImg.setAttribute("class","menuImg");
	catImg.style.color = color;
	topNode.appendChild(catImg);

	var catHdg = document.createElement("P");
	catHdg.innerHTML = item.spanish;
	catHdg.style.color = color;
	catHdg.setAttribute("class","menuHeading");
	topNode.appendChild(catHdg);

	var catDesc = document.createElement("P");
	catDesc.innerHTML = item.trans;
	catDesc.setAttribute("class","menuDesc");
	topNode.appendChild(catDesc);

	for (x=0; x < item.foods.length; x++) {
   		var foodItem = document.createElement("P");
   		foodItem.innerHTML = item.foods[x].food + '<span class="price">' + item.foods[x].price + '</span>';
		foodItem.setAttribute("class","foodText");
		foodItem.style.color = color;
		topNode.appendChild(foodItem);
		
		if(item.foods[x].description !== "") {
	   		var foodDesc = document.createElement("P");
	   		foodDesc.innerHTML = item.foods[x].description;
			foodDesc.setAttribute("class","foodDesc ");
			topNode.appendChild(foodDesc);
		}



	}
}

var menuCats = document.getElementsByClassName("catItem");
	for (x=0; x < menuCats.length; x++) {
	menuCats[x].onclick = menuClick;
}