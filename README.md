This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# INFORMACION SOBRE EL PROYECTO MI ESCUELA PRIMERO

- Carpeta para los docuemntos de los aliados
  - 1esKNSQ1N_B_a89p4ulptXkLQvuVJuJb3
- Carpeta para las imagenes de los aliados
  - 1g2XNiM5DZf4nr_ZhZohcS4HVhAmFDeqm
- Carpeta para los documentos de las esculas
  - 1i2aBwM8ptSGrHNAxqP6R3ySmUQsnd--7
- Carpeta para las imagenes de las escuelas
  - 1d4z20p9-UT86S-hoT-2xNxa40DAzLMXK

Algunas funciones necesarias para obtener poder mostrar laos archivos que se ecuentran como links en la base de datos estan en la carpeta libs

# TECNOLOGIAS A USAR

- back-end: node.js, express
- Base de datos: MySQL
- front-end: React, javascript y next.js

# FORMATO PARA LOS TIPO DE USUARIOS ASI COMO TAMBIEN EL ESTADO DE ACTIVIDAD

- Estado
  En espera(0)
  Aceptado (1)
  rechazado(2)

- sesionActiva
  Activo(1)
  Inactivo(0)

- Tipo de usuarios
  Escuela (1)
  Aliado (2)
  Administrador (3)

Los perfiles, tanto de necesidades como de ofertas (almacenados en la base de datos en los campos perfilnecesidad.estado y perfiloferta.estado), pueden encontrarse en uno de los siguientes cuatro estados:

* [0] En revisión: El perfil ha sido registrado pero aún no ha sido aprobado por un administrador.
* [1] Pendiente: El perfil ya fue aprobado, pero aún no ha iniciado ninguna colaboración con aliados o escuelas.
* [2] En progreso: Ya se está trabajando activamente con una escuela o un aliado en relación con esta necesidad u oferta.
* [3] Terminado: El trabajo o colaboración ha concluido satisfactoriamente.

# Archivo backend

- CorrerBackend.js
  Este archivo se encarga de ejecutar todos los archivos bakcend que estan importados
