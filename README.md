# 🔒🔒 Test App 🔒🔒 

_El objetivo de la app es la realización de un ejercicio que cumpla con una serie de requisitos dados, como el consumo de una api de imagenes, mostrado de miles de elementos con optimizacion del scroll y posibilidad de filtrado de los mismos._


## Comenzando 🚀

_Test App ha sido creado a raiz de un starter template de **Ionic CLI**_

## Instalación 🔧

_Test App está construido como un proyecto IONIC v5, con todas las dependencias necesarias incluidas en el fichero _package.json_. Para la gestión de plugins nativos se ha empleado Apache Cordova. Necesitaremos por tanto: **Ionic CLI**, **Cordova**, **Node.js** y **NPM**_

_Para la constuccion del fichero .apk deberemos tener el android SDK y para iOS, disponer de un equipo mac con XCode y una licencia de desarrollador iOS_

> Para instalar Ionic CLI de manera global:
```shell
$ npm install -g @ionic/cli
```

> Para instalar Cordova de manera global:
```shell
$ npm install -g cordova
```

> Para descargar todas las dependencias:
```shell
$ npm install
```

> Para desplegar la aplicación en un entorno de desarrollo:
```shell
$ ionic serve
```


## Distribución de carpetas 📁

_Se indican las principales ubicaciones_:

📂 /src/app - Contiene basicamente a la aplicación

📁 /src/app/component - Contiene los componentes comunes de ionic

📁 /src/app/model - Contiene los modelos o interfaces

📁 /src/app/pipe - Contiene el pipe de filtrado

📁 /src/app/services - Contiene los servicios comunes y de obtencion de datos mediante peticiones http

📁 /src/app/pages - Contiene todas las páginas de la aplicación

📂/src/enviroment - Ficheros con las variables para los distintos entornos.
- ```environment.ts```: En este fichero se definen las variables globales de configuración de la aplicación para el entorno de desarrollo. 
- ```environment.prod.ts```: En este fichero se definen las variables globales  de configuración de la aplicación para el entorno de producción. 


## Despliegue 📦

_Dado que se trata de una aplicacion que puede ser construida sobre iOS y sobre Android, para cada una de las plataformas, deberemos realizar su proceso.Se recomienda seguir los pasos indicados en la documentacion oficial de Ionic:_
- Para android: [ionicframework.com/docs/developing/android](ionicframework.com/docs/developing/android)
- Para iOS: [ionicframework.com/docs/developing/ios](ionicframework.com/docs/developing/ios)

> En ambos casos, antes de desplegar en cualquiera de las plataformas, deberemos preparar la app para su ejecución sobre el marco de Cordova. Es necesario recordarlo, ya que Ionic da la posibilidad de crear la capa para los plugin nativos mediante Cordova o a través de Capacitor. Para ello, antes de lanzar el comando de construccion o ejecucion en una plataforma deberemos ejecutar:
- Para android:
```shell
$ ionic cordova prepare android
```

- Para iOS:
```shell
$ ionic cordova prepare ios
```
Despues de cordova prepare, ya si podemos construir o lanzar la app para una plataforma.

> Para construir el apk de la aplicacion en android en un entorno de desarrollo:
```shell
$ ionic cordova build android
```

> Para arrancar la app en un dispositivo real android (conectado mediante USB) en un entorno de desarrollo, con live-reload:
```shell
$ ionic cordova run android -l
```

> Para mas comando y sus configuraciones, se recomienda consultar el siguiente enlace [https://ionicframework.com/docs/cli/commands/cordova-run](https://ionicframework.com/docs/cli/commands/cordova-run)

## Personalización 🎨

> Para personalizar el contenido ionic permite el cambio de sus colores y estilos. Para más informacion [https://ionicframework.com/docs/theming/basics](https://ionicframework.com/docs/theming/basics)

## Construido con 🛠️

* [Ionic CLI](https://ionicframework.com/docs/intro/cli) - Interfaz de línea de comando para Ionic.
* [Apache Cordova](https://cordova.apache.org/) - Gestion de Plugins para el uso de los recursos nativos del dispositivo.
* [Node.js](https://nodejs.org/es/) - Entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome
* [NPM](https://www.npmjs.com/) - Manejador de dependencias


## Repositorio 📖

Para más información sobre el proyecto, puede visitar su [repositorio en Github](https://github.com/SergioVazquezDev/test_app)


## Otros enlaces de interés 📚

- [https://ionicframework.com/docs/](https://ionicframework.com/docs/)
- [https://ionicframework.com/docs/intro/environment](https://ionicframework.com/docs/intro/environment)
- [https://ionicframework.com/docs/intro/cli](https://ionicframework.com/docs/intro/cli)
- [https://ionicframework.com/docs/developing/ios](https://ionicframework.com/docs/developing/ios)
- [ionicframework.com/docs/developing/android](ionicframework.com/docs/developing/android)
- [https://ionicframework.com/docs/cli/commands/cordova-run](https://ionicframework.com/docs/cli/commands/cordova-run)
- [https://ionicframework.com/docs/theming/basics](https://ionicframework.com/docs/theming/basics)
