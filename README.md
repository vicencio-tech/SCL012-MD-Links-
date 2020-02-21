# Markdown Links

## Índice

* [1. Antecedentes](#1-antecedentes)
* [2. Diagrama de flujo](#2-diagrama-de-flujo)
* [3. Instalación de la librería](#3-instalación-de-la-librería)
* [4. Guía de uso](#4-guía-de-uso)
* [5. Especificaciones Técnica](#5-documentación-técnica)
* [6. Autor](#6-autor)

***

## 1. Antecedentes

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.



## 2. Diagrama de flujo

A continuación, se muestra el flujograma con el algoritmo para la implementación de la solución de Md-Links.

![flujograma](https://raw.githubusercontent.com/vicencio-tech/SCL012-MD-Links-/master/img/flujograma%20Md-Links.jpg)

## 3. Instalación de la librería

(En desarrollo)

Se puede instala de la siguiente formas:

- Directamente desde GitHub con el comando:

- Vía global con el comando:

npm i -g Md-Links-bianca-vicencio

Este módulo incluye un ejecutable y una interfaz que se puede importar con require para usarlo.

- Local para usar la Api


## 4. Guía de uso

(En desarrollo)

### Para llamar a libreria desde la terminal:

PATH

- Cuando path-to-file igual a un directorio
md-links <"path-to-directory"> [options]

- Cuando path-to-file igual a un archivo
md-links <"path-to-file"> [options]

Considerar que solo lee los archivos con extensión .md:
md-links <file.md>

En ambos casos, se obtiene como resultado:

file: archivo o ruta donde fue encontrado el link.
text: descripción del link.
href: link encontrado.


CLI (Command Line Interface)

- La libreria hace las siguientes entregas:

1. El usuario ingresa las opciones disponibles:

--validate 
Muestra status de los links encontrados

--stats --validate 
Entrega datos estadisticos del status (200, 300, 404, 500 etc) de los links: total, correct, broken

--stats 
Entrega datos estadisticos de los links: total

2. El usuario no ingresa ninguna opción:
Muestra solo path y links encontrados.

## 5. Documentación Técnica

### Lenguaje
JavaScript ECMAScript 6

### Ejecución
Node.js

### Dependencias y modulos NPM
file system
path
filehound
markdown-it
is-url
node-fetch

### Testing
Jest 

### Otros
module.exports
Línea de comando CLI

## 5. Autor
Bianca Vicencio Lemus




