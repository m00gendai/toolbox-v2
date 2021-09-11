// A I P   Q U E R Y   I N P U T   F U N C T I O N

function linkAIP(icao) { // icao = passed parameter from onclick
    console.log(icao);
    
    if (icao in linkCollectionAIP) {
        var linkAIP = linkCollectionAIP[icao];
        console.log(linkCollectionAIP[icao])
    }
    
    window.open(linkAIP);
}



  

 // A I P   T I L E   D I S P L A Y   F U N C T I O N

function displayAIP() {
    let inputA  = document.getElementById("aipBar");
    let inputB  = inputA.value.toLowerCase();
    let inputC  = String(inputB);
    let rows    = document.getElementById("aipLinks").querySelectorAll(".aipLinkBox");
    
    if (inputA.value != null) {
        
        for (i=0; i<rows.length; i++) {
            let sourcez = document.getElementById("aipLinks").getElementsByTagName("p")[i].innerHTML.toLowerCase();
            let foundz  = sourcez.indexOf(inputB) !== -1;
      
            if (foundz) {
                rows[i].style.display = "block";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}



// I N I T I A L   L O A D

$(document).ready(function() {
    
window.addEventListener("keypress", function(e){
    if(e.keyCode ==  32 && e.target != document.getElementById("screenDocument")){
        e.preventDefault();
    }
});
  
$("#home").click(function() {
    location.reload();
});
$("#ats").click(function() {
  $("#contentBox").hide();
  $("#aipBox").hide();
  $("#atsBox").show();
  $("#docBox").hide();
  $("#spvrBox").hide();
  $("#frenchBox").hide();
  $("#sitaBox").hide();
  $("#doctoolBox").hide();
  $("#ident").focus();
});
$("#aip").click(function() {
  $("#contentBox").hide();
  $("#aipBox").show();
  $("#atsBox").hide();
  $("#docBox").hide();
  $("#spvrBox").hide();
  $("#frenchBox").hide();
  $("#sitaBox").hide();
  $("#doctoolBox").hide();
  $("#aipBar").focus();
});
$("#spvr").click(function() {
  $("#contentBox").hide();
  $("#aipBox").hide();
  $("#atsBox").hide();
  $("#docBox").hide();
  $("#spvrBox").show();
  $("#sitaBox").hide();
  $("#frenchBox").hide();
  $("#doctoolBox").hide();
  $("#sitaConversion").hide();
  togglorz();
});


$("#doctool").click(function() {

        $("#contentBox").hide();
        $("#aipBox").hide();
        $("#atsBox").hide();
        $("#docBox").hide();
        $("#spvrBox").hide();
        $("#frenchBox").hide();
        $("#sitaBox").hide();
        $("#doctoolBox").show();
        document.getElementById("queryFK").focus();

});

                   
// H O M E   T I L E   G E N E R A T O R
          
const quicklinkGeneratorSpace = document.getElementById("quickLinks");
function generateAIPtiles(homeTileData){
for(let i=0;i<homeTileData.length;i++){
    const homeTileDiv = document.createElement("div");
    const homeTileDivP = document.createElement("p");
    homeTileDivImg = document.createElement("img");
    homeTileDiv.setAttribute("id", homeTileData[i].id);
    homeTileDiv.setAttribute("class", "quicklinksContainerBox");
    homeTileDiv.setAttribute("tabindex", 0);
    homeTileDivImg.src = homeTileData[i].img;
    homeTileDiv.appendChild(homeTileDivImg);
    homeTileDiv.appendChild(homeTileDivP);
    homeTileDivP.innerHTML = homeTileData[i].title;
    if(homeTileData[i].style == "spvr"){
        homeTileDiv.style.background = "linear-gradient(45deg,  #e570e7 0%,#c85ec7 47%,#a849a3 100%)";
    }
    if(homeTileData[i].style == "aro"){
        homeTileDiv.style.background = "linear-gradient(45deg,  #a7cfdf 0%,#23538a 100%)";
    }
    if(homeTileData[i].style == "general"){
        homeTileDiv.style.background = "linear-gradient(45deg,  #ffa84c 0%,#ff7b0d 100%)";
    }
    if(homeTileData[i].style == "pub"){
        homeTileDiv.style.background = "linear-gradient(45deg, #299a0b 0%,#299a0b 100%)";
    }
    if(homeTileData[i].style == "sfo"){
        homeTileDiv.style.background = "linear-gradient(45deg,  #ffd65e 0%,#febf04 100%)";
    }
    if(homeTileData[i].style == "doc"){
        homeTileDiv.style.background = "linear-gradient(45deg,  #ff3019 0%,#cf0404 100%)";
    }
    if(homeTileDiv.id != "frenchStuff" && homeTileDiv.id != "sitaConversion"){
        homeTileDiv.addEventListener("click", function(){
            window.open(homeTileData[i].link)
        });
        homeTileDiv.addEventListener("keypress", function(e){
            if(e.keyCode == 13 || e.keyCode == 32) {
                window.open(homeTileData[i].link)
            }
        });
    } else if(homeTileDiv.id == "frenchStuff"){
        homeTileDiv.addEventListener("click", function(){
            $("#contentBox").hide();
            $("#aipBox").hide();
            $("#atsBox").hide();
            $("#docBox").hide();
            $("#spvrBox").hide();
            $("#frenchBox").show();
            $("#sitaBox").hide();
            $("#doctoolBox").hide();
            $("#searchAll").focus();
        });
        homeTileDiv.addEventListener("keypress", function(e){
            if(e.keyCode == 13 || e.keyCode == 32) {
                $("#contentBox").hide();
            $("#aipBox").hide();
            $("#atsBox").hide();
            $("#docBox").hide();
            $("#spvrBox").hide();
            $("#frenchBox").show();
            $("#sitaBox").hide();
            $("#doctoolBox").hide();
            $("#searchAll").focus();
            }
        });
    } else if (homeTileDiv.id == "sitaConversion"){
        homeTileDiv.addEventListener("click", function(){
            $("#contentBox").hide();
            $("#aipBox").hide();
            $("#atsBox").hide();
            $("#docBox").hide();
            $("#spvrBox").hide();
            $("#frenchBox").hide();
            $("#sitaBox").show();
            $("#doctoolBox").hide();
            $("inputSita").focus();
        });
        homeTileDiv.addEventListener("keypress", function(e){
            if(e.keyCode == 13 || e.keyCode == 32) {
                $("#contentBox").hide();
            $("#aipBox").hide();
            $("#atsBox").hide();
            $("#docBox").hide();
            $("#spvrBox").hide();
            $("#frenchBox").hide();
            $("#sitaBox").show();
            $("#doctoolBox").hide();
            $("inputSita").focus();
            }
        });
    }
    quicklinkGeneratorSpace.appendChild(homeTileDiv);
    document.getElementById("searchBar").focus();
}
}


// H O M E   T I L E   D I S P L A Y   F U N C T I O N 

function sortHomeByName(src){
    document.getElementById("quickLinks").innerHTML = "";
    let byName = homeTileData.slice(0);
        byName.sort(function(a,b) {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
        })
        generateAIPtiles(byName)
        document.getElementById("sortBoxHomeTyp").style.background = "none";
        document.getElementById("sortBoxHomeTyp").style.color = "black";
        document.getElementById("sortBoxHomeAZ").style.background = "blue";
        document.getElementById("sortBoxHomeAZ").style.color = "white";
        return byName;
}

function sortHomeByType(src){
    document.getElementById("quickLinks").innerHTML = "";
    let byType = homeTileData.slice(0);
        byType.sort(function(a,b) {
        let x = a.style.toLowerCase();
        let y = b.style.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
        })
        generateAIPtiles(byType)
        document.getElementById("sortBoxHomeTyp").style.background = "blue";
        document.getElementById("sortBoxHomeTyp").style.color = "white";
        document.getElementById("sortBoxHomeAZ").style.background = "none";
        document.getElementById("sortBoxHomeAZ").style.color = "black";
        return byType;
    
}

function displayGrid(src) {  
    let input     = document.getElementById("searchBar");
    let inputV    = input.value;
    let inputVal  = String(inputV).toLowerCase();
    let boxes     = document.getElementById("quickLinks").querySelectorAll(".quicklinksContainerBox");
    
    if (input.value != null) {
        
        for (i=0; i<boxes.length; i++){
            
                let source = src[i].tags
            let found   = source.indexOf(inputVal) !== -1;
            
            if (found) {
                boxes[i].style.display = "block";
            } else {
                boxes[i].style.display = "none";
            }
        }
    } else {
        boxes.style.display ="block";
    }
}
try {
  let src = homeTileData
document.getElementById("searchBar").addEventListener("keyup", function(src){
    if (document.getElementById("sortBoxHomeAZ").style.background == "blue"){
        src = sortHomeByName()
    }
    if (document.getElementById("sortBoxHomeTyp").style.background == "blue"){
        src = sortHomeByType()
    }
    displayGrid(src)
})
}
catch(err) {
  alert("Error\n" + err + "\nPlease advise weberml\nFor access to backup links, refer to:\nU:\\ZOL\\PR-Team\\AIS-ALLG\\TOOLBOX_AIM_Contingency_Site_files\\index.html")
}



/*let resulting = []
for(let i=0;i<Object.keys(homeTileData).length;i++){
    resulting.push(JSON.parse(localStorage.getItem("sortedBy" + i)))
}
console.log(resulting)
if(Object.keys(resulting).length == 0){
    console.log("1")
    let homeTiles = homeTileData;
    generateAIPtiles(homeTiles)
} else if(Object.keys(resulting).length != 0){
    console.log("2")
    let homeTiles = resulting
    generateAIPtiles(homeTiles)
}
*/

let homeTiles = homeTileData
generateAIPtiles(homeTiles)


document.getElementById("sortBoxHomeTyp").style.background = "none";
document.getElementById("sortBoxHomeTyp").style.color = "black";
document.getElementById("sortBoxHomeAZ").style.background = "blue";
document.getElementById("sortBoxHomeAZ").style.color = "white";



document.getElementById("sortBoxHomeAZ").addEventListener("click", function(){
    sortHomeByName()
    let sortedBy = sortHomeByName();
    for(let i=0;i<Object.keys(sortedBy).length;i++){
            localStorage.setItem("sortedBy" + i, JSON.stringify({
                id: sortedBy[i].id,
                img: sortedBy[i].img,
                title: sortedBy[i].title,
                link: sortedBy[i].link,
                tags: sortedBy[i].tags,
                style: sortedBy[i].style
            }))
        }
});
        document.getElementById("sortBoxHomeTyp").addEventListener("click", function(){
        sortHomeByType()
        let sortedBy = sortHomeByType();
        for(let i=0;i<Object.keys(sortedBy).length;i++){
            localStorage.setItem("sortedBy" + i, JSON.stringify({
                id: sortedBy[i].id,
                img: sortedBy[i].img,
                title: sortedBy[i].title,
                link: sortedBy[i].link,
                tags: sortedBy[i].tags,
                style: sortedBy[i].style
            }))
        }
});
        
        

// A I P   T I L E   G E N E R A T O R

const aipLinkGeneratorSpace = document.getElementById("aipLinks");
      
for(let i=0;i<aipTileData.length;i++){
    const aipTileDiv = document.createElement("div");
    const aipTileDivP = document.createElement("p");
    const aipTileDivImg = document.createElement("img");
    const aipTileBr = document.createElement("br");
    const aipTileLink = aipTileData[i].link;
    aipTileDiv.setAttribute("id", aipTileData[i].id);
    aipTileDiv.setAttribute("class", "aipLinkBox");
    aipTileDiv.addEventListener("click", function(){
        if(aipTileLink != ""){
            window.open(aipTileLink);
        }
    });
    aipTileDiv.addEventListener("keypress", function(e){
        if(e.keyCode==13 || e.keyCode==32){
            if(aipTileLink != ""){
                window.open(aipTileLink);
            }
        }
    });
    aipTileDivImg.src = aipTileData[i].img;
    aipTileDivImg.setAttribute("width", "100%");
    aipTileDiv.appendChild(aipTileDivImg);
    
    aipTileDiv.appendChild(aipTileDivP);
    aipTileDivP.innerHTML = aipTileData[i].icao + "<br>" + aipTileData[i].country
    aipLinkGeneratorSpace.appendChild(aipTileDiv);
    if(aipTileData[i].aip == "green"){
        document.getElementById(aipTileData[i].id).classList.add("eaip");
    }
    if(aipTileData[i].aip == "yellow"){
        document.getElementById(aipTileData[i].id).classList.add("toolbox");
    }
    if(aipTileData[i].aip == "red"){
        document.getElementById(aipTileData[i].id).classList.add("bookaip");
    }
    if(aipTileData[i].aip == "black"){
        document.getElementById(aipTileData[i].id).classList.add("noaip");
    }
}



  


// F L I G H T S E A R C H   F U N C T I O N

const flightsearchFields = ["ident", "eobdfrom", "eobdto", "dep", "dest", "fltrule", "fulltext", "msgtype", "queue", "msgdir"];
for(let i=0; i<flightsearchFields.length; i++){
    document.getElementById(flightsearchFields[i]).addEventListener("keyup", function(e){
        if(e.keyCode==13){
            atsForm();
        }
    })
}

document.getElementById("atsButton").addEventListener("click", function(){
    atsForm();
})

let dateObj = new Date();

let dateTodayYear = dateObj.getUTCFullYear();
let dateTodayMonth = dateObj.getUTCMonth()+1;
let dateTodayDay = dateObj.getUTCDate();

function dateToDOFFrom() {
	let DOFyearFrom = eobdfrom.value.substring(2,4)
	let DOFmonthFrom = eobdfrom.value.substring(5,7)
	let DOFdayFrom = eobdfrom.value.substring(8,10)
	let currentDOFFrom = DOFyearFrom + DOFmonthFrom + DOFdayFrom;
	console.log("DOF from eobdfrom: " + currentDOFFrom)
    return currentDOFFrom;
}
function dateToDOFTo(){
    let DOFyearTo = eobdto.value.substring(2,4)
	let DOFmonthTo = eobdto.value.substring(5,7)
	let DOFdayTo = eobdto.value.substring(8,10)
	let currentDOFTo = DOFyearTo + DOFmonthTo + DOFdayTo;
	console.log("DOF from eobdto: " + currentDOFTo)
    return currentDOFTo;
}

function dateToString() {
	if(dateTodayMonth<10){
		dateTodayMonth = "0" + dateTodayMonth;
	}
	if(dateTodayDay<10){
		dateTodayDay = "0" + dateTodayDay;
	}
	let currentUTCDate = dateTodayYear + "-" + dateTodayMonth + "-" + dateTodayDay;
	eobdfrom.value = currentUTCDate;
    eobdto.value = currentUTCDate;
}

dateToString()

eobdfrom.addEventListener("change", function(){
	dateToDOFFrom();
	console.log("eobdfrom value: " + eobdfrom.value)
})
eobdto.addEventListener("change", function(){
	dateToDOFTo();
	console.log("eobdto value: " + eobdto.value)
})

function atsForm() {
    const atsRegex = /([%])/;
  let http1         = "http://zhisaop/FlightSearch/FlightSearch?QueryTimeOut=30&MaxFlightCount=50";
  let httpident     = "&Ident="
  let ident         = $("#ident").val();
  if(ident.includes("%")){
      ident = $("#ident").val().replace(atsRegex, "%25")
  }
  let httpeobdfrom  = "&EOBDFrom="
  let eobdfrom      = dateToDOFFrom();
  let httpeobtfrom  = "&EOBTFrom="
  let httpeobdto    = "&EOBDUntil="
  let eobdto        = dateToDOFTo();
  let httpeobtto    = "&EOBTUntil="
  let httpfltrule   = "&FlightRule="
  let fltrule       = $("#fltrule").val();
  let httpdep       = "&DEPAD="
  let dep           = $("#dep").val();
  if(dep.includes("%")){
      dep = $("#dep").val().replace(atsRegex, "%25")
  }
  let httpdest      = "&DESTAD="
  let dest          = $("#dest").val();
  if(dest.includes("%")){
      dest = $("#dest").val().replace(atsRegex, "%25")
  }
  let httpfulltext  = "&FreeText="
  let fulltext      = $("#fulltext").val();
  if(fulltext.includes("%")){
      fulltext = $("#fulltext").val().replace(atsRegex, "%25")
  }
  let httpmsgtype   = "&MessageType="
  let msgtype       = $("#msgtype").val();
  let httpmsgdir    = "&MessageDirection="
  let msgdir        = $("#msgdir").val();
  let httpqueue     = "&InQueues="
  let queue         = $("#queue").val();
  console.log(ident, eobdfrom, eobdto, fltrule, dep, dest, fulltext, msgtype, msgdir, queue);
  let linkFS
  if(msgtype != "FPL"){
    linkFS = http1 + httpident + ident + httpeobdfrom + eobdfrom + httpeobtfrom + httpeobdto + eobdto + httpeobtto + httpqueue + queue + httpfltrule + httpdep + dep + httpdest + dest + httpmsgtype + msgtype + httpfulltext + fulltext + httpmsgdir + msgdir  
  console.log(linkFS)
      
}
  else if(msgtype == "FPL"){
      linkFS = http1 + httpident + ident + httpeobdfrom + eobdfrom + httpeobtfrom + httpeobdto + eobdto + httpeobtto + httpqueue + queue + httpfltrule + fltrule + httpdep + dep + httpdest + dest + httpmsgtype + msgtype + httpfulltext + fulltext + httpmsgdir + msgdir
      console.log(linkFS)
  }
  
  const fsIframe = document.createElement("iframe");
  fsIframe.setAttribute("src", linkFS);
  fsIframe.setAttribute("id", "fsIframe");
  document.getElementById("fsIframeContainer").innerHTML = "";
  document.getElementById("fsIframeContainer").appendChild(fsIframe);
}

// L E G A L   S T A T E M E N T


document.getElementById("legal").addEventListener("click", function(){
	document.getElementById("legalA").style.display ="flex";
})

document.getElementById("close").addEventListener("click", function(){
	document.getElementById("legalA").style.display ="none";
})


// R A N D O M   T A B   I N D E X   F U N C T  I O N   C O M I N G   T H R O U G H
$('.aipLinkBox').each(function() {
  if (this.type != "hidden") {
      var $input = $(this);
      $input.attr("tabindex", 0);
  }
});

// A I P   L O G I N S   B U T T O N   H A N D L E R

document.getElementById("aipLogins").addEventListener("click", function(){
  window.open("http://ais.skyguide.corp/list/Logins/Logins.pdf")
});

// M I S S I N G   C O U N T R I E S   S P O I L E R

document.getElementById("misCtry").addEventListener("click", function() {
    if (document.getElementById("misCtryCnt").style.display == "block"){
        document.getElementById("misCtryCnt").style.display = "none";
    } else if (document.getElementById("misCtryCnt").style.display = "none"){
        document.getElementById("misCtryCnt").style.display = "block";
    }
});


// L O C I   D A T A B A S E


const FKResultsTable 	= document.getElementById("FKresultsTable");
//const SFResultsTable 	= document.getElementById("SFresultsTable");
//const SAResultsTable	= document.getElementById("SAresultsTable");
const queryFKfield		= document.getElementById("queryFK");

// This creates the rows of the table dynamically
function createTableContentFK(i) {
const TRFK 				= document.createElement("tr");
const TDFK	 			= document.createElement("td");
const FKResultsContent 	= document.createTextNode(locisFK[i]);
TRFK.appendChild(TDFK);
TDFK.appendChild(FKResultsContent);
FKResultsTable.appendChild(TRFK);	
}

/*function createTableContentSF(i) {
const TRSF 				= document.createElement("tr");
const TDSF	 			= document.createElement("td");
const SFResultsContent 	= document.createTextNode(locisFIR[i]);
TRSF.appendChild(TDSF);
TDSF.appendChild(SFResultsContent);
SFResultsTable.appendChild(TRSF);
}

function createTableContentSA(i) {
const TRSA 				= document.createElement("tr");
const TDSA	 			= document.createElement("td");
const SAResultsContent 	= document.createTextNode(locisSWR[i]);
TRSA.appendChild(TDSA);
TDSA.appendChild(SAResultsContent);
SAResultsTable.appendChild(TRSA);
}*/

// This creates the table itself
function queryFKLocis() {
const THFK			= document.createElement("th"); 
const THFKContent1 	= document.createTextNode("Flightkeys Airports");
THFK.appendChild(THFKContent1);
FKResultsTable.appendChild(THFK);
THFK.setAttribute("id", "thFK");

/*const THSF			= document.createElement("th");
const THSFContent1 	= document.createTextNode("SWR FIR");
THSF.appendChild(THSFContent1);
SFResultsTable.appendChild(THSF);
THSF.setAttribute("id", "thSF");
  
const THSA			= document.createElement("th"); 
const THSAContent1 	= document.createTextNode("SWR AD");
THSA.appendChild(THSAContent1);
SAResultsTable.appendChild(THSA);
THSA.setAttribute("id", "thSA");*/

if (queryFKfield.value == 0){
  for (let i=0; i<locisFK.length; i++){
    createTableContentFK(i); // calls each JSON object and creates a row for it
  }
/*  for (let i=0; i<locisFIR.length; i++){
    createTableContentSF(i); // calls each JSON object and creates a row for it
  }
  for (let i=0; i<locisSWR.length; i++){
    createTableContentSA(i); // calls each JSON object and creates a row for it
  } */
} 
}

queryFKfield.addEventListener("keyup", function(){
const trsFK = document.getElementById("FKresultsTable").rows;
while (trsFK.length>0){
  trsFK[0].parentNode.removeChild(trsFK[0]);
} 
/*const trsSF = document.getElementById("SFresultsTable").rows;
while (trsSF.length>0){
  trsSF[0].parentNode.removeChild(trsSF[0]);
} 
const trsSA = document.getElementById("SAresultsTable").rows;
while (trsSA.length>0){
  trsSA[0].parentNode.removeChild(trsSA[0]);
} */
for(let i=0;i<locisFK.length;i++){
  if (locisFK[i].startsWith(queryFKfield.value.toUpperCase())){
    createTableContentFK(i)
  }
}
/*for(let i=0;i<locisFIR.length;i++){
  if (locisFIR[i].startsWith(queryFKfield.value.toUpperCase())){
    createTableContentSF(i)
  }
}
for(let i=0;i<locisSWR.length;i++){
  if (locisSWR[i].startsWith(queryFKfield.value.toUpperCase())){
    createTableContentSA(i)
  }
}*/
})

// D O C   S C R E E N I N G  


//this is called on blur of screening input or on calculate pages button press
function calculatePagesEvent() {
//const SWRvalue 		= document.getElementById("screenSWR").value;
const FKDFvalue 	= document.getElementById("screenFKDF").value;
const FKATvalue	 	= document.getElementById("screenFKAT").value;
const NTMvalue 		= document.getElementById("screenNTM").value;
const DBUvalue 		= document.getElementById("screenDBU").value;
const IATAvalue 	= document.getElementById("screenIATA").value;
const rangeRegex 	= /([$&+:;=?@#|'<>.^*()%!_öäüèéà])|([a-zA-Z])|(,{2,})|(-{2,})|([0-9]{1,}-+([0-9]+-))/; // Magic, sorcery, BURN THE WITCH AT THE STAKE it catches double characters, invalid characters, invalid chains (7-8-9), put it into regexr and see
const regexWrng 	= "Invalid sequence (multiple \",\" or \"-\" or other characters found) \n or invalid charcters (anything besides \",\" \"-\" and numbers)";
//const SWRdict 		= {value: SWRvalue, td:"SWRtd", alert:"screenSWRalert"};
const FKDFdict 		= {value: FKDFvalue, td:"FKDFtd", alert:"screenFKDFalert"};
const FKATdict 		= {value: FKATvalue, td:"FKATtd", alert:"screenFKATalert"};
const NTMdict 		= {value: NTMvalue, td:"NTMtd", alert:"screenNTMalert"};
const DBUdict 		= {value: DBUvalue, td:"DBUtd", alert:"screenDBUalert"};
const IATAdict 		= {value: IATAvalue, td:"IATAtd", alert:"screenIATAalert"};
const valueDict 	= [FKDFdict, FKATdict, NTMdict, DBUdict, IATAdict]; //removed SWRdict

//This throws an error message underneath the input if invalid character (sequences) are found
// OTherwise calls pageCalculation function
for(let i=0;i<valueDict.length;i++){ // iterates to the customer objects
  let charAtEnd = valueDict[i].value.toString().charAt(valueDict[i].value.length - 1); //gets the last character in the stringified page sequcne
  if(valueDict[i].value != 0 ){ //if a customer obj is not empty...
    if(rangeRegex.test(valueDict[i].value)){ //... and it fails the regex check (actually: regex check == true)...
      document.getElementById(valueDict[i].alert).innerHTML = regexWrng; // ...display a warning
    } else if (charAtEnd == ","){
      document.getElementById(valueDict[i].alert).innerHTML = "Please remove the comma at the end" // catches if the input field contains a comma at the end -> this messes with the last comma slicing at the end
    } else if (valueDict[i].value.length > 89){ // catches if the input field is longer than 90 characters which is a safety net for the character restrictions in some print dialogs
      let twoFiddyLength = valueDict[i].value.length;
      let twoFiddySlice = valueDict[i].value.substring(99, (twoFiddyLength));
      let twoFiddySlice2 = valueDict[i].value.substring(0,99);
      document.getElementById(valueDict[i].alert).innerHTML = "Page sequence might be too long for print dialog. Pay attention while printing. Overflow starts from: " +  twoFiddySlice.substring(0,10) + "...";
      document.getElementById(valueDict[i].td).innerHTML = pageCalculation(valueDict[i].value); // calls the pageCalculation function anways because its only a warning notice
    }else {
      document.getElementById(valueDict[i].td).innerHTML = pageCalculation(valueDict[i].value); //else call pageCalculation with the customer obj value...
      document.getElementById(valueDict[i].alert).innerHTML = ""; //... and clear the warning 
    }
  } else {
    document.getElementById(valueDict[i].td).innerHTML = ""; // if the input is empty it delets the page count
  }
}
}

// This deals with putting the page ranges into local storage
function localStorager(customer) {
//const LoStoSWR 	= {valuex: "SWRvalues", 	screen: "screenSWR", 	name: "SWR"};
const loStoDoc  = {valuex: "DocumentValues", 	screen: "screenDocument", 	name: "DOC"};
const LoStoFKDF = {valuex: "FKDFvalues", 	screen: "screenFKDF", 	name: "FKDF"};
const LoStoFKAT = {valuex: "FKATvalues", 	screen: "screenFKAT",	name: "FKAT"};
const LoStoNTM 	= {valuex: "NTMvalues", 	screen: "screenNTM",	name: "NTM"};
const LoStoDBU 	= {valuex: "DBUvalues", 	screen: "screenDBU",	name: "DBU"};
const LoStoIATA = {valuex: "IATAvalues", 	screen: "screenIATA", 	name: "IATA"};
const LoStoAll	= [LoStoFKDF, LoStoFKAT, LoStoNTM, LoStoDBU, LoStoIATA, loStoDoc] // LoStoSWR removed
for(let i=0;i<LoStoAll.length;i++){
  if(customer == LoStoAll[i].name){
    localStoragerSetter(LoStoAll, i);
  } 
}
if (customer == "All"){
  for(let i=0;i<LoStoAll.length;i++){
    localStoragerSetter(LoStoAll, i);
  }
}	
}

// this is only a function so i have to write this expression only once
function localStoragerSetter(LoStoAll,i) {
localStorage.setItem(LoStoAll[i].valuex, document.getElementById(LoStoAll[i].screen).value);
}

//pageCalculation function call events, either on buton or on blur
// also deals with the local storage
document.getElementById("calculatePages").addEventListener("click", function() {
let customer = "All";
calculatePagesEvent(customer); // passing the customer variable shouldnt do anything but it works, so... i'll leave it
localStorager(customer);
})
/*document.getElementById("screenSWR").addEventListener("blur", function() {
let customer = "SWR";
calculatePagesEvent(customer);
localStorager(customer);

})*/
document.getElementById("screenDocument").addEventListener("blur", function() {
let customer = "DOC";
localStorager(customer);

})
document.getElementById("screenFKDF").addEventListener("blur", function() {
let customer = "FKDF";
calculatePagesEvent(customer);
localStorager(customer);

})
document.getElementById("screenFKAT").addEventListener("blur", function() {
let customer = "FKAT";
calculatePagesEvent(customer);
localStorager(customer);

})
document.getElementById("screenNTM").addEventListener("blur", function() {
let customer = "NTM";
calculatePagesEvent(customer);
localStorager(customer);
})
document.getElementById("screenDBU").addEventListener("blur", function() {
let customer = "DBU";
calculatePagesEvent(customer);
localStorager(customer);
})
document.getElementById("screenIATA").addEventListener("blur", function() {
let customer = "IATA";
calculatePagesEvent(customer);
localStorager(customer);
})

//the actual calculation magic
//splits at , initially, then checks if a - is present > if yes, push range, if no, push int and assign 1 as value
function pageCalculation(customer){
let resultArray 	= [];
let customerArray 	= customer.split(","); // splits the page sequenc by comma
for(let i=0;i<customerArray.length;i++){ // iterates through the comma split elements
  let customerArraySlices = customerArray[i].split("-"); // splits the elements by -
  if (customerArraySlices.length > 1) { // if the element then contains two int...
    let sliceResults = (customerArraySlices[1] - customerArraySlices[0]) + 1; // subtract the first from the second and add 1 to get the page count
    resultArray.push(sliceResults); // push the result to the resultarray
  } else { // if the element split by - results in a single int...
    let sliceResults = 1; // set the page count to 1
    resultArray.push(sliceResults);
  }
}
let resultArraySum = resultArray.reduce(function(a, b) { return a + b; }, 0); //this sums the elements of the resultArray for he total page sum
return resultArraySum;
}

// This gets called by the copy event handlers and displays the page sequence popup.
function displayPagePopup() {
document.getElementById("testHTMLContainer").style.display = "flex";
// the following cleans up the inner html IF the last displayed element is an int-int, which inherently gets a comma added.
// its convoluted, but it seems to work the best.
let thatDamnComma = document.getElementById("testHTML").innerHTML.toString();
if(thatDamnComma.charAt(thatDamnComma.length - 2) == ","){
  document.getElementById("testHTML").innerHTML = thatDamnComma.slice(0,thatDamnComma.length-2)
}
}

// This  handles the splitting and the popup that shows the page sequences.
// its set up so that a int-int sequence can have a trailing int, but separate int are
// placed in their own row. this is necessary to avoid double <br>. It doesnt affect
// the printing order though, in fact it saves time with the trailing int. Odd int-int sequences are also treated like a single int

function printEvent(customer){ // receives the customer variable
//const customerSWR 		= {name: "SWR", 	value: document.getElementById("screenSWR").value,   print: "Swiss"}
const customerFKDF 		= {name: "FKDF", 	value: document.getElementById("screenFKDF").value,  print: "Flightkeys Daily Folder"}
const customerFKAT 		= {name: "FKAT", 	value: document.getElementById("screenFKAT").value,  print: "Flightkeys AIP Tool"}
const customerNTM 		= {name: "NTM", 	value: document.getElementById("screenNTM").value,   print: "Team NOTAM"}
const customerDBU 		= {name: "DBU", 	value: document.getElementById("screenDBU").value,   print: "DBU"}
const customerIATA 		= {name: "IATA", 	value: document.getElementById("screenIATA").value,  print: "IATA"}
const customerValues 	= [customerFKDF, customerFKAT, customerNTM, customerDBU, customerIATA]; // emoved customerSWR

//This itreates through the customer obj array
for(let i=0;i<customerValues.length;i++){
  if (customerValues[i].name == customer){ // compares the passed customer variable to each customer obj in the array
    let customerValue = customerValues[i].value; // gets the value from the matching obj
    let alertArray 	= customerValue.split(","); // splits by comma
    
    document.getElementById("testHTML").innerHTML = ""; // clears any content in the popup
    document.getElementById("testHTMLTitle").innerHTML = ""; // clears the title of the popup
    document.getElementById("testHTMLTitle").innerHTML += "Pages for " + customerValues[i].print + ":" // sets the title for the popup
    
    for(let i=0; i<alertArray.length;i++){ // iterates through the comma split sequence array
      for(let j=0;j<alertArray[i].length;j++){ // iterates to the elements of the comma split sequence array
        if(alertArray[i][j].includes("-")){ // if an element contains a - ...
          let oddArrayInit = (alertArray[i]).split("-"); // copy page range elements into this list
          
          if((parseInt(oddArrayInit[0]) + parseInt(oddArrayInit[1]))%2 != 0){ // if int + int equals odd number
              let span = document.createElement("span")
              span.id = alertArray[i]
              span.innerHTML += alertArray[i] + ", ";//... push it to the popup in sequence
              document.getElementById("testHTML").appendChild(span)
            // notice the missing <br>
          } else { // if its even (meaning an odd sequence (weird i know))
            document.getElementById("testHTML").innerHTML += alertArray[i];
            document.getElementById("testHTML").innerHTML += "<br>"
            // adds a line break to treat it like the single int elements like below:
          }
        }
      }
      if(!alertArray[i].includes("-")){ // if an element doesnt include a - (single int)...
        document.getElementById("testHTML").innerHTML += alertArray[i]; // push it to the popup with a line break
        // notice the mising comma, this is intentional since the print dialog gets confused if a sequence ends with a ,
        document.getElementById("testHTML").innerHTML += "<br>"
        // here the <br> gets added below, this creates the trailing int but also splits
        // single ints into their own rows. I think thats a good solution.
      }
    }
    // this fires the popup with the page sequences
    displayPagePopup()
  }
}

}

// these are the copy button event handlers, they simply call the printEvent function with the customer variable
/*document.getElementById("buttonCopySWR").addEventListener("click", function(){
let customer = "SWR";
printEvent(customer);
})*/
document.getElementById("buttonCopyFKDF").addEventListener("click", function(){
let customer = "FKDF";
printEvent(customer);
})
document.getElementById("buttonCopyFKAT").addEventListener("click", function(){
let customer = "FKAT";
printEvent(customer);
})
document.getElementById("buttonCopyNTM").addEventListener("click", function(){
let customer = "NTM";
printEvent(customer);
})
document.getElementById("buttonCopyDBU").addEventListener("click", function(){
let customer = "DBU";
printEvent(customer);
})
document.getElementById("buttonCopyIATA").addEventListener("click", function(){
let customer = "IATA";
printEvent(customer);
})

// D O C   T O O L   O P T I O N S

//This closes the page print popup
document.getElementById("testHTMLClose").addEventListener("click", function() {
document.getElementById("testHTMLContainer").style.display = "none";
})

// this will fill the page count cells with the local storage data
/*
document.getElementById("toggleLocalStorage").addEventListener("click", function(){
//document.getElementById("screenSWR").innerHTML 	= localStorage.getItem("SWRvalues");
document.getElementById("screenFKDF").innerHTML = localStorage.getItem("FKDFvalues");
document.getElementById("screenFKAT").innerHTML = localStorage.getItem("FKATvalues");
document.getElementById("screenNTM").innerHTML 	= localStorage.getItem("NTMvalues");
document.getElementById("screenDBU").innerHTML 	= localStorage.getItem("DBUvalues");
document.getElementById("screenIATA").innerHTML = localStorage.getItem("IATAvalues");
})

*/

// D O C  T O O L  I N I T I A L   L O A D   


document.getElementById("queryFK").focus();
queryFKLocis()

// D O C   T O O L   O P T I O N S   M E N U

const optionsButton = document.getElementById("optionsButton");
const optionsMenu = document.getElementById("optionsMenu");
const optionsTogglers = [{
    name: "optionsHelpRange",
    id: "optionsDocToolHelpRange",
    target: "halpText"
  },
  {
    name: "optionsDataRange",
    id: "optionsLociDatabaseRange",
    target: "queryContainer"
  },
  {
    name: "optionsPrintRange",
    id: "optionsPrintRange",
    target: "screeningContainer"
  },

]
const optionsButtons = [{
    name: "optionsRecover",
    id: "optionsRecoverDataToggler",
    target: "recover"
  },
  {
    name: "optionsSave",
    id: "optionsLoadSaveSave",
    target: "save"
  },
  {
    name: "optionsLoad",
    id: "optionsLoadSaveLoad",
    target: "load"
  }
]

// simple - click on cog to show, click again to hide
optionsButton.addEventListener("click", function() {
  if (optionsMenu.style.display == "") {
    optionsMenu.style.display = "block";
  } else if (optionsMenu.style.display == "block") {
    optionsMenu.style.display = "";
  }
})

// generates the togglers
for (let i = 0; i < Object.keys(optionsTogglers).length; i++) {
  document.getElementById(optionsTogglers[i].id).addEventListener("click", function() {
    if (document.getElementById(optionsTogglers[i].id).value == 1) {
      document.getElementById(optionsTogglers[i].target).style.display = "block";
    } else if (document.getElementById(optionsTogglers[i].id).value == 0) {
      document.getElementById(optionsTogglers[i].target).style.display = "none";
    }
  })
}

// this makes it so that if the menu is open, you can click anywhere BUT the menu and it closes
let autoCloseBarrier = 0; // this is a safety to not immediately close the menu again after opening
document.addEventListener('click', function(event) {
  if (optionsMenu.style.display == "block") { // if the current style of the menu is open...
    let isClickInsideElement = optionsMenu.contains(event.target); // ... and a click on the DOM anywhere BUT the menu...
    if (optionsMenu.style.display == "block" && !isClickInsideElement && autoCloseBarrier != 0) { //... and the menu is block and not clicked AND the safety is NOT 0...
      optionsMenu.style.display = "" //... close it
      autoCloseBarrier = 0; // resets the safety 
    } else {
      autoCloseBarrier++ // ... else increment the safety so the second if condition triggers
    }
  }
});
// this is due to the fact that when the menu is not open, a click on the cog to open it in the first place counts already as a click outside of the options menu. so, a system had to be put in place to not count the first click in this event.

let saveDocLink = document.createElement("a");
let saveDocLinkText = "Save Screening Session to file";
let txtsaveDocLinkText = document.createTextNode(saveDocLinkText);
saveDocLink.appendChild(txtsaveDocLinkText);
document.getElementById("optionsLoadSaveSave").appendChild(saveDocLink)
saveDocLink.setAttribute("href", "")
document.getElementById("optionsLoadSaveSave").addEventListener("click", function(){
	let docData = {
				//docData0: document.getElementById("screenSWR").value + "%0A",
        docDataA: document.getElementById("screenDocument").value + "%0A",
				docData0: document.getElementById("screenFKDF").value + "%0A",
                docData1: document.getElementById("screenFKAT").value + "%0A",
                docData2: document.getElementById("screenNTM").value + "%0A",                               
                docData3: document.getElementById("screenDBU").value + "%0A",
                docData4: document.getElementById("screenIATA").value,
				};
	let linkArrayDocData = [];

	for (const [key, value] of Object.entries(docData)) {
		linkArrayDocData.push(value)
	}
	
	let docDataString = "";
	for (let i=0;i<6;i++) {
		docDataString += linkArrayDocData[i];
	}
	
	let fileDownloadName = document.getElementById("screenDocument").value;
	
	saveDocLink.setAttribute("href", "data:application/octet-stream;charset=utf-8," + docDataString);
	saveDocLink.setAttribute("target", "_blank")
	saveDocLink.setAttribute("download", fileDownloadName)

})

document.getElementById('loadDocScreening').addEventListener('change', function() {
    console.log("load")
    let cust = ["screenDocument", "screenFKDF", "screenFKAT", "screenNTM", "screenDBU", "screenIATA"] // removed screenSWR

    
	let fr=new FileReader();
    fr.onload=function() {
		let text1 = fr.result.split("\n");
        console.log(text1);
        for(let i=0;i<text1.length;i++){
			let text = text1[i]
            document.getElementById(cust[i]).value = text;
		}
        
    }

        fr.readAsText(this.files[0]);
})

document.getElementById("optionsRecoverDataToggler").addEventListener("click", function(){
// document.getElementById("screenSWR").innerHTML 	= localStorage.getItem("SWRvalues");
document.getElementById("screenDocument").innerHTML = localStorage.getItem("DocumentValues");   
document.getElementById("screenFKDF").innerHTML = localStorage.getItem("FKDFvalues");
document.getElementById("screenFKAT").innerHTML = localStorage.getItem("FKATvalues");
document.getElementById("screenNTM").innerHTML 	= localStorage.getItem("NTMvalues");
document.getElementById("screenDBU").innerHTML 	= localStorage.getItem("DBUvalues");
document.getElementById("screenIATA").innerHTML = localStorage.getItem("IATAvalues");
})

        
});
