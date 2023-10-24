const repoOwner = 'Vincentvandijk96';
const repoName = 'woodocumenten';
const pathToDocs = 'docs/'; // Het pad naar de map met PDF-bestanden
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToDocs}`;

async function fetchPDFs() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Opgehaalde gegevens:', data);

        const pdfList = document.getElementById('pdf-list');
        const searchInput = document.getElementById('searchInput');

        function filterPDFs() {
            const searchTerm = searchInput.value.toLowerCase();
            pdfList.innerHTML = ''; // Leeg de lijst voordat je opnieuw gaat filteren
            
            data.forEach(item => {
                if (item.name.endsWith('.pdf')) {
                    const fileName = item.name.toLowerCase();
                    if (fileName.includes(searchTerm)) {
                        const listItem = document.createElement('li');

                        // Maak een div voor de prefix en voeg deze toe aan het lijstitem
                        const prefixDiv = document.createElement('div');
                        prefixDiv.classList.add('prefix');
                        prefixDiv.textContent = item.name.split(' ')[0]; // Neem het deel voor het eerste "-"
                        listItem.appendChild(prefixDiv);

                        // Maak de link naar het PDF-bestand en voeg deze toe aan het lijstitem
                        const link = document.createElement('a');
                        link.href = `https://${repoOwner}.github.io/${repoName}/${item.name}`;
                        link.textContent = item.name.split(' ').slice(1).join(' '); // Neem het deel na het eerste "-"
                        link.target = '_blank'; // Open de link in een nieuw tabblad
                        listItem.appendChild(link);

                        pdfList.appendChild(listItem);
                    }
                }
            });
        }

        searchInput.addEventListener('input', filterPDFs);

        // Toon alle PDF's bij het starten van de pagina
        filterPDFs();
    } catch (error) {
        console.error(error);
    }
}


// Maak een nieuw link-element aan om het CSS-bestand te laden
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "https://vincentvandijk96.github.io/woopublicatie/style.css"; // Vervang dit door het pad naar jouw CSS-bestand




// Event listener die wordt geactiveerd wanneer de pagina is geladen
window.addEventListener('load', function() {
    // De gewenste URL waar je naar wilt controleren
    var gewensteUrl = 'https://coevorden.acc.openonline.weareyou.io/woo-publicaties';

    // Huidige URL van de webpagina
    var huidigeUrl = window.location.href;

    // Controleer of de huidige URL overeenkomt met de gewenste URL
    if (huidigeUrl === gewensteUrl) {
        console.log('Je bent op de gewenste URL.');
        // Voer hier de gewenste acties uit als de URL overeenkomt
            //voer script uit
            fetchPDFs();

            // Voeg het css in
            document.head.appendChild(link);
    } else {
        console.log('Je bent niet op de gewenste URL.');
        // Voer hier de gewenste acties uit als de URL niet overeenkomt
    }
});


