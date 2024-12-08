document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');
    const productList = document.getElementById('product-list');
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close');

    const fetchProducts = async (category = '', searchQuery = '') => {
        const response = await fetch(`/api/products?category=${category}&search_query=${searchQuery}`);
        const products = await response.json();
        displayProducts(products);
    };

    const displayProducts = (products) => {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}" />
                <h2>${product.name}</h2>
                <p>Categoría: ${product.category}</p>
                <p>Precio: $${product.price}</p>
            `;
            li.addEventListener('click', () => {
                showModal(product);
            });
            productList.appendChild(li);
        });
    };

    const showModal = (product) => {
        modalImage.src = product.image_url;
        modalTitle.textContent = product.name;
        modalCategory.textContent = `Categoría: ${product.category}`;
        modalPrice.textContent = `Precio: $${product.price}`;
        modalDescription.textContent =`Descripcion:\n ${product.description}`; // Asegúrate de que el campo "description" esté disponible en tu producto
        
        // Reemplazar saltos de línea con <br>
        modalDescription.innerHTML = product.description.join('<br>');
        modal.style.display = 'block';
    };

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    categorySelect.addEventListener('change', () => {
        fetchProducts(categorySelect.value, searchInput.value);
    });

    searchInput.addEventListener('input', () => {
        fetchProducts(categorySelect.value, searchInput.value);
    });

    // Fetch all products on initial load
    fetchProducts();
});

function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.maxHeight) {
        navLinks.style.maxHeight = null;
    } else {
        navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
    }
}
