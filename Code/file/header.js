// Toggle navbar on mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
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
        <div class="btn btn-primary btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="../../login.html" class="auth-link">Login</a></div>
            <div class="btn btn-success btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="../../register.html" class="auth-link">Daftar</a></div>
        `;

        // Konten untuk Mobile
        mobileUserStatus.innerHTML = `
        <div class="btn btn-primary btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="../../login.html" class="auth-link">Login</a></div>
            <div class="btn btn-success btn-sm" style="border-radius: 20px; width: 80px; font-weight: bold; font-size: medium;"><a href="../../register.html" class="auth-link">Daftar</a></div>
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


            window.location.href = 'ML.html';
        }
    });
}

window.onload = function() {
    showUserLoginStatus();
}