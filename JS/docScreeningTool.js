function loadDocScreeningToolCode(){
    
    const customers = ["Document", "FKDF", "FKAT", "NTM", "DBU", "IATA"]
    
    customers.forEach(customer =>{
        document.getElementById(`screen${customer}`).value = ""
    })

// L O C I   D A T A B A S E

    const FKResultsTable 	= document.getElementById("FKresultsTable");
    const queryFKfield		= document.getElementById("queryFK");
    const locisFKsorted = locisFK.sort()

    // This creates the rows of the table dynamically
    function createTableContentFK(loci) {
        const row = document.createElement("tr");
        FKResultsTable.appendChild(row)
        
        const cell = document.createElement("td");
        row.appendChild(cell);
        
        const content = document.createTextNode(loci);
        cell.appendChild(content);
    }

    // This creates the table itself
    function queryFKLocis() {
        const head = document.createElement("th"); 
        const content = document.createTextNode("Flightkeys Airports");
        head.appendChild(content);
        FKResultsTable.appendChild(head);
        head.setAttribute("id", "thFK");

        if (queryFKfield.value == 0){
            locisFKsorted.forEach(loci =>{
                createTableContentFK(loci); // calls each JSON object and creates a row for it
            })
        } 
    }

    queryFKfield.addEventListener("keyup", function(){
        const trsFK = document.getElementById("FKresultsTable").rows;
        
        while (trsFK.length>0){
            trsFK[0].parentNode.removeChild(trsFK[0]);
        } 
        locisFK.forEach(loci=>{
            if(loci.startsWith(queryFKfield.value.toUpperCase())){
                createTableContentFK(loci)
            }
        })
    })

    
// D O C   S C R E E N I N G  


    //this is called on blur of screening input or on calculate pages button press
    function calculatePagesEvent() {
        const FKDFvalue 	= document.getElementById("screenFKDF").value;
        const FKATvalue	 	= document.getElementById("screenFKAT").value;
        const NTMvalue 		= document.getElementById("screenNTM").value;
        const DBUvalue 		= document.getElementById("screenDBU").value;
        const IATAvalue 	= document.getElementById("screenIATA").value;
        const rangeRegex 	= /([$&+:;=?@#|'<>.^*()%!_öäüèéà])|([a-zA-Z])|(,{2,})|(-{2,})|([0-9]{1,}-+([0-9]+-))/; // Magic, sorcery, BURN THE WITCH AT THE STAKE it catches double characters, invalid characters, invalid chains (7-8-9), put it into regexr and see
        const regexWrng 	= "Invalid sequence (multiple \",\" or \"-\" or other characters found) \n or invalid charcters (anything besides \",\" \"-\" and numbers)";
        const FKDFdict 		= {value: FKDFvalue, td:"FKDFtd", alert:"screenFKDFalert"};
        const FKATdict 		= {value: FKATvalue, td:"FKATtd", alert:"screenFKATalert"};
        const NTMdict 		= {value: NTMvalue, td:"NTMtd", alert:"screenNTMalert"};
        const DBUdict 		= {value: DBUvalue, td:"DBUtd", alert:"screenDBUalert"};
        const IATAdict 		= {value: IATAvalue, td:"IATAtd", alert:"screenIATAalert"};
        const valueDict 	= [FKDFdict, FKATdict, NTMdict, DBUdict, IATAdict]; 

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
        localStorage.setItem(`doctool_${customer}`, JSON.stringify([document.getElementById(`screen${customer}`).value]))
    }

    // pageCalculation function call events, either on buton or on blur
    // also deals with the local storage
    
    document.getElementById("calculatePages").addEventListener("click", function() {
        customers.forEach(customer =>{
            localStorager(customer);
            calculatePagesEvent(customer)
        })
    })
    
    customers.forEach(customer =>{
        document.getElementById(`screen${customer}`).addEventListener("blur", function() {
            localStorager(customer);
        })
    })

    // the actual calculation magic
    // splits at , initially, then checks if a - is present > if yes, push range, if no, push int and assign 1 as value
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
        document.getElementById("testHTMLContainer").style.display = "flex"
    }

    // This  handles the splitting and the popup that shows the page sequences.
    // its set up so that a int-int sequence can have a trailing int, but separate int are
    // placed in their own row. this is necessary to avoid double <br>. It doesnt affect
    // the printing order though, in fact it saves time with the trailing int. Odd int-int sequences are also treated like a single int

    function printEvent(customer){ // receives the customer variable
        const customerFKDF 		= {name: "FKDF", 	value: document.getElementById("screenFKDF").value,  print: "Flightkeys Daily Folder"}
        const customerFKAT 		= {name: "FKAT", 	value: document.getElementById("screenFKAT").value,  print: "Flightkeys AIP Tool"}
        const customerNTM 		= {name: "NTM", 	value: document.getElementById("screenNTM").value,   print: "Team NOTAM"}
        const customerDBU 		= {name: "DBU", 	value: document.getElementById("screenDBU").value,   print: "DBU"}
        const customerIATA 		= {name: "IATA", 	value: document.getElementById("screenIATA").value,  print: "IATA"}
        const customerValues 	= [customerFKDF, customerFKAT, customerNTM, customerDBU, customerIATA]; 
        
        const html = document.getElementById("testHTML")
        
        let alertArray
        
        let eventBubbler = 0 // This is a hacky fix for the button event handlers that seem to call the page display function multiple times.
        
        //This itreates through the customer obj array
        for(let i=0;i<customerValues.length;i++){
            if (customerValues[i].name == customer){ // compares the passed customer variable to each customer obj in the array
                let customerValue = customerValues[i].value; // gets the value from the matching obj
                alertArray = customerValue.split(","); // splits by comma
                document.getElementById("testHTML").innerHTML = ""; // clears any content in the popup
                document.getElementById("testHTMLTitle").innerHTML = ""; // clears the title of the popup
                document.getElementById("testHTMLTitle").innerHTML += "Pages for " + customerValues[i].print + ":" // sets the title for the popup
            }
        }               
                
        const inpt = document.getElementById("input")

        /*
        This constant denotes the valuie limit in the print dialog window.
        If the line length gets over this limit IF another element is added, the element to be added 
        will be shifted to a new row, so every row stays under or exactly at this limit.
        If the limit is set to be less than the length of one element, it seems to default to adding that
        element anyways. This is fine, as the printWrap limit is mostly above 50 characters.
        Sadly, these limits are very different depending on the reader print dialog and seem to change with software releases, 
        so a minimum baseline wrap should be chosen every so often.
        */

        const printWrap = 50 

        // The spanArray is a collection of page ranges that will get added to the different rows 

        let spanArray = []

        for(let i=0;i<alertArray.length;i++){
            if(alertArray[i].includes("-")){ // This now checks if the elements contain a "-" and are thus ranges, or are single ints
                let range = alertArray[i].split("-")
                if(((range[1]-range[0]) + 1)%2 == 0){ // Checks if the page range is even (thus +1, because ex 4-1 = 3, but its 4 pages)
                    let span = document.createElement("span") // Creates a span element
                    span.className = "even" // Classifies this span element as even
                    span.innerHTML = alertArray[i] // Assigns the text of the page range item to it
                    spanArray.push(span) // Pushes it to the spanArray for further processing
                } else if(((range[1]-range[0])+1)%2 != 0){ // Same with odd page ranges
                    let span = document.createElement("span")
                    span.className = "odd"
                    span.innerHTML = alertArray[i]
                    spanArray.push(span)
                }
            } else { // And same with singe integers
                let span = document.createElement("span")
                span.className = "single"
                span.innerHTML = alertArray[i]
                spanArray.push(span)
            }
        }

        // Now the spanArray is filled with the page range elements, and they are also assigned a class.

        /*
        This is importand for handling the trailing single pages. If true, a single page will be added to the current row of even page ranges, 
        sets singleCHeck to false, which causes the NEXT single page, if one immediately follows another, to be shifted to a new row
        */

        let singleCheck = true 

        for(let i=0;i<spanArray.length;i++){
            if(i==0){ // This is simply to create a new row from the get go
                let pageRow = document.createElement("div")
                pageRow.id = "pageRow0" // A div row with id pageRow0 is created...
                pageRow.appendChild(spanArray[i]) // ...filled with the current page range element...
                pageRow.innerHTML += ", " //...a comma added after that element...
                html.appendChild(pageRow) //...and the row is the added to the page display container
            } else if(i > 0){ // Now for every other row except the first
                if(spanArray[i].className == spanArray[i-1].className && spanArray[i-1].className != "odd" && singleCheck){
                /*
                So, if the current span element classname equals that of the one before (so this can only be done from iteration i=1)
                AND its not am odd page range (these will ALWAYS occupy their own row)
                AND singleCheck is set to true (so a single element following another ssingle element will occupy the same row)
                */
                    let pageRow = html.lastChild.id // initiate a pageRow variable with the id of the LAST ADDED page row
                    if((document.getElementById(pageRow).innerText.length + spanArray[i].innerText.length) < printWrap){ // This is the length check explained above
                        document.getElementById(pageRow).appendChild(spanArray[i]) // Add that span element to the last row
                        document.getElementById(pageRow).innerHTML += ", " // Add a comma after it
                    } else { // Simply creates a new row and continue to fill that
                        let pageRow = document.createElement("div")
                        pageRow.id = "pageRow" + i
                        pageRow.appendChild(spanArray[i])
                        pageRow.innerHTML += ", "
                        html.appendChild(pageRow)
                    }
                } else if((spanArray[i].className == "single" || spanArray[i].className == "odd") && spanArray[i-1].className == "even" && singleCheck){
                /*
                Okay so if the current element is a single OR an odd, and the last one is an even, and singleCheck is true,
                it adds the single/odd element to the current row.
                It also sets singleCheck to false, so if the immediately following element is also a single/odd, it will occupy its own row
                */
                    let pageRow = html.lastChild.id
                    if((document.getElementById(pageRow).innerText.length + spanArray[i].innerText.length) < printWrap){
                        document.getElementById(pageRow).appendChild(spanArray[i])
                        document.getElementById(pageRow).innerHTML += ", "
                        singleCheck = false
                    } else {
                        let pageRow = document.createElement("div")
                        pageRow.id = "pageRow" + i
                        pageRow.appendChild(spanArray[i])
                        pageRow.innerHTML += ", "
                        html.appendChild(pageRow)
                        singleCheck = false
                    }
                } else { 
                /*
                Else, it just creates a new row, appends the element to it and sets singleCheck to true, so
                immediately following singles are sent to the same row.
                This also takes care of odd elements.
                */
                    let pageRow = document.createElement("div")
                    pageRow.id = "pageRow" + i
                    pageRow.appendChild(spanArray[i])
                    pageRow.innerHTML += ", "
                    html.appendChild(pageRow)
                    singleCheck = true
                }
            }
        }

        /*
        This is sort of a cleaner function; it goes through the text of each row and removes each trailing comma.
        It needs to be innerHTML, as using innerText removes all class assignments and, worse, span tags, which are
        INCONCEIVABLY important for the copy marking event handlers
        */

        for(let i=0;i<html.childElementCount;i++){
                html.children[i].innerHTML = html.children[i].innerHTML.slice(0,html.children[i].innerHTML.length-2)
        }

        // this fires the popup with the page sequences
        displayPagePopup()

        /*
        This marks which page ranges were selected to copy. The flow is as follows:
        1. Get the selection as a string
        2. Make an array out of it, split by comma
        3. For each element in the array... (loop i)
        4. ...look at each row in the page display container... (loop j)
        5. ...and for each row, look at each element in that row (loop k)
        6. If that element is wrapped ina SPAN (therefore excluding commas and spaces)...
        7. ...and if that elements text content matches that of the selectionArray element...
        8. ...toggle the selectah class on that element in that row
        9. Rinse and repeat for each element in the selectedArray
        */

        function markCopiedPages(){
            let selected = window.getSelection().toString()
            console.log(selected)
            let selectedArray = selected.split(", ")
            console.log(selectedArray)
            for(let i=0;i<selectedArray.length;i++){
                for(let j=0;j<html.childElementCount;j++){
                    for(let k=0;k<html.children[j].childElementCount;k++){
                        if(html.children[j].children[k].tagName == "SPAN"){
                            if(selectedArray[i] == html.children[j].children[k].textContent){
                                html.children[j].children[k].classList.toggle("selectah") // Why "selectah"? Watch Ali G in da house...
                            }
                        }
                    }
                }
            }
        }

        /*
        And heres the event handlers to invoke above function, either via right click or ctrl+c
        I stole the ctrl+c handler from https://javascriptf1.com/snippet/detect-ctrl+c-and-ctrl+v-using-javascript because NOTHING ELSE WANTED TO WORK!
        Well, my solution DID work, but somehow needed two ctrl+c events to toggle the class, whyever. Patience fleeting, stealing commencing.
        */

        document.addEventListener('keydown', evt => {
            if (evt.key === 'c' && evt.ctrlKey && eventBubbler == 0) {
                markCopiedPages()
                eventBubbler = 1
            } 
        });

        html.addEventListener("contextmenu", function(e){
            if(eventBubbler == 0){
                markCopiedPages()
            }
            eventBubbler = 1
        })
                
    }


    // these are the copy button event handlers, they simply call the printEvent function with the customer variable
    document.getElementById("buttonCopyFKDF").addEventListener("click", function(){
        customer = "FKDF";
        printEvent(customer);
    })
    document.getElementById("buttonCopyFKAT").addEventListener("click", function(){
        customer = "FKAT";
        printEvent(customer);
    })
    document.getElementById("buttonCopyNTM").addEventListener("click", function(){
        customer = "NTM";
        printEvent(customer);
    })
    document.getElementById("buttonCopyDBU").addEventListener("click", function(){
        customer = "DBU";
        printEvent(customer);
    })
    document.getElementById("buttonCopyIATA").addEventListener("click", function(){
        customer = "IATA";
        printEvent(customer);
    })

    
// D O C   T O O L   O P T I O N S

    
    //This closes the page print popup
    document.getElementById("testHTMLClose").addEventListener("click", function() {
        document.getElementById("testHTMLContainer").style.display = "none";
    })


// D O C  T O O L  I N I T I A L   L O A D   


    document.getElementById("queryFK").focus();
    if(!document.getElementById("thFK")){
        queryFKLocis()
    }

    
// D O C   T O O L   O P T I O N S   M E N U

    
    const optionsButton = document.getElementById("optionsButton");
    const optionsMenu = document.getElementById("optionsMenu");
    const optionsTogglers = [
        {
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

    const saveDocLink = document.createElement("a");
    const saveDocLinkText = "Save Screening Session to file";
    let txtsaveDocLinkText = document.createTextNode(saveDocLinkText);
    saveDocLink.appendChild(txtsaveDocLinkText);
    document.getElementById("optionsLoadSaveSave").appendChild(saveDocLink)
    saveDocLink.href = ""
    
    document.getElementById("optionsLoadSaveSave").addEventListener("click", function(){
        let docData = {
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
        saveDocLink.href = "data:application/octet-stream;charset=utf-8," + docDataString;
        saveDocLink.target = "_blank"
        saveDocLink.download = fileDownloadName

    })

    document.getElementById('loadDocScreening').addEventListener('change', function() {
        const cust = ["screenDocument", "screenFKDF", "screenFKAT", "screenNTM", "screenDBU", "screenIATA"] 
        let fr=new FileReader();
        fr.onload=function() {
            let text1 = fr.result.split("\n");
            for(let i=0;i<text1.length;i++){
                let text = text1[i]
                document.getElementById(cust[i]).value = text;
            }
        }
        fr.readAsText(this.files[0]);
    })

    document.getElementById("optionsRecoverDataToggler").addEventListener("click", function(){
        customers.forEach(customer =>{
            document.getElementById(`screen${customer}`).value = ""
            if(localStorage.getItem(`doctool_${customer}`)){
                console.log(localStorage.getItem(`doctool_${customer}`))
                document.getElementById(`screen${customer}`).value = JSON.parse(localStorage.getItem(`doctool_${customer}`)) == "" ? null : JSON.parse(localStorage.getItem(`doctool_${customer}`))
            } 
        })
    })

    const clearButtons = [
        {target: "FKDF", clear: "clearFKDF", operation: "screenFKDF", collateral: "FKDFtd"},
        {target: "FKAT", clear: "clearFKAT", operation: "screenFKAT", collateral: "FKATtd"},
        {target: "NTM", clear: "clearNTM", operation: "screenNTM", collateral: "NTMtd"},
        {target: "DBU", clear: "clearDBU", operation: "screenDBU", collateral: "DBUtd"},
        {target: "IATA", clear: "clearIATA", operation: "screenIATA", collateral: "IATAtd"}
    ]
    
    for (let i=0;i<Object.keys(clearButtons).length;i++){
        document.getElementById(clearButtons[i].clear).addEventListener("click", function(){
        localStorager(clearButtons[i].target)
        document.getElementById(clearButtons[i].operation).value = ""
        document.getElementById(clearButtons[i].collateral).innerHTML = ""
            
        })
    }

}
