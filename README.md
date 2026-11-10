# parcial1-grupo3-reentrega · API Cafetería Origen

API desarrollada en TypeScript con Express para gestionar productos, pedidos y reportes de una cafetería.

El proyecto fue desarrollado aplicando TDD, separando los ciclos rojo, verde y refactor en commits independientes.

## Tecnologías

- Node.js
- TypeScript
- Express
- Vitest
- Supertest

## Instalación

Clonar el repositorio e instalar dependencias:

```bash
npm install
```

## Ejecutar tests

```bash
npm test
```

También se puede ejecutar Vitest en modo watch:

```bash
npm run test:watch
```

## Ejecutar la API

```bash
npm start
```

Por defecto, el servidor se ejecuta en:

```text
http://localhost:3000
```

## Funcionalidades

### Productos

Permite consultar el catálogo completo de productos y obtener un producto por ID.

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

### Pedidos

Permite crear pedidos, listar todos los pedidos y consultar uno por ID.

Endpoints:

```text
POST /pedidos
GET /pedidos
GET /pedidos/:id
```

Ejemplo para crear un pedido:

```bash
curl -X POST http://localhost:3000/pedidos \
  -H "Content-Type: application/json" \
  -d "{\"items\":[{\"productoId\":\"1\",\"cantidad\":2}]}"
```

Consultar pedidos:

```bash
curl http://localhost:3000/pedidos
```

### Reportes

Permite consultar la facturación acumulada y los productos más vendidos.

Endpoints:

```text
GET /reportes/facturacion
GET /reportes/mas-vendidos
```

Ejemplo:

```bash
curl http://localhost:3000/reportes/facturacion
```

```bash
curl http://localhost:3000/reportes/mas-vendidos
```

## Flujo integrado

La aplicación comparte las mismas instancias de catálogo, repositorio de pedidos y servicios entre los distintos routers.

Esto permite que un pedido creado mediante:

```text
POST /pedidos
```

sea utilizado posteriormente por:

```text
GET /reportes/facturacion
GET /reportes/mas-vendidos
```

El flujo completo está cubierto por pruebas de integración con Supertest.

## Manejo de errores

La API contempla, entre otros casos:

- producto inexistente;
- pedido inexistente;
- items inválidos al crear un pedido;
- rutas inexistentes.

Una ruta inexistente devuelve:

```json
{
  "error": "Ruta no encontrada"
}
```

## TDD

Se utilizó el ciclo:

```text
Rojo → Verde → Refactor
```

Reglas utilizadas durante el desarrollo:

- primero se escribe el test;
- se ejecuta y se verifica que falle por el comportamiento esperado;
- el test rojo se guarda en un commit independiente;
- se implementa únicamente el código necesario para hacerlo pasar;
- se vuelve a ejecutar la suite;
- el código verde se guarda en otro commit;
- los refactors se realizan con todos los tests en verde;
- los PR se integran sin squash para preservar el historial de TDD.

Ejemplo de convención de commits:

```text
test: comportamiento esperado (rojo)
feat: implementar comportamiento (verde)
refactor: mejorar implementación
fix: corregir integración o configuración
```

## Ramas de trabajo

Durante el desarrollo se utilizaron ramas independientes para cada funcionalidad:

```text
feat/productos
feat/catalogo
feat/pedidos
feat/reportes
feat/integracion
```

Los cambios se integraron a `main` mediante Pull Requests.

## Pruebas de integración

Además de los tests unitarios y de routers, se agregó una prueba de integración que valida el flujo:

```text
Consultar productos
       ↓
Crear pedido
       ↓
Consultar facturación
```

Esto verifica que los módulos de catálogo, pedidos y reportes funcionen correctamente en conjunto.

## Ejecutar una prueba específica

Por ejemplo, para ejecutar únicamente el test de integración:

```bash
npx vitest run tests/integracion.test.ts
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
├── productos
├── catálogo
├── pedidos
├── reportes
└── integración
```

## Estado del proyecto

La API cuenta con pruebas unitarias, pruebas de routers y pruebas de integración para validar el comportamiento de los principales módulos del sistema.