        const accessToken = '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';
        const repoOwner = 'Vincentvandijk96';
        const repoName = 'WOOSETUP';
        const pathToDocs = 'docs/'; // Het pad naar de map met PDF-bestanden
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToDocs}`;
        const searchInput = document.getElementById('searchInput');
        const pdfList = document.getElementById('pdf-list');

        async function fetchPDFs(query = '') {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                pdfList.innerHTML = ''; // Clear the previous results

                data.forEach(item => {
                    if (item.name.endsWith('.pdf') && item.name.includes(query)) {
                        const listItem = document.createElement('li');
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

        // Add an event listener to the search input
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            fetchPDFs(query);
        });

        // Fetch PDFs initially without a query (show all)
        fetchPDFs();
