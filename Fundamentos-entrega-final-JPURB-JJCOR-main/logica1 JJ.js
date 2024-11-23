let products = [];

async function parseDataToProducts() {
    const data = await fetchData();
    

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    for (let i = 0; i < data.length; i++) {
        const product = new Product(
            data[i].description,
            data[i].price,
            data[i].image,
            data[i].Sizes,
            data[i].Color,
            data[i].name
        );

        if (savedFavorites.includes(data[i].name)) {
            product.isFavorited = true;
        }

        products.push(product);
    }

    renderProducts();
}

function renderProducts() {
    const productGrid = document.getElementById('products');
    productGrid.innerHTML = ''; 

    products.forEach(product => {
        productGrid.innerHTML += product.htmlCard();
    });
}

function toggleFavorite(productId) {
    const product = products[productId];

    const isFavorited = product.toggleFavorite();

    const productCard = document.querySelectorAll('.product')[productId];
    const favoriteIcon = productCard.querySelector('.favorite-icon');
    favoriteIcon.style.color = isFavorited ? 'orange' : 'gray';

    let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorited) {
        savedFavorites.push(product.name);
    } else {
        savedFavorites = savedFavorites.filter(favorite => favorite !== product.name);
    }

    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
}
// Función para manejar favoritos desde el icono
function toggleFavoriteById(productName) {
    let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (savedFavorites.includes(productName)) {
        // Eliminar de favoritos
        savedFavorites = savedFavorites.filter(favorite => favorite !== productName);
    } else {
        // Agregar a favoritos
        savedFavorites.push(productName);
    }

    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('favorite-button')) {
        const productCard = event.target.closest('.product'); // Encuentra el contenedor del producto
        const productName = productCard.dataset.name; // Obtén el nombre único del producto

        // Obtén los favoritos actuales del localStorage
        let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Alterna el estado de favorito
        if (savedFavorites.includes(productName)) {
            // Si ya está en favoritos, elimínalo
            savedFavorites = savedFavorites.filter(fav => fav !== productName);
            event.target.style.color = 'gray';
            event.target.textContent = 'Añadir a Favoritos';
        } else {
            // Si no está en favoritos, agrégalo
            savedFavorites.push(productName);
            event.target.style.color = 'orange';
            event.target.textContent = 'En Favoritos';
        }

        // Guarda los favoritos actualizados en localStorage
        localStorage.setItem('favorites', JSON.stringify(savedFavorites));
    }
});






document.addEventListener('DOMContentLoaded', parseDataToProducts);