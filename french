$(document).ready(function() {



// I N I T I A L   V A R I A B L E S   D E C L A R A T I O N S

var obj;
var i;
var a					= 0;
const filterAll 		= document.getElementById("searchAll");
const filterFrench 		= document.getElementById("searchFrench");
const filterGerman 		= document.getElementById("searchGerman");
const translateTable 	= document.getElementById("frenchTable");
const btnContainer 		= document.getElementById("inputField2");
const btns 				= btnContainer.getElementsByClassName("switchButton");

// E V E N T   L I S T E N E R S

filterAll.addEventListener("keyup", function() {
	while (translateTable.childNodes.length > 2) { // > 2 so it stops before removing the <th>
    	translateTable.removeChild(translateTable.lastChild);
	}
 	for (i=0; i<Object.keys(obj.translate).length; i++){
		var filterValueA = filterAll.value.toLowerCase();
		if (filterValueA.match(/[\u00C0-\u00FF\u0027]/g)){ // checks if accent characters are present
			if (obj.translate[i].french.toLowerCase().includes(filterValueA) || obj.translate[i].german.toLowerCase().includes(filterValueA)) {
				wordList(); // if accent characters present, search with them
			} 
		} else { // if no accent characters present, normalize the object value and remove accent characters
			var deaccentedAF = _.deburr(obj.translate[i].french.toLowerCase()); // ALL GLORY TO LODASH FOR THE DEBURR FUNCTION OH MY GOD
			var deaccentedAG = _.deburr(obj.translate[i].german.toLowerCase()); // ...deburr removes accents and replaces accented letters with latin letters (è -> e)
			if (deaccentedAF.includes(filterValueA) || deaccentedAG.includes(filterValueA)) {
				wordList();
			}
		}
	}
})

filterFrench.addEventListener("keyup", function() {
	while (translateTable.childNodes.length > 2) { // > 2 so it stops before removing the <th>
    	translateTable.removeChild(translateTable.lastChild);
	}
 	for (i=0; i<Object.keys(obj.translate).length; i++){
		var filterValueF = filterFrench.value.toLowerCase();
		if (filterValueF.match(/[\u00C0-\u00FF\u0027]/g)){ // checks if accent characters are present
			if (obj.translate[i].french.toLowerCase().includes(filterValueF)) {
				wordList(); // if accent characters present, search with them
			} 
		} else { // if no accent characters present, normalize the object value and remove accent characters
			var deaccentedF = _.deburr(obj.translate[i].french.toLowerCase());
			if (deaccentedF.includes(filterValueF)) {
				wordList();
			}
		}
	}
})

filterGerman.addEventListener("keyup", function() {
	while (translateTable.childNodes.length > 2) { // > 2 so it stops before removing the <th>
    	translateTable.removeChild(translateTable.lastChild);
	}
 	for (i=0; i<Object.keys(obj.translate).length; i++){
		var filterValueG = filterGerman.value.toLowerCase();
		if (filterValueG.match(/[\u00C0-\u00FF\u0027]/g)){ // checks if accent characters are present
			if (obj.translate[i].german.toLowerCase().includes(filterValueG)) {
				wordList(); // if accent characters present, search with them
			} 
		} else { // if no accent characters present, normalize the object value and remove accent characters
			var deaccentedG = _.deburr(obj.translate[i].german.toLowerCase());
			if (deaccentedG.includes(filterValueG)) {
				wordList();
			}
		}
	}
})

//These event listeners just call the init function with a assigned a value which determines the JSON source

function tabbing(buttonID) {
	for (let i = 0; i < btns.length; i++) {
  		if(btns[i].getAttribute('id') == buttonID){
  			btns[i].style.backgroundColor ="blue";
			  btns[i].style.color ="white";
  		} else {
  			btns[i].style.backgroundColor ="lightblue";
			  btns[i].style.color ="black";
  		}
  	}
	filterAll.focus()
}


document.getElementById("buttonGeneral").addEventListener("click", function() {
	let buttonID = "buttonGeneral";
	tabbing(buttonID);
	a = 0;
	init();
})

document.getElementById("buttonSFO").addEventListener("click", function() {
	let buttonID = "buttonSFO";
	tabbing(buttonID);
	a = 1;
	init();
})

document.getElementById("buttonWhatever").addEventListener("click", function() {
	let buttonID = "buttonWhatever";
	tabbing(buttonID);
	a = 2;
	init();
})

document.getElementById("buttonAnother").addEventListener("click", function() {
	let buttonID = "buttonAnother";
	tabbing(buttonID);
	a = 3;
	init();
})

// F U N C T I O N S


// This creates the rows of the table dynamically
function createTableContent() {
	var TR 					= document.createElement("tr");
	var TDFrench 			= document.createElement("td");
	var TDGerman 			= document.createElement("td");
	var textContentFrench 	= document.createTextNode(obj.translate[i].french);
	var textContentGerman 	= document.createTextNode(obj.translate[i].german);
	TDFrench.appendChild(textContentFrench);
	TDGerman.appendChild(textContentGerman);
	TR.appendChild(TDFrench);
	TR.appendChild(TDGerman);
	translateTable.appendChild(TR);
}

// This creates the table itseld
function wordList() {
	if (filterAll.value == 0 && filterFrench.value == 0 && filterGerman.value == 0){
		translateTable.innerHTML=""; // clears the table completely 
		var THFrench= document.createElement("th"); // The next lines rebuild the table with a header
		var THGerman= document.createElement("th");
		var THcontentFrench = document.createTextNode("Français");
		var THcontentGerman = document.createTextNode("Deutsch");
		THFrench.appendChild(THcontentFrench);
		THGerman.appendChild(THcontentGerman);
		translateTable.appendChild(THFrench);
		translateTable.appendChild(THGerman);
		THFrench.setAttribute("id", "baguette");
		THGerman.setAttribute("id", "bratwurst");
		
		for (i=0; i<Object.keys(obj.translate).length; i++){
			createTableContent(); // calls each JSON object and creates a row for it
		}
	} else {
		createTableContent(); // entry point for the filter event listeners; doesn't destroy the table
	}
}

// Initial display of the table and also used for switching JSON sources
function init() {
	if (a == 0){
		obj = JSON.parse(json);
		wordList();
	} else if (a == 1) {
		obj = JSON.parse(json2);
		wordList();
	} else if (a == 2) {
		obj = JSON.parse(json3);
		wordList();
	} else if (a == 3) {
		obj = JSON.parse(json4);
		wordList();
	}
}

// M A I N   E N T R Y   P O I N T
let buttonID = "buttonGeneral";
tabbing(buttonID);
init();
filterAll.focus();
});