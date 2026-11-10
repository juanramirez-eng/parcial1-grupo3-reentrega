# parcial1-grupo3-reentrega · Cafetería Origen

Proyecto desarrollado en TypeScript que integra una API REST con Express y un frontend en React para gestionar productos, pedidos y reportes de una cafetería.

El desarrollo se realizó aplicando TDD, manteniendo commits separados para los ciclos rojo y verde.

## Tecnologías

### Backend

- Node.js
- TypeScript
- Express
- Vitest
- Supertest

### Frontend

- React
- TypeScript
- Vite
- Zod
- Bootstrap
- Sass
- Vitest
- React Testing Library
- MSW
- Playwright

## Instalación

Clonar el repositorio e instalar las dependencias del backend:

```bash
npm install
```

Luego instalar las dependencias del frontend:

```bash
cd frontend
npm install
```

## Ejecutar la API

Desde la raíz del proyecto:

```bash
npm start
```

La API se ejecuta en:

```text
http://localhost:3000
```

## Ejecutar el frontend

Desde la carpeta `frontend`:

```bash
npm run dev
```

La aplicación se ejecuta en:

```text
http://localhost:5173
```

Para abrir la aplicación asociada a una mesa:

```text
http://localhost:5173/?mesa=4
```

El número de mesa se obtiene desde el parámetro `mesa` de la URL.

## Flujo principal

El usuario puede:

1. ingresar mediante una URL con `?mesa=N`;
2. consultar el catálogo obtenido desde la API;
3. seleccionar productos;
4. agregarlos al carrito;
5. revisar el subtotal estimado;
6. confirmar el pedido;
7. recibir el número de pedido;
8. consultar su estado y total desde la API.

El frontend utiliza los precios informados por el backend y no recalcula el precio real de los productos.

## Productos

Endpoints:

```text
GET /productos
GET /productos/:id
```

Ejemplo:

```bash
curl http://localhost:3000/productos
```

```bash
curl http://localhost:3000/productos/1
```

Ejemplo de producto café:

```json
{
  "id": "5",
  "tipo": "expreso",
  "nombre": "Expreso mediano Colombia",
  "precioBase": 2500,
  "tamano": "mediano",
  "variedad": {
    "nombre": "Colombia",
    "descripcion": "Acidez media, cuerpo equilibrado y notas cítricas y florales"
  },
  "precio": 7360
}
```

Ejemplo de pastelería:

```json
{
  "id": "19",
  "tipo": "pasteleria",
  "nombre": "Muffin de chocolate",
  "precioBase": 2500,
  "precio": 2500
}
```

Un producto inexistente responde:

```json
{
  "error": "Producto no encontrado"
}
```

con estado HTTP `404`.

## Pedidos

Endpoints:

```text
POST /pedidos
GET /pedidos
GET /pedidos/:id
```

Ejemplo:

```bash
curl -X POST http://localhost:3000/pedidos \
  -H "Content-Type: application/json" \
  -d "{\"mesaId\":4,\"items\":[{\"productoId\":\"19\",\"cantidad\":1}]}"
```

Ejemplo de respuesta:

```json
{
  "id": "1",
  "mesaId": 4,
  "items": [
    {
      "productoId": "19",
      "cantidad": 1
    }
  ],
  "estado": "pendiente",
  "total": 2500
}
```

Consultar un pedido:

```bash
curl http://localhost:3000/pedidos/1
```

## Reportes

Endpoints:

```text
GET /reportes/facturacion
GET /reportes/mas-vendidos
```

Ejemplos:

```bash
curl http://localhost:3000/reportes/facturacion
```

```bash
curl http://localhost:3000/reportes/mas-vendidos
```

Pedidos y reportes utilizan la misma instancia de `PedidoService`, por lo que los reportes trabajan con los pedidos creados previamente.

## Endpoints de soporte para E2E

Cuando el backend se ejecuta con:

```text
NODE_ENV=test
```

se habilitan:

```text
POST /__test__/reset
POST /__test__/seed
```

`reset` limpia los pedidos y reinicia la secuencia de IDs.

`seed` deja disponible el catálogo conocido utilizado durante las pruebas E2E.

Estos endpoints son utilizados por Playwright antes de ejecutar el flujo completo.

## Manejo de errores

La API responde errores con el formato:

```json
{
  "error": "mensaje"
}
```

Se contemplan casos como:

