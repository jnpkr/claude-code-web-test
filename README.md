# Payload CMS Project

A production-ready Payload CMS application built with Next.js, featuring PostgreSQL database support and Cloudflare R2 storage integration.

## Features

- **Payload CMS 3.x**: Modern headless CMS with admin panel
- **Next.js 15**: React framework with App Router
- **PostgreSQL**: Reliable database for development and production
- **Cloudflare R2**: S3-compatible object storage for media files
- **TypeScript**: Full type safety throughout the application
- **Docker Support**: Complete containerization for production deployment
- **Code Quality Tools**: ESLint, Prettier, and TypeScript for maintainable code

## Prerequisites

- Node.js 18.20.2 or higher
- npm 10.0.0 or higher
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (for local development without Docker)

## Getting Started

### 1. Clone and Install

```bash
npm install
```

The `postinstall` script will automatically attempt to generate the Payload import map. If this fails, you can manually run:

```bash
npm run generate:importmap
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
# Database (Local Development)
DATABASE_URI=postgresql://payload:payloadpassword@localhost:5432/payload

# Payload Configuration
PAYLOAD_SECRET=your-secret-key-change-this-in-production
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Storage (Disabled for local dev)
S3_ENABLED=false
```

### 3. Start Local Database

Start PostgreSQL using Docker Compose:

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 4. Verify Payload Files (Optional but Recommended)

The import map should have been generated automatically during installation. To verify or regenerate it:

```bash
npm run generate:importmap
```

This command generates the `src/importMap.ts` file which is required for Payload's admin panel to function correctly. Run this command if you encounter any import errors or after modifying Payload collections.

### 5. Run Development Server

```bash
npm run dev
```

Visit:

- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- GraphQL Playground: http://localhost:3000/api/graphql

### 6. Create First Admin User

Navigate to http://localhost:3000/admin and create your first admin user through the UI.

## Development Commands

| Command                      | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `npm run dev`                | Start development server                                |
| `npm run build`              | Build for production                                    |
| `npm run start`              | Start production server                                 |
| `npm run lint`               | Run ESLint                                              |
| `npm run lint:fix`           | Fix ESLint issues                                       |
| `npm run format`             | Format code with Prettier                               |
| `npm run format:check`       | Check code formatting                                   |
| `npm run typecheck`          | Run TypeScript type checking                            |
| `npm run generate:types`     | Generate Payload TypeScript types                       |
| `npm run generate:importmap` | Generate Payload import map (required before first run) |

**Note:** You must run `npm run generate:importmap` after installation and whenever you modify Payload collections or configuration.

## Production Deployment

### Configuration

1. **Database Setup (Neon)**

   Create a Neon PostgreSQL database and get the connection string:

   ```env
   DATABASE_URI=postgresql://user:password@your-neon-host.neon.tech/dbname?sslmode=require
   ```

2. **R2 Storage Setup**

   Configure Cloudflare R2 credentials:

   ```env
   S3_ENABLED=true
   S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
   S3_BUCKET=your-bucket-name
   S3_ACCESS_KEY_ID=your-r2-access-key-id
   S3_SECRET_ACCESS_KEY=your-r2-secret-access-key
   S3_REGION=auto
   ```

3. **Security**

   Generate a secure secret:

   ```bash
   openssl rand -base64 32
   ```

   Update your production `.env`:

   ```env
   PAYLOAD_SECRET=<generated-secret>
   NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
   NODE_ENV=production
   ```

### Deploy with Docker Compose

1. Ensure your `.env` file is configured for production

2. Build and start the containers:

   ```bash
   docker compose up -d --build
   ```

3. Check logs:

   ```bash
   docker compose logs -f app
   ```

4. Stop the containers:
   ```bash
   docker compose down
   ```

## Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (payload)/         # Payload CMS routes
│   │   │   ├── admin/         # Admin panel
│   │   │   └── api/           # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── collections/           # Payload collections
│   │   ├── Users.ts          # User collection
│   │   └── Media.ts          # Media collection
│   └── payload.config.ts     # Payload configuration
├── docker-compose.dev.yml    # Dev database
├── docker-compose.yml        # Production deployment
├── Dockerfile                # Production image
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
└── package.json            # Dependencies and scripts
```

## Code Quality

### Linting

This project uses ESLint with TypeScript and Next.js rules:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

### Formatting

Prettier is configured for consistent code formatting:

```bash
npm run format       # Format all files
npm run format:check # Check formatting
```

### Type Checking

TypeScript is configured in strict mode:

```bash
npm run typecheck
```

## Working with AI Pair Programming

This project is optimized for AI-assisted development with:

- **Strict TypeScript**: Catch errors early with full type safety
- **ESLint Rules**: Consistent code patterns and best practices
- **Prettier**: Automated formatting eliminates style debates
- **Clear Structure**: Organized file hierarchy for easy navigation
- **Type Generation**: Auto-generated types from Payload collections

### Best Practices

1. Run `npm run typecheck` before committing
2. Use `npm run lint:fix` to auto-fix common issues
3. Run `npm run format` to ensure consistent formatting
4. Regenerate types after modifying collections: `npm run generate:types`
5. Regenerate import map after changing Payload config: `npm run generate:importmap`

## Environment Variables Reference

| Variable                 | Required     | Description                          |
| ------------------------ | ------------ | ------------------------------------ |
| `DATABASE_URI`           | Yes          | PostgreSQL connection string         |
| `PAYLOAD_SECRET`         | Yes          | Secret key for Payload CMS           |
| `NEXT_PUBLIC_SERVER_URL` | Yes          | Public URL of your application       |
| `S3_ENABLED`             | No           | Enable R2 storage (true/false)       |
| `S3_ENDPOINT`            | Production\* | R2 endpoint URL                      |
| `S3_BUCKET`              | Production\* | R2 bucket name                       |
| `S3_ACCESS_KEY_ID`       | Production\* | R2 access key                        |
| `S3_SECRET_ACCESS_KEY`   | Production\* | R2 secret key                        |
| `S3_REGION`              | Production\* | R2 region (usually 'auto')           |
| `NODE_ENV`               | No           | Environment (development/production) |

\*Required when `S3_ENABLED=true`

## Collections

### Users

Admin user authentication and management.

### Media

File uploads with automatic image resizing:

- **thumbnail**: 400x300px
- **card**: 768x1024px
- **tablet**: 1024px wide

In production with R2, files are automatically uploaded to Cloudflare R2.

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker compose -f docker-compose.dev.yml ps

# View database logs
docker compose -f docker-compose.dev.yml logs postgres
```

### Build Errors

```bash
# Clean build artifacts
rm -rf .next node_modules
npm install
npm run build
```

### Type Errors

```bash
# Regenerate Payload types
npm run generate:types
```

### Import Map Errors

If you see errors about missing `@/importMap` or the admin panel doesn't load:

```bash
# Generate the import map
npm run generate:importmap
```

**Note:** The import map must be regenerated whenever you:

- Add or remove Payload collections
- Modify collection configurations
- Update the Payload config file

## License

MIT

## Support

For issues and questions, please refer to:

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
