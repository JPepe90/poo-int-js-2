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
// ----- Super Object!!!
// con Clases
class SuperObject {
  static isObject(subject) {
    return typeof subject == 'object';
  }

  static deepCopy(subject) {
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
}

// con Prototipos
function SuperObjectProt() {} // creo el prototipo SuperObject
// le agrego el metodo estático con la siguiente sintaxis
SuperObjectProt.deepCopy = function (subject) {
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

SuperObjectProt.isObject = function (subject) {
  return typeof subject == 'object';
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
    "_learningPaths": learningPaths,
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
    },
    get learningPaths() {
      return private._learningPaths;
    },
    set learningPaths(newLP) {
      // ---------------------------------------------------------------------------
      // ----- Duck Typing (ver referencia readme)
      if (!newLP.name) {
        console.warn("La nueva ruta de aprendizaje debe tener nombre");
        return;
      }

      if (!newLP.courses) {
        console.warn("La nueva ruta de aprendizaje no tiene cursos");
        return;
      }

      if (!isArray(newLP.courses)) {
        console.warn("La nueva ruta de aprendizaje debe ser una lista de cursos");
        return;
      }

      if (newLP.courses.length = 0) {
        console.warn("La nueva ruta de aprendizaje debe tener al menos 1 curso");
        return;
      }

      private._learningPaths.push(newLP);
    },
  };

  // Object.defineProperty(public, readName(), { writable: false, configuragle: false });
  // Object.defineProperty(public, changeName(), { writable: false, configuragle: false });

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

function LearningPath({
  name = requiredParameters("name"),
  courses = [],  
}) {
  this.name = name;
  this.courses = courses;

  // const private = {
  //   "_name": name,
  //   "_courses": courses,
  // };

  // const public = {
  //   get name() {
  //     return private._name;
  //   },
  //   set name(newName) {
  //     if (newName.length > 0) {
  //       private._name = newName;
  //     }
  //   },
  //   get courses() {
  //     return private._courses;
  //   },
  // };

  // return public;
}

function Student({
  name = requiredParameters("name"),
  age,
  email = requiredParameters("email"),
  twitter,
  facebook,
  instagram,
  approvedCourses = [],
  learningPaths = [],
} = {}) {
  this.name = name;
  this.age = age;
  this.email = email;
  this.socialMedia = {
    twitter,
    facebook,
    instagram,
  },
  this.approvedCourses = approvedCourses;

  const private = {
    "_learningPaths": [],
  };

  // ---------------------------------------------------------------------
  // ----- Atributos y metodos privados en prototipos
  Object.defineProperty(this, "learningPaths", {
    get() {
      return private["_learningPaths"];
    },
    set(newLP) {
      if (newLP instanceof LearningPath) {
        private["_learningPaths"].push(newLP);
      } else {
        console.warn("No es una instancia de LearningPaths");
      }
    }
  });

  // ------------------------------------------------------------------
  // ----- InstanceOf
  if (isArray(learningPaths)) {
    for (learningPathIndex in learningPaths) {
      this.learningPaths = learningPaths[learningPathIndex];
    }
  }  
}

const pedro = new Student({ name: "Pedro", email: "pesmeralda@uol.com.ar" });

console.log(pedro instanceof Student); // true
console.log(natalia instanceof Student); // false porque esz instancia de createStudent

const escuelaweb = new LearningPath({ name: "Escuela de Desarrollo Web" });
const escueladata = new LearningPath({ name: "Escuela de Data Science" });
const alan = new Student({
  name: "Alan",
  email: "alanfritz@msn.com",
  learningPaths: [
    escuelaweb, // Esta escuela se agregará porque es instancia del prototipo LearningPaths
    escueladata, // Esta escuela se agregará porque es instancia del prototipo LearningPaths
    { 
      name: "Escuela No Instanciada", // Esta no se agregará
      courses: [],
    },
  ]
})


