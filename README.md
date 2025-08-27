# Electric SQL Todo Sync

A real-time todo application demonstrating Electric SQL integration with Next.js, featuring automatic data synchronization between the frontend and PostgreSQL database.

## 🚀 Features

- **Real-time Sync**: Automatic data synchronization using Electric SQL
- **Optimistic Updates**: Instant UI updates with rollback on errors
- **Modern UI**: Clean interface built with Tailwind CSS and shadcn/ui
- **Type Safety**: Full TypeScript support with Zod validation
- **Live Queries**: Real-time data updates using TanStack Query

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │◄──►│  Electric SQL   │◄──►│   PostgreSQL    │
│   (Frontend)    │    │   (Sync Layer)  │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd fe-sync-electric
```

### Step 2: Start Infrastructure Services

```bash
docker-compose up -d
```

This starts:
- PostgreSQL database on port 54321
- Electric SQL sync service on port 3000

### Step 3: Install Dependencies

```bash
cd front-end
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## 🎯 Step-by-Step Demonstration

### 1. Initial Setup Verification

1. Open your browser and navigate to `http://localhost:3001`
2. You should see the "Electric SQL Todo Sync" interface
3. The page should display "No todos yet. Add one above!"

### 2. Adding Your First Todo

1. Type "Buy groceries" in the input field
2. Click the "Add" button
3. The todo should appear instantly in the list
4. Check the browser console to see sync logs

### 3. Testing Real-time Sync

1. Open a second browser tab/window to the same URL
2. Add another todo: "Walk the dog"
3. Both tabs should show the new todo simultaneously
4. This demonstrates real-time synchronization

### 4. Database Verification

1. Connect to the PostgreSQL database:
```bash
docker exec -it electric_quickstart-postgres-1 psql -U postgres -d electric
```

2. Query the todos table:
```sql
SELECT * FROM todos ORDER BY id DESC;
```

3. You should see all todos you've created

### 5. Error Handling Test

1. Stop the Electric service: `docker-compose stop electric`
2. Try to add a new todo
3. Notice the optimistic update and subsequent rollback
4. Restart Electric: `docker-compose start electric`

## 🔧 Configuration

### Environment Variables

The application uses the following default configuration:

- **PostgreSQL**: `localhost:54321`
- **Database**: `electric`
- **User**: `postgres`
- **Password**: `password`
- **Electric Sync**: `http://localhost:3000/v1/shape`

### Custom Configuration

To modify the database connection, update the pool configuration in `front-end/app/api/todos/route.ts`:

```typescript
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '54321'),
  database: process.env.DB_NAME || 'electric',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});
```

## 📁 Project Structure

```
fe-sync-electric/
├── docker-compose.yml          # Infrastructure services
├── front-end/
│   ├── app/
│   │   ├── api/
│   │   │   └── todos/
│   │   │       └── route.ts    # REST API endpoints
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main todo application
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── package.json            # Dependencies and scripts
└── README.md                   # This file
```

## 🧪 Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL 16
- **Sync**: Electric SQL, TanStack Query
- **Validation**: Zod
- **Development**: Biome (linting/formatting)

## 🔍 How It Works

### Data Flow

1. **User Input**: User types a todo and clicks "Add"
2. **Optimistic Update**: Todo appears immediately in the UI
3. **API Call**: Request sent to Next.js API route
4. **Database Insert**: Todo saved to PostgreSQL
5. **Electric Sync**: Electric SQL detects the change
6. **Live Query Update**: TanStack Query receives the update
7. **UI Update**: All connected clients see the change

### Sync Mechanism

- Electric SQL monitors PostgreSQL for changes
- TanStack Query provides live queries that automatically update
- Optimistic updates provide instant feedback
- Error handling includes rollback functionality

## 🚀 Production Deployment

### Environment Setup

1. Set up a production PostgreSQL database
2. Configure Electric SQL for production
3. Update environment variables
4. Build and deploy the Next.js application

### Security Considerations

- Use environment variables for sensitive data
- Enable SSL for database connections
- Configure proper CORS settings
- Implement authentication if needed

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure Docker containers are running
   - Check port 54321 is available
   - Verify database credentials

2. **Electric Sync Not Working**
   - Check Electric service is running on port 3000
   - Verify shape endpoint is accessible
   - Check browser console for errors

3. **Optimistic Updates Not Rolling Back**
   - Ensure error handling is working
   - Check network connectivity
   - Verify API endpoint is responding

### Debug Commands

```bash
# Check container status
docker-compose ps

# View Electric logs
docker-compose logs electric

# View PostgreSQL logs
docker-compose logs postgres

# Restart services
docker-compose restart
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the [Electric SQL documentation](https://electric-sql.com/docs)
- Review the [TanStack Query docs](https://tanstack.com/query)
- Open an issue in this repository
