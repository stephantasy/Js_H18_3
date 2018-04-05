/* Stéphane Barthélemy (20084771) */
/* IFT1142 - TP3 */



var livres = [];  // Tableau des livres
var panier = [
  /*{"id":1, "nombre":1},
  {"id":2, "nombre":1},
  {"id":3, "nombre":2}*/
];  // Tableau des articles dans le panier


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

function afficheContenuPage(filtre){

  // Pas de paramètre
  if (typeof filtre == 'undefined'){
    // On affiche les nouveautés
    var listElements = getElementsNouveautes();
    $("#livresCard").append(listElements);
  }

}

// Construit et renvoie la liste des livres étant tagués "Nouveauté"
function getElementsNouveautes(){
  var listeCard = document.createElement("div");
  listeCard.setAttribute("class", "w3-container");  

  var tailleLivres = livres.length;
  for(var i = 0 ; i < tailleLivres ; i++){
    //if(livres[i].nouveaute == 1){
      listeCard.appendChild(getCardElement(livres[i]));
    //}
  }

  return listeCard;
}

// Renvoie un élément Card contenant les informations d'un livre
function getCardElement(leLivre){
  var laCard = document.createElement("div");
  laCard.setAttribute("class", "w3-card-4 w3-white zoom card"); 
  laCard.setAttribute("style", "width:250px"); 
  
  var leHeader = document.createElement("div");
  leHeader.setAttribute("class", "w3-container w3-red w3-center");  
  var leHeaderText = document.createElement("h4");
  leHeaderText.innerHTML = "Nouveauté !";
  leHeader.appendChild(leHeaderText);

  
  var leCorps = document.createElement("div");
  leCorps.setAttribute("class", "w3-container w3-center"); 
  
  var lImage = document.createElement("img");  
  lImage.setAttribute("src", "images/" + leLivre.image); 
  lImage.setAttribute("alt", "Image Livre"); 
  lImage.setAttribute("class", "w3-card-4"); 
  lImage.setAttribute("style", "height:200px");
  var lAuteur = document.createElement("h5");
  lAuteur.innerHTML = leLivre.auteur;
  var lePrix = document.createElement("h6");
  lePrix.innerHTML = (parseFloat(leLivre.prix.replace(',','.'))).toFixed(2) + "$";
  
  var leBtnDiv = document.createElement("div");
  leBtnDiv.setAttribute("class", "w3-section"); 
  var leBtn = document.createElement("button");
  leBtn.setAttribute("class", "w3-button w3-green"); 
  leBtn.innerHTML = "Ajouter";
  leBtnDiv.appendChild(leBtn);

  leCorps.appendChild(lImage);
  leCorps.appendChild(lAuteur);
  leCorps.appendChild(lePrix);
  leCorps.appendChild(leBtnDiv);


  laCard.appendChild(leHeader);
  laCard.appendChild(leCorps);

  return laCard;

}

