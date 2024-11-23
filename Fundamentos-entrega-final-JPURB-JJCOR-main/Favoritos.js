const favoritesContainer = document.getElementById('favorites');


async function loadFavorites() {
   
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (savedFavorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No tienes productos favoritos aún.</p>';
        return;
    }

    
    const allProducts = await fetchData();

    
    const favoriteProducts = allProducts.filter(product => savedFavorites.includes(product.name));

    
    favoritesContainer.innerHTML = ''; 
    favoriteProducts.forEach((product, index) => {
        const productCardHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button class="favorite-class" data-id="${index}">
                    Comprar ahora
                </button>
                <i class="fa-solid fa-heart" style="color: orange;"></i>
            </div>
        `;
        favoritesContainer.innerHTML += productCardHTML;
    });

    
    attachRemoveFavoriteEvents();
}


function attachRemoveFavoriteEvents() {
    const favoriteButtons = document.querySelectorAll('.favorite-class');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.currentTarget.dataset.id;
            removeFavorite(productId);
        });
    });
}


function removeFavorite(productId) {
    const allProducts = JSON.parse(localStorage.getItem('favorites')) || [];
    const productToRemove = allProducts[productId];

    
    const updatedFavorites = allProducts.filter(favorite => favorite !== productToRemove);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    
    loadFavorites();
}


async function fetchData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/Jura1612/Fundamentos-entrega-final-JPURB-JJCOR/refs/heads/main/products.json");
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }
}


document.addEventListener('DOMContentLoaded', loadFavorites);
