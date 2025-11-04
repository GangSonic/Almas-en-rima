# Technology Stack

## Core Technologies

- **React 18+**: Modern React with hooks (useState, useEffect, custom hooks)
- **Vite**: Fast build tool and development server
- **Tailwind CSS v4**: Utility-first CSS framework with custom theme
- **React Router DOM v7**: Client-side routing for multi-page navigation

## Key Libraries

- **react-dnd + react-dnd-html5-backend**: Drag and drop functionality for altar interactions
- **@google/generative-ai**: Google Gemini AI integration for calaverita generation
- **html-to-image + html2canvas**: Image export functionality for altar screenshots
- **axios**: HTTP client for API requests

## Development Tools

- **ESLint**: Code linting with React-specific rules
- **PostCSS + Autoprefixer**: CSS processing
- **Vercel**: Deployment platform

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run deploy       # Build and deploy to Vercel
```

## Environment Configuration

- `.env` file required for Google Gemini AI API key
- Use `.env.example` as template
- API key obtainable from: https://aistudio.google.com/app/apikey

## Build Configuration

- **Vite config**: Standard React setup with no custom plugins
- **Tailwind**: Custom theme with Day of the Dead color palette
- **ESLint**: React hooks and refresh plugins enabled
- **PostCSS**: Tailwind processing with autoprefixer

## Performance Considerations

- localStorage for state persistence
- Debounced auto-save functionality
- Image optimization for uploaded photos (300x300px max, 5MB limit)
- Component-based architecture for efficient re-renders