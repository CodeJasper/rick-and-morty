# 🧪 Rick and Morty

This is a project that displays a list of characters from the Rick and Morty API using React, TypeScript, and GraphQL.

---

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/codejasper/rick-and-morty.git
cd rick-and-morty
```

2. Clone the repository:

```bash
npm install
```

3. Start the development server::

```bash
npm run dev
```

---

📡 Using the Rick and Morty API

This project uses the [Rick and Morty GraphQL API](https://rickandmortyapi.com/documentation).
No authentication is required — you can query data directly via Apollo Client.

Example query used in the app:

```bash
query {
  characters(page: 1) {
    results {
      id
      name
      image
    }
  }
}
```

The API supports pagination, filtering, and retrieving individual characters by ID.

---

🧪 Running Tests

Run all unit tests with:

```bash
npm run test
```

Or run in watch mode:

```bash
npm run test:watch
```

This project uses:

- [Vitest](https://vitest.dev/) for the test runner
- [React Testing Library](https://testing-library.com/) for component testing
- Mocking with `vi.mock()`

---

## 🌐 Live Demo

The app is deployed using GitHub Pages:  
👉 [https://codejasper.github.io/rick-and-morty/](https://codejasper.github.io/rick-and-morty/)

---

## 📁 Project Structure

```bash
src/
├── components/          # Reusable UI components
├── pages/               # Page views
├── store/               # Zustand global state management
├── graphql/             # Apollo GraphQL setup and generated code
├── test/                # Unit tests
└── main.tsx             # Entry point
```

---

## 📝 Notes

- Character favorites and comments are stored in `localStorage` via Zustand persist.
- Infinite scroll is used instead of traditional pagination for a smoother experience.
- A custom UI design was implemented due to limited access to the original Figma.
