document.getElementById('show-video').addEventListener('click', function() {
  document.getElementById('video-popup').classList.remove('hidden');
});

document.getElementById('close-btn').addEventListener('click', function() {
  document.getElementById('video-popup').classList.add('hidden');
});

document.addEventListener("DOMContentLoaded", function() {
    const servicesLink = document.getElementById("home");
    servicesLink.classList.add("active-link");

});

document.addEventListener("DOMContentLoaded", function() {
    const link2 = document.getElementById("about");
    link2.classList.add("inactive-link");
    const link3 = document.getElementById("services");
    link3.classList.add("inactive-link");
    const link4 = document.getElementById("contact");
    link4.classList.add("inactive-link");

});

document.getElementById('find-out-more').addEventListener('click', function() {
    window.location.href = '/services';
});