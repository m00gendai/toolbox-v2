function loadRDareas(){
    const rAreas = [
	{
    designator: "R-2",
    name: "Hohgant",
  },
  {
    designator: "R-3",
    name: "Speer",
  },
  {
    designator: "R-4",
    name: "Lac de Neuchatel",
  },
  {
    designator: "R-4A",
    name: "Lac de Neuchatel",
  },
  {
    designator: "R-5",
    name: "Biere",
  },
  {
    designator: "R-6",
    name: "Axalp",
  },
  {
    designator: "R-7",
    name: "Hongrin",
  },
  {
    designator: "R-8",
    name: "Dammastock",
  },
  {
    designator: "R-9",
    name: "Hinterrhein",
  },
  {
    designator: "R-10",
    name: "Färmelberg",
  },
  {
    designator: "R-11",
    name: "Zuoz/S-chanf",
  },
  {
    designator: "R-11A",
    name: "Zuoz/S-chanf",
  },
  {
    designator: "R-12",
    name: "Simplon",
  },
  {
    designator: "R-13",
    name: "Axalp",
  },
  {
    designator: "R-14",
    name: "Säntis",
  },
  {
    designator: "R-15",
    name: "Entlebuch",
  },
  {
    designator: "R-16",
    name: "Isone 1",
  },
  {
    designator: "R-17",
    name: "Isone 2",
  },
  {
    designator: "R-18",
    name: "Bure",
  },
  {
    designator: "R-31",
    name: "Gadmen",
  },
  {
    designator: "R-37",
    name: "Sustenpass",
  },
  {
    designator: "R-38",
    name: "Glauberberg-Wasserfallen",
  },
  {
    designator: "R-39A",
    name: "Heitli",
  },
  {
    designator: "R-39B",
    name: "Brisen",
  },
  {
    designator: "R-39C",
    name: "Stoos",
  },
  {
    designator: "R-40",
    name: "Wasserfallen",
  },
  {
    designator: "R-40A",
    name: "Wasserfallen",
  },
  {
    designator: "R-40B",
    name: "Wasserfallen",
  },
  {
    designator: "R-41",
    name: "Chalchtal",
  },
  {
    designator: "R-45",
    name: "Chlialp",
  },
  {
    designator: "R-46",
    name: "Mätteli",
  },
  {
    designator: "R-47",
    name: "Val Piana Cavagnolo",
  },
  {
    designator: "R-48",
    name: "Mundaun Nova",
  },
  {
    designator: "R-49",
    name: "Val Cristallina",
  },
  {
    designator: "R-50",
    name: "Val Nalps",
  },
  {
    designator: "R-51",
    name: "Val Rondadura",
  },
  {
    designator: "R-52",
    name: "Val Curtegns",
  },
  {
    designator: "R-53",
    name: "Albula Alpen E",
  },
  {
    designator: "R-57",
    name: "Rossboden-Rheinsand (Chur)",
  },
  {
    designator: "R-58",
    name: "Frauenfeld",
  },
  {
    designator: "R-59",
    name: "Wichlen",
  },
]

const dAreas = [
	{
    designator: "D-5",
    name: "Eriswil",
  },
  {
    designator: "D-7",
    name: "Grandvillard",
  },
  {
    designator: "D-10",
    name: "Breil/Brigels",
  },
  {
    designator: "D-12",
    name: "Sihltal",
  },
  {
    designator: "D-14",
    name: "Gasterntal",
  },
  {
    designator: "D-22",
    name: "Petit Mont",
  },
]

function rTabler(e){
  for(let area of rAreas){
    if(area.name.toLowerCase().includes(e) 
    	|| area.designator.toLowerCase().includes(e) 
      || area.designator.toLowerCase().replace("-", "").includes(e.replace("-", ""))
      || e === ""){
      const row = document.createElement("tr")
      const cell1 = document.createElement("td")
      const cell2 = document.createElement("td")
      cell1.innerText = area.designator
      cell2.innerText = area.name
      row.appendChild(cell1)
      row.appendChild(cell2)
      document.getElementById("rTable").appendChild(row)
    }
  }
}

function dTabler(e){
  for(let area of dAreas){
    if(area.name.toLowerCase().includes(e) 
    	|| area.designator.toLowerCase().includes(e) 
      || area.designator.toLowerCase().replace("-", "").includes(e.replace("-", ""))
      || e === ""){
      const row = document.createElement("tr")
      const cell1 = document.createElement("td")
      const cell2 = document.createElement("td")
      cell1.innerText = area.designator
      cell2.innerText = area.name
      row.appendChild(cell1)
      row.appendChild(cell2)
      document.getElementById("dTable").appendChild(row)
    }
  }
}

function rTableener(e){
	let i = document.getElementById("rTable").children.length-1
	while(i>0){
  	document.getElementById("rTable").removeChild(document.getElementById("rTable").children[i])
    i--
  }
  rTabler(e)
}

function dTableener(e){
	let i = document.getElementById("dTable").children.length-1
	while(i>0){
  	document.getElementById("dTable").removeChild(document.getElementById("dTable").children[i])
    i--
  }
  dTabler(e)
}

rTabler("")

dTabler("")

document.getElementById("input").addEventListener("keyup", function(e){
	rTableener(e.target.value.toLowerCase())
  dTableener(e.target.value.toLowerCase())
})
}
