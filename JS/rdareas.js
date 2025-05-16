function loadRDareas(){
    const rAreas = [
	{
    designator: "LSR2",
    name: "Hohgant",
    type: "MIL ACFT ACT",
  },
  {
    designator: "LSR3",
    name: "Speer",
    type: "MIL ACFT ACT",
  },
  {
    designator: "LSR4",
    name: "Lac de Neuchatel",
    type: "ACFT FRNG",
  },
  {
    designator: "LSR4A",
    name: "Lac de Neuchatel",
    type: "ACFT FRNG",
  },
  {
    designator: "LSR5",
    name: "Biere",
    type: "MIL UAS and/or FRNG ACT",
  },
  {
    designator: "LSR6",
    name: "Axalp",
    type: "ACFT FRNG",
  },
  {
    designator: "LSR7",
    name: "Hongrin",
    type: "MIL UAS and/or FRNG ACT",
  },
  {
    designator: "LSR8",
    name: "Dammastock",
    type: "Air-Air FRNG",
  },
  {
    designator: "LSR8A",
    name: "Dammastock",
    type: "Air-Air FRNG / MIL ACFT ACT",
  },
  {
    designator: "LSR9",
    name: "Hinterrhein",
    type: "MIL UAS and/or FRNG ACT",
  },
  {
    designator: "LSR10",
    name: "Färmelberg",
    type: "FRNG ACT",
  },
  {
    designator: "LSR11",
    name: "Zuoz/S-chanf",
    type: "Anti-ACFT FRNG / MIL ACFT ACT",
  },
  {
    designator: "LSR11A",
    name: "Zuoz/S-chanf",
    type: "Anti-ACFT FRNG / MIL ACFT ACT",
  },
  {
    designator: "LSR12",
    name: "Simplon",
    type: "MIL UAS and/or FRNG ACT",
  },
  {
    designator: "LSR13",
    name: "Axalp",
    type: "ACFT FRNG",
  },
  {
    designator: "LSR14",
    name: "Säntis",
    type: "MIL UAS and/or FRNG ACT",
  },
  {
    designator: "LSR15",
    name: "Entlebuch",
    type: "MIL UAS ACT expect ADS15 / ACFT activity",
  },
  {
    designator: "LSR16",
    name: "Isone 1",
    type: "MIL UAS and/or FRNG ACT",
  },
  {
    designator: "LSR17",
    name: "Isone 2",
    type: "MIL UAS and/or FRNG ACT",
  },
  {
    designator: "LSR18",
    name: "Bure",
    type: "MIL UAS ACT",
  },
  {
    designator: "LSR31",
    name: "Gadmen",
    type: "FRNG ACT",
  },
  {
    designator: "LSR37",
    name: "Sustenpass",
    type: "FRNG ACT",
  },
  {
    designator: "LSR38",
    name: "Glaubenberg-Wasserfallen / Flüehli",
    type: "FRNG ACT",
  },
  {
    designator: "LSR39A",
    name: "Heitli",
    type: "Pilatus Flight Test",
  },
  {
    designator: "LSR39B",
    name: "Brisen",
    type: "Pilatus Flight Test",
  },
  {
    designator: "LSR39C",
    name: "Stoos",
    type: "Pilatus Flight Test",
  },
  {
    designator: "LSR40",
    name: "Wasserfallen",
    type: "A/G FRNG / MIL ACFT ACT",
  },
  {
    designator: "LSR40A",
    name: "Wasserfallen",
    type: "A/G FRNG / MIL ACFT ACT",
  },
  {
    designator: "LSR40B",
    name: "Wasserfallen",
    type: "A/G FRNG / MIL ACFT ACT",
  },
  {
    designator: "LSR41",
    name: "Chalchtal",
    type: "FRNG ACT",
  },
  {
    designator: "LSR45",
    name: "Chlialp",
    type: "FRNG ACT",
  },
  {
    designator: "LSR46",
    name: "Mätteli",
    type: "FRNG ACT",
  },
  {
    designator: "LSR47",
    name: "Val Piana Cavagnolo",
    type: "FRNG ACT",
  },
  {
    designator: "LSR48",
    name: "Mundaun Nova",
    type: "FRNG ACT",
  },
  {
    designator: "LSR49",
    name: "Val Cristallina",
    type: "FRNG ACT",
  },
  {
    designator: "LSR50",
    name: "Val Nalps",
    type: "FRNG ACT",
  },
  {
    designator: "LSR51",
    name: "Val Rondadura",
    type: "FRNG ACT",
  },
  {
    designator: "LSR52",
    name: "Val Curtegns",
    type: "FRNG ACT",
  },
  {
    designator: "LSR53",
    name: "Albula Alpen E",
    type: "FRNG ACT",
  },
  {
    designator: "LSR57",
    name: "Rossboden-Rheinsand (Chur)",
    type: "FRNG ACT",
  },
  {
    designator: "LSR58",
    name: "Frauenfeld",
    type: "FRNG ACT",
  },
  {
    designator: "LSR59",
    name: "Wichlen",
    type: "FRNG ACT",
  },
]

const dAreas = [
	{
    designator: "LSD5",
    name: "Eriswil",
    type: "Simulated Ground Attacks with MIL Jet and Prop ACFT",
  },
  {
    designator: "LSD7",
    name: "Grandvillard",
    type: "MIL ACFT ACT",
  },
  {
    designator: "LSD10",
    name: "Breil/Brigels",
    type: "MIL ACFT ACT",
  },
  {
    designator: "LSD12",
    name: "Sihltal",
    type: "Test FRNG",
  },
  {
    designator: "LSD14",
    name: "Gasterntal",
    type: "",
  },
]

function rTabler(e){
  const tbody = document.getElementById("rTable").children[1]
  for(let area of rAreas){
    if(area.name.toLowerCase().includes(e) 
    	|| area.designator.toLowerCase().includes(e) 
      || area.designator.toLowerCase().replace("-", "").includes(e.replace("-", ""))
      || e === ""){
      const row = document.createElement("tr")
      const cell1 = document.createElement("td")
      const cell2 = document.createElement("td")
      const cell3 = document.createElement("td")
      cell1.innerText = area.designator
      cell2.innerText = area.name
      cell3.innerText = area.type
      row.appendChild(cell1)
      row.appendChild(cell2)
      row.appendChild(cell3)
      tbody.appendChild(row)
    }
  }
}

function dTabler(e){
  const tbody = document.getElementById("dTable").children[1]
  for(let area of dAreas){
    if(area.name.toLowerCase().includes(e) 
    	|| area.designator.toLowerCase().includes(e) 
      || area.designator.toLowerCase().replace("-", "").includes(e.replace("-", ""))
      || e === ""){
      const row = document.createElement("tr")
      const cell1 = document.createElement("td")
      const cell2 = document.createElement("td")
       const cell3 = document.createElement("td")
      cell1.innerText = area.designator
      cell2.innerText = area.name
      cell3.innerText = area.type
      row.appendChild(cell1)
      row.appendChild(cell2)
      row.appendChild(cell3)
      tbody.appendChild(row)
    }
  }
}

function rTableener(e){
  const tbody = document.getElementById("rTable").children[1]
  tbody.innerHTML = ""
  rTabler(e)
}

function dTableener(e){
  const tbody = document.getElementById("dTable").children[1]
	tbody.innerHTML = ""
  dTabler(e)
}

rTabler("")

dTabler("")

document.getElementById("input").addEventListener("keyup", function(e){
	rTableener(e.target.value.toLowerCase())
  dTableener(e.target.value.toLowerCase())
})
}
