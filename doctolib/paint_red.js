const name = document.getElementById("profile-name-with-title");
const allEqual = (arr, x) => arr.every(val => x.includes(val));

// Charger les icônes
function iconsLoader() {
    const lien = document.createElement('link');
    lien.rel = 'stylesheet';
    lien.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(lien);
}
iconsLoader();

// Main
fetch('https://raw.githubusercontent.com/msw9/trans-doctolib-ressources/main/doctolib.json')
    .then(response => response.json())
    .then(docteurs => {
        fetch('https://raw.githubusercontent.com/msw9/trans-doctolib-ressources/main/sources.csv')
            .then(response => response.text())
            .then(csvText => {
                const sources = parseCSV(csvText);
                for (let i = 0; i < docteurs.length; i++) {
                    if (allEqual(docteurs[i]['noms'].toLowerCase().split(' '), name.querySelector("span").textContent.toLowerCase())) {
                        const label = document.createElement('span'); // Create a new span for the label
                        const icone = document.createElement('span'); // Create a span for the icon
                        icone.setAttribute("class", "material-icons");
                        icone.style.marginRight = "5px";
                        icone.style.fontSize = "18px";
                        icone.textContent = "newspaper";

                        if (docteurs[i]['transfriendly'] === 'False') {
                            label.style.backgroundColor = "#fecaca";
                            label.style.color = "#991b1b";
                            label.style.padding = "2px 10px";
                            label.style.borderRadius = "20px";
                            label.style.marginLeft = "10px"; // Adjust margin if needed
                            label.textContent = "Trans not friendly";
                            label.style.display = "inline-flex";
                            label.style.alignItems = "center";
                            label.style.fontSize = "16px";
                        } else if (docteurs[i]['transfriendly'] === 'True') {
                            label.style.backgroundColor = "#bbf7d0";
                            label.style.color = "#166534";
                            label.style.padding = "2px 10px";
                            label.style.borderRadius = "20px";
                            label.style.marginLeft = "10px"; // Adjust margin if needed
                            label.textContent = "Trans friendly";
                            label.style.display = "inline-flex";
                            label.style.alignItems = "center";
                            label.style.fontSize = "16px";
                        }

                        label.insertBefore(icone, label.firstChild);
                        const lien = document.createElement('a');
                        lien.href = docteurs[i]['source'];
                        lien.appendChild(label);
                        name.appendChild(lien);

                        addTooltip(lien, sources[docteurs[i]['source']]);
                        break;
                    }
                }
            });
    });

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(';');
    const result = {};

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(';');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : "";
        }
        result[obj['Lien']] = obj;
    }

    return result;
}

function addTooltip(linkElement, source) {
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#FFFFFF';
    tooltip.style.border = '1px solid #F2F2F2';
    tooltip.style.padding = '10px';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '1000';
    tooltip.style.maxWidth = '500px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
    tooltip.style.cursor = 'pointer';

    tooltip.innerHTML = `<strong style="font-size: 20px; line-height: 24px;">${source.Titre}</strong>
                        <hr style="margin-bottom: 8px; margin-top: 8px;">
                        <span style="font-size: 16px;">${source.Abstract}</span>
                        <br>
                        <span style="font-size: 16px; color: #107aca; text-decoration: underline; padding-top: 8px; margin-left: auto; display: block; text-align: right;">Lire l'article ↗</span>`;

    document.body.appendChild(tooltip);

    // Update the link element to open in a new tab
    linkElement.setAttribute('target', '_blank');

    linkElement.addEventListener('mouseenter', function () {
        const rect = linkElement.getBoundingClientRect();
        tooltip.style.top = rect.bottom + 'px';
        tooltip.style.left = rect.left + 'px';
        tooltip.style.display = 'block';
    });

    linkElement.addEventListener('mouseleave', function () {
        setTimeout(() => {
            if (!tooltip.matches(':hover')) {
                tooltip.style.display = 'none';
            }
        }, 300);
    });

    tooltip.addEventListener('mouseenter', function () {
        tooltip.style.display = 'block';
    });

    tooltip.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
    });

    // Make the tooltip clickable
    tooltip.addEventListener('click', function () {
        window.open(source.Lien, '_blank');
    });
}

