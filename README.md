﻿# template MSK
Las rutas de la app estan en `src/routers/msk.tsx` desde aca se puede ver las pages y components que usa actualmente este sitio

## Rutas dispobiles de WP

### Home
- https://wp.msklatam.com/wp-json/wp/api/home -> tiene toda la data en un solo endpoint
- https://wp.msklatam.com/wp-json/wp/api/home/hero
- https://wp.msklatam.com/wp-json/wp/api/home/tarjetas
- https://wp.msklatam.com/wp-json/wp/api/home/banner
- https://wp.msklatam.com/wp-json/wp/api/home/reviews
- https://wp.msklatam.com/wp-json/wp/api/home/best-sellers
- https://wp.msklatam.com/wp-json/wp/api/home/destacados
- https://wp.msklatam.com/wp-json/wp/api/home/webinar 

### Posteos
- https://wp.msklatam.com/wp-json/wp/api/posts
- https://wp.msklatam.com/wp-json/wp/api/posts/id

### Productos
- https://wp.msklatam.com/wp-json/wp/api/products
- https://wp.msklatam.com/wp-json/wp/api/product/id
  
### Tienda
- https://wp.msklatam.com/wp-json/wp/api/shop

## Rutas dispobiles de Backend MSK

## GET

### Profesiones
- https://www.msklatam.com/msk-laravel/public/api/professions

### Especialidades
- https://msklatam.com/msk-laravel/public/api/specialities

### Profesiones que debe tener la tienda
- https://www.msklatam.com/msk-laravel/public/api/store/professions

## POST

### Formulario de contacto
- https://msklatam.com/msk-laravel/public/api/CreateLeadMSKCRM

## Mi Cuenta

### Logeo y deslogeo (POST)
- https://msklatam.com/msk-laravel/public/api/login (Al logearse te devuelve un Token Bearer que se deberia almacenar en un estado)
- https://msklatam.com/msk-laravel/public/api/logout (RUTA PROTEGIDA, necesita el token para revocarlo)

### Perfil (GET)
- https://msklatam.com/msk-laravel/public/api/profile/{email} (RUTA PROTEGIDA, necesita el token para retornar el perfil completo del usuario)

### Cambio de PW (POST)
- https://msklatam.com/msk-laravel/public/api/RequestPasswordChange (RUTA QUE DEBE ESTAR EN EL SUBMIT DEL FORM /forgot-pass (front-end), al enviar deberia de enviarte un mail a la casilla que se ingreso al input y en el mail al hacer un click en el boton de continuar te llevaria a otra ruta para ingresar la contraseña)
- https://msklatam.com/msk-laravel/public/api/newPassword (RUTA QUE ACTUALIZA LA PW EN ZOHO)
