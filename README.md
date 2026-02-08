# 🌟 Portafolio Personal

Un portafolio web moderno y responsivo construido con Next.js 16, TypeScript, y Tailwind CSS. Incluye animaciones fluidas, soporte multiidioma (Español/Inglés), y modo oscuro/claro.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves usando Framer Motion
- 🌐 **Multiidioma**: Soporte completo para Español e Inglés con cambio dinámico
- 🌓 **Tema Claro/Oscuro**: Alternancia entre modos claro y oscuro con persistencia
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- ⚡ **Optimizado**: Construido con Next.js 16 para máximo rendimiento
- 🎭 **Animaciones 3D**: Integración con Three.js y React Three Fiber
- 🎯 **Secciones Completas**:
  - Hero con presentación animada
  - Sobre mí
  - Habilidades técnicas
  - Proyectos destacados`
  - Formulario de contacto
  - Footer

## 🛠️ Tecnologías

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **3D**: [Three.js](https://threejs.org/) con [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Temas**: [Next Themes](https://github.com/pacocoursey/next-themes)

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/portafolio.git
cd portafolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la build de producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
portafolio/
├── app/                      # App Router de Next.js
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de inicio
├── components/
│   ├── layout/              # Componentes de layout
│   │   ├── Navbar.tsx       # Barra de navegación
│   │   └── ThemeToggle.tsx  # Toggle de tema
│   └── sections/            # Secciones de la página
│       ├── About.tsx        # Sección sobre mí
│       ├── Contact.tsx      # Formulario de contacto
│       ├── Footer.tsx       # Pie de página
│       ├── Hero.tsx         # Sección hero
│       ├── Projects.tsx     # Proyectos destacados
│       └── Skills.tsx       # Habilidades técnicas
├── contexts/                # Contextos de React
│   ├── LanguageContext.tsx  # Contexto de idioma
│   └── ThemeContext.tsx     # Contexto de tema
├── lib/
│   └── translations.ts      # Traducciones ES/EN
└── public/                  # Archivos estáticos
```

## 🎨 Personalización

### Modificar traducciones

Edita el archivo [lib/translations.ts](lib/translations.ts) para cambiar o agregar traducciones:

```typescript
export const translations = {
  es: {
    // Traducciones en español
  },
  en: {
    // Traducciones en inglés
  }
}
```

### Actualizar información personal

Los componentes en [components/sections/](components/sections/) contienen la información personal que puedes modificar según tus necesidades.

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. Vercel detectará automáticamente Next.js y configurará todo
3. Tu sitio estará en línea en minutos

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OliverN77/portafolio)

### Otras opciones

- **Netlify**: Conecta tu repositorio y despliega automáticamente
- **GitHub Pages**: Requiere configuración adicional para Next.js
- **VPS**: Ejecuta `npm run build` y `npm start`

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 👤 Contacto

Oliver - [olivernie2626@gmail.com](mailto:olivernie2626@gmail.com)

Link del proyecto: [https://github.com/OliverN77/portafolio](https://github.com/OliverN77/portafolio)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
