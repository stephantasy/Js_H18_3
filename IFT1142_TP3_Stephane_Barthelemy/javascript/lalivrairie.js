/* Stéphane Barthélemy (20084771) */
/* IFT1142 - TP3 */


// Constantes (textes)



/* ============== */
/* === DIVERS === */
/* ============== */

function pageInitializer(){
	// On télécharge le fichier XML
	var xmlFile = downloadXmlFile();
	
	// On charge le fichier dans le tableau
	// TEMP
	xmlFile = "<livres><livre id="1"><nom>Popo</nom><auteur>Bon Dylan</auteur><desc>Un super bouquin</desc><categorie>Sciences</categorie><image>popo.pnj</image><prix>19.99</prix><nouveaute>1</nouveaute></livre></livres>"
	
	xmlToArray(xmlFile);
}


function xmlToArray(){
	
}

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "cd_catalog.xml", true);
  xmlhttp.send();
}



function xmlToArray(xml) {
  var x, i, xmlDoc, txt;
  xmlDoc = xml.responseXML;
  txt = "";
  x = xmlDoc.getElementsByTagName("livre");
  for (i = 0; i< x.length; i++) {
    txt += x[i].childNodes[0].nodeValue;
  }
  
  document.getElementById("siteContent").innerHTML = txt;
}