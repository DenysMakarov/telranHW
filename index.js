
function luckyTicket(number) {
    let sum = 0;
    while (number != 0) {
        sum = Math.trunc(number % 10 - sum);
        Math.trunc(number /= 10);
    }
    return sum == 0;
}

function sumNubers(number) {
    let sum = 0;
    while (number != 0) {
        sum += Math.trunc(number % 10);
        number = number / 10
    }
    return sum;
}


let a = luckyTicket(1441)
let b = sumNubers(1441)
console.log(a, b);
