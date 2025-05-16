# AIM Toolbox #

This application serves as a true serverless intranet information hub. It is designed to live in a file system rather than a server and features a collection of links to frequently used services and platforms specific to AIM Zurich requirements as well as a collection of custom tools.

## Installation and additional requisites ##

Copy the contents of the repo into a folder and access `index.html` as the entry point.

### Assets ###

Toolbox needs to load Assets, such as icons and images. 

The icons are used for the Home Tiles in the home section. 
Use any icons you like and link them correctly in `JS\tileLinks.js`.

Icons for the dropdown menu and the get-to-top arrow are sourced from Skyguide Branding Portal.
Use any icons you like and link them correctly in the respective files:
- Dropdown: `index.html`
- AIP Library: `CSS\aipbox.css`
- AIS French: `CSS\frenchBox.css`

Images are sourced from Skyguide Branding Portal.
Use any images you like and link them correctly in the respective CSS files of the sections:
- Favorites Bar: `CSS\styles.css`
- ATS Message Search: `CSS\atsBox.css`
- SITA Converter: `CSS\sitaBox.css`
- AIS French: `CSS\frenchBox.css`

### Documents ###

Some Home Tiles do not link to websites, but documents and folders in the root directory.
They are distinguishable in `JS\tileLinks.js` by the `link: "Documents/` value in the tile object.

## Home Tiles ##

Home Tiles creation, updating and maintaining is done in `JS\tileLinks.js`. 
A Home Tiles object is structured as follows:
- **id**: String Unique id for the tile
- **img**: String Asset link to an icon
- **title**: String The visible label of the Home Tile
- **link**: String Associated link (external/internal/file)
- **tags**: String space separated words that return this tile if the search bar is used
- **style**: String color assignment of the tile (described in `JS\tileLinks.js`in detail)

Example:
```
{
	id: "bioman",
	img: "Assets/085-calendar.png",
	title: "BIOMAN",
	link: "http://bioman.skyguide.corp/",
	tags: "bioman tourenplan schichtplan",
	style: "general"
}
 ```
 Home Tiles that trigger a modal or a similar non-standard link forwarding are explicitly defined in their behavior in `JS\script.js` in the `generateAIPtiles`function. Example:
```
{
	id: "atfmx",
	img: "Assets/024-warning.png",
	title: "ATFMX document",
	link: "U:\\ZOL\\PR-Team\\AIS-ALLG",
	tags: "atfmx document slot exception flow",
	style: "spvr"
}
```
```
if(homeTileDiv.id == "atfmx"){
      navModal = !navModal
      modal("Please navigate to follwing file location. Do <strong>NOT</strong> use the browser, use the File Explorer!", "U:\\ZOL\\PR-Team\\AIS-ALLG", "./Assets/FileExplorer.png")
}
```

## ATS MSG Search ##

This is simply a wrapper for FlightSearch.

## AIP Library ##

AIP Tiles creation, updating and maintaining is done in `JS\aipLinks.js`. 
An AIP Tile is structured as follows:
- **id: String Unique id for the tile. Convention is ICAO two letter country code. With identical country codes for multiple countries, the convention is to hyphenate the country name. Exmaple: ub-uzbekistan.
- **img: String image link (usually a wikimedia commons image link)
- **icao: String ICAO two letter country code. This is not required to be unique.
- **country: String common name of the country 
- **link: String link to the AIP website/eAIP portal. can be empty if no electronic publications exist
- **aip: String color assignment of the triangle denoting AIP status (described in Toolbox AIP Library Information box in detail)

Example:
```
{
	id: "lo",
	img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/1000px-Flag_of_Austria.svg.png",
	icao: "LO",
	country: "Austria",
	link: "https://eaip.austrocontrol.at/",
	aip: "green"
}
```

## Tools - Mapping Tool ##

