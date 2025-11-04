# Project Structure

## Root Directory

```
Altar-palabras/
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Build output
├── node_modules/           # Dependencies
├── .env                    # Environment variables (not in git)
├── .env.example           # Environment template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── eslint.config.js       # ESLint configuration
└── vercel.json            # Vercel deployment config
```

## Source Structure

```
src/
├── components/            # React components
│   ├── AltarInteractivo.jsx      # Main interactive altar
│   ├── PanelElementos.jsx        # Element selection panel
│   ├── ElementoArrastrable.jsx   # Draggable element wrapper
│   ├── ZonaAltar.jsx            # Altar drop zone
│   ├── CeldaAltar.jsx           # Individual altar cell
│   ├── ControladorAltar.jsx     # Altar controls
│   ├── SubidorFoto.jsx          # Photo upload modal
│   ├── Altar.jsx                # Simple altar (legacy)
│   ├── Calaverita.jsx           # Verse display
│   ├── DescargaImagen.jsx       # Image export
│   ├── Formulario.jsx           # Input form
│   ├── HistorialCalaveritas.jsx # History management
│   └── Modal*.jsx               # Various modals
├── hooks/                 # Custom React hooks
│   ├── useAltarState.js         # Altar state management
│   ├── useHistorialCalaveritas.js # History management
│   └── useLocalStorage.js       # Persistence utilities
├── pages/                 # Route components
│   ├── Home.jsx                 # Landing page
│   ├── Historia.jsx             # About page
│   └── CrearCalaverita.jsx      # Main app page
├── services/              # External services
│   └── iaService.js             # AI integration
├── utils/                 # Utility functions
│   └── generadorCalaveritas.js  # Verse generation logic
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Architecture Patterns

### Component Organization
- **Pages**: Route-level components in `/pages`
- **Components**: Reusable UI components in `/components`
- **Hooks**: Custom hooks for state management and side effects
- **Services**: External API integrations
- **Utils**: Pure utility functions

### State Management
- **Local State**: useState for component-specific state
- **Custom Hooks**: Shared state logic (useAltarState, useHistorialCalaveritas)
- **localStorage**: Persistence layer for altar state and photos
- **Context**: Not used - prefer prop drilling for simplicity

### File Naming Conventions
- **Components**: PascalCase with .jsx extension
- **Hooks**: camelCase starting with 'use', .js extension
- **Utils/Services**: camelCase with .js extension
- **Pages**: PascalCase with .jsx extension

### Import/Export Patterns
- Default exports for components and pages
- Named exports for utilities and hooks
- Relative imports for local files
- Absolute imports for node_modules

## Key Architectural Decisions

1. **Single Page App with Routing**: React Router for navigation between modes
2. **Drag & Drop Architecture**: react-dnd for altar interactions
3. **Hook-based State**: Custom hooks encapsulate complex state logic
4. **localStorage Persistence**: Client-side data persistence without backend
5. **Component Composition**: Small, focused components with clear responsibilities