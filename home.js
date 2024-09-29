
document.getElementById('button').onclick = function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    this.querySelector('span').classList.toggle('is-closed');
};

function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) requestAnimationFrame(animation); 
    }

    requestAnimationFrame(animation); 
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const listItems = document.querySelectorAll('#sidebar ul li');
listItems.forEach(item => {
    item.addEventListener('click', function() {
        const targetId = this.querySelector('a').getAttribute('href');
        smoothScroll(targetId, 1000);
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');
        document.getElementById('button').querySelector('span').classList.remove('is-closed'); 
    });
});

const logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', function(event) {
    event.preventDefault();
    smoothScroll('#landing', 1000);
});

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');

    setTimeout(() => {
        loadingScreen.style.display = 'none'; 
    }, 1500);
});
