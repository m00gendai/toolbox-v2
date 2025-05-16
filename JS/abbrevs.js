function loadAbbrevs(){
 
  const icao8400 = abbreviations.CrystalReport.Details.map(entry => entry.Section.Field.map(element => element.Value))

function tabler(e){
  console.log(e)
  const tbody = document.getElementById("aTable").children[1]
  for(let area of icao8400){
    if(area[0].toLowerCase().includes(e) 
    	|| area[1].toLowerCase().includes(e) 
      || e === ""){
      const row = document.createElement("tr")
      const cell1 = document.createElement("td")
      const cell2 = document.createElement("td")
      cell1.innerText = area[0]
      cell2.innerText = area[1]
      row.appendChild(cell1)
      row.appendChild(cell2)
      tbody.appendChild(row)
    }
  }
}

function tableener(e){
  const tbody = document.getElementById("aTable").children[1]
	tbody.innerHTML = ""
  tabler(e)
}

tabler("")


document.getElementById("abbrevinput").addEventListener("keyup", function(e){
  tableener(e.target.value.toLowerCase())
})
}
