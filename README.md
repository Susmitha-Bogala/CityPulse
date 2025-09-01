This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started



# Project Structure

The project is organized as follows:

- **src/**: Contains the main source code for the application.
  - **api/**: API service files.
  - **components/**: Reusable React components.
  - **contexts/**: Context API for state management.
  - **hooks/**: Custom React hooks.
  - **i18n/**: Internationalization files.
  - **navigation/**: Navigation stack and routing.
  - **store/**: Configuration for using AsyncStorage for persistent storage.
  - **screens/**: Screen components for different app views.
    - **Auth/**: Contains screens related to user authentication.
    - **EventDetailsScreen.tsx**: Displays detailed information about a selected event.
    - **FavoritesScreen.tsx**: Shows a list of favorite items saved by the user.
    - **HomeScreen.tsx**: The main screen displaying the home view of the app. It includes a search functionality that allows users to search for events or locations. The screen is designed to provide quick access to featured events and categories.
    - **ProfileScreen.tsx**: Displays user profile information and settings. The settings and 'My Tickets' sections are currently placeholders and do not contain functional logic.
  - **types/**: TypeScript type definitions.
  - **utils.tsx**: Utility functions.

- **assets/**: Contains images and other static assets.

# Key Components

- **App.tsx**: The main component that initializes the app.
- **AppNavigator.tsx**: Handles the navigation logic.
- **AuthContext.tsx**: Provides authentication context to the app.
- **useDebouncedCallback.ts**: Custom hook for debouncing functions.





# Setup and Installation

Step 1:  Clone the repository.

   `git clone https://github.com/Susmitha-Bogala/CityPulse.git`

step 2: Checkout to develop branch
      `git checkout develop`

step 3:  install dependencies
   `npm install` or `yarn intall`

step 4: Run CityPulse app on Android or IOS

`npm run android` or `npm run ios`


2. Run `npm install` to install dependencies.
3. Run `npm run android` or `npm run ios` to start the application on Android or iOS.

