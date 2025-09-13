# Integración de Pasarela de Pago Wompi

## Resumen

Se ha implementado la integración de la pasarela de pago Wompi en el flujo de creación de páginas desde el apartado de "Preview" para usuarios autenticados.

## Archivos Modificados/Creados

### Nuevos Archivos:
1. `src/hooks/useWompiPayment.js` - Hook para manejar el flujo de pago con Wompi
2. `src/pages/PaymentSuccess.jsx` - Página para manejar el retorno exitoso del pago
3. `docs/wompi-integration.md` - Esta documentación

### Archivos Modificados:
1. `src/constants/index.js` - Agregadas configuraciones de Wompi
2. `src/pages/Preview.jsx` - Modificado para integrar el flujo de pago
3. `src/router/AppRoutes.jsx` - Agregada ruta para página de éxito de pago
4. `.env.example` - Agregadas variables de entorno para Wompi

## Variables de Entorno Requeridas

```env
# Wompi Payment Gateway Configuration
VITE_WOMPI_PUBLIC_KEY=your_wompi_public_key_here
VITE_WOMPI_SANDBOX=true
VITE_WOMPI_DEFAULT_AMOUNT=50000
```

### Descripción de Variables:

- `VITE_WOMPI_PUBLIC_KEY`: Clave pública de Wompi (requerida)
- `VITE_WOMPI_SANDBOX`: `true` para modo sandbox, `false` para producción
- `VITE_WOMPI_DEFAULT_AMOUNT`: Monto por defecto en centavos (50000 = 500 COP)

## Configuración

### Modo Sandbox (Desarrollo)
```javascript
VITE_WOMPI_PUBLIC_KEY=pub_sandbox_xxxxx
VITE_WOMPI_SANDBOX=true
VITE_WOMPI_DEFAULT_AMOUNT=50000
```

### Modo Producción
```javascript
VITE_WOMPI_PUBLIC_KEY=pub_prod_xxxxx
VITE_WOMPI_SANDBOX=false
VITE_WOMPI_DEFAULT_AMOUNT=50000
```

## Flujo de Funcionamiento

1. **Usuario Autenticado**: El sistema verifica que el usuario esté logueado
2. **Vista Preview**: Usuario selecciona plantilla y hace clic en "Crea tu web"
3. **Validaciones**: Se valida que exista contenido del template y datos de la empresa
4. **Redirección a Wompi**: Se redirige automáticamente a la pasarela de pago
5. **Pago**: Usuario completa el pago en Wompi
6. **Retorno**: Wompi redirige a `/payment-success`
7. **Creación de Sitio**: Se procesa la creación del sitio web automáticamente
8. **Dashboard**: Usuario es redirigido al dashboard

## URLs de Retorno

- **Éxito**: `{domain}/payment-success`
- **Cancelación**: `{domain}/preview`

## Datos Enviados a Wompi

- **amount_in_cents**: Monto en centavos
- **currency**: "COP"
- **reference**: Referencia única generada automáticamente
- **customer_data**: Información del usuario (email, nombre, teléfono)
- **payment_description**: Descripción del pago
- **redirect_url**: URL de retorno exitoso
- **cancel_url**: URL de cancelación

## Manejo de Errores

- **Usuario no autenticado**: Redirección al login
- **Clave pública no configurada**: Error mostrado al usuario
- **Datos faltantes**: Validación y mensaje de error
- **Error en pago**: Redirección de vuelta a preview con mensaje de error

## Seguridad

- Solo funciona para usuarios autenticados
- Usa sessionStorage para mantener contexto de pago
- Limpia datos sensibles después del procesamiento
- Validación de datos en el retorno del pago

## Testing

Para probar la integración:

1. Configurar variables de entorno de Wompi (modo sandbox)
2. Registrar/autenticar usuario
3. Completar formulario de proyecto
4. Ir a vista preview
5. Hacer clic en "Crea tu web"
6. Verificar redirección a Wompi
7. Completar pago de prueba
8. Verificar retorno y creación de sitio

## Notas Técnicas

- La integración usa el checkout hosted de Wompi
- No se almacenan datos de tarjetas en el frontend
- El procesamiento del pago se maneja completamente por Wompi
- Se requiere configuración adicional en el backend para webhooks de confirmación (opcional)