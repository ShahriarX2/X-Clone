# X-Clone

## Overview

X-Clone is a modern web application that mimics the core functionalities of X (formerly Twitter), providing a platform for users to share short posts, interact with content, and follow other users. Built with Next.js, it leverages server-side rendering and client-side interactivity for a seamless user experience.

## Motivation

This project was developed as a learning exercise and a demonstration of building a full-stack application using contemporary web technologies. The primary goals were to:
*   Gain hands-on experience with Next.js for building performant React applications.
*   Implement robust user authentication and data management using Supabase.
*   Practice building a responsive and intuitive user interface.
*   Understand the architecture of a social media-like platform.

## Features

*   **User Authentication:** Secure sign-up, sign-in, and sign-out functionalities powered by Supabase Auth.
*   **Post Creation:** Users can create and publish short text-based posts.
*   **Real-time Updates:** (Assuming, based on Supabase) Potentially real-time display of new posts.
*   **User Profiles:** (Implied by user_id in posts) Basic user profile management.
*   **Responsive Design:** Adapts to various screen sizes for a consistent experience on desktop and mobile.

## Technologies Used

*   **Next.js:** React framework for building server-rendered and statically generated web applications.
*   **React:** JavaScript library for building user interfaces.
*   **Supabase:** Open-source Firebase alternative providing a PostgreSQL database, authentication, and real-time subscriptions.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **JavaScript (ES6+):** The primary programming language.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or Yarn
*   A Supabase project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ShahriarX2/X-Clone.git
    cd X-Clone
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Supabase Environment Variables:**
    Create a `.env.local` file in the root of your project and add your Supabase project credentials:
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
    You can find these keys in your Supabase project settings under "API".

4.  **Run Supabase SQL Policies:**
    Execute the SQL commands from `supabase_policies.sql` in your Supabase SQL Editor to set up necessary database policies for authentication and data access.

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
.
├── app/                  # Next.js app directory (pages, layouts, API routes, context)
│   ├── api/              # API routes (e.g., authentication)
│   ├── context/          # React Contexts (e.g., AuthContext)
│   ├── ...               # Other pages and layouts
├── components/           # Reusable React components
├── public/               # Static assets
├── utils/supabase/       # Supabase client and server utilities
├── .env.local            # Environment variables (local)
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration (for Tailwind CSS)
├── README.md             # Project README
└── supabase_policies.sql # SQL for Supabase database policies
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[MIT License](LICENSE) (Assuming MIT, or specify if different)