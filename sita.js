$(document).ready(function() {
    var i;

const buttonSita 				= document.getElementById("inputSitaSearch");
const filterSita 				= document.getElementById("inputSita");
const sitaLoci					= document.getElementById("sitaLoci");
const sitaDept					= document.getElementById("sitaDept");
const sitaCorp					= document.getElementById("sitaCorp");
const directConversion			= document.getElementById("directConversion");
const directConversionAddress 	= document.getElementById("directConversionAddress");
const iataLocation				= "IATA Location: ";
const iataAirlineDesignator		= "IATA Airline Designator: ";
const iataCorpDeptDesignator	= "IATA Department/Company Designator: ";
const noRecordFound				= "No Location records found";
const emptyString				= "";
const displayNone				= "none";
const third1					= document.getElementById("third1");
const third2					= document.getElementById("third2");
const third3					= document.getElementById("third3");

buttonSita.addEventListener("click", function() {
	almightyFilter();
})

inputSita.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    spinnyLoadyThing()
	setTimeout(almightyFilter, 100);
 }
});

function spinnyLoadyThing() {
	document.getElementById("loadingSpinnerContainer").style.display = "flex";
}


function almightyFilter() {
	
	document.getElementById("loadingSpinnerContainer").style.display = "none";

	var filterValueIata = filterSita.value.toLowerCase();
	
	sitaLoci.innerHTML 		= emptyString;
	sitaDept.innerHTML 		= emptyString;
	sitaCorp.innerHTML 		= emptyString;
	directConversion.style.display = displayNone;
	directConversionAddress.innerHTML= emptyString;
	third1.innerHTML = filterValueIata.substring(0, 3);
	third2.innerHTML = filterValueIata.substring(3, 5);
	third3.innerHTML = filterValueIata.substring(5, 7);
	

	
	
	if (filterSita.value != 0){
		third1.style.display = "flex";
		third2.style.display = "flex";
		third3.style.display = "flex";
		sitaLoci.style.display = "block";
		sitaDept.style.display = "block";
		sitaCorp.style.display = "block";
		
		for (i=0; i<Object.keys(obj4.convcode).length; i++){
			if(filterValueIata == obj4.convcode[i].sita.toLowerCase()) {
				directConversion.style.display = "flex";
				let node = obj4.convcode[i].sita +  "  >>>  " + obj4.convcode[i].aftn;
				let noder = document.createTextNode(node);
				directConversionAddress.appendChild(noder);	
				let br = document.createElement("br");
				directConversionAddress.appendChild(br);
			}
		}
		
		
		for (i=0; i<Object.keys(obj.apcode).length; i++){
			if (obj.apcode[i].iata.toLowerCase() == filterValueIata.substring(0, 3)) {
				let node = iataLocation + obj.apcode[i].iata +  " - " + obj.apcode[i].icao +  " | " + obj.apcode[i].airport +  ", " + obj.apcode[i].place;
				let noder = document.createTextNode(node);
				sitaLoci.appendChild(noder);
				let br = document.createElement("br");
				sitaLoci.appendChild(br);
				let hr = document.createElement("hr");
				sitaLoci.appendChild(hr);
			} 
		}
		
		
		
		for (i=0; i<Object.keys(obj2.alcode).length; i++){		
			if (obj2.alcode[i].designator.toLowerCase() == filterValueIata.substring(3, 5)){
				let node = iataAirlineDesignator + obj2.alcode[i].designator +  " - " + obj2.alcode[i].airline +  " | " + obj2.alcode[i].country +  ", " + obj2.alcode[i].remark;
				let noder = document.createTextNode(node);
				sitaDept.appendChild(noder);
				let br = document.createElement("br");
				sitaDept.appendChild(br);
				let hr = document.createElement("hr");
				sitaDept.appendChild(hr);

			}
			if (obj2.alcode[i].designator.toLowerCase() == filterValueIata.substring(5, 7)){
				let node = iataAirlineDesignator + obj2.alcode[i].designator +  " - " + obj2.alcode[i].airline +  " | " + obj2.alcode[i].country +  ", " + obj2.alcode[i].remark;
				let noder = document.createTextNode(node);
				sitaCorp.appendChild(noder);
				let br = document.createElement("br");
				sitaCorp.appendChild(br);
				let hr = document.createElement("hr");
				sitaCorp.appendChild(hr);

			}
		}
		
		for (i=0; i<Object.keys(obj3.corpcode).length; i++){		
			if (obj3.corpcode[i].abbr.toLowerCase() == filterValueIata.substring(5, 7)){
				let node = iataCorpDeptDesignator + obj3.corpcode[i].abbr +  ": " + obj3.corpcode[i].meaning;
				let noder = document.createTextNode(node);
				sitaCorp.appendChild(noder);
				let br = document.createElement("br");
				sitaCorp.appendChild(br);
				let hr = document.createElement("hr");
				sitaCorp.appendChild(hr);
			}
			if (obj3.corpcode[i].abbr.toLowerCase() == filterValueIata.substring(3, 5)){
				let node = iataCorpDeptDesignator + obj3.corpcode[i].abbr +  ": " + obj3.corpcode[i].meaning;
				let noder = document.createTextNode(node);
				sitaDept.appendChild(noder);
				let br = document.createElement("br");
				sitaDept.appendChild(br);
				let hr = document.createElement("hr");
				sitaDept.appendChild(hr);
			}
		}
		
		if (sitaLoci.innerHTML == emptyString) {
			sitaLoci.innerHTML = noRecordFound;
		}
		if (sitaDept.innerHTML == emptyString) {
			sitaDept.innerHTML = noRecordFound;
		}
		if (sitaCorp.innerHTML == emptyString) {
			sitaCorp.innerHTML = noRecordFound;
		}
	} else {
		third1.style.display = displayNone;
		third2.style.display = displayNone;
		third3.style.display = displayNone;
	}
}

// This function fills the apcodes table with the three letter code lookups. Not used atm.
// Possible use case in a feature request, but it is very slow.
// Can be applied to the penultimate and last code sequence too, if needed.
function createTableContent() {
	var TR 					= document.createElement("tr");
	var TDiata 				= document.createElement("td");
	var TDicao 				= document.createElement("td");
	var TDap 				= document.createElement("td");
	var TDplc 				= document.createElement("td");
	var textContentIata 	= document.createTextNode(obj.apcode[i].iata);
	var textContentIcao 	= document.createTextNode(obj.apcode[i].icao);
	var textContentAp	 	= document.createTextNode(obj.apcode[i].airport);
	var textContentPlc 		= document.createTextNode(obj.apcode[i].place);
	TDiata.appendChild(textContentIata);
	TDicao.appendChild(textContentIcao);
	TDap.appendChild(textContentAp);
	TDplc.appendChild(textContentPlc);
	TR.appendChild(TDiata);
	TR.appendChild(TDicao);
	TR.appendChild(TDap);
	TR.appendChild(TDplc);
	apcodesTable.appendChild(TR);
}

// This function calls the function to create a database table out of all location data sets.
// Not used ATM. See createTableContent
function init() {
for (i=0; i<Object.keys(obj.apcode).length; i++){
			createTableContent(); // calls each JSON object and creates a row for it
		} console.log(i);
	}

var obj;
obj = JSON.parse(apcodes);
var obj2;
obj2 = JSON.parse(alcodes);
var obj3;
obj3 = JSON.parse(corpcodes);
var obj4;
obj4 = JSON.parse(convcodes)


// init();  This is commented out, would otherwise call the init function. Maybe later or for debugging idk
});