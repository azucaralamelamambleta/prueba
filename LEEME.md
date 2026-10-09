# LoQueSueñas - tienda lista para subir

## Qué hay en la carpeta
- `index.html`: la tienda (diseño, catálogo, talles, estampa, carrito, página de detalle).
- `precios.json`: los precios de todo. Hoy están en $1 para probar.
- `foto-NN.jpg`: la foto de cada producto (NN es el número del producto).
- `api/checkout.js`: crea el pago en Mercado Pago con el total exacto.
- `vercel.json` y `package.json`: configuración, no se tocan.

## Cómo publicarla (Vercel + GitHub, gratis)
1. **Access Token de Mercado Pago:** entrá a Mercado Pago Developers > "Tus integraciones", creá una aplicación (Checkout Pro) y copiá el Access Token de producción. Es secreto: no lo pegues en ningún chat ni archivo.
2. **GitHub:** creá una cuenta y un repositorio nuevo. Subí todos los archivos con "Add file > Upload files".
   - La carpeta `api` hay que crearla aparte: "Add file > Create new file", escribí `api/checkout.js` como nombre y pegá el contenido del archivo.
3. **Vercel:** creá una cuenta en vercel.com con tu GitHub, tocá "Add New > Project" e importá el repositorio.
   - Antes de deployar, en "Environment Variables" agregá `MP_ACCESS_TOKEN` con tu token.
   - Tocá "Deploy". Te da el link de tu tienda.
4. **Probá** con un pedido de $1: agregá algo, "Finalizar compra" y "Pagar ahora".

## Cambiar precios
Editá `precios.json` en GitHub y guardá ("Commit changes"). La tienda se actualiza sola en uno o dos minutos. Las claves son el número de cada producto.

## Cambiar fotos
Subí una foto nueva con el mismo nombre (por ejemplo `foto-31.jpg`) y reemplazá la anterior.

## Cambiar medidas, material y descripciones
En `index.html`, buscá `TBL` (medidas), `MAT` (material), `DESC` (descripciones) y `CARE` (cuidados).

## Cambiar la cuenta donde entra la plata
Generá el Access Token desde la otra cuenta de Mercado Pago y reemplazá `MP_ACCESS_TOKEN` en Vercel (Settings > Environment Variables). Después hacé un "Redeploy".

## Notas
- Si Mercado Pago rechaza el pago de prueba por el monto, subí los precios de prueba (por ejemplo a 100).
- El logo que sube el cliente no viaja con el pago: se pide por WhatsApp después de pagar.
