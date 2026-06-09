const filters = document.getElementById('filters');
const search = document.getElementById('search');
const grid = document.getElementById('grid');

const applyCategoryFilter = (e) => {
  if (e.target.tagName !== "A") return;

  const { categoryFilter } = e.target.dataset;

  if (categoryFilter === 'all') {
    search.disabled = false;
  } else {
    search.disabled = true;
    search.value = '';
  }

  Array.from(filters.children).forEach((filter) => {
    filter.classList.remove('courses__filter--active');
  });

  e.target.classList.add('courses__filter--active');

  Array.from(grid.children).forEach((card) => {
    card.classList.remove('course-card--hidden');

    if (categoryFilter === 'all') {
      return;
    }

    if (card.dataset.category !== categoryFilter) {
      card.classList.add('course-card--hidden');
    }
  });
}

filters.addEventListener('click', applyCategoryFilter);

const applySearchFilter = (e) => {
  const searchFilter = e.target.value;

  Array.from(grid.children).forEach((card) => {
    const cardTitle = card.getElementsByTagName('h2')[0]?.innerText ?? '';

    card.classList.remove('course-card--hidden');

    if (!searchFilter) return;

    if (!cardTitle.toLowerCase().includes(searchFilter.toLowerCase())) {
      card.classList.add('course-card--hidden');
    }
  });
}

search.addEventListener('input', applySearchFilter);
