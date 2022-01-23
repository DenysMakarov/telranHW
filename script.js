
class Person {
    constructor(id, firstName, lastName, birthDate) {
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = new Date(birthDate);
    }

    fullName() {
        return `${this.firstName}  ${this.lastName}`
    }
}

class Employee extends Person {
    constructor(id, firstName, lastName, birthDate, salary) {
        super(id, firstName, lastName, birthDate);
        this._salary = +salary;
    }

    get salary() { return this._salary }
    set salary(salary) {
        if (salary > this._salary) {
            this._salary = +salary;
        }
    }

    toString = function () {
        return `ID: ${this._id}, 
         fullName : ${this.fullName()}, 
         birth-date: ${this.birthDate.getFullYear()}-${this.birthDate.getDate()}-${this.birthDate.getDay()}, 
         salary: ${this.salary}`;
    }
}

class Company {
    constructor() {
        this._employees = []
        this._stat = {}
    }

    get employees() {
        return [...this._employees]; 
    }

    addEmployee(employee) {
        if (this._employees.findIndex(e => employee._id === e._id) < 0){
            this._employees.push(employee)
            return true
        } 
        return false;
    }

    removeEmployee(id) {
        this._employees = this._employees.filter(el => el._id !== id);
    }

    get quantity() { return this._employees.length }

    getStatisctic() {
        this._stat.salary = (this._employees.reduce((acc, p) => acc + p.salary, 0) / this._employees.length).toFixed(2);
        let today = new Date().getFullYear();
        this._stat.middleAge = (this._employees.reduce((acc, p) => acc + today - p.birthDate.getFullYear(), 0) / this._employees.length).toFixed(1)
        this._stat.min = this._employees.reduce((acc, p) => acc > today - p.birthDate.getFullYear() ? today - p.birthDate.getFullYear() : acc, today - this._employees[0].birthDate.getFullYear(), 0)
        this._stat.max = this._employees.reduce((acc, p) => acc < today - p.birthDate.getFullYear() ? today - p.birthDate.getFullYear() : acc, today - this._employees[0].birthDate.getFullYear(), 0)
        return this._stat.max
    }

}

const firm = new Company();

addPerson.onclick = function () {
    const person = new Employee(personId.value.trim(), firstName.value.trim(), lastName.value.trim(), birthDate.value, salary.value.trim());
    if(!firm.addEmployee(person)) return alert(`Person with id = ${person._id} exists`);;
           
    clearStats();
    const li = createInfoElement(person.toString(), 'li');
    const buttonDel = createInfoElement('X', 'button');
    buttonDel.setAttribute('name', person._id)
    buttonDel.classList.add('del');

    buttonDel.onclick = function ({ target }) {
        target.parentElement.remove();
        clearStats();
        firm.removeEmployee(target.getAttribute('name'))
    }

    li.append(buttonDel);
    personsList.append(li);
    personId.value = firstName.value = lastName.value = birthDate.value = '';
}

calcStats.onclick = function () {
    if(!firm.employees.length) return alert(`Nothing to stat`);
    firm.getStatisctic();
    console.log(firm._stat);
    
    const divStats = document.createElement('div');
    const h3avg = createInfoElement(`Average age: ${firm._stat.middleAge}`, 'h3');
    const h3min = createInfoElement(`Min age: ${firm._stat.min}`, 'h3');
    const h3max = createInfoElement(`Max age: ${firm._stat.max}`, 'h3');
    const h3salary = createInfoElement(`Avg salary: ${firm._stat.salary}`, 'h3');

    divStats.append(h3avg, h3min, h3max, h3salary);
    if (stats.firstElementChild.nextElementSibling) {
        stats.replaceChild(divStats, stats.firstElementChild.nextElementSibling);
    } else {
        stats.appendChild(divStats);
    }
};

function clearStats() {
    if (stats.firstElementChild.nextElementSibling) {
        stats.removeChild(stats.firstElementChild.nextElementSibling);
    }
}

function createInfoElement(content, tag) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.append(text);
    return element;
}