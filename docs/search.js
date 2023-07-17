const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[name="query"]');
const documentList = document.querySelector('ul');

searchForm.addEventListener('submit', (event) => {
event.preventDefault();

// Get the search query
const query = searchInput.value;

// Search for the query in the PDF documents
const documents = [...documentList.children].filter(document => document.textContent.includes(query));

// Render the results
documentList.innerHTML = '';
documents.forEach(document => {
documentList.appendChild(document);
});
});
