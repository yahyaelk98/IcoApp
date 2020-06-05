# ICOApp

Este es un proyecto incentivado por el "Institut Català d'Oncologia" que necesitaba una idea de como mejorar la experiencia hospital-paciente. Donde se ha creado mediante React-Native una aplicación híbrida servible para IOS y Android, la cual permite ver a
cada paciente sus datos médicos como sería la medicación y citas programas en el ICO, además de ofrecer un listado de contactos para consultar dudas y un Blog para poder realizar preguntas. 

## Comenzando 🚀

Para poder utilizar esta aplicación en modo desarrollo seria conveniente clonar nuestro Api Rest por si se quiere implementar más llamadas.

Mira **Deployment** para conocer como desplegar el proyecto.


## Pre-requisitos 📋
 
Para poder realizar evolutivos de esta aplicación o poder desplegarla en modo desarrollo seria necesario tener conocimientos de :

* JavaScript
* npm
* Expo
* CSS3
* HTML
* PHP

```
El proyecto está montado sobre NodeJs y se debe instalar npm.
```

## Instalación 🔧

Para poder realizar la instalación de 0 se deben seguir estos pasos:

* Instalar NodeJs.
* Una vez instalado, podremos instalar npm.

```
npm install -g expo-cli
```
Una vez instalado podremos o crear un proyecto nuevo o **clonar** este en el directorio donde se ha instalado el npm
* Para crear un proyecto de 0:

```
expo init ProyectoUno
```

* Para clonarlo :

```
git clone https://github.com/yahyaelk98/IcoApp.git
```

En caso de querer ejecutar la aplicación en nuestro ordenador usando un emulador deberos instalar también **Android Studio**
Si no es así, podremos utilizar la aplicación **Expo** en cualquier dispositivo físico.

## Probando el funcionamiento ⚙️
Para poder realizar las pruebas en nuestro local como se ha mencionado antes podemos o hacerlo con un dispositivo físico o virtual.
### Si es un dispositivo físico
* Descargar la aplicación **Expo** en él.
* Ejecutar el siguiente comando en el directorio raíz del proyecto, y nos abrirá el navegador.

```
expo start
```
* Localizamos el código QR, abrimos la aplicación del dispositivo físico y escaneamos ese código.

### Si es un dispositivo virtual
* Abrir el **Android Studio** 
* Crear un emulador
* Abrir el emulador desde el **Android Studio** o desde linea de comandos, en Windows seria algo parecido a esto:
```
C:\Users\usuario\AppData\Local\Android\Sdk\emulator>emulator -avd emulador_icoapp
```
* Ejecutar el siguiente comando en el directorio raíz del proyecto, y nos abrirá el navegador.
```
expo start
```
* Seleccioanr la opción **Run on Android device/emulator.

## Exportar la app 📦
Para probar realmente este proyecto, una vez lo tengamos instalado, podemos prodecer a exportarlo como una apk.
* Exportarlo como una apk en **Android**
```
expo build:android
```
* Exportarlo como una apk en **IOS**
```
expo build:ios
```
Nos preguntará si la queremos exportar como apk para desarrollo o como una apk optimizada para la PlayStore/AppleStore:
* apk - Build a package to deploy to the store or install directly on Android devices
* app-bundle - Build an optimized bundle for the store

Escogemos la primera opción en nuestro caso.

Este comando una vez completado nos abrirá la página de **Expo** donde nos saldrá nuestro proyecto en cola, una vez listo nos saldrá la opción de descargar y lo podremos instalar en nuestros dispositivos.

## La app se ha construido con 🛠️

* [NodeJs](https://nodejs.org/) - Entorno de desarrollo.
* [npm](https://www.npmjs.com/) - Gestión de paquetes.
* [ReactNative](https://reactnative.dev/) - El framework que permite crear la app multiplataforma.
* [Expo](https://expo.io/) - Gestión de paquetes y entorno de compilación de la app.
* [AndroidStudio](https://developer.android.com/studio) - Editor y emulador.



## Wiki 📖

Este proyecto no tiene una wiki especifica que no sean los comentarios dentro del código.

## Autores ✒️

* **Manel Ferrer** - [github](https://github.com/manyf00)
* **Javier Martin** - [github](https://github.com/wachipurry)
* **Yahya El Kajouai** - [github](https://github.com/yahyaelk)



## Licencia 📄

Este proyecto está bajo la **Licencia de software de semi libre**

## Expresiones de Gratitud 🎁

* Gracias al **Institut Pedralbes de Barcelona** y a sus profesores📢.
* Gracias también al **Institut Català d'Oncologia** por ofrecernos el reto 🤓.


