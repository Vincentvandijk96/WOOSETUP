const accessToken = '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';
const repoOwner = 'Vincentvandijk96';
const repoName = 'WOOSETUP';
const pathToDocs = 'docs/'; // The path to the folder containing PDF files

const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToDocs}`;

async function fetchPDFs() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const pdfList = document.getElementById('pdf-list');
        const searchInput = document.getElementById('searchInput');

        function filterPDFs() {
            const searchTerm = searchInput.value.toLowerCase();
            pdfList.innerHTML = ''; // Clear the list before filtering again

            data.forEach(item => {
                if (item.name.toLowerCase().endsWith('.pdf')) {
                    const fileNameParts = item.name.toLowerCase().split('.pdf');
                    const fileName = fileNameParts[0] + '.pdf'; // Correct the file name format
                    if (fileName.includes(searchTerm)) {
                        const listItem = document.createElement('li');

                        // Create a div for the prefix and add it to the list item
                        const prefixDiv = document.createElement('div');
                        prefixDiv.classList.add('prefix');
                        prefixDiv.textContent = fileName.split('-')[0]; // Take the part before the first "-"
                        listItem.appendChild(prefixDiv);

                        // Create the link to the PDF file and add it to the list item
                        const link = document.createElement('a');
                        link.href = `https://${repoOwner}.github.io/${repoName}/${item.name}`;
                        link.textContent = fileName.split('-').slice(1).join('-'); // Take the part after the first "-"
                        listItem.appendChild(link);

                        pdfList.appendChild(listItem);
                    }
                }
            });
        }

        searchInput.addEventListener('input', filterPDFs);

        // Display all PDFs when the page starts
        filterPDFs();
    } catch (error) {
        console.error(error);
    }
}

fetchPDFs();
