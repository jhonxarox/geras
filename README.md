# Geras

This is a dynamic Pokémon application built with Angular that allows users to explore Pokémon, filter them by type, mark them as favorites, and view detailed information about each Pokémon.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

## Features

- Pokémon List: Displays a list of Pokémon with images and types.
- Favorite Pokémon: Users can favorite Pokémon and view their favorite list.
- Pokémon Details: Displays detailed information about each Pokémon.
- Type Filter: Allows filtering Pokémon by type (e.g., Fire, Water, Grass).
- Responsive Design: Fully responsive layout for mobile, tablet, and desktop screens.
- Infinite Scrolling: Automatically loads more Pokémon as you scroll down.

## Technologies Used

- Angular: Framework for building the application.
- Angular Material: For UI components and styling.
- RxJS: For handling asynchronous data streams.
- PokeAPI: RESTful API to fetch Pokémon data.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v15 or higher)

### Steps

1. Clone the Repository:

```bash
git clone https://github.com/your-repo/geras-pokemon-app.git
cd geras-pokemon-app
```

2. Install Dependencies:

```bash
npm install
```

3. Run the Application:

```bash
ng serve
```

4. Open the app in your browser:

```text
http://localhost:4200
```

## Usage

### Navigation

- Navigate between the Pokémon List and Favorites using the navbar.

### Pokémon List

- Infinite scrolling automatically loads more Pokémon as you scroll.
- Use the filter dropdown in the navbar to filter Pokémon by type.
- Click on a Pokémon card to view detailed information.

### Favorites
- Mark Pokémon as favorites using the heart icon on the card.
- View and manage your favorite Pokémon from the Favorites page.

## Environment Configuration
Environment variables are managed using Angular's environment system.

### Development

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://pokeapi.co/api/v2',
  debug: true,
};
```

### Production
Edit `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://pokeapi.co/api/v2',
  debug: false,
};
```

### Build for Production

```bash
ng build --prod
```

## Folder Structure
```text
src/
├── app/
│   ├── core/
│   │   ├── services/          # API and shared services
│   │   ├── models/            # Interfaces and types
│   ├── features/
│   │   ├── pokemon-list/      # Pokémon List feature
│   │   ├── favorites-list/    # Favorites feature
│   ├── shared/                # Shared components (e.g., Pokémon card)
├── environments/              # Environment configuration
```

## Contributing

1. Fork the repository.

2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Make changes and commit:

```bash
git commit -m "Add feature-name"
```

4. Push your branch:

```bash
git push origin feature-name
```

5. Submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data.
- Angular Material for prebuilt UI components.
- The Pokémon Company for inspiration.


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
