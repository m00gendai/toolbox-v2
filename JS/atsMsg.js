function loadAtsMsgCode(){
    const flightsearchFields = ["ident", "eobdfrom", "eobdto", "dep", "dest", "fltrule", "fulltext", "msgtype", "queue", "msgdir"];
    
    flightsearchFields.forEach(flightsearchField => {
        document.getElementById(flightsearchField).addEventListener("keyup", function(e){
            if(e.key == "Enter"){
                atsForm();
            }
        })
    })
    document.getElementById("atsButton").addEventListener("click", function(){
        atsForm();
    })

    const dateObj = new Date();
    const dateTodayYear = dateObj.getUTCFullYear();
    let dateTodayMonth = dateObj.getUTCMonth()+1;
    let dateTodayDay = dateObj.getUTCDate();

    function dateToDOFFrom() {
        return `${eobdfrom.value.substring(2,4)}${eobdfrom.value.substring(5,7)}${eobdfrom.value.substring(8,10)}`
    }

    function dateToDOFTo(){
        return `${eobdto.value.substring(2,4)}${eobdto.value.substring(5,7)}${eobdto.value.substring(8,10)}`
    }

    function dateToString() {
        dateTodayMonth<10 ? dateTodayMonth = `0${dateTodayMonth}` : dateTodayMonth = dateTodayMonth
        dateTodayDay<10 ? dateTodayDay = `0${dateTodayDay}`: dateTodayDay = dateTodayDay
        let currentUTCDate = `${dateTodayYear}-${dateTodayMonth}-${dateTodayDay}`
        eobdfrom.value = currentUTCDate;
        eobdto.value = currentUTCDate;
    }

    dateToString()

    eobdfrom.addEventListener("change", function(){
        dateToDOFFrom();
    })
    
    eobdto.addEventListener("change", function(){
        dateToDOFTo();
    })

    function atsForm() {
        const atsRegex      = /([%])/;
        let ident           = document.getElementById("ident").value
        
        if(ident.includes("%")){
            ident = document.getElementById("ident").value.replace(atsRegex, "%25")
        }
        
        let eobdfrom        = dateToDOFFrom();
        let eobdto          = dateToDOFTo();
        let fltrule         = document.getElementById("fltrule").value
        let dep             = document.getElementById("dep").value
        
        if(dep.includes("%")){
            dep = document.getElementById("dep").value.replace(atsRegex, "%25")
        }
        
        let dest            = document.getElementById("dest").value
        
        if(dest.includes("%")){
            dest = document.getElementById("dest").value.replace(atsRegex, "%25")
        }
        
        let fulltext        = document.getElementById("fulltext").value
        
        if(fulltext.includes("%")){
            document.getElementById("fulltext").value.replace(atsRegex, "%25")
        }
        
        let msgtype          = document.getElementById("msgtype").value.toUpperCase() || "FPL";
        let msgdir          = document.getElementById("msgdir").value
        let queue           = document.getElementById("queue").value
        let linkFS

        console.table(
            [
                ["IDENT", ident],
                ["EOBD FROM", eobdfrom],
                ["EOBD TO", eobdto],
                ["FLT RULE", fltrule],
                ["DEP", dep],
                ["DEST", dest],
                ["FULL TEXT", fulltext],
                ["MSG TYPE", msgtype],
                ["MSG DIR", msgdir],
                ["QUEUE", queue],
            ]
        )
        
            linkFS = linkFS = `http://zhisaop/FlightSearch/FlightSearch?QueryTimeOut=30&MaxFlightCount=50&Ident=${ident}&EOBDFrom=${eobdfrom}&EOBDUntil=${eobdto}&EOBTFrom=&EOBTUntil=&InQueues=${queue}&FlightRule=${msgtype === "FPL" ? fltrule : ""}&DEPAD=${dep}&DESTAD=${dest}&MessageType=${msgtype}&FreeText=${fulltext}&MessageDirection=${msgdir}`

        console.log(JSON.stringify(linkFS))
        const fsIframe = document.createElement("iframe");
        fsIframe.src = linkFS;
        fsIframe.id = "fsIframe";
        document.getElementById("fsIframeContainer").innerHTML = "";
        document.getElementById("fsIframeContainer").appendChild(fsIframe);
    }
    
}
