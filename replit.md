# Med's Calculusator - Advanced Calculus Calculator

## Overview

Med's Calculusator is a sophisticated web-based scientific calculator application that provides advanced calculus computation capabilities including derivative and integral calculations. The application features a modern monochrome UI built with React and TypeScript, offering both basic arithmetic operations and comprehensive mathematical functions with a sleek black, grey, and white aesthetic.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing
- **shadcn/ui** component library with Radix UI primitives for accessible UI components
- **Tailwind CSS** for utility-first styling with custom monochrome theme (black, grey, white only)
- **TanStack Query** for state management and data fetching (prepared for future server-side features)

### Backend Architecture
- **Express.js** server with TypeScript support
- **Node.js 20** runtime environment
- Middleware setup for JSON parsing, request logging, and error handling
- Structured for future API expansion with modular route registration

### Database Layer
- **Drizzle ORM** configured for PostgreSQL integration
- Schema-first approach with type-safe database operations
- Migration support through Drizzle Kit
- **Neon Database** integration for serverless PostgreSQL hosting

## Key Components

### Calculator Engine (`client/src/lib/calculator.ts`)
- **Math.js** library integration for robust mathematical computations
- BigNumber precision configuration for accurate calculations
- Support for basic arithmetic, advanced functions, derivatives, and integrals
- Calculation history management with persistent storage
- Expression preprocessing and result formatting

### UI Components
- **CalculatorDisplay**: Main calculator interface with input handling and mode switching
- **AdvancedFunctionsSidebar**: Comprehensive function library including trigonometric, logarithmic, and special functions
- **CalculationHistory**: Persistent history with type-based categorization and visual indicators
- **Responsive Design**: Mobile-first approach with keyboard navigation support

### Authentication System (Prepared)
- User schema defined with username/password authentication
- In-memory storage implementation with interface for future database integration
- Ready for session management and user-specific features

## Data Flow

1. **User Input**: Calculator accepts input through button clicks or keyboard events
2. **Expression Processing**: Input is preprocessed and validated by the calculator engine
3. **Mathematical Computation**: Math.js evaluates expressions with BigNumber precision
4. **Result Display**: Formatted results are displayed with appropriate type indicators
5. **History Management**: All calculations are stored in persistent history with timestamps
6. **Mode Switching**: Special modes (derivative/integral) modify calculation behavior

## External Dependencies

### Core Libraries
- **math.js**: Advanced mathematical expression evaluation and computation
- **React ecosystem**: React, React DOM, React Hook Form for form management
- **UI Libraries**: Radix UI primitives, Lucide React icons, class-variance-authority for styling variants
- **Development Tools**: TypeScript, ESBuild for production builds, TSX for development

### Database & ORM
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL hosting solution
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Custom Theme**: Monochrome calculator interface with pure black, grey, and white colors only
- **Enhanced Interactions**: Modern button animations with hover effects and scaling
- **Responsive Design**: Mobile-optimized layout with touch-friendly interactions

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for seamless Replit development with hot reloading
- **Local Development**: Vite dev server with Express backend proxy
- **Database**: Automatic PostgreSQL provisioning in Replit environment

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: ESBuild bundles Express server with external package dependencies
- **Deployment**: Configured for Replit's autoscale deployment target
- **Environment**: Production builds serve static files with Express fallback

### Performance Optimizations
- **Code Splitting**: Vite handles automatic code splitting for optimal loading
- **Asset Optimization**: Built-in minification and tree shaking
- **Caching Strategy**: Static asset caching with proper cache headers

## Changelog

```
Changelog:
- June 27, 2025. Initial setup with Men's Calculusator
- June 27, 2025. Rebranded to Med's Calculusator with complete monochrome redesign
  - Updated all styling to pure black, grey, and white theme (removed all colors)
  - Enhanced button animations with hover effects and scaling
  - Improved d/dx display formatting for better readability
  - Added more mathematical functions (hyperbolic, combinatorics, special functions)
  - Updated footer copyright to 2025
  - Redesigned all components with larger spacing and rounded corners
  - Added new function categories in sidebar (combinatorics, constants)
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```