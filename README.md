# ECUADLE

Juego de palabras diario inspirado en Wordle y adaptado a la jerga, modismos y quichuismos populares del Ecuador.

---

## Características

- **Jerga Ecuatoriana**: Base de datos con palabras populares del día a día en Ecuador (*biela, choro, chapa, ñaño, bacán, minga, pilas, paila, yunta, trole*, etc.).
- **Definiciones y Ejemplos**: Al terminar la partida (victoria o derrota), se muestra el significado de la palabra y un ejemplo de uso cotidiano.
- **Palabra Diaria (UTC-5)**: Una palabra nueva cada 24 horas, sincronizada con la zona horaria de Ecuador.
- **Modo Oscuro y Claro**: Fondo oscuro moderno por defecto con botón selector de tema (Modo Claro / Modo Oscuro) integrado en la barra de navegación y persistido en `localStorage`.
- **Diseño Tricolor Nacional**:
  - Paleta inspirada en la bandera de Ecuador (Amarillo, Azul y Rojo).
  - Bandera de Ecuador como vector SVG de alta resolución con su escudo nacional.
  - Franja tricolor continua en la base de la barra de navegación.
- **Convención de Colores del Juego**:
  - **Amarillo**: Letra correcta en la posición exacta (cuando las letras están bien).
  - **Azul**: Letra que sí está en la palabra, pero en una posición distinta.
  - **Rojo**: Letra incorrecta (no pertenece a la palabra del día).
- **Teclado en Español**: Soporte para la letra **Ñ**, tanto en el teclado virtual como en el teclado físico del dispositivo.
- **Estadísticas y Persistencia**: Historial de partidas jugadas, porcentaje de victorias, racha actual y mejor racha guardadas localmente en `localStorage`.
- **Compartir Resultados**: Copia el progreso en formato de texto limpio sin emojis intrusivos.
- **Responsivo**: Optimizado para dispositivos móviles, tablets y monitores de escritorio.

---

## Tecnologías Utilizadas

- **React 19**
- **Vite 6**
- **JavaScript (ES6+)**
- **CSS3 Moderno** (Flexbox, CSS Grid, variables CSS, backdrop-filter)

---

## Estructura del Proyecto

```text
ECUADLE/
├── index.html              # Punto de entrada HTML
├── package.json            # Dependencias y scripts de Vite
├── vite.config.js          # Configuración de Vite
├── .gitignore              # Archivos ignorados por git
├── README.md               # Documentación del proyecto
└── src/
    ├── main.jsx            # Inicialización de React
    ├── App.jsx             # Componente principal y lógica del juego
    ├── index.css           # Estilos globales y diseño tricolor
    ├── components/
    │   ├── Header.jsx       # Barra superior de ancho completo
    │   ├── EcuadorFlag.jsx  # Bandera de Ecuador en SVG
    │   ├── Board.jsx        # Tablero de 6 intentos x 5 letras
    │   ├── Keyboard.jsx     # Teclado en pantalla con la Ñ
    │   ├── HelpModal.jsx    # Modal con reglas y ejemplos
    │   ├── StatsModal.jsx   # Modal de estadísticas y definición
    │   └── Toast.jsx        # Notificaciones emergentes
    └── data/
        └── words.js        # Diccionario de palabras ecuatorianas y validación
```

---

## Instalación y Ejecución Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/FranciscoArias10/ECUADLE.git
   cd ECUADLE
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```
   Los archivos optimizados para despliegue se generarán en la carpeta `dist/`.

---

## Despliegue

El proyecto se puede desplegar fácilmente en plataformas como **Vercel**, **Netlify**, o **GitHub Pages**:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
