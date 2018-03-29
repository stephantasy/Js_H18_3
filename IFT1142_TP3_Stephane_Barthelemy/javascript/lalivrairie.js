/* Stéphane Barthélemy (20084771) */
/* IFT1142 - TP3 */



var livres = [];


// Classe Livre
function Livre(){
  this.titre;
  this.auteur;
  this.desc;
  this.prix;
  this.categorie;
  this.image;
  this.nouveaute;
}
// Constructeurs
Livre.prototype.Livre=function(titre, auteur, desc, prix, categorie, image, nouveaute){  
  // Constructeur de copie
  if(arguments[0] instanceof Livre){
    //alert("Constructeur de copie");
    this.titre = arguments[0].titre;
    this.auteur = arguments[0].auteur;
    this.desc = arguments[0].desc;
    this.prix = arguments[0].prix;
    this.categorie = arguments[0].categorie;
    this.image = arguments[0].image;
    this.nouveaute = arguments[0].nouveaute;
  }
  // Constructeur paramétré
  else if(arguments.length == 7){
    //alert("Constructeur paramétré");
    this.titre = titre;
    this.auteur = auteur;
    this.desc = desc;
    this.prix = prix;
    this.categorie = categorie;
    this.image = image;
    this.nouveaute = nouveaute;
  }
  // Constructeur par défaut (si le nombre d'argument ne correspond pas, on le considère par défaut)
  else {
    //alert("Constructeur par défaut");
    this.titre = "";
    this.auteur = "";
    this.desc = "";
    this.prix = 0.0;
    this.categorie = "";
    this.image = "";
    this.nouveaute = false;
  }
}
// Méthodes GET
Livre.prototype.getTitre = function(){
  return this.titre;
}
Livre.prototype.getAuteur = function(){
  return this.auteur;
}
Livre.prototype.getDesc = function(){
  return this.desc;
}
Livre.prototype.getPrix= function(){
  return this.prix;
}
Livre.prototype.getCategorie = function(){
  return this.categorie;
}
Livre.prototype.getImage = function(){
  return this.image;
}
Livre.prototype.getNouveaute = function(){
  return this.nouveaute;
}
// Méthodes SET
Livre.prototype.setTitre = function(titre){
  this.titre = titre;
}
Livre.prototype.setAuteur = function(auteur){
  this.auteur = auteur;
}
Livre.prototype.setDesc = function(desc){
  this.desc = desc;
}
Livre.prototype.setPrix= function(prix){
  this.prix = prix;
}
Livre.prototype.setCategorie = function(categorie){
  this.categorie = categorie;
}
Livre.prototype.setImage = function(image){
  this.image =image;
}
Livre.prototype.setNouveaute = function(nouveaute){
  this.nouveaute =nouveaute;
}
// Méthodes diverses
Livre.prototype.affiche = function(){
  return this.titre + "<br>" +  this.auteur + "<br>" + this.desc + "<br>" + this.prix + "<br>" + this.categorie + "<br>" + this.image + "<br>" + this.nouveaute + "<br>";
}

/* ============== */
/* === DIVERS === */
/* ============== */

function pageInitializer(){
	// On télécharge le fichier XML
	//var xmlFile = downloadXmlFile();
	
	// On charge le fichier dans le tableau
	// TEMP
  var xmlFile = "<?xml version='1.0'?><livres><livre id='1'><nom>Popo</nom><auteur>Bon Dylan</auteur><desc>Un super bouquin</desc><categorie>Sciences</categorie><image>popo.pnj</image><prix>19.99</prix><nouveaute>1</nouveaute></livre>" +
                  "<livre id='1'><nom>Gloup</nom><auteur>Garry</auteur><desc>Bof</desc><categorie>Vie</categorie><image>popo2.pnj</image><prix>12</prix><nouveaute>0</nouveaute></livre></livres>"

  xmlToArray(xmlFile);
  
  for(var i=0 ; i < livres.length ; i++){
    //alert(livres[i].affiche());
  }

}

function downloadXmlFile() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "cd_catalog.xml", true);
  xmlhttp.send();
}


function xmlToArray(xmlText) {
  var listeLivre, i, j, xmlDoc, txt;
  var nb = 0;

  parser = new DOMParser();
  xmlDoc = parser.parseFromString(xmlText,"text/xml");

  txt = "Liste :<br/>";

  // On récupère tous les livres
  listeLivre = xmlDoc.getElementsByTagName("livre");

  for (i = 0; i < listeLivre.length; i++) {
    
    //alert(listeLivre.length);
    //alert(listeLivre[0].nodeName);
    //alert(listeLivre[0].getAttribute("id"));
    //alert(listeLivre[i].childNodes.length);

    // On parcours les éléments de chaque livre
    for(j = 0 ; j < listeLivre[i].childNodes.length ; j++){      
      nomBalise = listeLivre[i].childNodes[j].nodeName
      valeurBalise = listeLivre[i].childNodes[j].childNodes[0].nodeValue
      txt += nomBalise + " : " + valeurBalise + "<br/>";
    }
    
    var livre = new Livre();
    livre.Livre(
      listeLivre[i].childNodes[0].childNodes[0].nodeValue,
      listeLivre[i].childNodes[1].childNodes[0].nodeValue,
      listeLivre[i].childNodes[2].childNodes[0].nodeValue,
      listeLivre[i].childNodes[3].childNodes[0].nodeValue,
      listeLivre[i].childNodes[4].childNodes[0].nodeValue,
      listeLivre[i].childNodes[5].childNodes[0].nodeValue,
      listeLivre[i].childNodes[6].childNodes[0].nodeValue,
    );
    livres[nb++] = livre;

    txt+="<br/>";
  }
  
  document.getElementById("siteContent").innerHTML = txt;
}

