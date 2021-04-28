let contacts = [];
let photoInit = "image/user.png";
let urlPhotoInit = 'url("' + photoInit + '")';
let prenom_gotten = document.getElementById("prenom");
let nom_gotten = document.getElementById("nom");
let groupe_gotten = document.getElementById("groupe");
let bio_gotten = document.getElementById("bio");
let image = document.getElementById("file");
let spinner = document.getElementById("spinner");
let imageChoisie = document.getElementById("image_back");
let pagination = document.getElementById("pagination");
let bouton_create = document.getElementById("btn-create");
let bouton_reinit = document.getElementById("btn-initialize");
let inputFile = document.getElementById("file");
let inputSearch = document.getElementById("search");
let btnSearch = document.getElementById("btn-search");
let imagePickedUrl = "";

function getEnteredValue() {
  return {
    prenom: prenom_gotten.value,
    nom: nom_gotten.value,
    groupe: groupe_gotten.value,
    bio: bio_gotten.value,
    photo: imagePickedUrl,
  };
}
function areFieldsValid() {
  let contact = getEnteredValue();
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
  let liste = document.getElementById("ma-liste");
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
function addValue() {
  let new_contact = getEnteredValue();
  spinner.style.display = "none";
  contacts.push(new_contact);
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
    if (contacts.length == 0) {
      spinner.style.display = "inherit";
    }
  }
}
function add_to_dom(prenom, nom, groupe, bio, photo, id) {
  let contact_list = document.getElementById("ma-liste");
  let contact_element = document.createElement("div");
  let contact_element_photo = document.createElement("div");
  let contact_element_text = document.createElement("div");
  let contact_element_text_fullname = document.createElement("h3");
  let contact_element_text_groupe = document.createElement("h3");
  let contact_element_text_bio = document.createElement("p");
  let delete_element = document.createElement("span");
  let id_value = document.createElement("span");
  let modif_element = document.createElement("span");

  id_value.classList.add("hide-me");
  id_value.textContent = id;
  delete_element.textContent = "X";
  delete_element.classList.add("delete");
  delete_element.setAttribute("id", "delete");
  delete_element.addEventListener("click", delete_item);
  delete_element.appendChild(id_value);
  contact_element_text_fullname.textContent = prenom + " " + nom;
  contact_element_text_groupe.textContent = groupe;
  contact_element_text_bio.textContent = bio;
  contact_element_photo.style.backgroundImage = 'url("' + photo + '")';
  contact_element_photo.classList.add("photo");

  contact_element_text.classList.add("texte");
  contact_element_text.appendChild(contact_element_text_fullname);
  contact_element_text.appendChild(contact_element_text_groupe);
  contact_element_text.appendChild(contact_element_text_bio);

  contact_element.classList.add("contact-element");
  contact_element.appendChild(contact_element_photo);
  contact_element.appendChild(contact_element_text);
  contact_element.appendChild(delete_element);
  contact_element.appendChild(modif_element);
  contact_list.appendChild(contact_element);
}
function initialize(prenom, nom, groupe, bio, photo) {
  prenom_gotten.value = prenom;
  nom_gotten.value = nom;
  groupe_gotten.value = groupe;
  bio_gotten.value = bio;
  imageChoisie.style.backgroundImage = photo;
}
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
  let liste = document.getElementById("ma-liste");
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
    ? addValue()
    : alert(`
    Veuillez remplir tous les champs ou rassurez-vous que
    la combinaison nom et prénom est unique
    `);
});

bouton_reinit.addEventListener(
  "click",
  initialize("", "", "", "", urlPhotoInit)
);

inputFile.addEventListener("change", (event) => {
  event.preventDefault();
  let imagePicked = inputFile.files[0];
  let divImage = document.getElementById("image_back");
  if (imagePicked != null) {
    imagePickedUrl = `${URL.createObjectURL(imagePicked)}`;
    divImage.style.backgroundImage = `url(${imagePickedUrl})`;
  }
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
