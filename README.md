Trabajo Integrador: Gestión de Órdenes de logística:
Este proyecto es una API REST que sirve para gestionar órdenes de logística con una base de datos en la nube, buscando simplificar el trabajo de administración de envío con herramientas eficientes y sencillas.

---

Características:
1. Permite gestionar órdenes con comandos para crear, leer, actualizar y eliminar pedidos.
2. Se puede filtrat órdenes por su estado con parámetros de consulta, también se puede mostrar la cantidad total de órdenes agrupadas por estado.
3. Tiene validaciones con Mongoose, por ejemplo, hay campos obligatorios y valores permitidos o predeterminados.
4. Se trabajó con variables de entoro y tiene un despliegue funcional en vercel.

---

Tecnologías usadas:
1. En el backend se usó node.js y express.js
2. Para la base de datos se utilizó MongoDB Atlas y Mongoose.
3. Para la configuración de las variables de entorno trabajé con dotenv y nodemon.
4. Por último, el despiegue del proyecto se hizo con vercel.

---

La estructura del proyecto es la siguiente, se especifica en formato árbol para su fácil comprensión:

/back-integrador
├── app.js (Configuración principal del servidor Express)
├── .env (Variables de entorno (no se sube a GitHub))
├── vercel.json (Configuración para despliegue en Vercel)
├── /config
│ └── db.js (Conexión a MongoDB Atlas)
├── /models
│ └── Orden.js (Modelo de datos (esquema y validaciones))
├── /routes
│ └── ordenes.js (Definición de rutas y lógica CRUD)
└── package.json (Dependencias y scripts del proyecto)

---

 Explicación de los metodos y cada endpoint:
  Por cierto, el URL base del proyecto es: **https://back-integrador-mu.vercel.app** Se puede probar los endpoints desde el navegador o herramientas como Thunder Client.

1. GET: "/ordenes" es una lista de todas las órdenes **(https://back-integrador-mu.vercel.app/ordenes)**

2. GET: "/ordenes?estado=Pendiente" filtra las órdenes por estado (Pendiente, En tránsito o Entregado) **(https://back-integrador-mu.vercel.app/ordenes?estado=Pendiente)**

3. GET: "/ordenes/:id" obtiene una orden por su ID **(https://back-integrador-mu.vercel.app/ordenes/68f1693a0e8d2f295dbf7150)**

4. POST: "/ordenes" para crear una nueva orden **(https://back-integrador-mu.vercel.app/ordenes)**

5. PUT: "/ordenes/:id" para actualizar una orden existente **(https://back-integrador-mu.vercel.app/ordenes/68f1693a0e8d2f295dbf7150)**

6. DELETE: "/ordenes/:id" para eliminar una orden especifica **(https://back-integrador-mu.vercel.app/ordenes/68f1693a0e8d2f295dbf7150)**

7. GET: "/ordenes/estadisticas/estados" para ver la cantidad total de órdenes agrupadas según su estado **(https://back-integrador-mu.vercel.app/ordenes/estadisticas/estados)**

---

Desarrollado por Victoria Galleguillo 
GitHub - https://github.com/galleguillovic  
Proyecto en Vercel: https://vercel.com/galleguillovics-projects/back-integrador