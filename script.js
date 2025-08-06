function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function closeMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.remove("open");
  icon.classList.remove("open");
}

function toggleTheme() {
  const body = document.body;
  const themeIcons = document.querySelectorAll('.theme-icon');
  
  body.classList.toggle('dark-theme');
  
  // Update theme icon
  themeIcons.forEach(icon => {
    if (body.classList.contains('dark-theme')) {
      icon.src = './assets/sun.png';
      icon.alt = 'Switch to light mode';
    } else {
      icon.src = './assets/moon.png';
      icon.alt = 'Switch to dark mode';
    }
  });
  
  // Save theme preference
  localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const themeIcons = document.querySelectorAll('.theme-icon');
  
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcons.forEach(icon => {
      icon.src = './assets/sun.png';
      icon.alt = 'Switch to light mode';
    });
  }
  
  // Close menu when clicking outside of it
  document.addEventListener('click', function(event) {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu-links');
    
    // Check if the menu is open and the click is outside the hamburger menu
    if (menu.classList.contains('open') && !hamburgerMenu.contains(event.target)) {
      closeMenu();
    }
  });
});
