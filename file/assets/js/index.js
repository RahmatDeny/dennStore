// Toggle navbar on mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) { // Jika pengguna scroll lebih dari 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Loop kembali ke slide pertama setelah yang terakhir
    document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Slider otomatis setiap 3 detik
setInterval(showNextSlide, 3000);


// 2. Efek Hover pada Produk
const productImages = document.querySelectorAll('.product-item img, .category img');

productImages.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s';
        this.classList.add('glow');
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.classList.remove('glow');
    });
});

// 3. Animasi scroll halus untuk semua link yang mengarah ke ID tertentu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
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

