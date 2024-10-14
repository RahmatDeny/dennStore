// Toggle navbar on mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; 
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

searchBar.addEventListener('input', function() { 
    const query = searchBar.value.toLowerCase();
    let matchedProducts = [];

    
    products.forEach(item => {
        const gameName = item.querySelector('h3').textContent.toLowerCase();

        
        if (gameName.includes(query)) {
            item.style.display = 'block';
            matchedProducts.push(item);
        } else {
            item.style.display = 'none'; 
        }
    });

    if (matchedProducts.length > 0) {
        matchedProducts[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Tampilkan pesan jika tidak ada hasil yang cocok
    if (query && matchedProducts.length === 0) {
        console.log('Game tidak ditemukan');
    }

});



function showUserLoginStatus(){
    let desktopUserStatus = document.getElementById('desktop-user-status');
    let mobileUserStatus = document.getElementById('mobile-user-status');
    let userLogin = JSON.parse(localStorage.getItem('loginUsers'));

    if (userLogin !== null) {
        let user = userLogin[userLogin.length - 1].name;
        
        // Konten untuk Desktop
desktopUserStatus.innerHTML = `
<i class="bx bxs-user" style="color: white; font-size: 14px; margin: 0;"> ${user}</i>
<div class="logout-container">
    <div class="btn btn-primary btn-sm" onClick="logout()" style="border-radius: 20px; width: 70px; font-weight: bold; font-size: 12px; padding: 5px;">Logout</div>
</div>
`;

// Konten untuk Mobile
mobileUserStatus.innerHTML = `
<i class="bx bxs-user" style="color: white; font-size: 14px; margin: 0;"> ${user}</i>
<div class="logout-container">
    <div class="btn btn-primary btn-sm" onClick="logout()" style="border-radius: 20px; width: 70px; font-weight: bold; font-size: 12px; padding: 5px;">Logout</div>
</div>
`;


    } else {
        // Jika belum login, tampilkan tombol Login dan Daftar

        // Konten untuk Desktop
        desktopUserStatus.innerHTML = `
        <div class="btn btn-primary btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="login.html" class="auth-link">Login</a></div>
            <div class="btn btn-success btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="register.html" class="auth-link">Daftar</a></div>
        `;

        // Konten untuk Mobile
        mobileUserStatus.innerHTML = `
        <div class="btn btn-primary btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="login.html" class="auth-link">Login</a></div>
            <div class="btn btn-success btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="register.html" class="auth-link">Daftar</a></div>
        `;
    }
}

function logout(){

    Swal.fire({
        title: 'Yakin?',
        text: "Apakah Anda yakin ingin keluar dari aplikasi?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Tidak',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('loginUsers');


            window.location.href = 'index.html';
        }
    });
}

window.onload = function() {
    showUserLoginStatus();
}