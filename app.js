let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.querySelector('.icon-cart span');
const cartList = document.querySelector('.Listcart');
const cartTab = document.querySelector('.cartTab');
const closeBtn = document.querySelector('.close');
const checkoutBtn = document.querySelector('.checkout');

document.querySelectorAll('.btn-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const name = productCard.querySelector('h2').innerText;
        const price = parseFloat(productCard.querySelector('.product-price').innerText.replace('$', ''));
        const imgSrc = productCard.querySelector('img').getAttribute('src');

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, imgSrc, quantity: 1 });
        }

        saveCart();
        updateCartDisplay();
    });
});

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    cartIcon.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartList.innerHTML = '';

    cart.forEach((item, i) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('item');
        itemEl.innerHTML = `
            <div class="image"><img src="${item.imgSrc}" alt="${item.name}"></div>
            <div class="Name">${item.name}</div>
            <div class="Total price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="quantity">
                <span class="minus" data-index="${i}">−</span>
                <span>${item.quantity}</span>
                <span class="plus" data-index="${i}">+</span>
            </div>
        `;
        cartList.appendChild(itemEl);
    });

    // Attach quantity handlers
    document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            cart[index].quantity++;
            saveCart();
            updateCartDisplay();
        });
    });

    document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
            updateCartDisplay();
        });
    });
}

// Open cart
document.querySelector('.icon-cart').addEventListener('click', () => {
    cartTab.classList.add('active');
});

// Close cart
closeBtn.addEventListener('click', () => {
    cartTab.classList.remove('active');
});

// Checkout button
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    Swal.fire({
    title: 'Order Placed!',
    text: 'Thank you for shopping at Peniel Store.',
    icon: 'success',
    confirmButtonText: 'OK'
});

});
function toggleCart() {
    const cart = document.querySelector('.cartTab');
    cart.classList.toggle('active');
}

function closeCart() {
  document.getElementById("cartTab").style.display = "none";
}


// Initial load
updateCartDisplay();
