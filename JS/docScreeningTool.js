function loadDocScreeningToolCode(){


// L O C I   D A T A B A S E


    const FKResultsTable 	= document.getElementById("FKresultsTable");
    const FKResultsTableBody = document.createElement("tbody")
    FKResultsTable.appendChild(FKResultsTableBody)
    const queryFKfield		= document.getElementById("queryFK");
    const locisFKsorted = locisFK.sort()

    document.getElementById("FKadCount").innerText = ` ${locisFKsorted.length} LOCIs in Database`

    // This creates the rows of the table dynamically
    function createTableContentFK(i) {
        const TRFK 				= document.createElement("tr");
        const TDFK	 			= document.createElement("td");
        const FKResultsContent 	= document.createTextNode(locisFKsorted[i]);
        TRFK.appendChild(TDFK);
        TDFK.appendChild(FKResultsContent);
        FKResultsTableBody.appendChild(TRFK);	
    }

    // This creates the table itself
    function queryFKLocis() {
        if (queryFKfield.value == 0){
            for (let i=0; i<locisFKsorted.length; i++){
                createTableContentFK(i); // calls each JSON object and creates a row for it
            }
        } 
    }

    queryFKfield.addEventListener("keyup", function(){
        const trsFK = document.getElementById("FKresultsTable").rows;
        
        while (trsFK.length>0){
            trsFK[0].parentNode.removeChild(trsFK[0]);
        } 
        for(let i=0;i<locisFK.length;i++){
            if (locisFK[i].startsWith(queryFKfield.value.toUpperCase())){
                createTableContentFK(i)
            }
        }
    })

    
// D O C   S C R E E N I N G  

function init(){
    document.getElementById("screenDocument").innerHTML = JSON.parse(localStorage.getItem("Documentvalues"));   
        document.getElementById("screenFKDF").innerHTML = JSON.parse(localStorage.getItem("FKDFvalues"));
        document.getElementById("screenFKAT").innerHTML = JSON.parse(localStorage.getItem("FKATvalues"));
        document.getElementById("screenNTM").innerHTML 	= JSON.parse(localStorage.getItem("NTMvalues"));
        document.getElementById("screenDBU").innerHTML 	= JSON.parse(localStorage.getItem("DBUvalues"));
        document.getElementById("screenIATA").innerHTML = JSON.parse(localStorage.getItem("IATAvalues"));
}

init()


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
        console.log(customer)
        const loStoDoc  = {valuex: "Documentvalues", 	screen: "screenDocument", 	name: "DOC"};
        const LoStoFKDF = {valuex: "FKDFvalues", 	screen: "screenFKDF", 	name: "FKDF"};
        const LoStoFKAT = {valuex: "FKATvalues", 	screen: "screenFKAT",	name: "FKAT"};
        const LoStoNTM 	= {valuex: "NTMvalues", 	screen: "screenNTM",	name: "NTM"};
        const LoStoDBU 	= {valuex: "DBUvalues", 	screen: "screenDBU",	name: "DBU"};
        const LoStoIATA = {valuex: "IATAvalues", 	screen: "screenIATA", 	name: "IATA"};
        const LoStoAll	= [LoStoFKDF, LoStoFKAT, LoStoNTM, LoStoDBU, LoStoIATA, loStoDoc]
        for(let i=0;i<LoStoAll.length;i++){
            if(customer == LoStoAll[i].name && document.getElementById(LoStoAll[i].screen).value != ""){
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
        localStorage.setItem(LoStoAll[i].valuex, JSON.stringify(document.getElementById(LoStoAll[i].screen).value));
    }

    // pageCalculation function call events, either on buton or on blur
    // also deals with the local storage
    
    let customer
    
    document.getElementById("calculatePages").addEventListener("click", function() {
        customer = "All";
        
        calculatePagesEvent(customer); // passing the customer variable shouldnt do anything but it works, so... i'll leave it
        localStorager(customer);
    })
    document.getElementById("screenDocument").addEventListener("blur", function() {
        customer = "DOC";
        localStorager(customer);
    })
    document.getElementById("screenFKDF").addEventListener("blur", function() {
        if(document.getElementById("screenFKDF").value != 0){
            customer = "FKDF";
            calculatePagesEvent(customer);
            localStorager(customer);
        }
    })
    document.getElementById("screenFKAT").addEventListener("blur", function() {
        customer = "FKAT";
        calculatePagesEvent(customer);
        localStorager(customer);
    })
    document.getElementById("screenNTM").addEventListener("blur", function() {
        customer = "NTM";
        calculatePagesEvent(customer);
        localStorager(customer);
    })
    document.getElementById("screenDBU").addEventListener("blur", function() {
        customer = "DBU";
        calculatePagesEvent(customer);
        localStorager(customer);
    })
    document.getElementById("screenIATA").addEventListener("blur", function() {
        customer = "IATA";
        calculatePagesEvent(customer);
        localStorager(customer);
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
        document.getElementById("docVeil").style.display = "flex"
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
        
        const docModalContent = document.getElementById("docModalContent")
        
        let alertArray
        
        let eventBubbler = 0 // This is a hacky fix for the button event handlers that seem to call the page display function multiple times.
        
        //This itreates through the customer obj array
        for(let i=0;i<customerValues.length;i++){
            if (customerValues[i].name == customer){ // compares the passed customer variable to each customer obj in the array
                let customerValue = customerValues[i].value; // gets the value from the matching obj
                alertArray = customerValue.split(","); // splits by comma
                document.getElementById("docModalContent").innerHTML = ""; // clears any content in the popup
                document.getElementById("docModalTitle").innerHTML = ""; // clears the title of the popup
                document.getElementById("docModalTitle").innerHTML += "Pages for " + customerValues[i].print + ":" // sets the title for the popup
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

        let inputArray = []

        for(let i=0;i<alertArray.length;i++){
            if(alertArray[i].includes("-")){ // This now checks if the elements contain a "-" and are thus ranges, or are single ints
                let range = alertArray[i].split("-")
                if(((range[1]-range[0]) + 1)%2 == 0){ // Checks if the page range is even (thus +1, because ex 4-1 = 3, but its 4 pages)
                    let inpt = document.createElement("input") // Creates a span element
                    inpt.className = "even" // Classifies this span element as even
                    inpt.setAttribute("readonly", true)
                    inpt.value = alertArray[i] // Assigns the text of the page range item to it
                    inputArray.push(inpt) // Pushes it to the spanArray for further processing
                } else if(((range[1]-range[0])+1)%2 != 0){ // Same with odd page ranges
                    let inpt = document.createElement("input")
                    inpt.className = "odd"
                    inpt.setAttribute("readonly", true)
                    inpt.value = alertArray[i]
                    inputArray.push(inpt)
                }
            } else { // And same with singe integers
                let inpt = document.createElement("input")
                inpt.className = "single"
                inpt.setAttribute("readonly", true)
                inpt.value = alertArray[i]
                inputArray.push(inpt)
            }
        }

        console.log(inputArray.map(span => span.value))

        // Now the spanArray is filled with the page range elements, and they are also assigned a class.

        /*
        This is importand for handling the trailing single pages. If true, a single page will be added to the current row of even page ranges, 
        sets singleCHeck to false, which causes the NEXT single page, if one immediately follows another, to be shifted to a new row
        */

        let singleCheck = true 

        for(let i=0;i<inputArray.length;i++){
            if(i==0){ // This is simply to create a new row from the get go
                let pageRow = document.createElement("div")
                pageRow.id = "pageRow0" // A div row with id pageRow0 is created...
                pageRow.appendChild(inputArray[i]) // ...filled with the current page range element...
                inputArray[i].value += ", " //...a comma added after that element...
                docModalContent.appendChild(pageRow) //...and the row is the added to the page display container
            } else if(i > 0){ // Now for every other row except the first
                if(inputArray[i].className == inputArray[i-1].className && inputArray[i-1].className != "odd" && singleCheck){
                /*
                So, if the current span element classname equals that of the one before (so this can only be done from iteration i=1)
                AND its not am odd page range (these will ALWAYS occupy their own row)
                AND singleCheck is set to true (so a single element following another ssingle element will occupy the same row)
                */
                    let pageRow = docModalContent.lastChild.id // initiate a pageRow variable with the id of the LAST ADDED page row
                    if((document.getElementById(pageRow).children[0].value.length + inputArray[i].value.length) < printWrap){ // This is the length check explained above
                        document.getElementById(pageRow).children[0].value += inputArray[i].value // Add that span element to the last row
                        document.getElementById(pageRow).children[0].value += ", " // Add a comma after it
                    } else { // Simply creates a new row and continue to fill that
                        let pageRow = document.createElement("div")
                        pageRow.id = "pageRow" + i
                        pageRow.appendChild(inputArray[i])
                        pageRow.children[0].value += ", "
                        docModalContent.appendChild(pageRow)
                    }
                } else if((inputArray[i].className == "single" || inputArray[i].className == "odd") && inputArray[i-1].className == "even" && singleCheck){
                /*
                Okay so if the current element is a single OR an odd, and the last one is an even, and singleCheck is true,
                it adds the single/odd element to the current row.
                It also sets singleCheck to false, so if the immediately following element is also a single/odd, it will occupy its own row
                */
                    let pageRow = docModalContent.lastChild.id
                    if((document.getElementById(pageRow).children[0].value.length + inputArray[i].value.length) < printWrap){
                        document.getElementById(pageRow).children[0].value += inputArray[i].value
                        document.getElementById(pageRow).children[0].value += ", "
                        singleCheck = false
                    } else {
                        let pageRow = document.createElement("div")
                        pageRow.id = "pageRow" + i
                        pageRow.appendChild(spanArray[i])
                        pageRow.value += ", "
                        docModalContent.appendChild(pageRow)
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
                    pageRow.appendChild(inputArray[i])
                    pageRow.children[0].value += ", "
                    docModalContent.appendChild(pageRow)
                    singleCheck = true
                }
            }
        }

        /*
        This is sort of a cleaner function; it goes through the text of each row and removes each trailing comma.
        It needs to be innerHTML, as using innerText removes all class assignments and, worse, span tags, which are
        INCONCEIVABLY important for the copy marking event handlers
        */

        for(let i=0;i<docModalContent.childElementCount;i++){
            docModalContent.children[i].children[0].value = docModalContent.children[i].children[0].value.slice(0,docModalContent.children[i].children[0].value.length-2)
            docModalContent.children[i].children[0].addEventListener("click", function(){
                docModalContent.children[i].children[0].select()
                })
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
                for(let j=0;j<docModalContent.childElementCount;j++){
                    for(let k=0;k<docModalContent.children[j].childElementCount;k++){
                        if(docModalContent.children[j].children[k].tagName == "SPAN"){
                            if(selectedArray[i] == docModalContent.children[j].children[k].textContent){
                                docModalContent.children[j].children[k].classList.toggle("selectah") // Why "selectah"? Watch Ali G in da house...
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

        docModalContent.addEventListener("contextmenu", function(e){
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
    document.getElementById("docModalClose").addEventListener("click", function() {
        document.getElementById("docVeil").style.display = "none";
    })


// D O C  T O O L  I N I T I A L   L O A D   


    document.getElementById("queryFK").focus();
    if(!document.getElementById("thFK")){
        queryFKLocis()
    }

    
// D O C   T O O L   O P T I O N S   M E N U
    /*
    const optionsButtons = [
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

    */

    const clearButtons = [
        {target: "FKDF", clear: "clearFKDF", operation: "screenFKDF", collateral: "FKDFtd"},
        {target: "FKAT", clear: "clearFKAT", operation: "screenFKAT", collateral: "FKATtd"},
        {target: "NTM", clear: "clearNTM", operation: "screenNTM", collateral: "NTMtd"},
        {target: "DBU", clear: "clearDBU", operation: "screenDBU", collateral: "DBUtd"},
        {target: "IATA", clear: "clearIATA", operation: "screenIATA", collateral: "IATAtd"}
    ]
    
    for (let i=0;i<Object.keys(clearButtons).length;i++){
        document.getElementById(clearButtons[i].clear).addEventListener("click", function(){
            localStorage.setItem(`${clearButtons[i].target}values`, JSON.stringify(""));
            document.getElementById(clearButtons[i].operation).value = ""
            document.getElementById(clearButtons[i].collateral).innerHTML = ""
            
        })
    }

}
