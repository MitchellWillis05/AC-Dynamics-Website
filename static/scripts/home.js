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

document.getElementById('find-out-more').addEventListener('click', function() {
    window.location.href = '/services';
});