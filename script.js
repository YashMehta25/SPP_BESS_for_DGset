// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    const dropdownButton = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
        dropdownButton.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.dropbtn')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
                dropdownButton.classList.remove('show');
            }
        }
    });
});
