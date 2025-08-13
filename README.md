# Architecture Portfolio Frontend

A modern, responsive architecture portfolio website built with Vue 3, TypeScript, and PrimeVue. This project showcases architectural work with a beautiful, professional interface.

## 🚀 Features

- **Modern UI/UX**: Built with PrimeVue components and Tailwind CSS for a sleek, professional design
- **Responsive Design**: Fully responsive layout that works on all devices
- **Internationalization**: Multi-language support with vue-i18n
- **State Management**: Pinia for efficient state management
- **Type Safety**: Full TypeScript support for better development experience
- **Admin Panel**: Dedicated admin section for content management
- **Portfolio Gallery**: Dynamic portfolio showcase with image galleries
- **Contact System**: Integrated contact forms and communication features
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: PrimeVue 4
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Internationalization**: Vue I18n
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── button/         # Button components
│   ├── Gallery/        # Gallery components
│   └── dialog/         # Dialog/modal components
├── modules/            # Feature modules
│   ├── Admin/          # Admin panel functionality
│   ├── AboutUs/        # About us page
│   ├── Contact/        # Contact forms and communication
│   ├── Portfolio/      # Portfolio showcase
│   ├── i18n/           # Internationalization
│   ├── stores/         # Pinia stores
│   ├── api/            # API integration
│   └── error-handling/ # Error handling utilities
├── views/              # Page components
├── router/             # Vue Router configuration
├── assets/             # Static assets
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd architecture-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- **Development**: `npm run dev` - Start development server with hot reload
- **Build**: `npm run build` - Build for production
- **Preview**: `npm run preview` - Preview production build locally
- **Type Check**: `npm run type-check` - Run TypeScript type checking
- **Lint**: `npm run lint` - Run ESLint with auto-fix
- **Format**: `npm run format` - Format code with Prettier

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the design by modifying the Tailwind configuration and using PrimeVue themes.

### Components

All reusable components are located in the `src/components/` directory. Each component is organized in its own folder for better maintainability.

### Internationalization

Multi-language support is implemented using vue-i18n. Language files and configuration can be found in `src/modules/i18n/`.

## 🔧 Configuration

### Vite Configuration

See [Vite Configuration Reference](https://vite.dev/config/) for detailed configuration options.

### TypeScript Configuration

The project includes multiple TypeScript configuration files:

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific configuration
- `tsconfig.node.json` - Node.js environment configuration

## 🚀 Deployment

1. Build the project for production:

```bash
npm run build
```

2. The built files will be in the `dist/` directory, ready for deployment to your hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
