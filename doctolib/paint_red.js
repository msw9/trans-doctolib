const name = document.getElementById("profile-name-with-title");
const icone = document.createElement('span');
const lien = document.createElement('a');
const allEqual = (arr,x) =>arr.every(val => x.includes(val));
// charger les icônes
function iconsLoader(){
	const lien = document.createElement('link');
	lien.rel = 'stylesheet';
	lien.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
	document.head.appendChild(lien);
}
iconsLoader();
// créer icône à côté du nom

// main
fetch('https://raw.githubusercontent.com/msw9/trans-doctolib-ressources/main/doctolib.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(docteurs) {
  for (let i=0;i < docteurs.length;i++){
	if (allEqual(docteurs[i]['noms'].toLowerCase().split(' '),name.querySelector("span").textContent.toLowerCase())){
		if (docteurs[i]['transfriendly']==='False'){
			name.style.color = "red";
			icone.setAttribute("class","material-icons");
			icone.style.paddingLeft = "20px";
			icone.style.color = "red";
			icone.textContent = "newspaper";
			lien.href = docteurs[i]['source'];
			lien.appendChild(icone);
			name.appendChild(lien);
			break;
		} else if (docteurs[i]['transfriendly']==='True'){
			name.style.color = "green";
			icone.setAttribute("class","material-icons");
			icone.style.paddingLeft = "20Px";
			icone.style.color = "green";
			icone.textContent = "newspaper";
			lien.href = docteurs[i]['source'];
			lien.appendChild(icone);
			name.appendChild(lien);
			break;
		}
	}
}
  });