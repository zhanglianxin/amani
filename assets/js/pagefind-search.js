document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsList = document.getElementById('search-results-list');
    const searchStatusMessage = document.getElementById('search-status-message');
    const searchForm = document.getElementById('search-form');

    let pagefindModule; // To store the dynamically imported pagefind object
    let searchTimeout;  // For debouncing the input

    // --- Helper Functions ---

    // Shows the results container and sets a status message
    function showStatus(message, isHidden = false) {
        searchResultsContainer.classList.remove('hidden');
        searchStatusMessage.textContent = message;
        searchStatusMessage.classList.toggle('hidden', isHidden); // Show if not hidden
        searchResultsList.innerHTML = ''; // Clear results list
    }

    // Hides the results container and clears status/results
    function hideResults() {
        searchResultsContainer.classList.add('hidden');
        searchResultsList.innerHTML = '';
        searchStatusMessage.classList.add('hidden');
    }

    // --- Main Search Logic ---
    async function performSearch() {
        const searchTerm = searchInput.value.trim();

        if (searchTerm.length < 2) {
            hideResults();
            return;
        }

        showStatus('Searching...');

        if (!pagefindModule) {
            try {
                pagefindModule = await import('/_pagefind/pagefind.js');
                console.log('Pagefind module loaded successfully.');
            } catch (error) {
                console.error('Error loading Pagefind module:', error);
                showStatus('Failed to load search functionality. Please try again later.');
                return;
            }
        }

        try {
            const searchResponse = await pagefindModule.debouncedSearch(searchTerm, {}, 300);

            let filteredResults = searchResponse.results;

            if (searchTerm.length >= 2) { // 确保有实际的搜索词才进行过滤
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const tempFilteredResults = [];

                for (const result of filteredResults) {
                    const resultData = await result.data(); // 获取完整的页面数据

                    // 检查搜索词是否在标题或摘要（excerpt）中
                    // Pagefind 的 excerpt 通常包含匹配的上下文，可视为内容的一部分
                    const titleMatch =  resultData.meta.title?.toLowerCase().includes(lowerCaseSearchTerm);
                    const excerptMatch = resultData.excerpt?.toLowerCase().includes(lowerCaseSearchTerm);

                    // Using /posts/ to match directory structure
                    const uriIncludesPosts = resultData.url?.toLowerCase().includes('/posts/')
                    && !(resultData.url?.toLowerCase().endsWith('/posts/'));

                    if ((titleMatch || excerptMatch) && uriIncludesPosts) {
                        tempFilteredResults.push(result);
                    }
                }
                filteredResults = tempFilteredResults; // 使用过滤后的结果
            }

            if (filteredResults.length > 0) {
                searchStatusMessage.classList.add('hidden');
                searchResultsList.innerHTML = '';

                for (const result of filteredResults) {
                    const resultData = await result.data(); // Get full data for each result

                    const listItem = document.createElement('li');

                    // --- 核心修改：手动构建 HTML ---
                    listItem.innerHTML = `
                        <a href="${resultData.url}" class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-1">${resultData.meta.title || 'Untitled Page'}</h3>
                            <p class="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">${resultData.excerpt || 'No excerpt available.'}</p>
                        </a>
                    `;
                    // --- 结束核心修改 ---

                    searchResultsList.appendChild(listItem);
                }
            } else {
                showStatus(`No results found for "${searchTerm}".`);
            }
        } catch (error) {
            console.error('Error performing Pagefind search:', error);
            showStatus('An error occurred during search. Please try again.');
        }
    }


    // --- Event Listeners ---

    // Input event with debounce
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout); // Clear previous timeout
        searchTimeout = setTimeout(performSearch, 300); // Wait 300ms after last input
    });

    // Focus event: show results container, possibly perform search if already typed
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            performSearch(); // Re-run search if there's a valid query
        } else {
            // Just show the container if input is empty, status message hidden
            searchResultsContainer.classList.remove('hidden');
            searchStatusMessage.classList.add('hidden');
            searchResultsList.innerHTML = '';
        }
    });

    // Form submit event (e.g., pressing Enter)
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        clearTimeout(searchTimeout); // Clear debounce
        performSearch(); // Perform search immediately
    });

    // Click outside handler to close results
    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target)) {
            hideResults();
        }
    });

    // Handle pressing ESC key to close results
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideResults();
            searchInput.blur(); // Optionally unfocus the input
        }
    });
});
