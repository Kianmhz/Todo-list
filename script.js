document.querySelector('.hamburger-menu').addEventListener('click', function() {
    let sidebar = document.querySelector('.sidebar');
    let line1 = document.querySelector('.line-1');
    let line2 = document.querySelector('.line-2');
    let line3 = document.querySelector('.line-3');
    
    if (sidebar.style.left === '-300px') {
        sidebar.style.left = '0px';
        line1.style.transform = 'rotate(45deg)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg)';
        line3.style.top = '-16px';
        line1.style.top = '10px';
        line1.style.width = '42.4px';
        line3.style.width = '42.4px';

    } else {
        line3.style.top = '0px';
        line1.style.top = '0px';
        line1.style.width = '100%';
        line3.style.width = '100%';
        sidebar.style.left = '-300px';
        line1.style.transform = 'rotate(0deg)';
        line2.style.opacity = '1';
        line3.style.transform = 'rotate(0deg)';
    }
});
