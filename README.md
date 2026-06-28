# Task Tracker (Web Frontend)

A modern, highly responsive, and premium dark-themed web application designed for personal and team workflow organization. Built with React, Redux Toolkit (RTK Query), Tailwind CSS v4, and React Hook Form.

🔗 **Live Demo**: [https://task-tracker-c85b.vercel.app/](https://task-tracker-c85b.vercel.app/)

## 🚀 Features

- **Interactive Dashboard**: Real-time task statistics counting total, pending, in-progress, and completed items.
- **Dynamic Filtering & Sorting**: Filter tasks instantly by status, priority, or search keywords. Sort tasks chronologically (newest or oldest first).

## 🛠️ Tech Stack

- **Core**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (with Outfit & Plus Jakarta Sans typography)
- **State Management & API**: Redux Toolkit & RTK Query
- **Form Handling & Validation**: React Hook Form & Zod Resolver
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## 💻 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   cd task-tracker-web
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

1. Create a `.env` file in the root directory:

   ```bash
   touch .env
   ```

2. Add your backend URL endpoint configuration inside `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

### Running in Development

Start the Vite local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

Compile and bundle the application assets for production deployment:

```bash
npm run build
```
