"use strict";
let str02 = 'wduwork';
str02 = null;
str02 = undefined;
str02 = 'songlisheng';
let el01 = document.querySelector('.box01');
let el02 = document.querySelector('.box02');
el01.innerHTML = 'this is an not null as test';
el02.innerHTML = 'this is an not null as test';
let btn01 = document.querySelector('#btn01');
btn01.addEventListener('click', (e) => {
    const body = document.querySelector('body');
    if (body.className == 'on') {
        btn01.innerText = '开灯';
        body.className = 'off';
    }
    else {
        btn01.innerText = '关灯';
        body.className = 'on';
    }
});