External link to AIM Mapping Tool. See [https://github.com/m00gendai/mapping-tool-v3](https://github.com/m00gendai/mapping-tool-v3)

## Tools - DOC Screening ##

### Flightkeys LOCI Database  ###

A queryable table of ICAO Location Indicators that are requred by Flightkeys. 

Data source is a simple String Array in `JS\locisFK.js`.
```
const locisFK = ["AYPY","BGAA", ... ]
```

### Print Dialog for Screening ###

A tool intended for noting page ranges of documents to be printed for different customers. This has been developed to combat printing of non-sequential document pages on the same piece of paper.
It counts the total amount of pages per customer. With the `copy` action, a modal triggers with a structured display of the page ranges that can be fed into the printer dialog window for accurate printing.
Entries are saved to LocalStorage.

## Tools - SITA Converter ##

A tool that attempts to decipher a SITA Address to find the originator of an ATS Message received via SITA. 
Since SITA is not standardised in the address structure, this is only an approximation and requires context to find the most likely originator.

It uses several databases that are merged:
- `JS\apcodes.js` for IATA airport codes
- `JS\alcodes.js` for IATA Airline codes
- `JS\corpcodes.js` for (somewhat) standardized organisation codes

`JS\convcodes.js` contains a list of direct translations from SITA to AFTN

These databases are queried upon search and possible matches for letter combinations (or in rare cases a matching AFTN address) are displayed in a Sankey Chart for the operator to interpret.

Data Types are JSON Objects:
- **Airport Codes**: ```var apcodes = '{"apcode":[{"iata": "AAA", "icao": "NTGA", "airport": "Anaa Airport", "place": "Anaa, Tuamotus, French Polynesia"}, {...}]}'```
- **Airline Codes**: ```var alcodes = '{"alcode":[{"designator": "0B", "airline": "Blue Air", "country": "Romania", "remark": ""}, {...}]}'```
- **Organisation Codes**: ```var corpcodes = '{"corpcode":[{"abbr": "OO", "meaning": "Operations"}, {...}]}'```
- **Translations**: ```var convcodes = '{"convcode":[{"id": "1", "aftn": "AYPYANGM", "sita": "POMOPPX"}, {...}]}'```

## Tools - AIS French ##

A tailored collection of French - German translations, queryable for different topics.

Operational Data source is via `Documents\FRENCH BILBIOTHEK\` utilising `.js` files. 
Use a different source if you like.

A feedback form is included that forwards the form via `getForm.io` API implemented in `index.html`

Data Types are simple Object Arrays:
```
const sfoHelpdesk = [
	{ 
		Français: "Special Flight Office support, (Nom), bonjour", 
		Allemand: "Special Flight Office support, Name, Guten Tag", 
	},
	{
		...
	}
]
```

## Tools - R- & D-Areas ##

A queryable table of Swiss Restricted and Danger Areas. Data source is `JS\rdareas.js`.

Data Type is a simple Object Array in `JS\rdareas.js`:
```
const rAreas = [
	{
		designator: "LSR2",
		name: "Hohgant",
		type: "MIL ACFT ACT",
	},
	{
		...
	}
]
```

## Tools - ICAO 8400 Abbreviations ##

A queryable table of ICAO 8400 Abbreviations. Data source is `JS\8400.js`.

Data Type is a relatively convoluted JSON object generated from an XML export via Crystal Reports:
```
export interface Root {
  CrystalReport: CrystalReport
}

export interface CrystalReport {
  ReportHeader: ReportHeader
  Details: Detail[]
  ReportFooter: ReportFooter
  _xmlns: string
  "_xmlns:xsi": string
  "_xsi:schemaLocation": string
}

export interface ReportHeader {
  Section: Section[]
}

export interface Section {
  Text: Text[]
  Field?: Field[]
  Picture?: Picture
  _SectionNumber: string
}

export interface Text {
  TextValue: string
  _Name: string
}

export interface Field {
  FormattedValue: string
  Value: string
  _Name: string
  _FieldName: string
}

export interface Picture {
  _Name: string
  _GraphicType: string
}

export interface Detail {
  Section: Section2
  _Level: string
}

export interface Section2 {
  Field: Field2[]
  _SectionNumber: string
}

export interface Field2 {
  FormattedValue: string
  Value: string
  _Name: string
  _FieldName: string
}

export interface ReportFooter {
  Section: Section3
}

export interface Section3 {
  Text: Text2
  _SectionNumber: string
}

export interface Text2 {
  TextValue: string
  _Name: string
}
```
