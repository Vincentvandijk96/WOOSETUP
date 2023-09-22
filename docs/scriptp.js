const accessToken = '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';
const repoOwner = 'Vincentvandijk96';
const repoName = 'WOOSETUP';
const pathToDocs = 'docs/'; // Het pad naar de map met PDF-bestanden
const perPage = 2; // Aantal documenten per pagina

let currentPage = 1;
let searchTerm = '';

async function fetchPDFs(page) {
    try {
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToDocs}?page=${page}&per_page=${perPage}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const pdfList = document.getElementById('pdf-list');
        pdfList.innerHTML = ''; // Leeg de lijst voordat je documenten toevoegt

        data.forEach(item => {
            if (item.name.endsWith('.pdf')) {
                const listItem = document.createElement('li');

                // Maak de link naar het PDF-bestand en voeg deze toe aan het lijstitem
                const link = document.createElement('a');
                link.href = `https://${repoOwner}.github.io/${repoName}/${item.name}`;
                link.textContent = item.name;
                listItem.appendChild(link);

                pdfList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error(error);
    }
}

function filterAndLoadPDFs() {
    currentPage = 1; // Reset naar pagina 1 bij elke nieuwe zoekopdracht
    searchTerm = document.getElementById('searchInput').value.toLowerCase();
    fetchPDFs(currentPage);
}

document.getElementById('searchInput').addEventListener('input', filterAndLoadPDFs);

document.getElementById('nextPageBtn').addEventListener('click', () => {
    currentPage++;
    fetchPDFs(currentPage);
});

document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPDFs(currentPage);
    }
});

// Toon alle PDF's bij het starten van de pagina
fetchPDFs(currentPage);

// Maak een nieuw link-element aan om het CSS-bestand te laden
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "https://vincentvandijk96.github.io/WOOSETUP/style.css"; // Vervang dit door het pad naar jouw CSS-bestand

// Voeg het link-element toe aan de <head> van de HTML-pagina
document.head.appendChild(link);
