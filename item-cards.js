const items = [
    { id: 1, name: 'Emote 1', category: 'R6', creator: 'Unknown' , tags: 'dance' },
    { id: 1, name: 'Emote 2', category: 'R6', creator: 'LLA' , tags: 'emote' },
    { id: 1, name: 'Emote 3', category: 'R6', creator: 'Unknown' , tags: 'tiktok, emote' },
    { id: 1, name: 'Emote 4', category: 'R6', creator: 'Unknown' , tags: 'dance, tiktok' },
    { id: 1, name: 'Emote 5', category: 'R15', creator: 'g24g5' , tags: 'slow' },
    { id: 1, name: 'Emote 6', category: 'R15', creator: '2h2' , tags: 'dance, slow' },
];

const itemsGrid = document.getElementById('itemsGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchOption = document.getElementById('search-type');

function displayItems(itemsToShow) {
    itemsGrid.innerHTML = '';
    
    itemsGrid.style.opacity = '0';
    itemsGrid.style.transform = 'translateY(20px)';
    itemsGrid.style.transition = 'opacity 0.4s ease-out';
    
    setTimeout(() => {
        itemsGrid.style.opacity = '1';
        itemsGrid.style.transform = 'translateY(0)';
    }, 50);
    
    itemsToShow.forEach((item, index) => {
        const card = document.createElement('button');
        card.className = 'item-card';
        card.dataset.category = item.category;
        card.innerHTML = `
            <h3>${item.name}</h3>
            <div class='model-handler'></div>
            <p>Creator: ${item.creator}</p>
            <p>Tags: ${item.tags}</p>
            <p>Format: ${item.category}</p>
        `;
        
        card.style.opacity = '0';
        card.style.filter = 'blur(30px)';
        card.style.transform = 'translateY(15px) rotateX(30deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.willChange = 'opacity, filter, transform';
        
        itemsGrid.appendChild(card);
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.filter = 'blur(0)';
            card.style.transform = 'translateY(0) rotateX(0)';
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let currentFilter = 'all'; // Добавляем переменную для хранения текущего фильтра
    let currentItems = items; // И текущий отфильтрованный список
    
    displayItems(currentItems);
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter; // Сохраняем текущий фильтр
            currentItems = currentFilter === 'all' 
                ? items 
                : items.filter(item => item.category === currentFilter);
            
            displayItems(currentItems);
        });
    });
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const searchType = searchOption.value.toLowerCase();
        
        // Сначала применяем фильтр по категории
        const filteredByCategory = currentFilter === 'all' 
            ? items 
            : items.filter(item => item.category === currentFilter);
        
        // Затем применяем поиск
        const filteredItems = filteredByCategory.filter(item => 
            item[searchType].toLowerCase().includes(searchTerm)
        );
        
        displayItems(filteredItems);
    });
});