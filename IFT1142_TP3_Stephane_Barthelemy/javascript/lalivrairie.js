/* Stéphane Barthélemy (20084771) */
/* IFT1142 - TP3 */



var livres = [];  // Tableau des livres


// Classe Livre
{
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
}

/* ============== */
/* === DIVERS === */
/* ============== */

function displayPanier(){

  /**********************************************
      Header avec titre + bouton de fermeture
  ***********************************************/
  var titre = document.createElement("h2");
  titre.innerHTML = "Mon Panier";
  // Bouton
  var boutonFermeture = document.createElement("span");
  boutonFermeture.setAttribute("onClick", "document.getElementById('panierModal').style.display='none'");
  boutonFermeture.setAttribute("class", "w3-button w3-display-topright");
  boutonFermeture.innerHTML = "x";
  // Header
  var modalHeader = document.createElement("header");
  modalHeader.setAttribute("class", "w3-container w3-teal");
  modalHeader.appendChild(boutonFermeture);
  modalHeader.appendChild(titre);
  
  /**********************************************
      Liste des éléments
  ***********************************************/
  var listeUl = document.createElement("ul");
  listeUl.setAttribute("class", "w3-ul");

  // On construit chaque élément
  var nblements = 1;
  for(var i = 0 ; i < nblements ; i++){
      var element = createNewListElement("Titre", "Auteur", "images/2431293-gf.jpg", "0.00", "2");
      listeUl.appendChild(element);
  }

  /**********************************************
      div Modal conteneur
  ***********************************************/
  var divModalContent = document.createElement("div");
  divModalContent.setAttribute("class", "w3-modal-content w3-card-4 w3-animate-top");
  divModalContent.appendChild(modalHeader);
  divModalContent.appendChild(listeUl);

  /**********************************************
      Div principal
  ***********************************************/
  var divMain = document.createElement("div");
  divMain.setAttribute("id", "panierModal");
  divMain.setAttribute("class", "w3-modal");
  divMain.appendChild(divModalContent);

  // Ajout à la page web
  document.getElementById('panier').appendChild(divMain);

  // Affichage
  document.getElementById('panierModal').style.display='block';
}

// Renvoie un élément de la liste des achats du panier
function createNewListElement(titre, auteur, image, prix, qte){
  // L'élément
  var element = document.createElement("li");
  element.setAttribute("class", "w3-bar");

  // Croix pour supprimer l'élément
  var spanButtonDelete = document.createElement("span");
  spanButtonDelete.setAttribute("class", "w3-bar-item w3-button w3-white w3-xlarge w3-right");
  spanButtonDelete.setAttribute("onClick", "DeleteElementPanier(this);");
  spanButtonDelete.innerHTML = "X";
  
  // Zone Image du livre
  var imgLivre = document.createElement("img");
  imgLivre.setAttribute("src", image);
  imgLivre.setAttribute("class", "w3-bar-item w3-circle w3-hide-small");
  imgLivre.setAttribute("style", "width:80px");

  // === Zone Titre + auteur ===
  // Titre
  var spanTitre = document.createElement("span");
  spanTitre.setAttribute("class", "w3-large");
  spanTitre.innerHTML = titre;
  // Carriage Return  
  var cr = document.createElement("br");
  // Auteur
  var spanAuteur= document.createElement("span");
  spanAuteur.innerHTML = auteur;
  // Assemblage
  var divTitleAuthor = document.createElement("div");
  divTitleAuthor.setAttribute("class", "w3-bar-item");
  divTitleAuthor.setAttribute("style", "width:50%");
  divTitleAuthor.appendChild(spanTitre);
  divTitleAuthor.appendChild(cr);
  divTitleAuthor.appendChild(spanAuteur);

  // === Zone Ajout/suppression quantité ===
  // Bouton -
  var divMinusButton = document.createElement("button");
  divMinusButton.setAttribute("class", "w3-button w3-round-large w3-section w3-blue w3-ripple");
  divMinusButton.innerHTML = "-";
  // Quantité
  var hQte = document.createElement("h4");
  hQte.setAttribute("class", "w3-section w3-badge w3-white");
  hQte.innerHTML = qte;
  // Bouton +
  var divPlusButton = document.createElement("button");
  divPlusButton.setAttribute("class", "w3-button w3-round-large w3-section w3-blue w3-ripple");
  divPlusButton.innerHTML = "+";
  // Assemblage
  var divAjustQte = document.createElement("div");
  divAjustQte.setAttribute("class", "w3-bar-item w3-margin-left w3-margin-right");
  divAjustQte.setAttribute("style", "width:20%");
  divAjustQte.appendChild(divMinusButton);
  divAjustQte.appendChild(hQte);
  divAjustQte.appendChild(divPlusButton);

  // Zone prix
  var spanPrice = document.createElement("span");
  spanPrice.setAttribute("class", "w3-large w3-section");
  spanPrice.innerHTML = prix + "$";
  var divPrice = document.createElement("div");
  divPrice.setAttribute("class", "w3-bar-item w3-right-align");
  divPrice.appendChild(spanPrice);

  // Assemblage de l'élément
  element.appendChild(spanButtonDelete);  // Bouton
  element.appendChild(imgLivre);          // Image
  element.appendChild(divTitleAuthor);    // Titre
  element.appendChild(divAjustQte);       // Qte
  element.appendChild(divPrice);          // Prix

  return element;
}

