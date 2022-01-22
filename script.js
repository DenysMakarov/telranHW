const persons = [];

addPerson.onclick = function () {
    clearStat();
    const person = new Person(personId.value.trim(), firstName.value.trim(), lastName.value.trim(), age.value);
    if (persons.findIndex(p => p.id === person.id) >= 0) {
        alert(`Person with id = ${person.id} exists`);
    } else {
        persons.push(person);
        const li = createInfoElement(person.toString(), 'li');
        li.setAttribute('name', person.id);
        const btn = createInfoElement('click', 'button')
       
        btn.onclick = (e) => {
            clearStat();
            const el = e.target.parentElement.getAttribute('name');
            e.target.parentElement.remove()        

            for(let i = 0; i < persons.length; i++) {
                if(el == persons[i].id) {
                    persons.splice(i, 1)                    
                    return;
                }
            }
        }
        li.append(btn)
        personsList.append(li);
    }
    personId.value = firstName.value = lastName.value = age.value = '';
}

function clearStat(){
    const box = document.getElementById('boxStat')
    if(box != undefined){
        box.remove()
    }
}

calcStats.onclick = function () {
    const divStats = document.createElement('div');
    divStats.setAttribute('id', 'boxStat')
    let age = persons.reduce((acc, p) => acc + p.age, 0) / persons.length;
    const h3avg = createInfoElement(`Average age: ${age.toFixed(1)}`, 'h3');
    age = persons.reduce((acc, p) => acc > p.age ? p.age : acc, persons[0].age);
    const h3min = createInfoElement(`Min age: ${age}`, 'h3');
    age = persons.reduce((acc, p) => acc < p.age ? p.age : acc, persons[0].age);
    const h3max = createInfoElement(`Max age: ${age}`, 'h3');
    divStats.append(h3avg, h3min, h3max);
    if (stats.firstElementChild.nextElementSibling) {
        stats.replaceChild(divStats, stats.firstElementChild.nextElementSibling);
    } else {
        stats.appendChild(divStats);
    }
};

function createInfoElement(content, tag) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.append(text);
    return element;
}

function Person(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = +age;
    this.toString = function () {
        return `ID: ${this.id}, ${this.firstName}, ${this.lastName}, age: ${this.age}`;
    }
}
