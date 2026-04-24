const hamburger = document.getElementById('hamburger');
const navlinks = document.getElementById('nav-links');

hamburger.addEventListener('click', ()  {
    navlinks.classList.toggle('active');
});