let btn = document.querySelectorAll('.tab-button');
let ct = document.querySelectorAll('.tab-content');

for(let i =0; i<btn.length; i++){
    btn[i].addEventListener('click',function (){
        openTab(i);
    })
}

document.querySelector('.list').addEventListener('click',function (e){
    const id = e.target.dataset.id;
    openTab(parseInt(id));
})

function openTab(i){
    for(let j =0; j < btn.length; j++){
        btn[j].classList.remove('orange');
    }
    btn[i].classList.add('orange');

    for(let j =0; j < btn.length; j++){
        ct[j].classList.remove('show');
    }
    ct[i].classList.add('show');
}

let sizeSelector = document.querySelector('.select-select');
let sizeArray = [{shirt:[95,100,105,100]},{pants:[28,30,32,34]}];

function size(n){
    switch (n) {
        case 1:
            for(let i = 0; i<sizeSelector.children.length;i++){
                sizeSelector.children[i].innerHTML = sizeArray[0].shirt[i];
            }
            break;
        case 2:
            for(let i = 0; i<sizeSelector.children.length;i++){
                sizeSelector.children[i].innerHTML = sizeArray[1].pants[i];
            }
            break;
    }
}

function func2(arr){
    sizeSelector.innerHTML = '';
    for (const arrKey in arr) {
        for (let i = 0; i < arr[arrKey].length; i++) {
            let sSize = document.createElement('option');
            sSize.innerHTML = arr[arrKey][i];
            sizeSelector.appendChild(sSize);
        }
    }
}

document.querySelector('.selector').addEventListener('input',function (e){
    //size(this.options.selectedIndex);
    let idx = this.options.selectedIndex -1;

    if(this.options.selectedIndex === 0){
        sizeSelector.style.display = 'none';
    }else if(this.options.selectedIndex === 1){
        func2(sizeArray[idx]);
        sizeSelector.style.display = '';
    }else if(this.options.selectedIndex === 2){
        func2(sizeArray[idx]);
        sizeSelector.style.display = '';
    }
})
let sum = 0;
function gugudan(n,n2){
    n.forEach(function (i){
        sum+=i;
    })
    let avg = sum / n.length;
}

gugudan([10,20,30,40,50]);
