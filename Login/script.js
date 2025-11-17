const containerlogin = document.querySelector('.containerlogin');
const registbtn = document.querySelector('.regbtn');
const loginbtn = document.querySelector('.logbtn');

registbtn.addEventListener('click' ,() => {
    containerlogin.classList.add('active');
});

loginbtn.addEventListener('click' ,() => {
    containerlogin.classList.remove('active');
});