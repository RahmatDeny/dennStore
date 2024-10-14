// Data Dummy untuk pilihan item top up
const itemsData = {
    diamond: [
        { name: '10 Diamonds', price: 'Rp 1.500', icon: 'ff.png' },
        { name: '100 Diamonds', price: 'Rp 14.000', icon: 'ff.png' },
        { name: '250 Diamonds', price: 'Rp 34.000', icon: 'ff.png' },
        { name: '500 Diamonds', price: 'Rp 60.000', icon: 'ff.png' },
        { name: '1000 Diamonds', price: 'Rp 120.000', icon: 'ff.png' },
        { name: '5000 Diamonds', price: 'Rp 600.000', icon: 'ff.png' },
    ]
};

// Fungsi untuk render item ke halaman
function renderItems(category) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = ''; // Hapus item sebelumnya
    itemsData[category].forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.icon}" alt="${item.name} icon" class="item-icon">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
        `;
        itemElement.addEventListener('click', () => {
            document.querySelectorAll('.item').forEach(el => el.classList.remove('selected'));
            itemElement.classList.add('selected');
        });
        itemsContainer.appendChild(itemElement);
    });
}

// Event Listener untuk tombol kategori
// document.getElementById('diamond').addEventListener('click', () => renderItems('diamond'));

// Render default category
renderItems('diamond');

// Event Listener untuk pilihan metode pembayaran
document.querySelectorAll('.payment-options input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function () {
        document.querySelectorAll('.payment-options label').forEach(label => label.classList.remove('selected'));
        this.closest('label').classList.add('selected');
    });
});

// Fungsi untuk menampilkan pop-up
function showInvoicePopup(userId, email, paymentMethod, amount) {
    document.getElementById('invoiceEmail').textContent = email || "Tidak diisi";
    document.getElementById('invoicePayment').textContent = paymentMethod;
    document.getElementById('invoiceUserId').textContent = userId;
    document.getElementById('invoiceAmount').textContent = amount;
    document.getElementById('invoicePopup').style.display = 'flex';
}

// Event listener untuk tombol Beli
document.getElementById('buyButton').addEventListener('click', () => {
    const userId = document.getElementById('userId').value.trim();
    const selectedItem = document.querySelector('.item.selected');
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const email = document.getElementById('email').value.trim();
    
    if (!userId || !selectedItem) {
        alert("User ID dan Item harus dipilih!");
        return;
    }

    // Dapatkan harga dari item yang dipilih
    const amount = selectedItem.querySelector('p').textContent;

    // Tampilkan pop-up invoice
    showInvoicePopup(userId, email, paymentMethod, amount);
});

// Fungsi untuk menyembunyikan pop-up
function hideInvoicePopup() {
    document.getElementById('invoicePopup').style.display = 'none';
}


document.getElementById('payLaterButton').addEventListener('click', hideInvoicePopup);

// Fungsi untuk menampilkan pop-up loading
function showLoadingPopup() {
    document.getElementById('loadingPopup').style.display = 'flex';
}

// Fungsi untuk menyembunyikan pop-up loading
function hideLoadingPopup() {
    document.getElementById('loadingPopup').style.display = 'none';
}

// Fungsi untuk menampilkan pop-up sukses
function showSuccessPopup() {
    document.getElementById('successPopup').style.display = 'flex';
}

// Fungsi untuk menyembunyikan pop-up sukses
function hideSuccessPopup() {
    document.getElementById('successPopup').style.display = 'none';
}

// Simulasi pembayaran dengan loading dan berhasil
document.getElementById('payNowButton').addEventListener('click', () => {
    // Tampilkan pop-up loading
    showLoadingPopup();

    // Simulasi waktu tunggu untuk proses pembayaran
    setTimeout(() => {
        // Sembunyikan pop-up loading
        hideLoadingPopup();

        // Tampilkan pop-up berhasil
        showSuccessPopup();
    }, 3000); // Waktu tunggu 3 detik
});

// Fungsi untuk menutup pop-up berhasil
function hideSuccessPopup() {
    document.getElementById('successPopup').style.display = 'none'; // Menghilangkan pop-up
}

// Tutup pop-up berhasil saat tombol OK ditekan
document.getElementById('closeSuccessButton').addEventListener('click', function() {
    hideSuccessPopup(); // Menutup pop-up
    location.reload();  // Refresh halaman setelah pop-up ditutup
});

// Ambil elemen pencarian dan daftar produk
const searchBar = document.getElementById('searchBar');
const products = document.querySelectorAll('.product-item');

// Fungsi untuk mencari produk/game
searchBar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Deteksi jika tombol yang ditekan adalah 'Enter'
        const query = searchBar.value.toLowerCase();
        let matchedProducts = [];

        // Lakukan perulangan pada setiap produk di daftar
        products.forEach(item => {
            const gameName = item.querySelector('h3').textContent.toLowerCase();

            // Periksa apakah nama game cocok dengan kata kunci pencarian
            if (gameName.includes(query)) {
                matchedProducts.push(item); // Tambahkan produk yang cocok ke array
            }
        });

        // Jika ada hasil yang cocok, arahkan ke halaman game
        if (matchedProducts.length > 0) {
            const gameLink = matchedProducts[0].querySelector('a').getAttribute('href');
            window.location.href = gameLink; // Arahkan ke halaman game
        }
    }
});
