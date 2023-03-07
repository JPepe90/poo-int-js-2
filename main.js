const juan = {
  name: 'Juanito',
  age: 18,
  approvedCourses: ["Curso1"],
  socialMedia: {
    twitter: 'juandc',
    instagram: 'juandcok',
  },
  addCourse(newCourse) {
    this.approvedCourses.push(newCourse);
  }
};


// console.log(Object.keys(juan));
// console.log(Object.getOwnPropertyNames(juan));
// console.log(Object.entries(juan));
// console.log(Object.getOwnPropertyDescriptors(juan));

// -------------------------------------------------------------------
// ----- Seal y Freeze
// Evitar borrado de propiedades y aalteracion del valor de estas propiedades
// Object.seal(juan); // sets configurable=false por lo que no se pueden borrar sus propiedades
// Object.freeze(juan); // sets writable=false por lo que no se puede cambiar el value de sus propiedades
Object.freeze(juan.socialMedia);
Object.seal(juan.socialMedia);


// -------------------------------------------------------------------
// ----- defineProperty
// Definir nuevas propiedades a un objeto
Object.defineProperty(juan, "pruebaNASA", {
  value: "extraterrestres",
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(juan, "navigator", {
  value: "Chrome",
  writable: true,
  configurable: true,
  enumerable: false // hará que no sea listado por el metodo Object.keys
});

Object.defineProperty(juan, "editor", {
  value: "VSCode",
  writable: false, // no puedo cambiar el valor del value pero puedo borrar la propiedad editor
  configurable: true,
  enumerable: true
});

Object.defineProperty(juan, "terminal", {
  value: "WSL",
  writable: true,
  configurable: false, // puedo cambiar su value pero no puedo borrar la propiedad terminal
  enumerable: true
});

console.log(Object.getOwnPropertyDescriptors(juan));


// -------------------------------------------------------------------
// ----- Copy de Objetos
// -- Shallow copy: falla cuando tenemos objetos dentro del objeto por el apuntador de memoria
const obj1 = {
  a: 'a',
  b: 'b',
  c: {
    d: 'd',
    e: 'e',
  }
}

const obj2 = {};
for (prop in obj1) {
  obj2[prop] = obj1[prop];
}

const obj3 = Object.assign({}, obj1); // similar al for anterior
const obj4 = Object.create(obj1); // similar al for anterior

// -- JSON.Stringify
const obj5 = JSON.parse(JSON.stringify(obj1));

// -- Funciones recursivas!!!!!!!!!!!!!!!!!!
// // modelo
// function recursiva() {
//   if (/* validacion */) {
//     // llamados recursivos
//   } else {
//     // llamados sin recursividad
//   }
// }
const numeritos = [2,45,3,2,7,5,32,66,88,454,6,59,78,4545,185,48,49848];

// let numerito = 0;
// for (let index = 0; index < numeritos.length; index++) {
//   numerito = numeritos[index];
//   console.log({ 
//     index, 
//     numerito });
// }

function recursiva(numbersArray) {
  if (numbersArray.length != 0) {
    const firstNum = numbersArray[0];
    console.log(firstNum);

    numbersArray.shift(); // --> elimina el primer elemento del array!
    recursiva(numbersArray);
  }
}

// ----------------------------------------------------------------------
// ----- Deep Copy!!

function isObject(subject) {
  return typeof subject == 'object';
}

function isArray(subject) {
  return Array.isArray(subject);
}

function deepCopy(subject) {
  let copySubject;

  const subjectIsArray = isArray(subject);
  const subjectIsObject = isObject(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject; // devuelvo el sujeto
  }

  for (key in subject) {
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) {
      copySubject[key] = deepCopy(subject[key]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[key]);
      } else {
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject; // objeto a devolver
}


// ----------------------------------------------------------------------
// ----- Base Student 
const studentBase = {
  name: undefined,
  email: undefined,
  age: undefined,
  approvedCourses: undefined,
  learningPaths: undefined,
  socialMedia: {
    twitter: undefined,
    instagram: undefined,
    facebook: undefined,
  }
}

const javier = deepCopy(studentBase);
Object.defineProperty(javier, "name", {
  value: "Javier Pepe",
  configurable: false,
});

Object.seal(javier);

// -- isSealed() & isFrozen()
Object.isSealed(javier); // true
Object.isFrozen(javier); // false


// -------------------------------------------------------------------
// ----- RORO = Receive an Object, return an Object
function createStudent({
  name = requiredParameters("name"),
  age,
  email = requiredParameters("email"),
  twitter,
  facebook,
  instagram,
  approvedCourses = [],
  learningPaths = [],
} = {}) {
  const private = {
    "_name": name,
  };

  const public = {
    age,
    email,
    socialMedia: {
      twitter,
      facebook,
      instagram,
    },
    approvedCourses,
    learningPaths,
    
    // changeName(newName) {
    //   if (newName.length > 0) {
    //     /* Metodo rudimentario
    //     // Habilito la modificacion de nombre con Object.defineProperty
    //     Object.defineProperty(natalia, "name", {writable: true});
    //     this.name = newName;
    //     // Deshabilito la modificacion de nombre con Object.defineProperty
    //     Object.defineProperty(natalia, "name", {writable: false});
    //     */

    //     /* Metodo sugerido */
    //     private._name = newName;
    //   }
    // },
    // readName() {
    //   return private._name;
    // },

    get name() {
      return private._name;
    },
    set name(newName) {
      if (newName.length > 0) {
        private._name = newName;
      }
    }
  };

  Object.defineProperty(public, readName(), { writable: false, configuragle: false });
  Object.defineProperty(public, changeName(), { writable: false, configuragle: false });

  return public;
}

function requiredParameters(param) {
  throw new Error(param + " es obligatorio");
}

const natalia = createStudent({
  name: "Natalia",
  age: 24,
  email: "natalianatalia@nat.net",
  instagram: "nati_ok"
});