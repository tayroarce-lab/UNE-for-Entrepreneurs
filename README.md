# 🌟 UNE Costa Rica & Modelo Süria - Plataforma de Emprendedores

**Proyecto FWD**  
*Una plataforma integral de desarrollo y empoderamiento para mujeres emprendedoras en Costa Rica.*

---

## 📌 Descripción del Proyecto

Este proyecto es una aplicación web responsiva diseñada bajo la arquitectura **"Mobile-First"** utilizando **React + TypeScript (Vite)**. Su propósito es digitalizar el proceso de **Incubación de Negocios** de UNE y la gestión del **Modelo Süria**, conectando a mujeres emprendedoras con recursos financieros, herramientas de capacitación y una comunidad de apoyo, todo centralizado en un mismo lugar.

El desarrollo incluye dos perfiles principales:
1. **Emprendedor (User):** Puede gestionar su perfil, acceder a un catálogo avanzado de financiamientos, crear simulaciones de presupuesto, leer noticias del ecosistema e interactuar con la línea directa del Modelo Süria.
2. **Administrador (Admin):** Tiene acceso a un *Dashboard* analítico donde realiza las cuatro operaciones **CRUD** básicas: administrar usuarios, gestionar presupuestos simulados de las emprendedoras y mantener el portal al día publicando "Tips" y "Noticias".

---

## 🛠️ Tecnologías y Herramientas Utilizadas

- **Frontend:** React 18, TypeScript, Vite.
- **Enrutamiento:** React Router v6 (Rutas Públicas y Protegidas).
- **Estilos:** Vanilla CSS (CSS Modules encapsulados) asegurando cero colisiones globales, con diseño ultra-premium.
- **Backend (Mock/Persistencia):** `json-server` operando sobre el archivo interactivo `db.json` local.
- **Librerías Extra:** `lucide-react` (iconografía), `sweetalert2` y `sonner` (alertas profesionales), `react-leaflet` (mapa interactivo).

---

## 📋 Requisitos Previos

