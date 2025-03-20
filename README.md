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
│   │   └── StoryCard.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── services/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── .eslintrc.json
├── next-env.d.ts
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## API Endpoints

### Stories API (External)

- `GET https://cryptodire.kontinentalist.com/api/v1/stories` - Get all stories
- `GET https://cryptodire.kontinentalist.com/api/v1/stories?page={pageNumber}` - Get paginated stories

### Posts API (Local Implementation)

- `GET /api/posts` - Get all posts
- `GET /api/posts/{id}` - Get a single post
- `POST /api/posts` - Create a new post
- `PATCH /api/posts/{id}` - Update a post
- `DELETE /api/posts/{id}` - Delete a post

## Notes

- This implementation uses client-side storage (localStorage) for the Posts API for simplicity purposes.
- For Task 1, the stories are fetched from the provided Kontinentalist API endpoint.
