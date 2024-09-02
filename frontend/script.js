
  const searchInput = document.getElementById('search');
  const resultsContainer = document.getElementById('results');
  const loadingIndicator = document.getElementById('loading');
  const noResultsMessage = document.getElementById('no-results');

  let timeout = null;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();

    if (query.length > 3) {
      clearTimeout(timeout);
      timeout = setTimeout(() => search(query), 300);
    } else {
      resultsContainer.innerHTML = '';
      noResultsMessage.classList.add('hidden');
    }
  });

  function search(query) {
    loadingIndicator.classList.remove('hidden');
    fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        loadingIndicator.classList.add('hidden');
        if (data.items.length) {
          noResultsMessage.classList.add('hidden');
          displayResults(data.items);
        } else {
          resultsContainer.innerHTML = '';
          noResultsMessage.classList.remove('hidden');
        }
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        loadingIndicator.classList.add('hidden');
      });
  }

  function displayResults(items) {
    resultsContainer.innerHTML = items.map(item => `
      <li class="border-b border-gray-200 p-2 flex items-center space-x-4">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
        <div>
          <h3 class="text-lg font-semibold">${item.name}</h3>
          <p class="text-gray-500">${item.description}</p>
          <p class="text-gray-900 font-bold">${item.price}</p>
        </div>
      </li>
    `).join('');
  }

