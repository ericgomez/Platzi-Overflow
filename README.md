# PlatziOverflow

Proyecto de ejemplo para el curso de HapiJS, es un sitio que permite crear preguntas y postear respuestas, el dueño de la respuesta puede seleccionar la respuesta correcta, incluye un API rest para obtener una pregunta especifica o varias. usa una base de datos de Firebase para almacenar la información

## Instrucciones

- Instale las dependencias: `npm install`
- Cree un proyecto de firebase como Firebase Realtime Database en esta url: https://console.firebase.google.com/u/0/?pli=1 (requiere una cuenta de Google) y conserve el ID del proyecto
- Obtenga un archivo de credenciales de Firebase, reemplaze el segmento `PONGA-EL-ID-DE-Su-PROYECTO-AQUI` en la siguiente URL y luego visitela: https://console.firebase.google.com/u/0/project/PONGA-EL-ID-DE-Su-PROYECTO-AQUI/settings/serviceaccounts/adminsdk
- Debe llegar a una pantalla como esta: ![imagen](https://cldup.com/jac5uhQ-J6-3000x3000.png)
  De click en el botón `Generar Nueva Clave Privada`
- Descargar el archivo JSON a la carpeta `config` de este proyecto
- Renombre este archivo a `firebase.json`
- Ejecute el proyecto con `npm run dev`
- Visite el sitio en http://localhost:3000


## The MIT License (MIT)

Copyright © `2019` `ericgomez`

## Claves de acceso
- http://localhost:3000/login
correo: eric.gmz93@gmail.com
password: abc123

