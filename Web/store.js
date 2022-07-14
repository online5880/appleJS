let data;
let card = document.querySelectorAll('.card');
let bucket;
let r = 0;

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("store.json", function(text){
    data = JSON.parse(text);
    initItem(data);
});

function initItem(d){
    card.forEach(function (c,idx) {
        c.querySelector('.card-img-top').src = `${d.products[idx].photo}`;
        c.children[1].querySelector('.card-title').innerHTML = d.products[idx].title;
        c.children[1].querySelector('.card-brand').innerHTML = d.products[idx].brand;
        c.children[1].querySelector('.card-text').innerHTML = `가격 : ${d.products[idx].price}`;
        //c.querySelector('.card-text').innerHTML = `${data.products[idx].price}`;
    })
}

document.querySelector('#search').addEventListener('input',function (e){
    if(this.value.length > 0){
        card.forEach(function (c,idx) {
            c.style.display = 'none';
            if(c.children[1].querySelector('.card-title').innerHTML.includes(e.target.value))
            {
                c.style.display = '';
                c.children[1].querySelector('.card-title').style.backgroundColor = 'yellow';
                c.parentElement.classList.add('order-first');
            }
            //c.querySelector('.card-text').innerHTML = `${data.products[idx].price}`;
        })
    }else{
        card.forEach(function (c,idx) {
            c.style.display = '';
            c.parentElement.classList.remove('order-first');
            c.children[1].querySelector('.card-title').style.backgroundColor = '';
        })
    }
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let count = document.createElement('input')
    count.classList.add('count');
    count.type = 'number';
    count.max = '10';
    count.min = '1';
    count.value = '1';
    bucket = ev.target;
    let value = 1;
    ev.target.appendChild(document.getElementById(data));
    document.getElementById(data).style.height = '300px';
    document.getElementById(data).style.width = '200px';
    document.getElementById(data).style.margin = '10px';
    document.getElementById(data).childNodes[3].removeChild(document.getElementById(data).childNodes[3].lastChild.previousSibling);
    document.getElementById(data).appendChild(count);
    document.querySelector('.count').addEventListener('input',function (e){
        value = e.data;
        bucket.querySelectorAll('.card-text').forEach(function (i,idx){
            r += (parseInt(i.innerHTML.substr(5))*value);
            Result(r);
        })
    })
   bucket.querySelectorAll('.card-text').forEach(function (i,idx){
       r += (parseInt(i.innerHTML.substr(5))*value);
       Result(r);
   })
}

function Result(i){
    document.querySelector('#result').innerHTML = `${i}`;
        //c.children[1].querySelector('.card-text').innerHTML;
}

document.querySelector('.purchase').addEventListener('click',function (){
    document.querySelector('.black-bg').classList.add('show-modal');
})

document.querySelector('#close').addEventListener('click',function (){
    document.querySelector('.black-bg').classList.remove('show-modal');
})

document.querySelector('.black-bg').addEventListener('click',function (e){
    if(e.target === this){
        document.querySelector('.black-bg').classList.remove('show-modal');
        e.stopPropagation();
    }
})

document.querySelector('#send').addEventListener('click',function (){
    document.querySelector('.black-bg').classList.remove('show-modal');
    bill();
})

function bill(){
    let canvas = document.getElementById('canvas');
    let c = canvas.getContext('2d');
    let day = new Date();
    c.font = '20px dotum';
    c.fillText('영수증', 30, 20);
    c.fillText(`${day}`, 30, 50);
    c.fillText('합계 : '+`${r}`,30,80);
}
