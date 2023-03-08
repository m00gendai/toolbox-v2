const errorMessage = "\nPlease advise weberml\nFor access to backup links, refer to:\nU:\\ZOL\\PR-Team\\AIS-ALLG\\TOOLBOX_AIM_Contingency_Site_files\\index.html"

// I N I T I A L   L O A D


window.addEventListener('DOMContentLoaded', () => {
    console.time("Initial Load")
    
    const toolboxSections = ["contentBox", "aipBox", "atsBox", "frenchBox", "sitaBox", "doctoolBox"]
    const toolboxTileLinkExclusions = ["frenchStuff", "sitaConversion", "atfmx", "reports", "docfiles"]
    const spacesNotAllowedIn = ["screenDocument", "frenchContactMail", "searchAll", "searchFrench", "searchGerman"]
    
    window.addEventListener("keypress", function(e){
        if(e.key == " " && !spacesNotAllowedIn.includes(e.target)){
            e.preventDefault()
        }
    })
    
    function toolboxSectionToggler(section){
        toolboxSections.forEach(section => {
            document.getElementById(section).style.display = "none"
        })
        
        switch(section){
            case "contentBox":{
                document.getElementById("contentBox").style.display = "flex"
                document.getElementById("searchBar").focus();
            }
            break;
            case "aipBox":{
                document.getElementById("aipBox").style.display = "flex"
                document.getElementById("aipBar").focus();
            }
            break;
            case "atsBox":{
                document.getElementById("atsBox").style.display = "flex"
                document.getElementById("ident").focus();
            }
            break;
            case "doctoolBox":{
                document.getElementById("doctoolBox").style.display = "flex"
                document.getElementById("queryFK").focus();
            }
            break;
            case "frenchBox":{
                document.getElementById("frenchBox").style.display = "flex"
            }
            break;
            case "sitaBox":{
                document.getElementById("sitaBox").style.display = "flex"
            }
            break;
        }
    }
    
    function toolboxSectionStateSetter(pageId, title){
        let state = { 'page_id': pageId}
        let href = url.substring(0, url.indexOf("#"))
        history.pushState(state, title, href)
    }
    
    window.addEventListener('popstate', () => {
        console.log(`History state: ${history.state}`)
        toolboxSectionToggler(history.state.page_id)
    });

    let state = { 'page_id': "contentBox"}
    let title = 'Toolbox Home'
    const url = window.location.href
    
    try{
        history.pushState(state, title, url)
    } 
    catch(err){
        alert(`Error ${err} \n\nPlease make sure website address of Toolbox is "U:/ZOL/PR-Team/AIS-ALLG/aim-info-hub_DO%20NOT%20DELETE%20PLS%20-WM/index.html"`)
    }
    
    const src = homeTileData
    document.getElementById("quickLinks").innerHTML = ""
  
    document.getElementById("home").addEventListener("click", function(){
        toolboxSectionToggler("contentBox")
        document.getElementById("searchBar").value = ""
        document.getElementById("quickLinks").innerHTML = ""
        try {
            sortHomeByName(src)
        }
        catch(err) {
            alert(`Error\n" ${err}: ${errorMessage}`)
        }
        toolboxSectionStateSetter("contentBox", "Toolbox Home")
    })
    
    document.getElementById("aip").addEventListener("click", function(){
        toolboxSectionToggler("aipBox", "aipBar")
        loadAipLibraryCode()
        toolboxSectionStateSetter("aipBox", "AIP Library")
    })
    
    document.getElementById("ats").addEventListener("click", function(){
        toolboxSectionToggler("atsBox")
        loadAtsMsgCode()
        toolboxSectionStateSetter("atsBox", "ATS MSG Search")
    })
    
    document.getElementById("doctool").addEventListener("click", function(){
        toolboxSectionToggler("doctoolBox")
        loadDocScreeningToolCode()
        toolboxSectionStateSetter("doctoolBox", "DOC Screening Tool")
    })
    
    document.getElementById("mappingtool").addEventListener("click", function(){
        window.open("https://aim-mapping-tool.mrweber.ch/")
    })
    
    
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
            
            let navModal = false
            function modal(text, path, image){
                if(navModal){
                    const veil = document.createElement("div")
                    veil.className = "veil"
                    document.getElementById("contentBox").appendChild(veil)
                    
                    const modal = document.createElement("div")
                    modal.className = "modal"
                    veil.appendChild(modal)
                    
                    const msg = document.createElement("p")
                    msg.innerHTML = text
                    modal.appendChild(msg)
                    
                    if(path != undefined){
                        
                        const inptWrapper = document.createElement("div")
                        inptWrapper.className = "inptWrapper"
                        modal.appendChild(inptWrapper)
                        
                        const inpt = document.createElement("input")
                        inpt.type = "text"
                        inpt.value = path
                        inpt.className = "modalInput"
                        setTimeout(function(){
                            inpt.focus()
                            inpt.setSelectionRange(0, inpt.value.length)
                        },10)
                        inpt.style.width = `${path.length+1}ch`
                        inptWrapper.appendChild(inpt)
                        
                        const imgWrapper = document.createElement("div")
                        imgWrapper.className = "imgWrapper"
                        modal.appendChild(imgWrapper)
                        
                        const img = document.createElement("img")
                        img.src = image
                        img.className = "fortheblind"
                        imgWrapper.appendChild(img)
                    }
                    const okWrapper = document.createElement("div")
                    okWrapper.className="okWrapper"
                    modal.appendChild(okWrapper)
                    
                    const ok = document.createElement("button")
                    ok.className ="ok"
                    okWrapper.appendChild(ok)
                    ok.innerText ="Got it!"
                    ok.addEventListener("click", function(){
                        navModal = !navModal
                        document.getElementById("contentBox").removeChild(veil)
                    })
                }
            }
            
            const homeTileDivEvents = ["click", "keypress"]
            homeTileDivEvents.forEach(homeTileDivEvent => {
                homeTileDiv.addEventListener(homeTileDivEvent, function(e){
                    if(e.key == " " || e.key == "Enter" || e.type == "click") {
                        if(!toolboxTileLinkExclusions.includes(homeTileDiv.id)){
                            window.open(src[i].link)
                        }
                        
                        if(homeTileDiv.id == "frenchStuff"){
                            toolboxSectionToggler("frenchBox")
                            loadFrenchCode()
                            toolboxSectionStateSetter("frenchBox", "French Tool")
                        }
                        
                        if(homeTileDiv.id == "sitaConversion"){
                            toolboxSectionToggler("sitaBox")
                            loadFrenchCode()
                            toolboxSectionStateSetter("sitaBox", "SITA Address Converter")
                        }
                        
                        if(homeTileDiv.id == "atfmx"){
                            navModal = !navModal
                            modal("Please navigate to follwing file location. Do <strong>NOT</strong> use the browser, use the File Explorer!", "U:\\ZOL\\PR-Team\\AIS-ALLG", "./Assets/FileExplorer.png")
                        }
                        
                        if(homeTileDiv.id == "docfiles"){
                            navModal = !navModal
                            console.log(homeTileDiv)
                            modal("Please navigate to follwing file location. Do <strong>NOT</strong> use the browser, use the File Explorer!", "U:\\ZOL\\PR-Team\\AIS-ALLG\\Data_Collection", "./Assets/FileExplorer.png")
                        }
                        
                        if(homeTileDiv.id == "reports"){
                            navModal = !navModal
                            modal(`Report Server is only accessible from OPS environment (AFPS/SCONE)\nUse address https://172.25.184.136:8443/BOE/BI if no bookmark is present.`)
                        }
                        
                    }
                })
            })
            
           quicklinkGeneratorSpace.appendChild(homeTileDiv);
        }
    }
    
    
