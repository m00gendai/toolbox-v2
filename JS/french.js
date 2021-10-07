$(document).ready(function() {


// I N I T I A L   V A R I A B L E S   D E C L A R A T I O N S


    let showTableOnLoad     = 0
    const filterAll 		= document.getElementById("searchAll");
    const filterFrench 		= document.getElementById("searchFrench");
    const filterGerman 		= document.getElementById("searchGerman");
    const translateTable 	= document.getElementById("frenchTable");
    const btnContainer 		= document.getElementById("inputField2");
    const btns 				= btnContainer.getElementsByClassName("switchButton");
    const accentRegex       = /[\u00C0-\u00FF\u0027]/g

    
// E V E N T   L I S T E N E R S

    
    filterAll.addEventListener("keyup", function() {
        while (translateTable.childNodes.length > 2) { // > 2 so it stops before removing the <th>
            translateTable.removeChild(translateTable.lastChild);
        }
        for (i=0; i<obj.length; i++){
            let filterValueA = filterAll.value.toLowerCase();
            if (filterValueA.match(accentRegex)){ // checks if accent characters are present
                if (obj[i].Français.toLowerCase().includes(filterValueA) || obj[i].Allemand.toLowerCase().includes(filterValueA)) {
                    wordList(); // if accent characters present, search with them
                } 
            } else { // if no accent characters present, normalize the object value and remove accent characters
                let deaccentedAF = _.deburr(obj[i].Français.toLowerCase()); // ALL GLORY TO LODASH FOR THE DEBURR FUNCTION OH MY GOD
                let deaccentedAG = _.deburr(obj[i].Allemand.toLowerCase()); // ...deburr removes accents and replaces accented letters with latin letters (è -> e)
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
        for (i=0; i<obj.length; i++){
            let filterValueF = filterFrench.value.toLowerCase();
            if (filterValueF.match(accentRegex)){ // checks if accent characters are present
                if (obj[i].Français.toLowerCase().includes(filterValueF)) {
                    wordList(); // if accent characters present, search with them
                } 
            } else { // if no accent characters present, normalize the object value and remove accent characters
                let deaccentedF = _.deburr(obj[i].Français.toLowerCase());
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
        for (i=0; i<obj.length; i++){
            let filterValueG = filterGerman.value.toLowerCase();
            if (filterValueG.match(accentRegex)){ // checks if accent characters are present
                if (obj[i].Allemand.toLowerCase().includes(filterValueG)) {
                    wordList(); // if accent characters present, search with them
                } 
            } else { // if no accent characters present, normalize the object value and remove accent characters
                let deaccentedG = _.deburr(obj[i].Allemand.toLowerCase());
                if (deaccentedG.includes(filterValueG)) {
                    wordList();
                }
            }
        }
    })

//These event listeners just call the init function with a assigned a value which determines the JSON source

    function tabbing(buttonID) {
        for (let i = 0; i < btns.length; i++) {
            if(btns[i].id == buttonID){
                btns[i].style.backgroundImage = "linear-gradient(315deg, #0499f2 0%, #26f596 74%)";
                btns[i].style.opacity = "1"
                btns[i].style.color ="white";
                btns[i].style.textShadow ="0px 0px 3px black";
            } else {
                btns[i].style.backgroundImage = "linear-gradient(315deg, #0499f2 0%, #26f596 74%)";
                btns[i].style.opacity = "0.5"
                btns[i].style.textShadow ="none";
                btns[i].style.color ="black";
            }
        }
        filterAll.focus()
    }


    document.getElementById("buttonGeneral").addEventListener("click", function() {
        let buttonID = "buttonGeneral";
        tabbing(buttonID);
        showTableOnLoad = 0;
        init();
    })

    document.getElementById("buttonSFO").addEventListener("click", function() {
        let buttonID = "buttonSFO";
        tabbing(buttonID);
        showTableOnLoad = 1;
        init();
    })

    document.getElementById("buttonWhatever").addEventListener("click", function() {
        let buttonID = "buttonWhatever";
        tabbing(buttonID);
        showTableOnLoad = 2;
        init();
    })

    document.getElementById("buttonAnother").addEventListener("click", function() {
        let buttonID = "buttonAnother";
        tabbing(buttonID);
        showTableOnLoad = 3;
        init();
    })
    

// F U N C T I O N S


// This creates the rows of the table dynamically
    function createTableContent() {
        const TR 					= document.createElement("tr");
        const TDFrench 			= document.createElement("td");
        const TDGerman 			= document.createElement("td");
        let textContentFrench 	= document.createTextNode(obj[i].Français);
        let textContentGerman 	= document.createTextNode(obj[i].Allemand);
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
            const THFrench= document.createElement("th"); // The next lines rebuild the table with a header
            const THGerman= document.createElement("th");
            const THcontentFrench = document.createTextNode("Français");
            const THcontentGerman = document.createTextNode("Deutsch");
            THFrench.appendChild(THcontentFrench);
            THGerman.appendChild(THcontentGerman);
            translateTable.appendChild(THFrench);
            translateTable.appendChild(THGerman);
            THFrench.id = "baguette";
            THGerman.id = "bratwurst";
            
            for (i=0; i<obj.length; i++){
                createTableContent(); // calls each JSON object and creates a row for it
            }
        } else {
            createTableContent(); // entry point for the filter event listeners; doesn't destroy the table
        }
    }

// Initial display of the table and also used for switching JSON sources
    function init() {
        if (showTableOnLoad == 0){
            obj = vociTechGen ;
            wordList();
        } else if (showTableOnLoad == 1) {
            obj = JSON.parse(json2);
            wordList();
        } else if (showTableOnLoad == 2) {
            obj = JSON.parse(json3);
            wordList();
        } else if (showTableOnLoad == 3) {
            obj = JSON.parse(json4);
            wordList();
        }
    }

// M A I N   E N T R Y   P O I N T
    let buttonID = "buttonGeneral";
    tabbing(buttonID);
    init();
    filterAll.focus();

// I N P U T S
    let frenchCtcToggle = 0
    document.getElementById("frenchContactArrow").addEventListener("click", function(){
        if (frenchCtcToggle == 0){
            document.getElementById("frenchContact").style.left = "-2.5%"
            frenchCtcToggle = 1
            document.getElementById("frenchContactArrow").innerHTML = 'FEEDBACK\r<i class="fas fa-angle-left"></i>'
        } else if (frenchCtcToggle == 1){
            document.getElementById("frenchContact").style.left = "-100%"
            frenchCtcToggle = 0
            document.getElementById("frenchContactArrow").innerHTML = 'FEEDBACK\r<i class="fas fa-angle-right"></i>'
        }
    })


});
