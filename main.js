var contacts = [];
var photoInit = "image/user.png";
var urlPhotoInit = 'url("' + photoInit + '")';
var prenom_gotten = document.getElementById("prenom");
var nom_gotten = document.getElementById("nom");
var groupe_gotten = document.getElementById("groupe");
var bio_gotten = document.getElementById("bio");
var image = document.getElementById("file");
var spinner = document.getElementById("spinner");
var imageChoisie = document.getElementById("image_back");
var pagination = document.getElementById("pagination");
var bouton_create = document.getElementById("btn-create");
var bouton_reinit = document.getElementById("btn-initialize");
var input_file = document.getElementById("file");
var inputSearch = document.getElementById("search");
var btnSearch = document.getElementById("btn-search");

function get_value() {
  let tab = image.value.split("\\");
  return {
    prenom: prenom_gotten.value,
    nom: nom_gotten.value,
    groupe: groupe_gotten.value,
    bio: bio_gotten.value,
    photo: "image/" + tab[tab.length - 1],
  };
}
function areFieldsValid() {
  let contact = get_value();
  let testD_unicite = true;
  contacts.forEach((item) => {
    if (
      item.nom.toLowerCase() == contact.nom.toLowerCase() &&
      item.prenom.toLowerCase() == contact.prenom.toLowerCase()
    )
      testD_unicite = !testD_unicite;
  });
  if (
    contact.nom == "" ||
    contact.prenom == "" ||
    contact.groupe == "" ||
    contact.bio == "" ||
    contact.photo == "" ||
    testD_unicite == false
  ) {
    return false;
  }
  return true;
}
function init_list() {
  var liste = document.getElementById("ma-liste");
  while (liste.firstChild) {
    liste.removeChild(liste.firstChild);
  }
  for (let i = 0; i < contacts.length; i++) {
    add_to_dom(
      contacts[i].prenom,
      contacts[i].nom,
      contacts[i].groupe,
      contacts[i].bio,
      contacts[i].photo,
      i
    );
  }
}
function add_value() {
  let new_contact = get_value();
  console.log(new_contact);
  spinner.style.display = "none";
  contacts.push(new_contact);
  //   hideOrShowPagination();
  initialize("", "", "", "", "", urlPhotoInit);
  init_list();
}

function delete_item(event) {
  event.preventDefault();
  if (confirm("Voulez-vous supprimer ce contact ?")) {
    let id_value = event.target;
    let index_contact = parseInt(id_value.lastChild.textContent);
    contacts.splice(index_contact, 1);
    init_list();
    // hideOrShowPagination();
    if (contacts.length == 0) {
      spinner.style.display = "inherit";
    }
  }
}
function modifier(index) {
  let contactAmodifier = contacts[index];
  initialize(
    contactAmodifier.prenom,
    contactAmodifier.nom,
    contactAmodifier.groupe,
    contactAmodifier.bio,
    contactAmodifier.photo
  );
}
function add_to_dom(prenom, nom, groupe, bio, photo, id) {
  var contact_list = document.getElementById("ma-liste");
  var contact_element = document.createElement("div");
  var contact_element_photo = document.createElement("div");
  //var contact_element_photo_image = document.createElement("img");
  var contact_element_text = document.createElement("div");
  var contact_element_text_fullname = document.createElement("h3");
  var contact_element_text_groupe = document.createElement("h3");
  var contact_element_text_bio = document.createElement("p");
  var delete_element = document.createElement("span");
  var id_value = document.createElement("span");
  let modif_element = document.createElement("span");

  id_value.classList.add("hide-me");
  id_value.textContent = id;
  delete_element.textContent = "X";
  delete_element.classList.add("delete");
  delete_element.setAttribute("id", "delete");
  delete_element.addEventListener("click", delete_item);
  delete_element.appendChild(id_value);

  //   contact_element_photo_image.setAttribute("src", photo);
  //   contact_element_photo_image.setAttribute("alt", "photo de profil");

  contact_element_text_fullname.textContent = prenom + " " + nom;
  contact_element_text_groupe.textContent = groupe;
  contact_element_text_bio.textContent = bio;
  contact_element_photo.style.backgroundImage = 'url("' + photo + '")';
  contact_element_photo.classList.add("photo");
  //contact_element_photo.appendChild(contact_element_photo_image);

  contact_element_text.classList.add("texte");
  contact_element_text.appendChild(contact_element_text_fullname);
  contact_element_text.appendChild(contact_element_text_groupe);
  contact_element_text.appendChild(contact_element_text_bio);

  contact_element.classList.add("contact-element");
  contact_element.appendChild(contact_element_photo);
  contact_element.appendChild(contact_element_text);
  contact_element.appendChild(delete_element);
  contact_element.appendChild(modif_element);
  console.log(contact_element);
  contact_list.appendChild(contact_element);
  console.log(contact_list);
}
function initialize(prenom, nom, groupe, bio, photo) {
  //   prenom_gotten.value = prenom;
  //   nom_gotten.value = nom;
  //   groupe_gotten.value = groupe;
  //   bio_gotten.value = bio;
  imageChoisie.style.backgroundImage = photo;
}
// function hideOrShowPagination() {
//   contacts.length > 3
//     ? pagination.classList.replace("sans-pagination", "pagination")
//     : pagination.classList.replace("pagination", "sans-pagination");
// }
function checkInputSearch(valeurSaisie) {
  let arr = valeurSaisie.split(" ");
  if (arr.length != 2) {
    return false;
  }
  return true;
}
function searchContact(fullname) {
  let arr = fullname.split(" ");
  return contacts.find((contact) => {
    if (
      contact.prenom.toLowerCase() == arr[0].toLowerCase() &&
      contact.nom.toLowerCase() == arr[1].toLowerCase()
    ) {
      return contact;
    }
  });
}

function addToDomAfterSearch(contactFound) {
  var liste = document.getElementById("ma-liste");
  while (liste.firstChild) {
    liste.removeChild(liste.firstChild);
  }
  add_to_dom(
    contactFound.prenom,
    contactFound.nom,
    contactFound.groupe,
    contactFound.bio,
    contactFound.photo,
    1
  );
}

bouton_create.addEventListener("click", (event) => {
  event.preventDefault();
  areFieldsValid()
    ? add_value()
    : alert(`
    Veuillez remplir tous les champs ou rassurez-vous que
    la combinaison nom et prénom est unique
    `);
});

bouton_reinit.addEventListener("click", initialize("", urlPhotoInit));

input_file.addEventListener("change", (event) => {
  event.preventDefault();
  var image = document.getElementById("file");
  var tab = image.value.split("\\");
  console.log(tab[tab.length - 1]);
  var div_image = document.getElementById("image_back");
  div_image.style.backgroundImage = 'url("image/' + tab[tab.length - 1] + '")';
});

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  const contactTrouve = searchContact(inputSearch.value);
  if (contacts.length == 0) {
    return alert("Aucun contact n'est enregistré");
  }
  if (checkInputSearch(inputSearch.value)) {
    contactTrouve != undefined
      ? addToDomAfterSearch(contactTrouve)
      : alert("Ce contact n'existe pas");
  } else {
    alert(`
        Veuillez vérifier le nom et le prénom renseignés 
        sachant qu'ils doivent être séparés par un seul espace
        `);
  }
});
