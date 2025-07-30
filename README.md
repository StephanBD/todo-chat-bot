# todo-chat-bot

Este es un chat-bot de tareas pendientes que te permite gestionar tus tareas a través de una interfaz de chat.

## Descripción

La aplicación es una interfaz de chat responsiva y centrada construida con Vue.js 3 y Vuetify 3. Permite a los usuarios interactuar con un webhook de n8n para gestionar una lista de tareas pendientes. El estado de la aplicación se gestiona con Pinia.

Características principales:
- Interfaz de chat para añadir y ver tareas.
- Visualización de mensajes de chat.
- Soporte para mostrar tarjetas de tareas con enlaces.
- Indicador de carga durante las peticiones.
- Manejo de errores.

## Justificación de stack y herramientas utilizadas

-   **Vue.js 3 (Composition API)**: Se eligió por su reactividad, rendimiento y la organización del código que permite la Composition API, facilitando la gestión de la lógica de los componentes.
-   **Vuetify 3**: Como librería de componentes de UI, Vuetify acelera el desarrollo con componentes pre-construidos y un sistema de diseño consistente (Material Design).
-   **Pinia**: Es la solución de manejo de estado recomendada para Vue 3. Ofrece una API sencilla e intuitiva, es extremadamente ligera y proporciona una gran experiencia de desarrollo con el DevTools de Vue.
-   **Axios**: Cliente HTTP para realizar las peticiones al webhook de n8n. Es una librería muy popular y fácil de usar.
-   **Vite**: Como herramienta de construcción, Vite ofrece un arranque en frío del servidor de desarrollo extremadamente rápido y una recarga en caliente (HMR) casi instantánea.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```