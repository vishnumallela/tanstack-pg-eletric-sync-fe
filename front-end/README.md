# Frontend - Electric SQL Todo Sync

This is the Next.js frontend application for the Electric SQL Todo Sync demo.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

### Code Structure

```
app/
├── api/
│   └── todos/
│       └── route.ts          # REST API endpoints
├── globals.css               # Global styles
├── layout.tsx                # Root layout component
└── page.tsx                  # Main todo application

components/
└── ui/                       # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    └── input.tsx

lib/
└── utils.ts                  # Utility functions
```

### Key Components

#### TodoApp (`app/page.tsx`)
- Main application component
- Handles todo creation and display
- Manages optimistic updates
- Implements real-time sync

#### API Routes (`app/api/todos/route.ts`)
- POST: Create new todos
- GET: Fetch all todos
- Direct PostgreSQL integration

### Electric SQL Integration

The application uses Electric SQL for real-time synchronization:

```typescript
const todoCollection = createCollection(
  electricCollectionOptions({
    id: 'sync-todos',
    shapeOptions: {
      url: 'http://localhost:3000/v1/shape',
      params: { table: 'todos' }
    },
    getKey: (item) => item.id,
    schema: todoSchema
  })
)
```

### Live Queries

Real-time data updates are handled by TanStack Query:

```typescript
const { data = [] } = useLiveQuery((query) =>
  query.from({ todo: todoCollection })
)
```

## 🎨 Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for pre-built components
- **CSS Variables** for theming

### Component Styling

All UI components are styled using Tailwind classes and follow the shadcn/ui design system. The main card layout provides a clean, modern interface.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=54321
DB_NAME=electric
DB_USER=postgres
DB_PASSWORD=password

# Electric SQL Configuration
ELECTRIC_URL=http://localhost:3000
```

### Development Settings

The application is configured for development with:
- Turbopack for faster builds
- Hot reload enabled
- TypeScript strict mode
- Biome for linting and formatting

## 🧪 Testing

### Manual Testing Steps

1. **Basic Functionality**
   - Add a new todo
   - Verify it appears in the list
   - Check browser console for sync logs

2. **Real-time Sync**
   - Open multiple browser tabs
   - Add todos in different tabs
   - Verify all tabs update simultaneously

3. **Error Handling**
   - Stop the Electric service
   - Try to add a todo
   - Verify optimistic update rollback

### Browser Console

Monitor the console for:
- Electric SQL sync messages
- API request/response logs
- Error messages

## 🐛 Debugging

### Common Issues

1. **Hydration Mismatch**
   - Ensure `isMounted` state is properly managed
   - Check server/client rendering differences

2. **Sync Not Working**
   - Verify Electric service is running
   - Check network connectivity
   - Review browser console errors

3. **Database Connection**
   - Ensure PostgreSQL is accessible
   - Verify connection parameters
   - Check Docker container status

### Debug Tools

- **React DevTools** for component inspection
- **Network Tab** for API request monitoring
- **Console** for Electric SQL logs
- **Docker logs** for infrastructure debugging

## 📦 Dependencies

### Core Dependencies

- `next` - React framework
- `react` - UI library
- `@tanstack/react-db` - Database client
- `@tanstack/electric-db-collection` - Electric SQL integration
- `zod` - Schema validation
- `pg` - PostgreSQL client

### UI Dependencies

- `@radix-ui/react-slot` - Component primitives
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes
- `lucide-react` - Icons
- `tailwind-merge` - Tailwind utilities

### Development Dependencies

- `@biomejs/biome` - Linting and formatting
- `@types/node` - TypeScript types
- `@types/pg` - PostgreSQL types
- `tailwindcss` - CSS framework
- `typescript` - Type checking

## 🚀 Deployment

### Build Process

```bash
# Install dependencies
npm ci

# Build application
npm run build

# Start production server
npm start
```

### Environment Setup

Ensure all environment variables are properly configured for production:

- Database connection parameters
- Electric SQL service URL
- Security settings

### Performance Optimization

- Turbopack for faster builds
- Optimized bundle splitting
- Static asset optimization
- Server-side rendering where appropriate

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Electric SQL Docs](https://electric-sql.com/docs)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
