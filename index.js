const root = document.getElementById('root')
setInterval(printTime, 1000)

function printTime(){
    const d = new Date();
    const h = d.getHours();
    const m = (d.getMinutes() < 10)? '0' + d.getMinutes() : d.getMinutes();
    const s = (d.getSeconds() < 10)? '0' + d.getSeconds() : d.getSeconds();
    const h1 = document.createElement('h1');
    const time = document.createTextNode(`${h} : ${m} : ${s}`);
    h1.append(time);
    if(root.firstElementChild){
        root.replaceChild(h1, root.firstElementChild);
    } else {
        root.append(h1)
    }
}