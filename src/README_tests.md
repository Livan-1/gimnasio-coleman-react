# Pruebas unitarias (React Testing Library + Jest)

## Ejecutar
1) Instala dependencias: `npm install`
2) Ejecuta pruebas: `npm test`

## Estructura propuesta
- `src/__tests__/header.test.js` (5 pruebas)
- `src/__tests__/store.test.js` (5 pruebas)
- `src/__tests__/cart.test.js` (5 pruebas)
- `src/__tests__/app.test.js` (5 pruebas)

> Total: 20 pruebas (mínimo).

Si algún **selector** de texto no coincide con tu UI (por ejemplo, si tu botón dice "Añadir" en vez de "Agregar"), ajusta las expresiones regulares en los `getByRole` / `getByText`.

## Notas
- Estas pruebas están pensadas para el proyecto **Create React App** con `react-scripts` y la configuración por defecto de Jest.
- Evitamos snapshots; priorizamos pruebas por **comportamiento** (interacción del usuario y resultado visible).
