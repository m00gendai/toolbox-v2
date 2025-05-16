function loadFrenchCode() {


// I N I T I A L   V A R I A B L E S   D E C L A R A T I O N S


    let showTableOnLoad     = 0
    const filterAll 		= document.getElementById("searchAll");
    const filterFrench 		= document.getElementById("searchFrench");
    const filterGerman 		= document.getElementById("searchGerman");
    const translateTable 	= document.getElementById("frenchTable").children[1];
    const btnContainer 		= document.getElementById("inputField2");
    const btns 				= btnContainer.getElementsByClassName("switchButton");
    const accentRegex       = /[\u00C0-\u00FF\u0027]/g

// E V E N T   L I S T E N E R S

function getCurrentTopic(){
    switch(showTableOnLoad){
        case 0:
            return topic = sfoHelpdesk.slice(1)
        case 1:
            return topic = skybriefingHelpdesk.slice(1)    
        case 2:
            return topic = aipHelpdesk.slice(1)
        case 3:
            return topic = vociTechGen.slice(1)   
        case 4:
            return topic = vociDiv.slice(1)
    }
}

function getCurrentSearchbox(){
    if(filterAll.value !== ""){
        return "all"
    }
    else if(filterFrench.value !== ""){
        return "fr"
    }
    else if(filterGerman.value !== ""){
        return "de"
    }
    else return "all"
}

function queryTopic(what, topic){
    console.log(what, showTableOnLoad)
    if(what === "all"){
        for (i=0; i<topic.length; i++){
            let filterValueA = filterAll.value.toLowerCase();
            if (filterValueA.match(accentRegex)){ // checks if accent characters are present
                if (topic[i].Français.toLowerCase().includes(filterValueA) || topic[i].Allemand.toLowerCase().includes(filterValueA)) {
                    wordList(topic); // if accent characters present, search with them
                } 
            } else { // if no accent characters present, normalize the object value and remove accent characters
                let deaccentedAF = _.deburr(topic[i].Français.toLowerCase()); // ALL GLORY TO LODASH FOR THE DEBURR FUNCTION OH MY GOD
                let deaccentedAG = _.deburr(topic[i].Allemand.toLowerCase()); // ...deburr removes accents and replaces accented letters with latin letters (è -> e)
                if (deaccentedAF.includes(filterValueA) || deaccentedAG.includes(filterValueA)) {
                    wordList(topic);
                }
            }
        }
    }
    if(what === "de"){
        for (i=0; i<topic.length; i++){
            let filterValueG = filterGerman.value.toLowerCase();
            if (filterValueG.match(accentRegex)){ // checks if accent characters are present
                if (topic[i].Allemand.toLowerCase().includes(filterValueG)) {
                    wordList(topic); // if accent characters present, search with them
                } 
            } else { // if no accent characters present, normalize the object value and remove accent characters
                let deaccentedG = _.deburr(topic[i].Allemand.toLowerCase());
                if (deaccentedG.includes(filterValueG)) {
                    wordList(topic);
                }
            }
        }
    }
    if(what === "fr"){
        for (i=0; i<topic.length; i++){
            let filterValueF = filterFrench.value.toLowerCase();
            if (filterValueF.match(accentRegex)){ // checks if accent characters are present
                if (topic[i].Français.toLowerCase().includes(filterValueF)) {
                    wordList(topic); // if accent characters present, search with them
                } 
            } else { // if no accent characters present, normalize the object value and remove accent characters
                let deaccentedF = _.deburr(topic[i].Français.toLowerCase());
                if (deaccentedF.includes(filterValueF)) {
                    wordList(topic);
                }
            }
        }
    }
}
   
filterAll.addEventListener("keyup", function() {
    translateTable.innerHTML = ""
    let topic = getCurrentTopic()
    queryTopic("all", topic)
})

filterFrench.addEventListener("keyup", function() {
    translateTable.innerHTML = ""
    let topic = getCurrentTopic()
    queryTopic("fr", topic)
})

filterGerman.addEventListener("keyup", function() {
    translateTable.innerHTML = ""
    let topic = getCurrentTopic()
    queryTopic("de", topic)
    
})

//These event listeners just call the init function with a assigned a value which determines the JSON source

    function tabbing(buttonID) {
        translateTable.innerHTML = ""
        for (let i = 0; i < btns.length; i++) {
            if(btns[i].id == buttonID){
                btns[i].style.setProperty("background-color", "var(--color_skyblue)")
                btns[i].style.opacity = "1"
                btns[i].style.setProperty("color", "var(--color_skywhite)")
            } else {
                btns[i].style.setProperty("background-color", "var(--color_skyblue)")
                btns[i].style.opacity = "0.6"
            }
        }
    }


    document.getElementById("buttonSFO").addEventListener("click", function() {
        let buttonID = "buttonSFO";
        tabbing(buttonID);
        showTableOnLoad = 0;
        queryTopic(getCurrentSearchbox(), getCurrentTopic())
    })
    
    document.getElementById("buttonGeneral").addEventListener("click", function() {
        let buttonID = "buttonGeneral";
        tabbing(buttonID);
        showTableOnLoad = 1;
        queryTopic(getCurrentSearchbox(), getCurrentTopic())
    })

    document.getElementById("buttonWhatever").addEventListener("click", function() {
        let buttonID = "buttonWhatever";
        tabbing(buttonID);
        showTableOnLoad = 2;
        queryTopic(getCurrentSearchbox(), getCurrentTopic())
    })

    document.getElementById("buttonAnother").addEventListener("click", function() {
        let buttonID = "buttonAnother";
        tabbing(buttonID);
        showTableOnLoad = 3;
        queryTopic(getCurrentSearchbox(), getCurrentTopic())
    })
    
    document.getElementById("buttonLastOne").addEventListener("click", function() {
        let buttonID = "buttonLastOne";
        tabbing(buttonID);
        showTableOnLoad = 4;
        queryTopic(getCurrentSearchbox(), getCurrentTopic())
    })
    

// F U N C T I O N S


// This creates the rows of the table dynamically
    function createTableContent(obj) {
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
    function wordList(obj) {
        if (filterAll.value == 0 && filterFrench.value == 0 && filterGerman.value == 0){
            translateTable.innerHTML=""; // clears the table completely 
            for (i=0; i<obj.length; i++){
                createTableContent(obj); // calls each JSON object and creates a row for it
            }
        } else {
            createTableContent(obj); // entry point for the filter event listeners; doesn't destroy the table
        }
    }

// Initial display of the table and also used for switching JSON sources
    function init() {
        let topic = getCurrentTopic()
        wordList(topic)
        
        console.log("sfoHelpdesk: " + sfoHelpdesk.length)
        console.log("skybriefingHelpdesk: " + skybriefingHelpdesk.length)
        console.log("aipHelpdesk: " + aipHelpdesk.length)
        console.log("vociTechGen: " + vociTechGen.length)
        console.log("vociDiv: " + vociDiv.length)
        console.log("Total: " + (sfoHelpdesk.length + aipHelpdesk.length + vociDiv.length + vociTechGen.length + skybriefingHelpdesk.length))

    }

// M A I N   E N T R Y   P O I N T
    let buttonID = "buttonSFO";
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
    
    document.getElementById("toTop").addEventListener("click", function(){
        window.scrollTo(0,0)
    })


};
