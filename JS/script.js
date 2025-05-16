const errorMessage = "\nPlease advise weberml\nFor access to backup links, refer to:\nU:\\ZOL\\PR-Team\\AIS-ALLG\\TOOLBOX_AIM_Contingency_Site_files\\index.html"

const arrPhone = {
	at: "AT: +43 5 1703 3211",
	fr: "FR: +33 156 301 301",
	de: "DE: +49 6103 707 5500",
 	it1: "IT: +39 02 710 20019 (Milano)",
	it2: "IT: +39 06 798 11011 (Rom)",
}

// I N I T I A L   L O A D


window.addEventListener('DOMContentLoaded', () => {
    console.time("Initial Load")
    
    const toolboxSections = ["contentBox", "aipBox", "atsBox", "frenchBox", "sitaBox", "doctoolBox", "areaBox", "abbrevBox"]
    const toolboxTileLinkExclusions = ["frenchStuff", "sitaConversion", "atfmx", "reports", "docfiles", "RDareas", "arrmsg", "dangerdanger", "templateList"]
    const spacesNotAllowedIn = ["screenDocument", "frenchContactMail", "searchAll", "searchFrench", "searchGerman"]
    
    let mode = JSON.parse(localStorage.getItem("toolbox_option_Darkmode")) || "light"
    document.querySelector('html').style.setProperty("color-scheme", mode);

    let optionsVisible = false
    let sortedBy = "name"


    
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
            case "areaBox":{
                document.getElementById("areaBox").style.display = "flex"
				document.getElementById("input").focus();
            }
            break;
            case "abbrevBox":{
                document.getElementById("abbrevBox").style.display = "flex"
				document.getElementById("input").focus();
            }
            break;
        }
    }
    
    function toolboxSectionStateSetter(pageId, title){
        let state = { 'page_id': pageId}
        history.pushState(state, "", title)
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
            JSON.parse(localStorage.getItem("toolbox_option_HomeTileSort")) == "name" ? sortHomeByName(src) : JSON.parse(localStorage.getItem("toolbox_option_HomeTileSort")) == "type" ? sortHomeByType(src) : sortHomeByName(src)
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

    document.getElementById("sitatool").addEventListener("click", function(){
        toolboxSectionToggler("sitaBox")
    toolboxSectionStateSetter("sitaBox", "SITA Address Converter")
    })
    document.getElementById("frenchtool").addEventListener("click", function(){
            toolboxSectionToggler("frenchBox")
            loadFrenchCode()
            toolboxSectionStateSetter("frenchBox", "French Tool")
    })
    document.getElementById("rdtool").addEventListener("click", function(){
    toolboxSectionToggler("areaBox")
        loadRDareas()
        toolboxSectionStateSetter("areaBox", "R/D Areas")
    })
    document.getElementById("abbrevtool").addEventListener("click", function(){
        toolboxSectionToggler("abbrevBox")
        loadAbbrevs()
            toolboxSectionStateSetter("abbrevBox", "ICAO 8400 Abbreviations")
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
                            toolboxSectionStateSetter("sitaBox", "SITA Address Converter")
                        }
                        
                        if(homeTileDiv.id == "RDareas"){
                            toolboxSectionToggler("areaBox")
                            loadRDareas()
                            toolboxSectionStateSetter("areaBox", "R/D Areas")
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
                        if(homeTileDiv.id == "arrmsg"){
                            navModal = !navModal
                            modal(`${arrPhone.at}\n\r${arrPhone.de}\n\r${arrPhone.fr}\n\r${arrPhone.it1}\n\r${arrPhone.it2}`, "", "")
                        }
						if(homeTileDiv.id == "dangerdanger"){
                            navModal = !navModal
                            console.log(homeTileDiv)
                            modal("Please navigate to follwing file location. Do <strong>NOT</strong> use the browser, use the File Explorer!", "U:\\ZOL\\PR-Team\\AIS-ALLG\\PUB\\Gefahr in Verzug", "./Assets/FileExplorer.png")
                        }
						if(homeTileDiv.id == "templateList"){
							navModal = !navModal
							modal("Please navigate to follwing file location. Do <strong>NOT</strong> use the browser, use the File Explorer!", "U:\\ZOL\\PR-Team\\AIS-ALLG\\PUB\\SU-SA Stuff", "./Assets/FileExplorer.png")
						}
					}
                })
            })
            
           quicklinkGeneratorSpace.appendChild(homeTileDiv);
        }
    }
    
    let navModal = false
            function modal(text, path, image){
                if(navModal){
                    const veil = document.createElement("div")
                    veil.className = "veil"
                    document.getElementById("contentBox").appendChild(veil)
                    
                    const modalContainer = document.createElement("div")
                    modalContainer.className= "modalContainer"
                    veil.appendChild(modalContainer)

                    const modal = document.createElement("div")
                    modal.className = "modal"
                    modalContainer.appendChild(modal)
                    if(text != undefined && text != ""){
                        const msg = document.createElement("p")
                        msg.innerHTML = text
                        modal.appendChild(msg)
                    }
                    if(path != undefined && path != ""){
                        
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
                    }
                    if(image != undefined & image != ""){
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
                    ok.className ="actionButton"
                    okWrapper.appendChild(ok)
                    ok.innerText ="Got it!"
                    ok.addEventListener("click", function(){
                        navModal = !navModal
                        document.getElementById("contentBox").removeChild(veil)
                    })
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
        
        return byType;
    }

    function displayGrid(src) {  
        console.log(src)
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
           if (sortedBy === "name") {
                src = sortHomeByName()
            }
            if (sortedBy === "type"){
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

    try{
        JSON.parse(localStorage.getItem("toolbox_option_HomeTileSort")) == "name" ? sortHomeByName(src) : JSON.parse(localStorage.getItem("toolbox_option_HomeTileSort")) == "type" ? sortHomeByType(src) : sortHomeByName(src)
    }
    catch(err){
        alert(`Error ${err}: ${errorMessage}`)
    }
    
    
    const newItem = "templateList"
    
    const hasReadNewItem = JSON.parse(localStorage.getItem("toolbox_hasReadNewItem"))
    if(hasReadNewItem == null){
        const notification = document.createElement("div")
        notification.id="notification"
        document.getElementById(newItem).appendChild(notification)  
    }
if(hasReadNewItem != newItem){
        const notification = document.createElement("div")
        notification.id="notification"
        document.getElementById(newItem).appendChild(notification)  
    }
    
    document.getElementById(newItem).addEventListener("click", function(){
        localStorage.setItem("toolbox_hasReadNewItem", JSON.stringify(newItem))
        document.getElementById(newItem).removeChild(notification)
    })

    let hoverTools = false
    let hoverToolsMenu = false

    document.getElementById("tools").addEventListener("mouseenter", function(){
        hoverTools = true
        const toolMenuPositionX = document.getElementById("tools").getBoundingClientRect().x
        const toolMenuPositionY = document.getElementById("tools").getBoundingClientRect().y
        document.getElementById("toolsMenu").style.display = "flex"
        document.getElementById("toolsMenu").style.left = `${toolMenuPositionX}px`
        document.getElementById("toolsMenu").style.top = `${toolMenuPositionY}px`
    })

    document.getElementById("tools").addEventListener("mouseleave", function(){
        hoverTools = false
        setTimeout(function(){
            if(!hoverTools && !hoverToolsMenu){
                
                document.getElementById("toolsMenu").style.display = "none"
            }
        }, 200)  
    })
    document.getElementById("toolsMenu").addEventListener("mouseenter", function(){
        hoverTools = false
        hoverToolsMenu = true
    })
    document.getElementById("toolsMenu").addEventListener("mouseleave", function(){
        hoverToolsMenu = false
        setTimeout(function(){
            if(!hoverTools && !hoverToolsMenu){
                
                document.getElementById("toolsMenu").style.display = "none"
            }
        }, 200)  
    })

    function toggleDarkmode(toggleMode){
        document.querySelector('html').style.setProperty("color-scheme", toggleMode);
            mode = mode === "light" ? "dark" : "light"
    }

    function sortHomeTiles(toggleMode){
        toggleMode == "type" ? sortHomeByType() : toggleMode == "name" ? sortHomeByName() : sortHomeByName()
    }

    function generateOptionsEntry(tag, title, on, off, func){
        const entry = document.createElement("div")
        entry.setAttribute("class", "optionEntry")
        entry.setAttribute("id", `optionsEntry_${tag}`)
        
        const option = document.createElement("span")
        entry.appendChild(option)
        option.innerText = title

        const toggle = document.createElement("input")
        toggle.setAttribute("id", `range_${tag}`)
        toggle.type = "range"
        toggle.step = 1
        toggle.min = 0
        toggle.max = 1
        toggle.value = JSON.parse(localStorage.getItem(`toolbox_option_${tag}`)) == on ? 1 : JSON.parse(localStorage.getItem(`toolbox_option_${tag}`)) == off ? 0 : 0
        entry.appendChild(toggle)

        const toggleOverlay = document.createElement("div")
        toggleOverlay.setAttribute("class", "toggleOverlay")
        toggleOverlay.addEventListener("click", function(){
             toggle.value = toggle.value == 0 ? 1 : 0
             const toggledValue = toggle.value == 1 ? on : off
            func(toggledValue)
            localStorage.setItem(`toolbox_option_${tag}`, JSON.stringify(toggledValue))
        })
        entry.appendChild(toggleOverlay)

        return entry
    }

    const optionList = [
        {
            tag: "Darkmode",
            title: "Toggle Darkmode",
            on: "dark",
            off: "light",
            func: toggleDarkmode
        },
        {
            tag: "HomeTileSort",
            title: "Sort Home Tiles by Category",
            on: "type",
            off: "name",
            func: sortHomeTiles
        }
    ]
    
    /*
        document.getElementById("sortBoxHomeAZ").addEventListener("click", function(){
        sortHomeByName()
        localStorage.setItem("toolbox_sortby", JSON.stringify("name"))
        
    })
       
        
    document.getElementById("sortBoxHomeTyp").addEventListener("click", function(){
        sortHomeByType()
        localStorage.setItem("toolbox_sortby", JSON.stringify("type"))
    })   
        */

    document.getElementById("optionsToggle").addEventListener("click", function(){
        const menu = document.getElementById("options")
        const container = document.getElementById("optionsContainer")
        menu.style.right = optionsVisible ? "-30rem" : 0
        optionsVisible = !optionsVisible

        for(const entry of optionList){
            if(!document.getElementById(`optionsEntry_${entry.tag}`)){
                container.appendChild(generateOptionsEntry(entry.tag, entry.title, entry.on, entry.off, entry.func))
            } 
        }
    })
        
    
// L E G A L   S T A T E M E N T


    document.getElementById("legal").addEventListener("click", function(){
        document.getElementById("legalVeil").style.display ="flex";
    })

    document.getElementById("close").addEventListener("click", function(){
        document.getElementById("legalVeil").style.display ="none";
    })
    
    const thisDate = new Date()
    const thisYear = thisDate.getFullYear()
    
    document.getElementById("legalCopy").innerHTML = `&copy; 2020-${thisYear} Marcel Weber`
    document.getElementById("footerText").innerHTML = `&copy; 2020-${thisYear} AIM Operations Zurich | Contact helpdesk@skybriefing.com for general enquiries or marcel.weber@skyguide.ch for technical issues.` 
    
    console.timeEnd("Initial Load")

});
