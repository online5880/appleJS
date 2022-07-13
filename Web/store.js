let data;
let card = document.querySelectorAll('.card');

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
    card.forEach(function (c,idx) {
        c.querySelector('.card-img-top').src = `${data.products[idx].photo}`;
        c.children[1].querySelector('.card-title').innerHTML = data.products[idx].title;
        c.children[1].querySelector('.card-brand').innerHTML = data.products[idx].brand;
        c.children[1].querySelector('.card-text').innerHTML = `가격 : ${data.products[idx].price}`;
        //c.querySelector('.card-text').innerHTML = `${data.products[idx].price}`;
    })

});

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
    console.log('drop')
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let count = document.createElement('input')
    count.classList.add('count');
    count.type = 'number';
    count.maxLength = '10';
    count.min = '1';
    count.value = '1';
    ev.target.appendChild(document.getElementById(data));
    document.getElementById(data).style.height = '300px';
    document.getElementById(data).style.width = '200px';
    document.getElementById(data).style.margin = '10px';
    document.getElementById(data).childNodes[3].removeChild(document.getElementById(data).childNodes[3].lastChild.previousSibling);
    document.getElementById(data).appendChild(count);
    console.log(count);
    document.querySelector('.count').addEventListener('input',function (){
        console.log(this.value);
    })
}

// TODO 결과값하기
//document.querySelector('#result').innerHTML =
