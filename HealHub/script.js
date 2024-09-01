function userpagein() {
    var userpage = document.querySelector(".temporary-user-page");
    userpage.classList.toggle("active");
}
document.querySelector(".user-dashboard").addEventListener("click", function(event) {
    event.stopPropagation(); 
    userpagein();
});
document.addEventListener('click', function(event) {
    var popup = document.querySelector(".temporary-user-page");
    var userIcon = document.querySelector(".user-dashboard");
    
    var isClickInsidePopup = popup.contains(event.target);
    var isClickInsideUserIcon = userIcon.contains(event.target);

    if (!isClickInsidePopup && !isClickInsideUserIcon) {
        popup.classList.remove("active");
    }
});


function threelinepage() {
    var userpage = document.querySelector(".threeline-page");
    userpage.classList.toggle("active");
}
document.querySelector("#threeline").addEventListener("click", function(event) {
    event.stopPropagation(); 
    threelinepage();
});
document.addEventListener('click', function(event) {
    var popup = document.querySelector(".threeline-page");
    var userIcon = document.querySelector("#threeline");
    
    var isClickInsidePopup = popup.contains(event.target);
    var isClickInsideUserIcon = userIcon.contains(event.target);

    if (!isClickInsidePopup && !isClickInsideUserIcon) {
        popup.classList.remove("active");
    }
});


const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
let index = 0;

function nextSlide() {
    index++;
    if (index >= images.length) {
        index = 0;
        // slides.style.transition = 'ease'; 
        // slides.style.transform = `translateX(0)`;
    } else {
        slides.style.transition = 'transform 1s ease-in-out';
        slides.style.transform = `translateX(${-index * 100}vw)`;
    }
}
setInterval(nextSlide, 8000);

function changeHeader() {
    var screenSize = window.innerWidth; 
    var mainHeader = document.querySelector('.main-header');
    var menuHeader = document.querySelector('.menu-page');

    if (window.scrollY > 50) {
        if (screenSize >= 768) {
            mainHeader.classList.add('active');
            menuHeader.classList.remove('active');
        } else {
            mainHeader.classList.remove('active');
            menuHeader.classList.add('active');
        }
    } else {
        mainHeader.classList.remove('active');
        menuHeader.classList.remove('active');
    }
}
window.onscroll = function() { changeHeader(); };
window.onresize = function() { changeHeader(); };
window.onload = function() { changeHeader(); };
