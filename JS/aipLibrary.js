function loadAipLibraryCode(){
    
    
    // C O N S T A N T S
    
    
   
    const aipButtonSymbols = {symbolShow: '<i class="far fa-eye"></i>', symbolHide: '<i class="far fa-eye-slash"></i>'}
    
    const aipLinkGeneratorSpace = document.getElementById("aipLinks");
    
    
    // Q U E R Y   A I P   T I L E S   E V E N T   H A N D L E R
    
    
    document.getElementById("aipBar").addEventListener("keyup", function(){
        displayAIPtiles() // Forces the view to Display All 
        displayAIP()
    })
    
    
    // C O U N T   A I P   T Y P E S
    
    let greenAIPs = 0
    let yellowAIPs = 0
    let redAIPs = 0
    let blackAIPs = 0
    let allAIPs = 0
    
    for(let i=0;i<aipTileData.length;i++){
        if(aipTileData[i].aip == "green"){
            greenAIPs++
        }
        if(aipTileData[i].aip == "yellow"){
            yellowAIPs++
        }
        if(aipTileData[i].aip == "red"){
            redAIPs++
        }
        if(aipTileData[i].aip == "black"){
            blackAIPs++
        }
        allAIPs++
    }
    
     const aipBlockTypes = [
        {target: "spanGreen", class: "eaip", text: `External eAIP (${greenAIPs})`, clicked: false},
        {target: "spanYellow", class: "toolbox", text: `Internal eAIP (${yellowAIPs})`, clicked: false},
        {target: "spanRed", class: "bookaip", text: `Only physical AIP (${redAIPs})`, clicked: false},
        {target: "spanBlack", class: "noaip", text: `No information at all (${blackAIPs})`, clicked: false},
        {target: "sortAipTilesByNone", class: "", text: `Display all (${allAIPs})`, clicked: false},
        {target: "sortAipTilesByICAO", class: "", text: "Sort by ICAO", clicked: false},
        {target: "sortAipTilesByName", class: "", text: "Sort by Name", clicked: false},
        {target: "aipLogins", class: "", text: "View Logins", clicked: false},
        
    ]
    
    // T O G G L E   A I P   T I L E S
       
    
    for(let i=0;i<aipBlockTypes.length;i++){
        if(!aipBlockTypes[i].class == ""){
            document.getElementById(aipBlockTypes[i].target).innerHTML = `${aipBlockTypes[i].text} ${aipButtonSymbols.symbolShow}`
        } else {
            if(aipBlockTypes[i].text == "Display all"){
               document.getElementById(aipBlockTypes[i].target).innerHTML = `${aipBlockTypes[i].text} <i class="fas fa-th"></i>`
            } else if(aipBlockTypes[i].text == "View Logins"){
                document.getElementById(aipBlockTypes[i].target).innerHTML = `${aipBlockTypes[i].text} <i class="fas fa-unlock-alt"></i>`
            } else {
                document.getElementById(aipBlockTypes[i].target).innerHTML = `${aipBlockTypes[i].text} <i class="fas fa-sort-alpha-down"></i>`
            }
        }
            document.getElementById(aipBlockTypes[i].target).addEventListener("click", function(e){
            // clicked true = HIDE elements 
            // clicked false = SHOW elements 
            if(aipBlockTypes[i].clicked == false && !aipBlockTypes[i].class == ""){
                aipBlockTypes[i].clicked = true
                document.getElementById(aipBlockTypes[i].target).innerHTML = `${aipBlockTypes[i].text} ${aipButtonSymbols.symbolHide}`
                toggleAipTiles("none",i)
            } else if(aipBlockTypes[i].clicked == true && !aipBlockTypes[i].class == ""){
                aipBlockTypes[i].clicked = false
                document.getElementById(aipBlockTypes[i].target).innerHTML = `${aipBlockTypes[i].text} ${aipButtonSymbols.symbolShow}`
                toggleAipTiles("block",i)
            }
        })
    }
        
    function toggleAipTiles(display,i){
        let rows = aipLinkGeneratorSpace.querySelectorAll(".aipLinkBox");
        for(let j=0;j<rows.length;j++){
            if(rows[j].classList.contains(aipBlockTypes[i].class)){
                rows[j].style.display = display
            }
        }
    }
              
    
    // A I P   Q U E R Y   I N P U T   F U N C T I O N


    function linkAIP(icao) { // icao = passed parameter from onclick
        if (icao in linkCollectionAIP) {
            let linkAIP = linkCollectionAIP[icao];
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
                    rows[i].style.display = "flex";
                    rows[i].style.flexWrap = "wrap";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    }

    
    // A I P   T I L E   G E N E R A T O R
    
    displayAIPtiles()
    

    document.getElementById("sortAipTilesByICAO").addEventListener("click", function(){
        let sortby = "icao"
        sortAIPtiles(sortby)
    })
    document.getElementById("sortAipTilesByName").addEventListener("click", function(){
        let sortby = "country"
        sortAIPtiles(sortby)
    })
    
    document.getElementById("sortAipTilesByNone").addEventListener("click", function(){
        displayAIPtiles()
    })
    
    function displayAIPtiles(){
        
        let sortedAIPs = []
        
        document.getElementById("alphabetSoup").style.display = "none"
        document.getElementById("aipLinks").style.display = "grid"
        document.getElementById("aipLinks").style.gridTemplateColumns = "repeat(auto-fill, minmax(8em, 1fr))"
        document.getElementById("aipLinks").style.gridGap = "1rem"
        
        document.getElementById("aipLinks").innerHTML = ""
        
        for(let i=0;i<aipTileData.length;i++){
            sortedAIPs.push(aipTileData[i])
        }
        
        sortedAIPs = sortedAIPs.sort((a, b) => (a.country > b.country) ? 1 : -1)
        
        
        for(let i=0;i<sortedAIPs.length;i++){
            const aipTileDiv = document.createElement("div");
            const aipTileDivP = document.createElement("p");
            const aipTileDivImg = document.createElement("div");
            const aipTileBr = document.createElement("br");
            const aipTileLink = sortedAIPs[i].link;

            aipTileDiv.id = sortedAIPs[i].id;
            aipTileDiv.className = "aipLinkBox";
            
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
            
            aipTileDivImg.style.backgroundImage = "url(" + sortedAIPs[i].img + ")";
            aipTileDivImg.className = "aipLinkBoxImage"

            aipTileDiv.appendChild(aipTileDivImg);
            aipTileDiv.appendChild(aipTileDivP);
            aipTileDivP.innerHTML = "<strong>" + sortedAIPs[i].icao + "</strong>" + sortedAIPs[i].country

            
            if(sortedAIPs[i].aip == "green"){
                aipTileDiv.classList.add("eaip");
            }
            if(sortedAIPs[i].aip == "yellow"){
                aipTileDiv.classList.add("toolbox");
            }
            if(sortedAIPs[i].aip == "red"){
                aipTileDiv.classList.add("bookaip");
            }
            if(sortedAIPs[i].aip == "black"){
                aipTileDiv.classList.add("noaip");
            }
        
        
        
        document.getElementById("aipLinks").appendChild(aipTileDiv)

        
    }
    }
	
    function sortAIPtiles(sortby){
        
        document.getElementById("aipLinks").style.display = "flex"
        document.getElementById("aipLinks").style.justifyContent = "center"
        document.getElementById("aipLinks").style.alignItems = "center"
        document.getElementById("alphabetSoup").style.display = "flex"
        document.getElementById("aipLinks").innerHTML = ""
        document.getElementById("alphabetSoup").innerHTML = ""
        sortAIPby = sortby
        let alphabet = []
        let aipTileArray = []
        
        for(let i=0;i<aipTileData.length;i++){
            const aipTileDiv = document.createElement("div");
            const aipTileDivP = document.createElement("p");
            const aipTileDivImg = document.createElement("div");
            const aipTileBr = document.createElement("br");
            const aipTileLink = aipTileData[i].link;
            aipTileDiv.id = aipTileData[i].id;
            aipTileDiv.className = "aipLinkBox";
            
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
            
            aipTileDivImg.style.backgroundImage = "url(" + aipTileData[i].img + ")";
            aipTileDivImg.className = "aipLinkBoxImage"

            aipTileDiv.appendChild(aipTileDivImg);
            aipTileDiv.appendChild(aipTileDivP);
            aipTileDivP.innerHTML = "<strong>" + aipTileData[i].icao + "</strong>" + aipTileData[i].country

            if(sortAIPby == "icao"){
                alphabet.push(aipTileData[i].icao[0].toUpperCase())
            } else if(sortAIPby == "country"){
                alphabet.push(aipTileData[i].country[0].toUpperCase())
            }
            
            if(aipTileData[i].aip == "green"){
                aipTileDiv.classList.add("eaip");
            }
            if(aipTileData[i].aip == "yellow"){
                aipTileDiv.classList.add("toolbox");
            }
            if(aipTileData[i].aip == "red"){
                aipTileDiv.classList.add("bookaip");
            }
            if(aipTileData[i].aip == "black"){
                aipTileDiv.classList.add("noaip");
            }
            
            aipTileArray.push(aipTileDiv)
        }
        

        
        alphabet.sort()
        let set = new Set(alphabet)
        alphabet = Array.from(set)
        
        for(let i=0;i<alphabet.length;i++){
            
            let alphabletter = document.createElement("div")
            alphabletter.className = "alphabletter"
            
            alphabletter.innerText = alphabet[i].toUpperCase()
            document.getElementById("alphabetSoup").appendChild(alphabletter)
            
            
            
            
            let letterContainer = document.createElement("div")
            let letterContainerLetter = document.createElement("div")
            let letterContainerStuff = document.createElement("div")
            
            letterContainer.className = "letterContainer"
            letterContainerLetter.className = "letterContainerLetter"
            letterContainerStuff.className = "letterContainerStuff"
            letterContainer.id = "letterContainer" + alphabet[i]
            letterContainerLetter.id = "letterContainerLetter" + alphabet[i]
            letterContainerStuff.id = "letterContainerStuff" + alphabet[i]
            
            letterContainer.appendChild(letterContainerLetter)
            letterContainerLetter.innerHTML = alphabet[i].toUpperCase()
            letterContainer.appendChild(letterContainerStuff)
            document.getElementById("aipLinks").appendChild(letterContainer)
            
            alphabletter.addEventListener("click", function(){
                letterContainerLetter.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            })
            
            
            for(let j=0;j<aipTileArray.length;j++){
                if(sortAIPby == "icao"){
                    if(aipTileArray[j].id.substring(0,1).toLowerCase() == letterContainer.id.substring(letterContainer.id.length-1, letterContainer.id.length).toLowerCase()){
                        letterContainerStuff.appendChild(aipTileArray[j])
                    }
                } else if(sortAIPby == "country"){
                    if(aipTileArray[j].innerText[2].toLowerCase() == letterContainer.id.substring(letterContainer.id.length-1, letterContainer.id.length).toLowerCase()){
                        letterContainerStuff.appendChild(aipTileArray[j])
                    }
                }
            }
    
    
        }
    }
    // R A N D O M   T A B   I N D E X   F U N C T  I O N   C O M I N G   T H R O U G H
   
    
    $('.aipLinkBox').each(function() {
        if (this.type != "hidden") {
            let $input = $(this);
            $input.attr("tabindex", 0);
        }
    });

    
    // A I P   L O G I N S   B U T T O N   H A N D L E R

    
    document.getElementById("aipLogins").addEventListener("click", function(){
        window.open("http://ais.skyguide.corp/list/Logins/Logins.pdf")
    });

    
    // M I S S I N G   C O U N T R I E S   S P O I L E R

    if(document.getElementById("misCtry")){
    
    document.getElementById("misCtry").addEventListener("click", function() {
        if (document.getElementById("misCtryCnt").style.display == "block"){
            document.getElementById("misCtryCnt").style.display = "none";
        } else if (document.getElementById("misCtryCnt").style.display = "none"){
            document.getElementById("misCtryCnt").style.display = "block";
        }
    });
    
    document.getElementById("toTopAIPlibrary").addEventListener("click", function(){
        window.scrollTo(0,0)
    })
    }
    
}
