function loadAtsMsgCode(){
    const flightsearchFields = ["ident", "eobdfrom", "eobdto", "dep", "dest", "fltrule", "fulltext", "msgtype", "queue", "msgdir"];
    
    for(let i=0; i<flightsearchFields.length; i++){
        document.getElementById(flightsearchFields[i]).addEventListener("keyup", function(e){
            if(e.key == "Enter"){
                atsForm();
            }
        })
    }

    document.getElementById("atsButton").addEventListener("click", function(){
        atsForm();
    })

    const dateObj = new Date();
    const dateTodayYear = dateObj.getUTCFullYear();
    let dateTodayMonth = dateObj.getUTCMonth()+1;
    let dateTodayDay = dateObj.getUTCDate();

    function dateToDOFFrom() {
        const DOFyearFrom = eobdfrom.value.substring(2,4)
        const DOFmonthFrom = eobdfrom.value.substring(5,7)
        const DOFdayFrom = eobdfrom.value.substring(8,10)
        const currentDOFFrom = DOFyearFrom + DOFmonthFrom + DOFdayFrom;
        return currentDOFFrom;
    }

    function dateToDOFTo(){
        const DOFyearTo = eobdto.value.substring(2,4)
        const DOFmonthTo = eobdto.value.substring(5,7)
        const DOFdayTo = eobdto.value.substring(8,10)
        const currentDOFTo = DOFyearTo + DOFmonthTo + DOFdayTo;
        return currentDOFTo;
    }

    function dateToString() {
        if(dateTodayMonth<10){
            dateTodayMonth = "0" + dateTodayMonth;
        }
        if(dateTodayDay<10){
            dateTodayDay = "0" + dateTodayDay;
        }
        let currentUTCDate = dateTodayYear + "-" + dateTodayMonth + "-" + dateTodayDay;
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
        const atsRegex = /([%])/;
        const http1         = "http://zhisaop/FlightSearch/FlightSearch?QueryTimeOut=30&MaxFlightCount=50";
        const httpident     = "&Ident="
        let ident           = document.getElementById("ident").value
        
        if(ident.includes("%")){
            ident = document.getElementById("ident").value.replace(atsRegex, "%25")
        }
        
        const httpeobdfrom  = "&EOBDFrom="
        let eobdfrom      = dateToDOFFrom();
        const httpeobtfrom  = "&EOBTFrom="
        const httpeobdto    = "&EOBDUntil="
        let eobdto        = dateToDOFTo();
        const httpeobtto    = "&EOBTUntil="
        const httpfltrule   = "&FlightRule="
        let fltrule       = document.getElementById("fltrule").value
        const httpdep       = "&DEPAD="
        let dep           = document.getElementById("dep").value
        
        if(dep.includes("%")){
            dep = document.getElementById("dep").value.replace(atsRegex, "%25")
        }
        
        const httpdest      = "&DESTAD="
        let dest          = document.getElementById("dest").value
        
        if(dest.includes("%")){
            dest = document.getElementById("dest").value.replace(atsRegex, "%25")
        }
        
        const httpfulltext  = "&FreeText="
        let fulltext      = document.getElementById("fulltext").value
        
        if(fulltext.includes("%")){
            document.getElementById("fulltext").value.replace(atsRegex, "%25")
        }
        
        const httpmsgtype   = "&MessageType="
        let msgtype       = document.getElementById("msgtype").value.toUpperCase();
        const httpmsgdir    = "&MessageDirection="
        let msgdir        = document.getElementById("msgdir").value
        const httpqueue     = "&InQueues="
        let queue         = document.getElementById("queue").value
        let linkFS
        if(msgtype != "FPL"){
            linkFS = http1 + httpident + ident + httpeobdfrom + eobdfrom + httpeobtfrom + httpeobdto + eobdto + httpeobtto + httpqueue + queue + httpfltrule + httpdep + dep + httpdest + dest + httpmsgtype + msgtype + httpfulltext + fulltext + httpmsgdir + msgdir  
        } else if(msgtype == "FPL"){
            linkFS = http1 + httpident + ident + httpeobdfrom + eobdfrom + httpeobtfrom + httpeobdto + eobdto + httpeobtto + httpqueue + queue + httpfltrule + fltrule + httpdep + dep + httpdest + dest + httpmsgtype + msgtype + httpfulltext + fulltext + httpmsgdir + msgdir
        }
  
        const fsIframe = document.createElement("iframe");
        fsIframe.src = linkFS;
        fsIframe.id = "fsIframe";
        document.getElementById("fsIframeContainer").innerHTML = "";
        document.getElementById("fsIframeContainer").appendChild(fsIframe);
    }
    
}
