# parcial1-grupo3-reentrega · API Cafetería Origen

## Cómo correrlo
```
npm install
npm test
npm start
```

## Ramas
feat/productos, feat/catalogo, feat/pedidos, feat/reportes

## Reglas de TDD
- Rojo → Verde → Refactor, un commit por fase (`test:`, `feat:`, `refactor:`).
- Nunca se escribe código de producción sin un test que falle antes.
- Cada PR se mergea solo con `npm test` en verde.