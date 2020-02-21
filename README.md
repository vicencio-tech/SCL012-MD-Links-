# Markdown Links

## Índice

* [1. Instalación de la librería](#3-instalación-de-la-librería)
* [2. Guía de uso](#4-guía-de-uso)
* [3. Documentación Técnica](#5-documentación-técnica)
* [4. Autor](#6-autor)

***

## 1. Instalación de la librería

Se puede instala de la siguiente formas:

- Directamente desde GitHub con el comando:

- Vía global con el comando:

npm i -g Md-Links-bianca-vicencio

Este módulo incluye un ejecutable y una interfaz que se puede importar con require para usarlo.

- Local para usar la Api


## 2. Guía de uso

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

## 3. Documentación Técnica

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

## 4. Autor
Bianca Vicencio Lemus




