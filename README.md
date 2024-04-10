UNIVERSIDAD VALLE DEL MOMBOY; VICERRECTORADO; FACULTAD DE INGENIERÍA; PERIODO 2024A; CARRERA INGENIERÍA EN COMPUTACIÓN
BACKEND; SECCIÓN VIV/FI; UNIDAD IV; e-actividad 4.1:
Proyecto Final: Sistema de Gestión Universitario “UVM”

**Introducción**
El presente proyecto “Sistema de Gestión Universitario” (SGU) para la Universidad
Valle del Momboy (UVM) trata acerca de una continuación a todos los proyectos anteriores
del mismo nombre, cuyo objetivo es presentar un sistema capaz de listar las actividades
pautadas para cada semana dentro de un periodo trimestral de clases. El sistema también
mantiene otras funcionalidades como almacenamiento de información referente a
profesores, materias, secciones, eventos y trimestres. De igual manera el sistema permite la
libre edición de todos los registros referentes a lo mencionado anteriormente.

**Recomendaciones**
Se recomienda ampliamente utilizar el informe/manual de usuario encontrado en la carpeta
.recursosUVM - dicho manual provee información detallada de los requisitos necesarios
y los pasos a tomar para el despliegue. De igual manera, el manual brinda información
sobre cómo utilizar correctamente el sistema.

**Breve Mención de Requisitos y Despliegue**
  *Requisitos*
    Visual Studio Code (VSCode)
    Node.js
    XAMPP
    MySQL Workbench
    GitHub
    Postman
  *Despliegue*
    Paso 1: Clonando el Repositorio con GitHub
    Paso 2: Ejecutar el Servidor Local MySQL con XAMPP
    Paso 3: Crear la Base de Datos MySQL Local con MySQL Workbench
    Paso 4: Crear el archivo “.env"
    Paso 5: Ejecutar el Servidor del SGU
    Paso 6: Ejecutar Postman

**Importante: Archivo "datos.env"**
Se debe de crear un archivo llamado “datos.env” en la
carpeta “config” del proyecto, donde serán guardadas las credenciales para obtener acceso
a la base de datos local y también para crear la cuenta “admin” predeterminada del sistema.
Una vez creado el archivo, se puede ejecutar VSCode y arrastrar dicho archivo para
poder editarlo. Ya que se están trabajando los valores por defecto de la BD, si el usuario lo
desea, puede copiar y pegar el texto a continuación al archivo “datos.env":

# Archivo datos.env
# Este es el archivo que el usuario debe crear en su máquina local, y ajustar a sus necesidades.
# El usuario puede cambiar contraseñas, puertos, nombre de usuario, etc. según vea conveniente.
# Datos para establecer conexión a la BD
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=123
DB_NAME=uvmbd
JWT_SECRET=uvmpanas1337contraseñasecreta
# Credenciales para crear la cuenta "admin" por defecto al inicializar el sistema.
ADMIN_USER=admin
ADMIN_PASS=admin
ADMIN_ROLE=director

**Comentarios**
Puede sentirse bienvenido a entrar en contacto con cualquiera de los desarrolladores
para mayor información, sugerencias o dudas.
