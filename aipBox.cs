
  #aipBox {
display: none;
}

.title {
margin-bottom: 1em;
}
input.aipInput {
	position: relative;


}
.aipLinkBox {
      position: relative;
  text-align: center;
  box-shadow: 0px 1px 5px 0px silver, 0px -1px 5px 0px silver;
font-family: arial;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
overflow: hidden;
background-color: #f9fcff;}

.aipLinkBox img {
  padding: 0% 0% 2.5% 0%;
  height: 5em;
  width: auto;
  position: relative;
    display: flex;
  justify-content: center;
  align-items: center;

  
}
.aipLinkBox:hover {
  cursor: pointer;
}

#aipLinks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
	width: 100%;
	margin-top: 2em;
  margin-bottom : 2em;

  grid-gap: 1em;
}
.colorCodesContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

}
  .colorCodes{
display: grid;
grid-template-columns:1fr 1fr 1fr 1fr 1fr;
width: 90%;
grid-gap: 1vw;
}

.spanBlank {
 
  border: 1px solid black;
  grid-area: 1 / 1 / 2 / 2;
  text-align: center;
  padding: 0.5em 0 0.5em 0;
}

.spanBlank:hover{
  cursor:pointer;
}
.spanGreen {
 
  background-color: lime;
  grid-area: 1 / 2 / 2 / 3;
  text-align: center;
  padding: 0.5em 0 0.5em 0;
}
.spanYellow{
 background-color: yellow;
 grid-area: 1 / 3 / 2 / 4;
  text-align: center;
  padding: 0.5em 0 0.5em 0;
}
.spanRed{

  background-color: red;
  grid-area: 1 / 4 / 2 / 5;
  text-align: center;
  padding: 0.5em 0 0.5em 0;
  color: white;
}
.spanBlack{

  background-color: black;
  grid-area: 1 / 5 / 2 / 6;
  text-align: center;
  padding: 0.5em 0 0.5em 0;
  color: white;
}





.eaip {
}
.eaip:before{
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
background-color: lime;
clip-path: polygon(0 80%, 0% 100%, 20% 100%);
}

.toolbox{
}
.toolbox:before{
      position: absolute;
  top: 0;
  left: 0;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
background-color: yellow;
clip-path: polygon(0 80%, 0% 100%, 20% 100%);
}


.bookaip {
}
.bookaip:before{
    position: absolute;
  top: 0;
  left: 0;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
background-color: red;
clip-path: polygon(0 80%, 0% 100%, 20% 100%);
}


.noaip{
}
.noaip:before{
position: absolute;
  top: 0;
  left: 0;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
background-color: black;
clip-path: polygon(0 80%, 0% 100%, 20% 100%);
}


.missingCountrySpoiler {
    width: 100%;
    display: flex;
    margin: 1rem 0 0 0;
    background: magenta;
    color: white;
    justify-content: center;
    flex-wrap: wrap;
}

.missingCountrySpoilerTitle:hover {
    cursor: pointer;
}

.missingCountrySpoilerTitle {
    padding: 0.25rem;
    margin: 0 0 0 1rem;
    width: 100%;
}

#misCtryCnt {
    display: none;
    width: 99%;
    background: white;
    color: black;
    margin: 0 0 0.5% 0;
}