Asegúrese de tener instalado en su máquina:
- [Node.js](https://nodejs.org/) (versión 16+ recomendada).
- Una terminal (CMD, PowerShell, Git Bash, etc).

---

## 🚀 Instalación y Ejecución Local

Para garantizar que tanto **el servidor de base de datos** como **la interfaz visual** se ejecuten correctamente y puedan comunicarse entre sí, debe abrir **2 terminales por separado** y ejecutar un paso en cada una.

### Paso 1: Levantar la Base de Datos Rest API (Servidor)
Abra la primera terminal, navegue hasta la carpeta raíz del proyecto y corra el puente de persistencia del *JSON Server*:
```bash
# 1. Instalar dependencias si todavía no lo ha hecho:
npm install

# 2. Iniciar el motor de Base de Datos en el puerto 3001:
npx json-server --watch db.json --port 3001
```
*(Deje esta terminal abierta y corriendo. Verá un mensaje indicando que el servidor escucha en `http://localhost:3001`)*

### Paso 2: Levantar el Portal Web (Frontend)
Abra una **segunda terminal** en la misma carpeta raíz del proyecto y encienda Vite:
```bash
# Iniciar la interfaz gráfica de React (suele usar el puerto 5173):
npm run dev
```

Abra la URL que le genere la segunda terminal (generalmente `http://localhost:5173/`) en su navegador preferido.

## 🎮 Instrucciones de Uso

Una vez que ambos servidores estén corriendo (JSON Server y Vite), puede explorar la plataforma con los siguientes casos de uso:

### Como Usuario Invitado (Sin Cuenta):
- Navegar por la página de **Inicio**, conocer las secciones de **Nuestra Gente** y explorar los requisitos del modelo de incubación en **Modelo Süria**.
- Usar el botón en la navegación o en las tarjetas para dirigirse a `/registro`.

### Como Usuario Emprendedor:
1. Navegue a **Crear Cuenta** y postule su información.
2. Inicie Sesión. Se le redirigirá al "Portal del Emprendedor" (Página principal modo usuario).
3. Busque oportunidades en **Ver Opciones** dentro de la tarjeta del *Modelo Süria* o navegue a la pestaña de financiamientos.
4. Puede leer *Noticias* enviadas por los administradores.

### Como Usuario Administrador (Panel CRUD):
1. Inicie sesión utilizando **admin@une.com** (contraseña: `Admin123!`).
2. Se le redirigirá instantáneamente al `/admin/dashboard`.
3. Desde la barra lateral, acceda a:
   - **Manejo de Clientes**: Explore los usuarios registrados en el sistema, elimine o cree de ser necesario.
   - **Gestión de Recursos**: Formule nuevos Tips o Noticias, las cuales aparecerán inmediatamente en el portal web (aplicación viva del CRUD).
   - **Manejo de Presupuestos**: Observe los presupuestos simulados creados por las diferentes emprendedoras.

---

## 🔒 Accesos de Prueba al Sistema

Para evaluar los dos tipos de portales (Admin/User), puede registrar una cuenta nueva en `/registro` o iniciar sesión con estas cuentas pre-cargadas en el `db.json`:

**1. Cuenta de Administrador:**
- **Ruta:** `/login` -> Redirige al `/admin/dashboard`
- **Correo:** `admin@une.com`
- **Contraseña:** `Admin123!`

**2. Cuenta de Emprendedora (Usuario regular):**
- **Ruta:** `/login` -> Redirige al portal de usuario normal `/`
- **Correo:** `ashley@correo.com`
- **Contraseña:** `Admin123!`

*(Si prueba registrar un usuario nuevo, la contraseña debe cumplir reglas de seguridad: al menos 8 caracteres, 1 número, 1 mayúscula y 1 carácter especial).*

---

## 🏗️ Cumplimiento de Fases - Rúbrica FWD

Este proyecto cubrió integralmente los puntos estipulados en la evaluación:

- ✔️ **FASE 1 - LOGIN:** Formularios dinámicos y validados, comprobación en tiempo real contra el servidor JSON. Implementación de un `AuthContext` rígido que separa con el patrón *PrivateRoute* los accesos entre Administradores y Emprendedores (Login con protección de ruta).
- ✔️ **FASE 2 Y 3 - HOME/INFO:** Estructura modular "Composer" sin mezclar HTML dentro de la vista maestra. Diseño complejo de *Landing Page*, Navbar reactiva y *Footer* rico en información. Carrousel dinámico conectado al backend.
- ✔️ **FASE 4 Y 5 - CRUD DE PRODUCTOS (BACKEND):** Operaciones **GET, POST, PUT y DELETE** funcionando asíncronamente en todas las vistas del panel de administración (Noticias, Clientes y Presupuestos) interactuando directo contra el `json-server`. Formatos de creación prellenados antes de envíos *PUT*. 
- ✔️ **FASE 6 - NAVEGACIÓN:** Múltiples entornos con sub-rutas anidades de `react-router-dom`, interceptores lógicos si no hay sesión. Navegaciones directas.
- ✔️ **FASE 7 Y 8 - ARQUITECTURA "COMPOSER":** Patrón de diseño purista donde las "Pages" solo componen partes y delegan toda su lógica a "Componentes Atómicos". Cero `any` implícitos en **TypeScript**, garantizando total seguridad de tipos. CSS encapsulados usando la convención `*.module.css`.

---

## ✨ Estructura del Proyecto

El código fuente principal está en la carpeta `src/`, dividido según convenciones profesionales:
```text
📦 src/
 ┣ 📂 assets/              # Imágenes y gráficos
 ┣ 📂 components/
 ┃ ┣ 📂 AdminComponents/   # Bloques exclusivos del Dashboard Admin
 ┃ ┣ 📂 Shared/            # Navbar, Footers y elementos comunes reutilizables
 ┃ ┗ 📂 UserComponents/    # Componentes específicos de Vistas de Emprendedoras
 ┣ 📂 context/             # AuthContext (Estado de Autenticación)
 ┣ 📂 pages/               # Páginas contenedoras maestras (Composers)
 ┣ 📂 routes/              # Configuración de URLs públicas y privadas (App Router)
 ┣ 📂 services/            # Archivos que exponen funciones asíncronas de Axios/Fetch
 ┣ 📂 styles/              # CSS base globales (Variables Core).
 ┣ 📂 types/               # Definiciones (Interfaces) estrictas de TypeScript
 ┗ 📜 main.tsx             # Entry point de React.
```
