// Data Dummy untuk pilihan item top up
const itemsData = {
    diamond: [
        { name: '10 Genesis Crystals', price: 'Rp 1.500', icon: 'genshin.webp' },
        { name: '100 Genesis Crystals', price: 'Rp 14.000', icon: 'genshin.webp' },
        { name: '250 Genesis Crystals', price: 'Rp 34.000', icon: 'genshin.webp' },
        { name: '500 Genesis Crystals', price: 'Rp 60.000', icon: 'genshin.webp' },
        { name: '1000 Genesis Crystals', price: 'Rp 120.000', icon: 'genshin.webp' },
        { name: '5000 Genesis Crystals', price: 'Rp 600.000', icon: 'genshin.webp' },
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

// Daftar folder dan file HTML terkait game
const games = [
    { name: 'Brawl Stars', link: '../brawl/brawl.html' },
    { name: 'Clash of Clans', link: '../COC/coc.html' },
    { name: 'Call of Duty', link: '../COD/cod.html' },
    { name: 'Clash Royale', link: '../CR/cr.html' },
    { name: 'Free Fire', link: '../FF/ff.html' },
    { name: 'Genshin Impact', link: '../GENSHIN/genshin.html' },
    { name: 'Growtopia', link: '../GROW/grow.html' },
    { name: 'HayDay', link: '../HAYDAY/hayday.html' },
    { name: 'Honor of King', link: '../HOK/hok.html' },
    { name: 'Mobile Legends', link: '../ML/ML.html' },
    { name: 'PUBG Mobile', link: '../PUBG/pubg.html' },
    { name: 'State of Survival', link: '../STATEof/state.html' },
    { name: 'Stumble Guys', link: '../stumble/stumble.html' },
    { name: 'MLBB', link: '../ML/ML.html' },
];

// Ambil elemen search bar
const searchBar = document.getElementById('searchBar');

// Event listener untuk pencarian saat tombol Enter ditekan
searchBar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Deteksi jika tombol yang ditekan adalah 'Enter'
        const query = searchBar.value.toLowerCase(); // Ambil input pencarian

        // Cari game yang cocok di dalam array games
        const matchedGame = games.find(game => game.name.toLowerCase().includes(query));

        if (matchedGame) {
            // Jika game ditemukan, arahkan ke halaman game
            window.location.href = matchedGame.link;
        } else {
            // Jika tidak ada hasil yang cocok, beri alert
            alert("Game tidak ditemukan, silakan coba kata kunci lain.");
        }
    }
});
