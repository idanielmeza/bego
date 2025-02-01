## Instalaciones

- Node.js 20 o superior
- Docker
- Docker compose
- pnpm

## Requisitos

- Cuenta GPC con APIKEY para Google Maps

## Iniciar proyecto

```bash
$ pnpm install
```

## Compilar proyecto

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Base de datos
```
docker-compose up -d
```

## Swagger
```
http://localhost:3000/api/v1
```

## Descripcion
Esta aplicación utiliza Docker Compose para levantar los servicios necesarios y expone una API RESTful en el puerto 3000.

Endpoints

- User
- Auth
- Location
- Truck
- Order

```
Bearer <token>
```

Este proyecto esta diseñado con las librerias proporcionadas por nestjs para facilitar el desarrollo implementando mongoose para la conexion a la base de datos, passport para el manejo de tokens de sesion.

Se utiliza docker-compose para facilitar la instalacion de la base de datos mongodb.

