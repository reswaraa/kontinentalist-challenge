# Kontinentalist Coding Challenge

This project implements a coding challenge for Kontinentalist, featuring a stories list page and a RESTful API for posts management using Next.js, TypeScript, and Tailwind CSS.

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/reswaraa/kontinentalist-challenge.git
cd kontinentalist-challenge
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
kontinentalist-challenge/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── posts/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── posts/
│   │   │   └── page.tsx
│   │   ├── stories/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── PostForm.tsx
│   │   ├── PostItem.tsx
│   │   ├── Navbar.tsx
│   │   └── StoryCard.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   └── lib/
│       ├── api.ts
│       └── types.ts
├── .eslintrc.json
├── next-env.d.ts
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Notes

- This implementation uses client-side storage (localStorage) for the Posts API for simplicity purposes.
- For Task 1, the stories are fetched from the provided Kontinentalist API endpoint.
