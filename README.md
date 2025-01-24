# InuDining Lean Proof of Concept - AI-Powered Restaurant Discovery

A modern, AI-powered comunity-centric restaurant discovery platform inspired by Inu Dining *mission & vision*. Built with **Next.js**, **Firebase**, and **Hugging Face models**, this project focuses on delivering a seamless user experience with features like restaurant discovery, detailed restaurant pages, and AI-generated reviews. Designed to be lean and scalable, this prototype was crafted in just **4 days** as a proof of concept.

---

## 🚀 Key Features

- **Restaurant Discovery Page**: Browse restaurants with intuitive filters and search functionality.
- **Restaurant Detail Page**: View detailed information, menus, and AI-powered reviews.
- **AI-Powered Reviews**: Leverage Hugging Face models to generate insightful and engaging restaurant reviews.
- **Modern Tech Stack**: Built with **Next.js** for server-side rendering, **Firebase** for real-time data, and **Tailwind CSS** for a sleek, responsive design.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React Js, Tailwind CSS, ShadeCn, Zustand
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **AI Integration**: Hugging Face Transformers
- **Deployment**: Vercel
- **Analytics**: Vercel

---

## 🎨 Design Philosophy

The design is clean, modern, and user-friendly, with a focus on accessibility and responsiveness. The color palette is warm and inviting, featuring earthy tones like `#4f230b` (primary) and `#eee2d0` (background) to create a cohesive and visually appealing experience.

---

## 📂 Project Structure

inudining-clone/
├── components/ # Reusable UI components
├── pages/ # Next.js pages (routes)
├── lib/ # Utility functions and helpers
├── styles/ # Global and component-specific styles
├── firebase/ # Firebase configuration and services
├── ai/ # Hugging Face model integration
├── public/ # Static assets (images, icons, etc.)
└── tailwind.config.js # Tailwind CSS configuration

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Firebase account (for Firestore, Authentication, and Storage)
- Hugging Face API key (for AI-powered reviews)

### Installation

1. Clone the repository:
```bash
  git clone git@github.com:Alabs02/inudining.lean.git
```

2. Navigate to the project directory:
```bash
  cd inudining.lean
```

3. Install dependencies:
```bash
  npm install -S
  # or
  yarn
  # or
  pnpm install -S
```

4. Set up environment variables:
Create a `.env.local` file in the root directory and add the following or copy it from `.env.example`:
```env
  NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
  NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
  HUGGING_FACE_API_KEY=your-hugging-face-api-key
```

5. Run the development server:
```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```
Open [http://localhost:4500](http://localhost:4500) with your browser to see the result.

---

## 🧑‍💻 Contributing

Contributions are welcome! If you'd like to improve the project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
```bash
  git checkout -b feature/your-feature-name
```
3. Commit your changes:
```bash
  git commit -m "Add your feature"
```
4. Push to the branch:
```bash
  git push origin feature/your-feature-name
```
5. Open a pull request.
> There's a *Github Action* to welcome you as a contributor on your first PR

---

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🙏 Acknowledgments
- Inspired by [Inu Dining](https://www.inudining.com/about-inu) Mission & Vision.
- Crafted with ❤️ to celebrate and uplift the often-overlooked black diner experience.

---

## 📧 Contact
If you have any questions or feedback, feel free to reach out:
- [**Alabura Usman**](https://alabura.com/)
- **Email**: <a href="mailto:usmanunfolds@alabura.com">usmanunfolds@alabura.com</a>

