function isObject(obj) {
  return typeof obj == 'object';
}

function isArray(obj) {
  return Array.isArray(obj);
}

function deepFreeze(obj) {
  // Tu código aquí 👈
  let freezeSubject;

  const subjectIsArray = isArray(obj);
  const subjectIsObject = isObject(obj);

  if (subjectIsObject) {
    freezeSubject = {};
  } else if (subjectIsArray) {
    freezeSubject = [];
  } else {
    return Object.freeze(obj)
  }

  if (subjectIsObject) {
    console.log("Es un objeto");
    for (key in obj) {
      console.log("Analizando la clave: " + key);
      const keyIsObject = isObject(obj[key]);

      if (keyIsObject) {
        console.log("recorriendo el objeto " + key + " con el valor " + obj[key]);
        freezeSubject[key] = deepFreeze(obj[key]);
      }
      console.log("freezando la clave " + key + " con el valor " + obj[key]);
      Object.freeze(obj[key]);
    }
  }

  Object.freeze(obj);
}

const juano = {
  name: "Juanito",
  approvedCourses: ["Curso 1","Curso 2"],
  caracteristicas: {
    age: 18,
    colorCabello: 'Negro',
    gustos: {
      musica: ['rock', 'punk', 'ska'],
      peliculas: ['drama', 'horros', 'comedia'],
    },
  },
  addCourse(newCourse) {
    console.log("This", this);
    console.log("This.approvedCourses", this.approvedCourses);
    this.approvedCourses.push(newCourse);
  }
};

