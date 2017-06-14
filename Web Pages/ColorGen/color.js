
function getKey(e) {
	if (!e) e=window.event;

	const colorInput = document.getElementById('colorNum');
	let colorNum = colorInput.value;
	
	if(e.keyCode == 13 || e.keyCode == 9) {		// if return or tab keys
		if (colorNum.length < 6) {
			for(let i = colorNum.length; i < 6; i++) {		// pad number with trailing zeros
				colorNum = colorNum + "0";
			}
		}
		const hexColorCode = '#' + colorNum;
		const colorBox = document.getElementById('colorbox');
		colorBox.style.backgroundColor = hexColorCode;			// set background color of my box
		colorInput.value = colorNum;
		updateRGB(hexColorCode);
	} else if (colorNum.length > 5) {
				alert("Max number of digits is 6");
				return false;
			} else {
					var key = String.fromCharCode(e.which);
					if ((key < "a" || key > "f" ) && (key < "0" || key > "9")) {
						alert("Hex number must be 0-9 or a-f");
						return false;
					}
				}		
			
}


function clearInput() {
	const colorInput = document.getElementById('colorNum');
	colorInput.value = "";	
	const colorBox = document.getElementById('colorbox');
	colorBox.style.backgroundColor = '#ffffff';			// set background color of my box
	updateRGB("000000");
}


function updateRGB(colorCode) {
	var redVal = parseInt(colorCode.substring(1,3), 16);
	var greenVal = parseInt(colorCode.substring(3,5), 16);
	var blueVal = parseInt(colorCode.substring(5,7), 16);

	var redBot = document.getElementById('redbot');
	var greenBot = document.getElementById('greenbot');
	var blueBot = document.getElementById('bluebot');

	redBot.style.marginTop = "-" + redVal + "px";
	redBot.style.height = redVal + "px";
	greenBot.style.marginTop = "-" + greenVal + "px";
	greenBot.style.height = greenVal + "px";
	blueBot.style.marginTop = "-" + blueVal + "px";
	blueBot.style.height = blueVal + "px";
}


function downButton(e) {
	var buttonID = e.srcElement;
	var heightAdj = -1;
	var marginAdj = 1;
	updateColorBar(heightAdj, marginAdj, buttonID);
}


function upButton(e) {
	var buttonID = e.srcElement;
	var heightAdj = 1;
	var marginAdj = -1;
	updateColorBar(heightAdj, marginAdj, buttonID);
}


function updateColorBar(heightAdj, marginAdj, buttonID){
	if (buttonID.id.substring(0,3) == "red"){
		var colorBar = document.getElementById('redbot');
	} else if(buttonID.id.substring(0,3) == "gre"){ 
		var colorBar = document.getElementById('greenbot');		
	} else {
		var colorBar = document.getElementById('bluebot');
	}

	var colorMar = colorBar.style.marginTop;
	var colorHeight = colorBar.style.height;

	if (colorMar == "") {
		colorMar = 0;
	} else {
		colorMar = Number(colorMar.substring(0, colorMar.length - 2));
	}
	if (colorHeight == "") {
		colorHeight == 0;
	} else {
		colorHeight = Number(colorHeight.substring(0, colorHeight.length - 2));
	}
	
	colorHeight += heightAdj;
	colorMar += marginAdj;

	if(colorHeight >= 0 && colorHeight < 256) {
		colorBar.style.marginTop = colorMar + "px";
		colorBar.style.height = colorHeight + "px";
		updateColorNum(heightAdj, buttonID);
	}
}


function updateColorNum(numIn, buttonID) {
	var colorInput = document.getElementById('colorNum');
	var colorVal = colorInput.value;
 	if (colorVal == "") {
 		colorVal = "000000";
 	}
	var redVal = parseInt(colorVal.substring(0,2), 16);
	var greenVal = parseInt(colorVal.substring(2,4), 16);
	var blueVal = parseInt(colorVal.substring(4,6), 16);

	if (buttonID.id == "redup" || buttonID.id == "reddown") {
		redVal += numIn;
	} else if (buttonID.id == "greenup" || buttonID.id == "greendown") {
		greenVal += numIn;
	} else {
		blueVal += numIn;
	}

	var redHex = redVal.toString(16);
	var greenHex = greenVal.toString(16);
	var blueHex = blueVal.toString(16);

	if (redHex.length < 2)
		redHex = "0" + redHex;
	if (greenHex.length < 2)
		greenHex = "0" + greenHex;
	if (blueHex.length < 2)
		blueHex = "0" + blueHex;

	newNum = redHex + greenHex + blueHex; 
	
	colorInput.value = newNum;
	const hexColorCode = '#' + newNum;
	const colorBox = document.getElementById('colorbox');
	colorBox.style.backgroundColor = hexColorCode;			// set background color of my box
}


var colorInput = document.getElementById('colorNum');
colorInput.onkeypress = getKey;

var colorInput = document.getElementById('colorNum');
colorInput.onclick = clearInput;

var redUpButton = document.getElementById('redup');
var greenUpButton = document.getElementById('greenup');
var blueUpButton = document.getElementById('blueup');

redUpButton.onclick = upButton;
greenUpButton.onclick = upButton;
blueUpButton.onclick = upButton;


var redDownButton = document.getElementById('reddown');
var greenDownButton = document.getElementById('greendown');
var blueDownButton = document.getElementById('bluedown');

redDownButton.onclick = downButton;
greenDownButton.onclick = downButton;
blueDownButton.onclick = downButton;

















/*
 $('#colorbox').css("background-color", "red");

 $('#colorNum').on('keypress', function() {
	keyPressed = $('#colorNum').val(); 
	
	var	colorStyle = "#" + colorNum;
	$('#colorbox').css("background-color", colorStyle);	
	
	return(colorNum);
});


 
 $('#colorNum').on('click', function() {
 	$('#colorbox').css(background-color, "black");
 	$('#colorNum').val("");
});

*/



