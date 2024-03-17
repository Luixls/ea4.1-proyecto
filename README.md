ea3.1-proyecto: Sistema de Gestión Universitario (SGU)
	El presente proyecto “Sistema de Gestión Universitario” (SGU) trata acerca de una continuación al proyecto anterior del mismo nombre, cuyo objetivo es presentar un sistema capaz de listar las actividades pautadas para cada semana dentro de un periodo trimestral de clases. El sistema también mantiene otras funcionalidades como almacenamiento de información referente a profesores, materias, secciones, eventos y trimestres. De igual manera el sistema permite la libre edición de todos los registros referentes a lo mencionado anteriormente.
	Este proyecto fue desarrollado con la idea principal de facilitar al usuario preparar un itinerario o incluso informarse de qué actividades futuras se acercan, e incluso permite al usuario mantener un registro de las actividades pasadas. Dentro del proyecto se puede resaltar la accesibilidad a editar, desarrollar y ordenar toda la información necesaria o que hacen referencia a las actividades de la universidad.
	En la continuación del proyecto actualmente desarrollado, se han implementado características clave para asegurar la protección de los registros a través de un sistema de usuarios y tokens, este último siendo unas claves generadas por el sistema para identificar qué tipo de usuario está trabajando el SGU, y permitir o negar las operaciones dependiendo de su nivel de permisos. De la misma manera, el SGU también ha mejorado en el ámbito de accesibilidad, obteniendo mejores vistas al listar los datos, y presentando los correspondientes mensajes de advertencia en caso de que sean introducidos datos inválidos o con formato incorrecto.

Para el correcto uso del proyecto (más específicamente, lograr conectarse a la BD local) se debe crear el archivo “datos.env” en la raíz del proyecto, donde serán guardadas las credenciales para obtener acceso a la base de datos local. Una vez creado el archivo, se debe ejecutar VSCode y arrastrar dicho archivo para poder editarlo.
En los ejemplos proveídos en el informe el proyecto está usando los valores por defecto para conectarse a la BD local, y sabemos que la contraseña asignada a la BD es “123”, entonces se deben introducir las credenciales en el archivo .env de la siguiente manera:

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=123
DB_NAME=bdea21
JWT_SECRET=clavegenerica123

En caso de que el usuario decida asignar una dirección, puerto, nombre de usuario, contraseña, o nombre de BD diferente; se puede ajustar correspondientemente sin necesidad de realizar cambios a la lógica del sistema.
Por otro lado, "JWT_SECRET" es la clave secreta o "firma" que el sistema asignará a los tokens proveidos a los usuarios después de un login, esta firma asegurará que dichos tokens sea válidos. El usuario puede asignar una clave secreta o firma a su gusto.
