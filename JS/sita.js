window.onload = (event) => {
    
    let sitaInput
    let chart
    
    document.getElementById("inputSita").addEventListener("keyup", function(e){
        if(e.key == "Enter"){
            sitaInput = document.getElementById("inputSita").value.toLowerCase()
            if(chartExists){
                chart.dispose()
            }
            displayChart(sitaInput)
        }
    })
    
    document.getElementById("inputSitaSearch").addEventListener("click", function(){
        sitaInput = document.getElementById("inputSita").value.toLowerCase()
            if(chartExists){
                chart.dispose()
            }
        displayChart(sitaInput)
    })
    
    function displayChart(sitaInput){
        am4core.ready(function() {

            let airlineCodes = JSON.parse(alcodes)
            airlineCodes = airlineCodes.alcode
            
            let airportCodes = JSON.parse(apcodes)
            airportCodes = airportCodes.apcode
            
            let conversionCodes = JSON.parse(convcodes)
            conversionCodes = conversionCodes.convcode
            
            let departmentCodes = JSON.parse(corpcodes)
            departmentCodes = departmentCodes.corpcode
            
            am4core.useTheme(am4themes_animated)

            chart = am4core.create("dissect", am4charts.SankeyDiagram)
            chart.hiddenState.properties.opacity = 0

            chart.data = []
            
            /*
            * SITA ADDRESS BODY: AAA | BB | CC
            * A = IATA Airport Code
            * B = IATA Airline Code 
            * C = IATA Department Code
            */
            
            airportCodes.forEach(airportCode => {
                if(sitaInput.substring(0,3) == airportCode.iata.toLowerCase()){
                    chart.data.push({from: airportCode.iata, to: `${airportCode.icao} - ${airportCode.airport}, ${airportCode.place}`, value: 10})
                }
            })

            airlineCodes.forEach(airlineCode => {
                if(sitaInput.substring(3,5) == airlineCode.designator.toLowerCase()){
                    chart.data.push({from: airlineCode.designator, to: `${airlineCode.airline}, ${airlineCode.remark}`, value: 10})
                } 
            })
                    
            airlineCodes.forEach(airlineCode => {
                if(sitaInput.substring(5,7) == airlineCode.designator.toLowerCase()){
                    chart.data.push({from: airlineCode.designator, to: `${airlineCode.airline}, ${airlineCode.remark}`, value: 10})
                }
            })
            
            departmentCodes.forEach(departmentCode => {
                if(sitaInput.substring(5,7) == departmentCode.abbr.toLowerCase()){
                    chart.data.push({from: departmentCode.abbr, to: departmentCode.meaning, value: 10})
                }
            })
            
            departmentCodes.forEach(departmentCode => {
                if(sitaInput.substring(3,5) == departmentCode.abbr.toLowerCase()){
                    chart.data.push({from: departmentCode.abbr, to: departmentCode.meaning, value: 10})
                }
            })
            
            conversionCodes.forEach(conversionCode => {
                if(sitaInput == conversionCode.sita.toLowerCase()){
                    chart.data.push({from: conversionCode.sita, to: `Matching AFTN Address found: ${conversionCode.aftn}`, value: 10})
                }
            })
            
            let hoverState = chart.links.template.states.create("hover")
            hoverState.properties.fillOpacity = 0.6

            chart.dataFields.fromName = "from"
            chart.dataFields.toName = "to"
            chart.dataFields.value = "value"
            chart.paddingRight = 500

            let nodeTemplate = chart.nodes.template
            nodeTemplate.inert = true
            nodeTemplate.readerTitle = "Drag me!"
            nodeTemplate.showSystemTooltip = true
            nodeTemplate.width = 20

            let nodeTemplate = chart.nodes.template
            nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange"
            nodeTemplate.showSystemTooltip = true
            nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer
            nodeTemplate.nameLabel.adapter.add("locationX", function(location, target) {
                switch (target.parent.level) {
                    case 0:
                        return 1;
                    case 1:
                        return 1;
                }
            });

            chart.nodes.template.nameLabel.label.width = 500
            chart.nodes.template.nameLabel.label.truncate = false
            chart.nodes.template.nameLabel.label.wrap = true

        })
    }
}