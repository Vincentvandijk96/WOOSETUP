const accessToken = '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';
const repoOwner = 'Vincentvandijk96';
const repoName = 'WOOSETUP';
const pathToDocs = 'docs/'; // Het pad naar de map met PDF-bestanden

const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToDocs}`;

async function fetchPDFs() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const pdfList = document.getElementById('pdf-list');
        const searchInput = document.getElementById('search-input');

        function filterPDFs() {
            const searchTerm = searchInput.value.toLowerCase();
            pdfList.innerHTML = ''; // Leeg de lijst voordat je opnieuw gaat filteren
            
            data.forEach(item => {
                if (item.name.endsWith('.pdf')) {
                    const fileName = item.name.toLowerCase();
                    if (fileName.includes(searchTerm)) {
                        const listItem = document.createElement('li');
                        
                        // Bestandsnaam splitsen om prefix en naam te verkrijgen
                        const fileNameParts = item.name.split('-');
                        const prefix = fileNameParts[0];
                        const fileWithoutPrefix = fileNameParts.slice(1).join('-');
                        
                        // Maak een link naar het PDF-bestand op GitHub Pages
                        const link = document.createElement('a');
                        link.href = `https://${repoOwner}.github.io/${repoName}/${pathToDocs}${item.name}`;
                        link.textContent = fileWithoutPrefix; // Toon alleen de naam van het bestand
                        listItem.appendChild(link);
                        
                        // Voeg het voorvoegsel toe aan een aparte div
                        const prefixDiv = document.createElement('div');
                        prefixDiv.textContent = prefix;
                        listItem.appendChild(prefixDiv);
                        
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





