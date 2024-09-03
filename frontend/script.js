// script.js
const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');
const loadingIndicator = document.getElementById('loading');
const noResultsMessage = document.getElementById('no-results');

let items = [];
let timeout = null;

// Fetch all items on page load
window.onload = () => {
  fetch('http://localhost:8000/items')
    .then(response => response.json())
    .then(data => {
      items = data.items;
      displayResults(items); // Display all items initially
    })
    .catch(error => console.error('Error fetching items:', error));
};

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length > 3) {
    clearTimeout(timeout);
    timeout = setTimeout(() => search(query), 300);
  } else {
    displayResults(items);
    noResultsMessage.classList.add('hidden');
  }
});

function search(query) {
  loadingIndicator.classList.remove('hidden');
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(query));

  loadingIndicator.classList.add('hidden');
  if (filteredItems.length) {
    noResultsMessage.classList.add('hidden');
    displayResults(filteredItems);
  } else {
    resultsContainer.innerHTML = '';
    noResultsMessage.classList.remove('hidden');
  }
}

function displayResults(items) {
  resultsContainer.innerHTML = items.map(item => `
    <li class="border-b border-gray-300 p-4 flex items-center space-x-4 bg-white rounded-md shadow-sm mb-2">
  <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-md">
  <div>
    <h3 class="text-xl font-semibold text-gray-800">${item.name}</h3>
    <p class="text-gray-600">${item.description}</p>
    <p class="text-gray-900 font-bold">${item.price}</p>
  </div>
</li>

  `).join('');
}