// H O M E   T I L E   D I S P L A Y   F U N C T I O N 

    function sorterColorChange(choice){
        if(choice =="name"){
            document.getElementById("sortBoxHomeTyp").style.background = "none";
            document.getElementById("sortBoxHomeTyp").style.color = "black";
            document.getElementById("sortBoxHomeAZ").style.background = "blue";
            document.getElementById("sortBoxHomeAZ").style.color = "white";
        }
        if(choice =="type"){
            document.getElementById("sortBoxHomeTyp").style.background = "blue";
            document.getElementById("sortBoxHomeTyp").style.color = "white";
            document.getElementById("sortBoxHomeAZ").style.background = "none";
            document.getElementById("sortBoxHomeAZ").style.color = "black";
        }
    }

    function sortHomeByName(src){
        document.getElementById("quickLinks").innerHTML = "";
        let byName = homeTileData.slice(0);
       
        byName.sort(function(a,b) {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        })
        
        generateAIPtiles(byName)
        
        sorterColorChange("name")
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
        
        sorterColorChange("type")
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
        alert(`Error ${err}: ${errorMessage}`)
    }   

    try{
        sortHomeByName(src)
    }
    catch(err){
        alert(`Error ${err}: ${errorMessage}`)
    }

    document.getElementById("sortBoxHomeTyp").style.background = "none";
    document.getElementById("sortBoxHomeTyp").style.color = "black";
    document.getElementById("sortBoxHomeAZ").style.background = "blue";
    document.getElementById("sortBoxHomeAZ").style.color = "white";

    document.getElementById("sortBoxHomeAZ").addEventListener("click", function(){
        sortHomeByName()
        
        let sortedBy = sortHomeByName();
        for(let i=0;i<Object.keys(sortedBy).length;i++){
            localStorage.setItem(`sortedBy${i}`, JSON.stringify({
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
            localStorage.setItem(`sortedBy${i}`, JSON.stringify({
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
    
    document.getElementById("legalCopy").innerHTML = `&copy; 2020-${thisYear} Marcel Weber`
    document.getElementById("footerText").innerHTML = `&copy; 2020-${thisYear} AIM Operations Zurich | Contact helpdesk@skybriefing.com for general enquiries or marcel.weber@skyguide.ch for technical issues.` 
    
    console.timeEnd("Initial Load")

});
