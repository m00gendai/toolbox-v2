function loadAipLibraryCode(){
    
    
    // C O N S T A N T S
    
    
    const aipBlockTypes = [
        {target: "spanGreen", class: "eaip", text: "External link to eAIP", clicked: false},
        {target: "spanYellow", class: "toolbox", text: "Internal link to eAIP", clicked: false},
        {target: "spanRed", class: "bookaip", text: "Only physical AIP", clicked: false},
        {target: "spanBlack", class: "noaip", text: "No information at all", clicked: false},
    ]
    
    const aipButtonSymbols = {symbolShow: '<i class="far fa-eye"></i>', symbolHide: '<i class="far fa-eye-slash"></i>'}
    
    const aipLinkGeneratorSpace = document.getElementById("aipLinks");
    
    
    // Q U E R Y   A I P   T I L E S   E V E N T   H A N D L E R
    
    
    document.getElementById("aipBar").addEventListener("keyup", function(){
        displayAIP()
    })
    
    
    // T O G G L E   A I P   T I L E S
       
    
    for(let i=0;i<aipBlockTypes.length;i++){
        document.getElementById(aipBlockTypes[i].target).innerHTML = aipBlockTypes[i].text + aipButtonSymbols.symbolShow
        document.getElementById(aipBlockTypes[i].target).addEventListener("click", function(e){
            // clicked true = HIDE elements 
            // clicked false = SHOW elements 
            if(aipBlockTypes[i].clicked == false){
                aipBlockTypes[i].clicked = true
                document.getElementById(aipBlockTypes[i].target).innerHTML = aipBlockTypes[i].text + aipButtonSymbols.symbolHide
                toggleAipTiles("none",i)
            } else {
                aipBlockTypes[i].clicked = false
                document.getElementById(aipBlockTypes[i].target).innerHTML = aipBlockTypes[i].text + aipButtonSymbols.symbolShow
                toggleAipTiles("flex",i)
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
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    }

    
    // A I P   T I L E   G E N E R A T O R

    
    for(let i=0;i<aipTileData.length;i++){
        const aipTileDiv = document.createElement("div");
        const aipTileDivP = document.createElement("p");
        const aipTileDivImg = document.createElement("img");
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
        
        aipTileDivImg.src = aipTileData[i].img;
        aipTileDivImg.loading="lazy"
        aipTileDivImg.width = "100%";
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

    
    document.getElementById("misCtry").addEventListener("click", function() {
        if (document.getElementById("misCtryCnt").style.display == "block"){
            document.getElementById("misCtryCnt").style.display = "none";
        } else if (document.getElementById("misCtryCnt").style.display = "none"){
            document.getElementById("misCtryCnt").style.display = "block";
        }
    });

    
}
