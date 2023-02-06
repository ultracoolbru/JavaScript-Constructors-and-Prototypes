// This will not be any app as such, just a place to show the use of Constructor functions and Prototypes.

class CreateComponent {
    // The constructor function is not needed here, but it is good practice to have it.
    constructor() { }

    createRootElement(tag, content) {
        const rootElement = document.createElement(tag);
        rootElement.innerHTML = content;
        document.getElementById('app').append(rootElement);
        return rootElement;
    }
}

// Class Person.
class Person extends CreateComponent {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
        this.render();
    }

    render() {
        this.createRootElement('div', `<strong><p>I am ${this.name} and I am ${this.age} years old.</p></strong>`);

        console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
    }
}

// Class Species.
class Species extends CreateComponent {
    constructor(species) {
        super();
        this.species = species;
        this.render();
    }

    // This get added to the creation of the Species object and is created multiple times when Species is instantiated.
    // Therefore, if you create multiple Species objects, this will be created multiple times.
    // This is not ideal, so it is wise to have your methods added to the prototype.
    // This occupies more memory than the prototype method.
    // Although this has a slight performance disadvantage, it can be easier for binding to a button for example.
    animal = () => {
        this.createRootElement('div', `<p>This species is a ${this.species}.</p>`);
        console.log(`This species is a ${this.species}.`);
    }

    greet() {
        this.createRootElement('div', `<p>Hello, I am a ${this.species}.</p>`);
        console.log(`Hello, I am a ${this.species}.`);
    }

    // This will get added to the prototype and is available to all instances of the class.
    render() {
        this.createRootElement('div', `<p>I am a ${this.species}.</p>`);
        console.log(`I am a ${this.species}.`);
    };
}

function Country(country) {
    this.country = country;
    this.render = function () {
        const rootElement = document.createElement('div');
        rootElement.innerHTML = `<p>I am from ${this.country}.</p>`;
        document.getElementById('app').append(rootElement);

        console.log(`I am from ${this.country}.`);
    }
}

// Prototype function, prototypeTest.
// This creates a new prototype function that is not part of the constructor function.
Country.prototype = {
    prototypeTest(prototypeTest) {
        const rootElement = document.createElement('div');
        rootElement.innerHTML = `<p>Is this a prototype: ${prototypeTest}.</p>`;
        document.getElementById('app').append(rootElement);

        console.log(`Is this a prototype: ${prototypeTest}.`);
    }
}

// Prototype function that calls a parent method.
// This is a good example of how and where to use a prototype function and is a better way than the above.
Country.prototype.callParentMethod = function () {
    this.render();
}

// const country = new Country('South Africa');
// const country2 = country.__proto__.constructor('England');
// console.log(country2);

// Constructor function, Init.
// This is a good example of how and where to use a constructor function.
// Ideally, you would use a constructor function to initialise your app for example.
function Init() {
    const species = new Species('Human');
    species.animal();

    const btn1 = document.getElementById('btn1');
    btn1.addEventListener('click', species.animal);

    // This is preferred over the above as it is more efficient.
    const btn2 = document.getElementById('btn2');
    btn2.addEventListener('click', species.greet.bind(species));

    new Person('Edward', 49);

    const country = new Country('South Africa');
    country.render();
    
    country.prototypeTest(country.__proto__ === Country.prototype);
    country.callParentMethod();
}

Init();