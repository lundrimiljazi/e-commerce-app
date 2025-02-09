# E-Commerce App

This is a modern e-commerce application built with **Next.js** and **Tailwind CSS**.

## 📌 Features

- 🛒 Browse and search for products
- 📦 Add products to the cart
- ⭐ Sort products by price or rating
- 🔥 Toast notifications for user interactions
- 📱 Fully responsive design

## 🛠️ Getting Started

### 1️⃣ Install Dependencies

Run the following command to install required packages:

```bash
npm install
```

### 2️⃣ Run Development Server

Run the following command to start the server:

```bash
npm run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses App Router for navigation & Tailwind CSS for styling.

## 📦 Core Libraries

### 🎨 UI Components

- **@radix-ui/** - Headless UI components for building accessible interfaces
- **class-variance-authority** - Create reusable component variants
- **clsx & tailwind-merge** - Utility for constructing className strings and merging Tailwind classes
- **lucide-react** - Beautiful and consistent icon set
- **framer-motion** - Powerful library for animations

### 🔄 State Management & Data Fetching

- **zustand** - Lightweight state management with a simple API
- **swr** - React Hooks for data fetching with caching and revalidation
- **react-hook-form** - Performant and flexible forms with easy validation
- **zod** - TypeScript-first schema validation

### 📱 User Experience

- **sonner** - Modern toast notifications with clean design
- **tailwindcss** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities for Tailwind CSS

### Why These Choices?

- **Radix UI**: Provides unstyled, accessible components that can be customized to match any design
- **Zustand**: Simpler alternative to Redux with less boilerplate
- **SWR**: Offers smart caching and revalidation strategies for data fetching
- **Framer Motion**: Makes complex animations simple and performant
- **Zod + React Hook Form**: Perfect combination for type-safe form validation
- **Sonner**: Modern replacement for react-hot-toast with better aesthetics
- **Tailwind CSS**: Enables rapid UI development with utility classes

## Demo on Vercel

Check out our [Next.js project](https://e-commerce-app-phi-nine.vercel.app) for more details.
