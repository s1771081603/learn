let str02:string | null | undefined = 'wduwork';
str02 = null;
str02 = undefined;
str02 = 'songlisheng';

let el01:HTMLDivElement = document. querySelector('.box01') as HTMLDivElement;
let el02:HTMLDivElement = document. querySelector('.box02')!;
el01.innerHTML = 'this is an not null as test';
el02.innerHTML = 'this is an not null as test';

let btn01:HTMLButtonElement = document.querySelector('#btn01') as HTMLButtonElement;
btn01.addEventListener('click',(e:Event) => {
    const body:HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;
    if (body.className == 'on') {
        btn01.innerText = '开灯';
        body.className = 'off';
    } else{
        btn01.innerText = '关灯';
        body.className = 'on';
    }
})
