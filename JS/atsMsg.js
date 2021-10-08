function loadAtsMsgCode(){
    const flightsearchFields = ["ident", "eobdfrom", "eobdto", "dep", "dest", "fltrule", "fulltext", "msgtype", "queue", "msgdir"];
    
    for(let i=0; i<flightsearchFields.length; i++){
        document.getElementById(flightsearchFields[i]).addEventListener("keyup", function(e){
            if(e.keyCode==13){
                atsForm();
            }
        })
    }

    document.getElementById("atsButton").addEventListener("click", function(){
        atsForm();
    })

    let dateObj = new Date();
    let dateTodayYear = dateObj.getUTCFullYear();
    let dateTodayMonth = dateObj.getUTCMonth()+1;
    let dateTodayDay = dateObj.getUTCDate();

    function dateToDOFFrom() {
        let DOFyearFrom = eobdfrom.value.substring(2,4)
        let DOFmonthFrom = eobdfrom.value.substring(5,7)
        let DOFdayFrom = eobdfrom.value.substring(8,10)
        let currentDOFFrom = DOFyearFrom + DOFmonthFrom + DOFdayFrom;
        return currentDOFFrom;
    }

    function dateToDOFTo(){
        let DOFyearTo = eobdto.value.substring(2,4)
        let DOFmonthTo = eobdto.value.substring(5,7)
        let DOFdayTo = eobdto.value.substring(8,10)
        let currentDOFTo = DOFyearTo + DOFmonthTo + DOFdayTo;
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
        const ident         = $("#ident").val();
        
        if(ident.includes("%")){
            ident = $("#ident").val().replace(atsRegex, "%25")
        }
        
        const httpeobdfrom  = "&EOBDFrom="
        const eobdfrom      = dateToDOFFrom();
        const httpeobtfrom  = "&EOBTFrom="
        const httpeobdto    = "&EOBDUntil="
        const eobdto        = dateToDOFTo();
        const httpeobtto    = "&EOBTUntil="
        const httpfltrule   = "&FlightRule="
        let fltrule       = $("#fltrule").val();
        const httpdep       = "&DEPAD="
        const dep           = $("#dep").val();
        
        if(dep.includes("%")){
            dep = $("#dep").val().replace(atsRegex, "%25")
        }
        
        const httpdest      = "&DESTAD="
        const dest          = $("#dest").val();
        
        if(dest.includes("%")){
            dest = $("#dest").val().replace(atsRegex, "%25")
        }
        
        const httpfulltext  = "&FreeText="
        const fulltext      = $("#fulltext").val();
        
        if(fulltext.includes("%")){
            fulltext = $("#fulltext").val().replace(atsRegex, "%25")
        }
        
        const httpmsgtype   = "&MessageType="
        const msgtype       = $("#msgtype").val().toUpperCase();
        const httpmsgdir    = "&MessageDirection="
        const msgdir        = $("#msgdir").val();
        const httpqueue     = "&InQueues="
        const queue         = $("#queue").val();
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