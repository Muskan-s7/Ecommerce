const xhr = new XMLHttpRequest();//built-in class-creates a new http msg to send to the backend

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');//sets the msg or request
xhr.send();//sends the msg located at supersimple.dev