function DeleteElementPanier(element){
  element.parentElement.style.display='none';
}

function pageInitializer(){
	// On télécharge le fichier XML
	downloadXmlFile();
	
	// On charge le fichier dans le tableau
	// TEMP
  //var xmlFile = "<?xml version='1.0'?><livres><livre id='1'><nom>Popo</nom><auteur>Bon Dylan</auteur><desc>Un super bouquin</desc><categorie>Sciences</categorie><image>popo.pnj</image><prix>19.99</prix><nouveaute>1</nouveaute></livre>" +
  //                "<livre id='1'><nom>Gloup</nom><auteur>Garry</auteur><desc>Bof</desc><categorie>Vie</categorie><image>popo2.pnj</image><prix>12</prix><nouveaute>0</nouveaute></livre></livres>"

  //xmlToArray(xmlFile);
  
  //alert("nb livres = " + livres.length);

  for(var i=0 ; i < livres.length ; i++){
    alert(" livres = " + livres[i].affiche());
  }

}

// Téléchargement du fichier de données (XML)
function downloadXmlFile() {
  $.ajax({
    url: 'Data/Livres.xml',
    type: 'GET',
    dataType: 'xml',
    success: function(listeLivres){
      xmlToArray(listeLivres);
    },
    error: function(url){ alert('Data file not found!'); }
  });
}


// On charge les données dans le tableau
function xmlToArray(xmlText) {

  var listeLivre;
  var titre, auteur, desc, prix, categorie, image, nouveaute;
  var nbLivres, nbElements;
  var pos = 0;    // Position dans le tableau

  // On récupère tous les livres
  listeLivre = xmlText.getElementsByTagName("livre");

  // Nombre de livres
  nbLivres = listeLivre.length;

  // Nombre d'éléments par livre (Tous les livres ont le même nombre d'éléments !)
  nbElements = listeLivre[0].childNodes.length;


  // DEBUG  
  var txt;
  var nomBalise, valeurBalise;
  txt = "Liste :<br/>";
  // DEBUG 

  // Récupération des données
  for (var i = 0; i < nbLivres; i++) {

    // On récupère tous les champs 
    titre = listeLivre[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
    auteur = listeLivre[i].getElementsByTagName("auteur")[0].firstChild.nodeValue;
    desc = listeLivre[i].getElementsByTagName("desc")[0].firstChild.nodeValue;
    prix = listeLivre[i].getElementsByTagName("prix")[0].firstChild.nodeValue;
    categorie = listeLivre[i].getElementsByTagName("categorie")[0].firstChild.nodeValue;
    image = listeLivre[i].getElementsByTagName("image")[0].firstChild.nodeValue;
    nouveaute = listeLivre[i].getElementsByTagName("nouveaute")[0].firstChild.nodeValue;
    
    // On ajoute un livre au tableau
    var livre = new Livre();
    livre.Livre(
      titre,
      auteur,
      desc,
      prix,
      categorie,
      image,
      nouveaute,
    );
    livres[pos++] = livre;
    

    // DEBUG : On parcours les éléments de chaque livre
    for(j = 0 ; j < nbElements ; j++){
      // On ignore les "Text"
      if(listeLivre[i].childNodes[j].nodeType == 3) continue;
      // On récupère les champs
      nomBalise = listeLivre[i].childNodes[j].nodeName
      valeurBalise = listeLivre[i].childNodes[j].firstChild.nodeValue
      txt += nomBalise + " : " + valeurBalise + "<br/>";
    }
    txt+="<br/>";
    // DEBUG 
  }
  
  document.getElementById("siteContent").innerHTML = txt;
}


// Affichage de l'heure dans la page
// Source : https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function displayTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('displayTime').innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(displayTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}


 // Envoie du formulaire de contact (Simultation)
 function mySend(){
  // Si le formulaire est bien rempli, on l'envoie ! (enfin, on le cache...)
  if($("#contactModalForm").valid()){
    document.getElementById('id01').style.display='none';
  }
}

// Validation du formulaire
$(function() {
  $("#contactModalForm").validate({
    rules: {
      contactFormNom: {
        required: true
      },      
      contactFormPrenom: {
        required: true
      },      
      contactFormAddress: {
        required: true
      },
      contactFormPhone: {
        required: true,
        regex: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
      }, 
      contactFormEmail: {
        required: true,
        regex: /^(\w+\.)*\w+@(\w+\.)+[A-Za-z]+$/
      }
    },
    messages: {
      contactFormNom: {
        required: "Entrez votre nom"
      },
      contactFormPrenom: {
        required: "Entrez votre prénom"
      },
      contactFormAddress: {
        required: "Entrez votre adresse"
      },
      contactFormPhone: {
        required: "Entrez un numéro de téléphone",
        regex: "Veuillez respecter le format 123-456-7890"
      },
      contactFormEmail: {
        required: "Entrez votre courriel",
        regex: "Veuillez respecter le format pseudo@domaine.ca"
      }
    }
  });
});
// Validation Regex pour le formulaire
$.validator.addMethod("regex", function(value, element, regexpr) {          
  return regexpr.test(value);
});