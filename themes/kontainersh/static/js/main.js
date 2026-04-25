// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function () {
            burger.classList.remove('open');
            nav.classList.remove('open');
        });
    }
});
