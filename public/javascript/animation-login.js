var slide_bar = document.getElementsByClassName('login_slide_bar')[0];
var register_btn = document.getElementById('register_btn');
register_btn.addEventListener('click', (e) => {
    slide_bar.classList.add('login_slide_bar_animation');
})
var login_btn = document.getElementById('login_btn');
login_btn.addEventListener('click', () => {
    slide_bar.classList.remove('login_slide_bar_animation')
})