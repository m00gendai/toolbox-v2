const errorMessage = "\nPlease advise weberml\nFor access to backup links, refer to:\nU:\\ZOL\\PR-Team\\AIS-ALLG\\TOOLBOX_AIM_Contingency_Site_files\\index.html"


// I N I T I A L   L O A D


window.addEventListener('DOMContentLoaded', (event) => {

    
    window.addEventListener('popstate', (event) => {
        console.log(history.state)
        switch(history.state.page_id){
            case 1:{
                $("#contentBox").show();
                $("#aipBox").hide();
                $("#atsBox").hide();
                $("#frenchBox").hide();
                $("#sitaBox").hide();
                $("#doctoolBox").hide();
            }
            break;
            case 2: {
                $("#contentBox").hide();
                $("#aipBox").hide();
                $("#atsBox").show();
                loadAtsMsgCode()
                $("#frenchBox").hide();
                $("#sitaBox").hide();
                $("#doctoolBox").hide();
                $("#ident").focus();
            }
            break;
            case 3: {
                $("#contentBox").hide();
                $("#aipBox").show();
                loadAipLibraryCode()
                $("#atsBox").hide();
                $("#frenchBox").hide();
                $("#sitaBox").hide();
                $("#doctoolBox").hide();
                $("#aipBar").focus();
            }
            break;
            case 4: {
                $("#contentBox").hide();
                $("#aipBox").hide();
                $("#atsBox").hide();
                $("#frenchBox").hide();
                $("#sitaBox").hide();
                $("#doctoolBox").show();
                loadDocScreeningToolCode()
                document.getElementById("queryFK").focus();
            }
            break;
        }
    });

    
    
    let state = { 'page_id': 1}
    let title = 'Toolbox Home'
    const url = window.location.href
    try{
        history.pushState(state, title, url)
    }
    catch(err){
        alert("Error" + err + "\n\nPlease make sure website address of Toolbox is \"U:/ZOL/PR-Team/AIS-ALLG/aim-info-hub_DO%20NOT%20DELETE%20PLS%20-WM/index.html\"")
    }
    
    const src = homeTileData
    document.getElementById("quickLinks").innerHTML = ""

    window.addEventListener("keypress", function(e){
        if(e.keyCode ==  32 
        && e.target != document.getElementById("screenDocument")
        && e.target != document.getElementById("frenchContactText")
        && e.target != document.getElementById("searchAll")
        && e.target != document.getElementById("searchFrench")
        && e.target != document.getElementById("searchGerman")
        ){
            e.preventDefault();
        }
    });
  
    $("#home").click(function() {
        $("#contentBox").show();
        $("#aipBox").hide();
        $("#atsBox").hide();
        $("#frenchBox").hide();
        $("#sitaBox").hide();
        $("#doctoolBox").hide();
        $("#searchBar").focus();
        document.getElementById("searchBar").value = ""
        document.getElementById("quickLinks").innerHTML = ""
        try{
        sortHomeByName(src)
    }
    catch(err){
        alert("Error\n" + err + errorMessage)
    }
        
        let state = { 'page_id': 1}
        let title = 'Toolbox Home'
        let href = url.substring(0, url.indexOf("#"))
        console.log(href)
        history.pushState(state, title, href)

        
    });
    $("#ats").click(function() {
        $("#contentBox").hide();
        $("#aipBox").hide();
        $("#atsBox").show();
        loadAtsMsgCode()
        $("#frenchBox").hide();
        $("#sitaBox").hide();
        $("#doctoolBox").hide();
        $("#ident").focus();
        let state = { 'page_id': 2}
        let title = 'ATS MSG Search'
        let href = url.substring(0, url.indexOf("#")) + "#ATS_MSG_Search"
        history.pushState(state, title, href)
    });
    $("#aip").click(function() {
        $("#contentBox").hide();
        $("#aipBox").show();
        loadAipLibraryCode()
        $("#atsBox").hide();
        $("#frenchBox").hide();
        $("#sitaBox").hide();
        $("#doctoolBox").hide();
        $("#aipBar").focus();
        let state = { 'page_id': 3}
        let title = 'AIP Tool'
        let href = url.substring(0, url.indexOf("#")) + "#AIP_Tool"
        history.pushState(state, title, href)
    });
    
    $("#doctool").click(function() {
        $("#contentBox").hide();
        $("#aipBox").hide();
        $("#atsBox").hide();
        $("#frenchBox").hide();
        $("#sitaBox").hide();
        $("#doctoolBox").show();
        loadDocScreeningToolCode()
        document.getElementById("queryFK").focus();
        let state = { 'page_id': 4}
        let title = 'DOC Screening Tool'
        let href = url.substring(0, url.indexOf("#")) + "#DOC_Screening_Tool"
        history.pushState(state, title, href)
    });

                   
// H O M E   T I L E   G E N E R A T O R
     
    
    const quicklinkGeneratorSpace = document.getElementById("quickLinks");
    
    function generateAIPtiles(src){
        for(let i=0;i<src.length;i++){
            const homeTileDiv = document.createElement("div");
            const homeTileDivP = document.createElement("p");
            const homeTileDivImg = document.createElement("img");
            homeTileDiv.id = src[i].id;
            homeTileDiv.className = "quicklinksContainerBox";
            homeTileDiv.tabIndex = 0;
            homeTileDivImg.src = src[i].img;
            homeTileDivImg.loading = "lazy"
            
            homeTileDiv.appendChild(homeTileDivImg);
            homeTileDiv.appendChild(homeTileDivP);
            
            homeTileDivP.innerHTML = src[i].title;
            
            switch(src[i].style){
                case "spvr": homeTileDiv.style.background = "linear-gradient(45deg,  #e570e7 0%,#c85ec7 47%,#a849a3 100%)";
                    break;
                case "aro": homeTileDiv.style.background = "linear-gradient(45deg,  #a7cfdf 0%,#23538a 100%)";
                    break;
                case "general": homeTileDiv.style.background = "linear-gradient(45deg,  #ffa84c 0%,#ff7b0d 100%)";
                    break;
                case "pub": homeTileDiv.style.background = "linear-gradient(45deg, #299a0b 0%,#299a0b 100%)";
                    break;
                case "sfo": homeTileDiv.style.background = "linear-gradient(45deg,  #ffd65e 0%,#febf04 100%)";
                    break;
                case "doc": homeTileDiv.style.background = "linear-gradient(45deg,  #ff3019 0%,#cf0404 100%)";
                    break;
            }
           
            if(homeTileDiv.id != "frenchStuff" && homeTileDiv.id != "sitaConversion"){
                homeTileDiv.addEventListener("click", function(){
                    window.open(src[i].link)
                });
            
                homeTileDiv.addEventListener("keypress", function(e){
                    if(e.keyCode == 13 || e.keyCode == 32) {
                        window.open(src[i].link)
                    }
                });
            } else if(homeTileDiv.id == "frenchStuff"){
                homeTileDiv.addEventListener("click", function(){
                    $("#contentBox").hide();
                    $("#aipBox").hide();
                    $("#atsBox").hide();
                    $("#frenchBox").show();
                    loadFrenchCode()
                    $("#sitaBox").hide();
                    $("#doctoolBox").hide();
                    $("#searchAll").focus();
                     let state = { 'page_id': 5}
        let title = 'French Tool'
        let href = url.substring(0, url.indexOf("#")) + "#French_Tool"
        history.pushState(state, title, href)
                });
                homeTileDiv.addEventListener("keypress", function(e){
                    if(e.keyCode == 13 || e.keyCode == 32) {
                        $("#contentBox").hide();
                        $("#aipBox").hide();
                        $("#atsBox").hide();
                        $("#frenchBox").show();
                        $("#sitaBox").hide();
                        $("#doctoolBox").hide();
                        $("#searchAll").focus();
                         let state = { 'page_id': 5}
        let title = 'French Tool'
        let href = url.substring(0, url.indexOf("#")) + "#French_Tool"
        history.pushState(state, title, href)
                    }
                });
            } else if (homeTileDiv.id == "sitaConversion"){
                homeTileDiv.addEventListener("click", function(){
                    $("#contentBox").hide();
                    $("#aipBox").hide();
                    $("#atsBox").hide();
                    $("#frenchBox").hide();
                    $("#sitaBox").show();
                    $("#doctoolBox").hide();
                    $("#inputSita").focus();
                     let state = { 'page_id': 6}
        let title = 'SITA Address Converter'
        let href = url.substring(0, url.indexOf("#")) + "#SITA_Address_Converter"
        history.pushState(state, title, href)
                });
                homeTileDiv.addEventListener("keypress", function(e){
                    if(e.keyCode == 13 || e.keyCode == 32) {
                        $("#contentBox").hide();
                        $("#aipBox").hide();
                        $("#atsBox").hide();
                        $("#frenchBox").hide();
                        $("#sitaBox").show();
                        $("#doctoolBox").hide();
                        $("#inputSita").focus();
                         let state = { 'page_id': 6}
        let title = 'SITA Address Converter'
        let href = url.substring(0, url.indexOf("#")) + "#SITA_Address_Converter"
        history.pushState(state, title, href)
                    }
                });
            }
        // The timeout function disrupts the search function, as all tiles are re-generated. Commented out for the time being.
           // setTimeout(function(){ 
                quicklinkGeneratorSpace.appendChild(homeTileDiv);
          //  }, 1000)
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
        alert("Error\n" + err + errorMessage)
    }   


    
    try{
        sortHomeByName(src)
    }
    catch(err){
        alert("Error\n" + err + errorMessage)
    }

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
    

// L E G A L   S T A T E M E N T


    document.getElementById("legal").addEventListener("click", function(){
        document.getElementById("legalA").style.display ="flex";
    })

    document.getElementById("close").addEventListener("click", function(){
        document.getElementById("legalA").style.display ="none";
    })
    
    const thisDate = new Date()
    const thisYear = thisDate.getFullYear()
    
    document.getElementById("legalCopy").innerHTML = "&copy; 2020-" + thisYear + " Marcel Weber"
    document.getElementById("footerText").innerHTML = "&copy; 2020-" + thisYear + " AIM Operations Zurich | Contact helpdesk@skybriefing.com for general enquiries or marcel.weber@skyguide.ch for technical issues." 

});
