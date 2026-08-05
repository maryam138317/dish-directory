# Recipe Explorer
 
A recipe browsing web app built with **Next.js**, **TypeScript**, and **Material UI**. Browse recipes, view detailed ingredients and instructions, search and filter, manage a personal profile, save favorites, and add your own recipes — all backed by the [DummyJSON](https://dummyjson.com) API.
 
> **Note:** This project uses DummyJSON as a mock backend and has no real database. Any recipe you "add" is sent to the API but will **not** actually persist — DummyJSON simulates a successful response without storing the data. Saved recipes are kept in **client-side state only**, so the Saved page starts empty on every fresh session/reload.
 
---
 
## ✨ Features
 
- **Home Page** — landing page introducing the app and highlighting recipes.
- **Recipes Page** — browse all recipes with:
  - 🔍 **Search** by name/keyword
  - 🎚️ **Filters** (e.g. cuisine, meal type, difficulty, tags)
- **Recipe Details Page** — full detail view for a single recipe, including ingredients list and step-by-step instructions.
- **Add Recipe Page/Form** — a form to submit a new recipe (name, difficulty, cuisine, tags, meal type, ingredients, instructions, image). Submits to the API, but since there's no real database, nothing is actually persisted.
- **Authentication (Login Page)** — users log in via the DummyJSON auth API.
- **Profile Page** *(protected)* — view your personal info and the recipes you've created.
- **Saved Page** *(protected)* — view recipes you've bookmarked/saved during your session. Since this is client-side state, it resets on reload and starts empty for every new session.
- **Protected Routes** — the Profile and Saved pages require the user to be logged in; unauthenticated users are redirected to the login page.
---
 
## 🛠️ Tech Stack
 
| Category         | Technology |
|-------------------|------------|
| Framework          | [Next.js](https://nextjs.org/) |
| Language           | [TypeScript](https://www.typescriptlang.org/) |
| UI Library         | [Material UI (MUI)](https://mui.com/) |
| Forms              | React Hook Form + Yup (schema validation) |
| Data Source        | [DummyJSON API](https://dummyjson.com) |
| Notifications      | react-toastify |
 
---
 
## 📁 Project Structure (high level)
 
```
.
├── app/                     # Next.js app router pages
│   ├── page.tsx             # Home page
│   ├── recipes/             # Recipes list (search + filter)
│   │   └── [id]/             # Recipe details page
│   ├── add-recipe/          # Add recipe form page
│   ├── login/               # Login page
│   ├── profile/             # Protected: user info + user's own recipes
│   └── saved/                # Protected: saved/bookmarked recipes
├── components/               # Reusable UI components (forms, cards, etc.)
├── Schema/                   # Yup validation schemas
├── services/                  # API calls / data-fetching hooks (recipes, auth)
└── ...
```
 
*(Adjust the tree above to match your actual folder names if they differ.)*
 
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm / yarn / pnpm
### Installation
 
```bash
# Clone the repository
git clone https://github.com/maryam138317/dish-directory.git
cd <dish-directory>
 
# Install dependencies
npm install
```
 
### Running the Development Server
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
 
### Build for Production
 
```bash
npm run build
npm run start
```
 
---
 
## 🔐 Authentication
 
This project uses DummyJSON's authentication endpoints for login. You can use one of DummyJSON's test users to log in — see their [Users API docs](https://dummyjson.com/docs/auth) for sample credentials (e.g. username `emilys` / password `emilyspass`).
 
Once logged in, you'll be able to access:
- **Profile** — your account details and recipes you've created
- **Saved** — recipes you've bookmarked in the current session
Logging out (or reloading, depending on how session state is handled) will clear access to these protected pages until you log in again.
 
---
 
## ⚠️ Known Limitations
 
- **No real database** — this app uses DummyJSON as a mock API. Recipes you add via the "Add Recipe" form are sent to the API and DummyJSON will respond as if it succeeded, but the data is **not actually saved** on their servers or anywhere else.
- **Saved recipes are client-side only** — the "saved" state lives in the browser/app state, not persisted storage (like localStorage or a database), so it resets on refresh and always starts empty.
- Since data isn't persisted, recipes you add or save won't be visible in a new session or to other users.
---
 
## 📚 Data Source
 
All recipe data comes from the [DummyJSON Recipes API](https://dummyjson.com/docs/recipes), a free fake REST API for testing and prototyping.
 
---
 
## 📄 License
 
This project is for learning/demo purposes.
 