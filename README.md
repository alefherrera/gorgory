# Gorgory

Gorgory es un sistema online de tests automatizados, orientado a la docencia, más especificamente a las materias _Introducción a la Programación_ y _Programación 1_. 

En la pagina web, los profesores se suscriben a un curso en el cual suben guias, con ejercicios y casos de test, luego el alumno se se suscribe al mismo curso, y resuelve las guias. El sistema le informa al alumno y al profesor el estado de resolución de una guia.

A continuación se detallarán instrucciones para correr _Gorgory Client_ y _Gorgory Server_. Es importante aclarar que el sistema solo funciona el linux.

## Gorgory Server
Para correr _Gorgory Server_ se necesitan las siguientes dependencias:
  1. Mysql Server 5.7
  2. Docker 17
  3. Java 8
  
  Luego, para correr el servidor se ejecuta en linea de comandos:
  
  ```cd api/src && ./gradlew bootRun```
  
  Una vez descargadas las librerias, el servidor empezará a correr. 
  
## Gorgory Client
Para correr _Gorgory Client_ de manera local, se necesita de las siguientes dependencias:
  1. Node 11
    
Luego, para correr el cliente de manera local, se ejecuta en linea de comandos:

```npm install && npm start```

Además, se puede transpilar el codigo Javascript en un Bundle, para ser deployado a un hosting web. Esto se hace de la siguiente manera:

```npm install && npm run build```

Luego de ejecutar los comandos, se creará una carpeta en ```client``` llamada _build_, en ella se encuentran los archivos que deben ser subidos al hosting web.

## Instalar dependencias
### Mysql Server 5.7
[Leeme](https://tecadmin.net/install-mysql-5-on-ubuntu/)

### Docker 17
[Leeme](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

### Java 8
[Leeme](https://websiteforstudents.com/how-to-install-oracle-java-jdk8-on-ubuntu-16-04-17-10-18-04-desktops/)

### Node 11
[Leeme](https://nodejs.org/es/download/package-manager/)
