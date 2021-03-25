var contacts = [];

function get_value(){
    var prenom_gotten = document.getElementById("prenom");
    var nom_gotten = document.getElementById("nom");
    var groupe_gotten = document.getElementById("groupe");
    var bio_gotten = document.getElementById("bio");
    var image = document.getElementById("file");
    var tab = image.value.split("\\");

    return {
        prenom : prenom_gotten.value,
        nom : nom_gotten.value,
        groupe : groupe_gotten.value,
        bio : bio_gotten.value,
        photo : "image\\" + tab[tab.length -1]
    };
}
function test_values(){
    var contact = get_value();
    if(contact.nom == "" || contact.prenom == "" || 
    contact.groupe == "" || contact.bio == "" || contact.photo == "") {
        return false;
    }
    return true;
}
function init_list(){
    var liste = document.getElementById("ma-liste");
    while(liste.firstChild){
        liste.removeChild(liste.firstChild);
    }
    for (let i = 0; i < contacts.length; i++) {
        add_to_dom(contacts[i].prenom, contacts[i].nom, 
            contacts[i].groupe, contacts[i].bio, contacts[i].photo, i
                   );        
    }
}
function add_value(){
    contacts.push(get_value());
    init_list();
    initialize();
}

function delete_item(event){
    event.preventDefault();
    var id_value = event.target;
    console.log(id_value.lastChild.textContent);
    contacts.splice(+id_value.lastChild.textContent, 1);
    init_list();

           
}
function add_to_dom(prenom, nom, groupe, bio, photo, id){
    var contact_list = document.getElementsByClassName('contact-list');
    var contact_element = document.createElement("div");
    var contact_element_photo = document.createElement("div");
    var contact_element_photo_image = document.createElement('img');
    var contact_element_text = document.createElement('div');
    var contact_element_text_fullname = document.createElement('h3');
    var contact_element_text_groupe = document.createElement('h3');
    var contact_element_text_bio = document.createElement('p');
    var delete_element = document.createElement('span');
    var id_value = document.createElement('span');
    
    id_value.classList.add('hide-me');
    id_value.textContent = id;
    delete_element.textContent = "X";
    delete_element.classList.add("delete");
    delete_element.setAttribute('id', "delete");    
    delete_element.addEventListener('click', delete_item);

    delete_element.appendChild(id_value);
    contact_element_photo_image.setAttribute('src', photo);
    contact_element_photo_image.setAttribute('alt', 'photo de profil');

    
    contact_element_text_fullname.textContent = prenom + " " + nom;
    contact_element_text_groupe.textContent = groupe;
    contact_element_text_bio.textContent = bio;

    contact_element_photo.classList.add("photo");
    contact_element_photo.appendChild(contact_element_photo_image);

    

    contact_element_text.classList.add("texte");
    contact_element_text.appendChild(contact_element_text_fullname);
    contact_element_text.appendChild(contact_element_text_groupe);
    contact_element_text.appendChild(contact_element_text_bio);

    contact_element.classList.add("contact-element"); 
    contact_element.appendChild(contact_element_photo);
    contact_element.appendChild(contact_element_text);
    contact_element.appendChild(delete_element);
    contact_list[0].appendChild(contact_element);

}
function initialize(event){
    event.preventDefault();
    var prenom_gotten = document.getElementById("prenom");
    var nom_gotten = document.getElementById("nom");
    var groupe_gotten = document.getElementById("groupe");
    var bio_gotten = document.getElementById("bio");
    var image_gotten = document.getElementById("file")

    prenom_gotten.value = "";
    nom_gotten.value = "";
    groupe_gotten.value = "";
    bio_gotten.value = "";
    image_gotten.value = "";

}

var bouton_create = document.getElementById("btn-create");
var bouton_reinit = document.getElementById("btn-initialize");
var input_file = document.getElementById("file");

bouton_create.addEventListener('click', function(event){
    event.preventDefault();
    test_values() == true ? add_value() : alert("Veuillez remplir tous les champs");     
});
bouton_reinit.addEventListener('click', initialize);
input_file.addEventListener('change', function(event){
    event.preventDefault();
    var image = document.getElementById("file");
    var tab = image.value.split("\\");
    console.log(tab[tab.length -1]);
    var div_image = document.getElementById("image_back");
    div_image.style.backgroundImage = 'url("image/' + tab[tab.length -1] + '")';
});