- producto inexistente;
- pedido inexistente;
- ID de pedido inválido;
- lista de items inválida;
- cantidades inválidas;
- mesa inválida;
- rutas inexistentes.

Una ruta inexistente responde:

```json
{
  "error": "Ruta no encontrada"
}
```

## Comunicación frontend - backend

Durante desarrollo se utiliza el proxy de Vite para redirigir:

```text
/productos
/pedidos
/reportes
/__test__
```

hacia:

```text
http://localhost:3000
```

De esta forma el frontend puede comunicarse con la API sin problemas de CORS durante desarrollo y pruebas E2E.

## Validación de contratos

Las respuestas del backend son validadas en el frontend mediante Zod.

Si una respuesta no respeta el contrato esperado, el cliente informa un error en lugar de utilizar datos inválidos.

## Estado del menú

La carga del menú utiliza un estado discriminado:

```text
cargando
error
listo
```

Esto permite representar de forma explícita cada estado de la petición.

## Carrito

El carrito se administra mediante React Context y `useReducer`.

Permite:

- agregar productos;
- aumentar cantidades;
- disminuir cantidades;
- quitar productos;
- vaciar el carrito;
- obtener un subtotal estimado.

El total definitivo del pedido siempre lo calcula el backend.

## Bootstrap y Sass

El frontend utiliza Bootstrap personalizado mediante Sass.

Las variables principales se definen antes de importar Bootstrap:

```scss
$primary: #6f4e37;
$secondary: #d9c2a7;
$body-bg: #f8f5f1;
$body-color: #2f2a26;
```

## Tests del backend

Desde la raíz:

```bash
npm test
```

Estado actual:

```text
15 archivos de test
83 tests
```

## Tests del frontend

Desde `frontend`:

```bash
npm test
```

Incluye pruebas unitarias, de componentes e integración con MSW.

Estado actual:

```text
12 archivos de test
67 tests
```

## E2E

Desde `frontend`:

```bash
npm run test:e2e
```

Playwright levanta automáticamente:

- backend con `NODE_ENV=test`;
- frontend con Vite.

Antes de cada prueba ejecuta:

```text
POST /__test__/reset
POST /__test__/seed
```

El flujo E2E valida:

```text
abrir mesa
→ cargar productos
→ elegir producto
→ agregar al carrito
→ confirmar pedido
→ visualizar número de pedido
→ visualizar estado
→ visualizar total
```

## Build del frontend

Desde `frontend`:

```bash
npm run build
```

El comando ejecuta TypeScript y genera el bundle de producción con Vite.

## TDD

Durante el desarrollo se utilizó:

```text
Rojo → Verde → Refactor
```

Reglas aplicadas:

- primero se escribe el test;
- se verifica que falle por el comportamiento esperado;
- el rojo se guarda en un commit independiente;
- se implementa únicamente lo necesario para hacerlo pasar;
- se vuelve a ejecutar la suite;
- el verde se guarda en otro commit;
- los refactors se realizan con los tests en verde;
- los PR se integran sin squash para conservar el historial.

Ejemplo del flujo E2E:

```text
test: definir flujo E2E de pedido completo (rojo)
feat: completar flujo E2E de pedido (verde)
```

## Estructura principal

```text
src/
├── data/
├── models/
├── repositories/
├── routers/
├── services/
├── app.ts
└── server.ts

tests/
└── tests del backend

frontend/
├── e2e/
├── src/
│   ├── api/
│   ├── carrito/
│   ├── components/
│   ├── hooks/
│   ├── menu/
│   ├── mesa/
│   ├── schemas/
│   ├── services/
│   └── test/
├── playwright.config.ts
├── vite.config.ts
└── package.json
```

## Comandos principales

Backend:

```bash
npm install
npm start
npm test
```

Frontend:

```bash
cd frontend
npm install
npm run dev
npm test
npm run test:e2e
npm run build
```

## Estado actual

El proyecto cuenta con:

- API de productos;
- creación y consulta de pedidos;
- reportes;
- integración entre pedidos y reportes;
- frontend React;
- lectura de mesa desde URL;
- catálogo;
- carrito;
- confirmación de pedido;
- validación con Zod;
- Bootstrap con Sass;
- pruebas unitarias;
- pruebas de componentes;
- pruebas de integración;
- prueba E2E con Playwright;
- endpoints de soporte para pruebas.