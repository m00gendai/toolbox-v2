function loadDocScreeningToolCode(){


// L O C I   D A T A B A S E


    const FKResultsTable 	= document.getElementById("FKresultsTable");
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

    // This creates the table itself
    function queryFKLocis() {
        const THFK			= document.createElement("th"); 
        const THFKContent1 	= document.createTextNode("Flightkeys Airports");
        THFK.appendChild(THFKContent1);
        FKResultsTable.appendChild(THFK);
        THFK.setAttribute("id", "thFK");

        if (queryFKfield.value == 0){
            for (let i=0; i<locisFK.length; i++){
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
        const loStoDoc  = {valuex: "DocumentValues", 	screen: "screenDocument", 	name: "DOC"};
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
        localStorage.setItem(LoStoAll[i].valuex, document.getElementById(LoStoAll[i].screen).value);
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
        const customerFKDF 		= {name: "FKDF", 	value: document.getElementById("screenFKDF").value,  print: "Flightkeys Daily Folder"}
        const customerFKAT 		= {name: "FKAT", 	value: document.getElementById("screenFKAT").value,  print: "Flightkeys AIP Tool"}
        const customerNTM 		= {name: "NTM", 	value: document.getElementById("screenNTM").value,   print: "Team NOTAM"}
        const customerDBU 		= {name: "DBU", 	value: document.getElementById("screenDBU").value,   print: "DBU"}
        const customerIATA 		= {name: "IATA", 	value: document.getElementById("screenIATA").value,  print: "IATA"}
        const customerValues 	= [customerFKDF, customerFKAT, customerNTM, customerDBU, customerIATA]; 

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
                                if(i < alertArray.length-1){ // if its not the last pair of pages...
                                    span.innerHTML += alertArray[i] + ", ";//... push it to the popup in sequence with a comma
                                    document.getElementById("testHTML").appendChild(span)
                                    // notice the missing <br>
                                }else if(i == alertArray.length-1){ // if its the last pair of pages...
                                    span.innerHTML += alertArray[i];//... push it to the popup in sequence without a comma
                                    document.getElementById("testHTML").appendChild(span)
                                    // notice the missing <br>
                                }
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
    queryFKLocis()

    
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
    const optionsButtons = [
        {
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
        document.getElementById("screenDocument").innerHTML = localStorage.getItem("DocumentValues");   
        document.getElementById("screenFKDF").innerHTML = localStorage.getItem("FKDFvalues");
        document.getElementById("screenFKAT").innerHTML = localStorage.getItem("FKATvalues");
        document.getElementById("screenNTM").innerHTML 	= localStorage.getItem("NTMvalues");
        document.getElementById("screenDBU").innerHTML 	= localStorage.getItem("DBUvalues");
        document.getElementById("screenIATA").innerHTML = localStorage.getItem("IATAvalues");
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
