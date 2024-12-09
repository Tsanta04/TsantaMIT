function afficherContenu(contenu) {
    document.getElementById('contenu-accueil').style.display = 'none';
    document.getElementById('contenu-services').style.display = 'none';
    document.getElementById('contenu-contact').style.display = 'none';

    document.getElementById('contenu-' + contenu).style.display = 'block';
}
