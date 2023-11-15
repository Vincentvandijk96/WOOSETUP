const repoOwner = 'OpenCoevorden';
const repoName = 'publicaties';
const pathToDocs = 'docs/';
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToDocs}`;

let data = [];

async function fetchPDFs() {
    try {
        const response = await fetch(apiUrl);
        data = await response.json();

        console.log('Opgehaalde gegevens:', data);

        // Toon alle PDF's bij het starten van de pagina
        filterPDFs();
    } catch (error) {
        console.error(error);
        // Voeg hier code toe om de gebruiker te informeren over de fout
    }
}

function filterPDFs() {
    const pdfList = document.getElementById('pdf-list');
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    pdfList.innerHTML = '';

    data.forEach(item => {
        if (item.name.endsWith('.pdf')) {
            const fileName = item.name.toLowerCase();
            if (fileName.includes(searchTerm)) {
                addListItem(pdfList, item);
            }
        }
    });
}

function addListItem(pdfList, item) {
    const listItem = document.createElement('li');

    const prefixDiv = document.createElement('div');
    prefixDiv.classList.add('prefix');
    prefixDiv.textContent = item.name.split(' ')[0];
    listItem.appendChild(prefixDiv);

    const link = document.createElement('a');
    link.href = `https://opencoevorden.nl/${item.name}`;
    link.textContent = item.name.split(' ').slice(1).join(' ');
    link.target = '_blank';
    listItem.appendChild(link);

    pdfList.appendChild(listItem);
}

document.getElementById('searchInput').addEventListener('input', filterPDFs);

fetchPDFs();
