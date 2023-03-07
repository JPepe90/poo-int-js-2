# poo-int-js-2
POO intermedia metodos estaticos

# Object.seal() & Object.freeze()
Metodos del Object para evitar que sus atributos y metodos sean editables o borrables

# Object.defineProperty
Metodo del Object para definir un nuevo atributo o metodo permitiendo tambien declarar en forma explicita sus propiedades: writable, enumerable y configurable.

# Funciones recursivas
Deep Copy en main.js
Deep Freeze en ./playgrounds/playground1.js


# Metodos isSealed() & isFrozen()
Derivados del Object para saber si los objetos son writable o configurable

# RORO
## Receive Object, return Object
Permite manejar un objeto de entrada y devolver un objeto tambien. En este concepto tambien vimos un ejemplo de validacion de elementos a la ora de instanciar objetos con createStudent y la funcion requiredParameters. Además se especifico como definir que el objeto sea vacio por default aunque la validacion de requiredParameters la anula.

## Metodos de encapsulamiento (public y private)
Con la separacion en private y public mas el uso del caracter '_' para definir los atributos se definen nuevas funcione: readName() y changeName() que protege a los atributos para que no sean alterados directamente. Sin embargo para que estas no sean alteradas hay que utilizar el metodo defineProperty en cada uno para deshabilitar las opciones writable y configurable. De esta forma simulamos el "encapsulamiento" de las propiedades del objeto y sus metodos. Esto puede limitar el polimorfismo.

## Getters y Setters
Reemplazando a las funciones readName() y changeName().
