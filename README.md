# npm – Resumen rápido

## ¿Qué es npm?

**npm** (Node Package Manager) es la herramienta de gestión de paquetes y automatización de proyectos para Node.js.

Permite instalar librerías, ejecutar scripts y gestionar dependencias de forma automática. Todo se configura mediante un archivo central llamado `package.json`.

---

## Conceptos básicos

### `package.json`

Es el archivo principal donde se define:

- Información del proyecto (`name`, `version`, `description`)
- Dependencias (`dependencies` y `devDependencies`)
- Scripts de ejecución
- Configuración de compilación o herramientas adicionales

**Ejemplo básico:**

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Proyecto de ejemplo"
}
```

---

### Dependencias

Las librerías necesarias para el proyecto se declaran en `package.json`:

- `"dependencies"` → necesarias para **ejecución**
- `"devDependencies"` → necesarias solo para **desarrollo**

**Ejemplo:**

```json
"dependencies": {
  "express": "^5.2.1",
  "mysql2": "^3.19.1"
}
```

Para instalarlas se ejecuta:

```bash
npm install
```

> npm descargará automáticamente las librerías en la carpeta `node_modules`.

---

### Scripts npm

Los scripts permiten automatizar tareas comunes, como ejecutar la aplicación, tests o compilaciones.

**Ejemplo en `package.json`:**

```json
"scripts": {
  "start": "node app.js",
  "dev": "node app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Se ejecutan con:

```bash
npm run start   # o simplemente: npm start
npm run dev     # para desarrollo
npm run test    # ejecutar tests
```

---

## Ciclo de vida / tareas comunes

| Comando | Función |
|---|---|
| `npm install` | Instala las dependencias |
| `npm start` | Ejecuta la aplicación |
| `npm run <script>` | Ejecuta un script definido en `package.json` |
| `npm test` | Ejecuta los tests definidos |
| `npm update` | Actualiza las dependencias |
| `npm uninstall` | Elimina un paquete |

---

## Repositorios

npm descarga paquetes desde repositorios:

- **Local** → dentro de `node_modules` del proyecto
- **Remoto** → el registro público de npm ([https://www.npmjs.com/](https://www.npmjs.com/))
- **Privado** → repositorios internos o privados

---

## Estructura típica de un proyecto Node.js + Express

```
proyecto/
│
├── package.json
├── package-lock.json
├── node_modules/
└── src/
    ├── app.js
    ├── controllers/
    ├── services/
    ├── dao/
    └── models/
```

---

## 💡 Idea clave

> npm sigue el principio **"Convention over Configuration"** de manera ligera:
> si respetas la estructura estándar de Node.js y defines tus scripts,
> necesitas muy poca configuración para ejecutar tu proyecto.

---
Fuentes: [ChatGPT](https://chat.openai.com) + [Claude](https://claude.ai)