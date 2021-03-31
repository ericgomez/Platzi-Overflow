# PlatziOverflow

Proyecto de ejemplo para el curso de HapiJS, es un sitio que permite crear preguntas y postear respuestas, el dueño de la respuesta puede seleccionar la respuesta correcta, incluye un API rest para obtener una pregunta especifica o varias. usa una base de datos de Firebase para almacenar la información

## Instrucciones

- Instale las dependencias: `npm install`
- Cree un proyecto de firebase en esta url: https://console.firebase.google.com/u/0/?pli=1 (requiere una cuenta de Google) y conserve el ID del proyecto
- Obtenga un archivo de credenciales de Firebase, reemplaze el segmento `PONGA-EL-ID-DE-Su-PROYECTO-AQUI` en la siguiente URL y luego visitela: https://console.firebase.google.com/u/0/project/PONGA-EL-ID-DE-Su-PROYECTO-AQUI/settings/serviceaccounts/adminsdk
- Debe llegar a una pantalla como esta: ![imagen](https://cldup.com/jac5uhQ-J6-3000x3000.png)
  De click en el botón `Generar Nueva Clave Privada`
- Descargar el archivo JSON a la carpeta `config` de este proyecto
- Renombre este archivo a `firebase.json`
- Ejecute el proyecto con `npm run dev`
- Visite el sitio en http://localhost:3000

## The MIT License (MIT)

Copyright © `2018` `Platzi`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
