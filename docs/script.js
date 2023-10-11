const repoOwner = 'Vincentvandijk96';
const repoName = 'WOO';
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
                        prefixDiv.textContent = item.name.split('-')[0]; // Neem het deel voor het eerste "-"
                        listItem.appendChild(prefixDiv);

                        // Maak de link naar het PDF-bestand en voeg deze toe aan het lijstitem
                        const link = document.createElement('a');
                        link.href = `https://${repoOwner}.github.io/${repoName}/${item.name}`;
                        link.textContent = item.name.split('-').slice(1).join('-'); // Neem het deel na het eerste "-"
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

fetchPDFs();

// Maak een nieuw link-element aan om het CSS-bestand te laden
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "https://vincentvandijk96.github.io/WOOSETUP/style.css"; // Vervang dit door het pad naar jouw CSS-bestand

// Voeg het link-element toe aan de <head> van de HTML-pagina
document.head.appendChild(link);
