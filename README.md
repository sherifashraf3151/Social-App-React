# Linked Posts - Social Media App

A modern, responsive social media application built with React, allowing users to create, share, and interact with posts. Features user authentication, real-time feed, profile management, and more.

## 🚀 Features

- **User Authentication**: Secure login and registration with form validation
- **Post Management**: Create, view, update, and delete posts
- **Interactive Feed**: Browse posts with comments and reactions
- **User Profiles**: Personalized profile pages with user information
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Powered by React Query for efficient data fetching
- **Form Validation**: Robust validation using Zod and React Hook Form
- **Modern UI**: Beautiful interface with HeroUI and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **UI Library**: HeroUI (NextUI)
- **Styling**: Tailwind CSS v4
- **State Management**: React Context, TanStack Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/linked-posts.git
   cd linked-posts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your API endpoints and configuration variables

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── AuthProtectedRoute.jsx
│   ├── Footer.jsx
│   ├── LoadingScreen.jsx
│   ├── MyNavbar.jsx
│   ├── PostForm.jsx
│   ├── Post/
│   │   ├── PostBody.jsx
│   │   ├── PostCard.jsx
│   │   ├── PostComment.jsx
│   │   ├── PostFooter.jsx
│   │   └── PostHeader.jsx
├── Context/
│   ├── AuthContext.jsx
│   └── CounterContext.jsx
├── Layouts/
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx
├── pages/
│   ├── FeedPage.jsx
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   ├── ProfilePage.jsx
│   ├── RegisterPage.jsx
│   └── SinglePostPage.jsx
├── Schema/
│   └── RegisterSchema.jsx
├── Services/
│   ├── CommentService.js
│   ├── DateHelper.js
│   ├── login.jsx
│   ├── PostService.js
│   └── register.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## 🎯 Usage

1. **Registration**: Create a new account with email, password, and profile information
2. **Login**: Sign in to access your personalized feed
3. **Create Posts**: Share your thoughts and content
4. **Interact**: Like, comment, and engage with other users' posts
5. **Profile**: View and manage your profile information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact
01119005433

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using React and modern web technologies.