// Affiche le contenu du panier
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
  
  var nblements = panier.length;
  if(nblements > 0){
    // On construit chaque élément
    for(var i = 0 ; i < nblements ; i++){    
      var article = panier[i];
        var element = createNewListElement(
          article.id,
          livres[article.id].titre, 
          livres[article.id].auteur, 
          livres[article.id].image, 
          livres[article.id].prix, 
          article.nombre);
        listeUl.appendChild(element);
    }
  }else{
    // Panier vide
    var element = document.createElement("h2");
    element.setAttribute("class", "w3-center w3-padding");
    element.innerHTML = "Votre panier est vide !";
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
function createNewListElement(id, titre, auteur, image, prix, qte){
  // L'élément
  var element = document.createElement("li");
  element.setAttribute("id", id);
  element.setAttribute("class", "w3-bar");

  // Croix pour supprimer l'élément
  var spanButtonDelete = document.createElement("span");
  spanButtonDelete.setAttribute("class", "w3-bar-item w3-button w3-white w3-xlarge w3-right");
  spanButtonDelete.setAttribute("onClick", "deleteElementPanier(this);");
  spanButtonDelete.innerHTML = "X";
  
  // Zone Image du livre
  var imgLivre = document.createElement("img");
  imgLivre.setAttribute("src", "images/" + image);
  imgLivre.setAttribute("alt", "Image Livre"); 
  imgLivre.setAttribute("class", "w3-bar-item w3-hide-small");
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
  divTitleAuthor.setAttribute("style", "width:45%");
  divTitleAuthor.appendChild(spanTitre);
  divTitleAuthor.appendChild(cr);
  divTitleAuthor.appendChild(spanAuteur);

  // === Zone Ajout/suppression quantité ===
  // Bouton -
  var divMinusButton = document.createElement("button");
  divMinusButton.setAttribute("class", "w3-button w3-round-large w3-section w3-blue w3-ripple");
  divMinusButton.setAttribute("onClick", "removeElementPanier(this);");
  divMinusButton.innerHTML = "-";
  // Quantité
  var hQte = document.createElement("h4");
  hQte.setAttribute("id", "elQte" + id);
  hQte.setAttribute("class", "w3-section w3-badge w3-white");
  hQte.innerHTML = qte;
  // Bouton +
  var divPlusButton = document.createElement("button");
  divPlusButton.setAttribute("class", "w3-button w3-round-large w3-section w3-blue w3-ripple");
  divPlusButton.setAttribute("onClick", "addElementPanier(this);");
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
  spanPrice.setAttribute("id", "elPrice" + id);
  spanPrice.innerHTML = (parseFloat(prix.replace(',','.'))*qte).toFixed(2) + "$";
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


// Décrémente un article du panier
function removeElementPanier(element){
  var id = element.parentElement.parentElement.id;  
  var taille = panier.length;
  var article;
  // On ôte un article du panier (Tableau)
  for(var i = 0 ; i < taille ; i++){
    article = panier[i];
    if(article.id == id){
      // Seulement s'il en reste au moins 2
      if(article.nombre > 1){
        // On retranche
        article.nombre--;
        
        // On rafraichi le nombre dans l'élément
        $("#elQte" + id).text(article.nombre);

        // On rafraichi le prix dans l'élément
        $("#elPrice" + id).text((parseFloat(livres[article.id].prix.replace(',','.'))*article.nombre).toFixed(2) + "$");

        // On rafraichi le calcul du total
        refreshSommePanier();
      }
      break;  // Inutile de continuer
    }
  }
}

// Incrément un article du panier
function addElementPanier(element){
  var id = element.parentElement.parentElement.id;  
  var taille = panier.length;
  var article;
  // On ôte un article du panier (Tableau)
  for(var i = 0 ; i < taille ; i++){
    article = panier[i];
    if(article.id == id){
      // On ajoute
      article.nombre++;
        
      // On rafraichi le nombre dans l'élément
      $("#elQte" + id).text(article.nombre);

      // On rafraichi le prix dans l'élément
      $("#elPrice" + id).text((parseFloat(livres[article.id].prix.replace(',','.'))*article.nombre).toFixed(2) + "$");

      // On rafraichi le calcul du total
      refreshSommePanier();
      
      break;  // Inutile de continuer
    }
  }
}

// Supprime un article du panier
function deleteElementPanier(element){

  var id = element.parentElement.id;
  var taille = panier.length;
  // On supprime l'élément du panier (Tableau)
  for(var i = 0 ; i < taille ; i++){
    if(panier[i].id == id){
      panier.splice(i, 1);
      break;  // Inutile de continuer
    }
  }
  // On supprime l'élément du panier (Modal)
  element.parentElement.parentElement.removeChild(element.parentElement);

  // On rafraichi le calcul du total
  refreshSommePanier();
}

// Calcul le montant total du panier
function refreshSommePanier(){
  // TODO
}

// DEBUG
function AlertPanier(){  
  var popo = "";
  var taille = panier.length;
  for(var i = 0 ; i < taille ; i++){
    popo += panier[i].id;
    if(i < taille - 1){
      popo += ", ";
    } 
  }
  alert("panier = " + popo);
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

  /*for(var i=0 ; i < livres.length ; i++){
    alert(" livres = " + livres[i].affiche());
  }*/

  

}

// Téléchargement du fichier de données (XML)
function downloadXmlFile() {
  $.ajax({
    url: 'Data/Livres.xml',
    type: 'GET',
    dataType: 'xml',
    success: function(listeLivres){
      xmlToArray(listeLivres);
      afficheContenuPage();
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