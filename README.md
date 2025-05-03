# Welcome to your Expo Weather App 👋

This is an [Expo](https://expo.dev) project, initially created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app), that now displays real-time weather information based on user input.

## Features

- Fetches real-time weather data from the [Tomorrow.io Weather API](https://www.tomorrow.io/weather-api/).
- Allows users to input a location name (e.g., "Paris", "Chicago", US Zip Code, UK Postcode).
- Displays current weather conditions (temperature, feels like, humidity, wind speed) for the specified location.
- Built with Expo Router for file-based routing.

## Get started

1.  **Set up API Key:**

    - This project uses the Tomorrow.io Weather API. You will need an API key.
    - Sign up for a free key at [Tomorrow.io](https://www.tomorrow.io/weather-api/).
    - Open the file `app/(tabs)/index.tsx`.
    - Find the line `const API_KEY = "YOUR_TOMORROW_IO_API_KEY";` (or similar) and replace `"YOUR_TOMORROW_IO_API_KEY"` with your actual key.
    - **Note:** For production applications, avoid hardcoding API keys directly in the source code. Consider using environment variables or a secrets management solution.

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the app:**

    ```bash
    npx expo start
    ```

In the output, you'll find options to open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) (Note: May have limitations depending on native modules used)

The main screen logic is located in **app/(tabs)/index.tsx**. This project uses [file-based routing](https://docs.expo.dev/router/introduction) via Expo Router.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [Tomorrow.io API documentation](https://docs.tomorrow.io/reference/realtime-weather)

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Environment Variables

This project requires a Tomorrow.io API key to fetch weather data.

1.  Create a file named `.env` in the root directory of the project.
2.  Add the following line to the `.env` file, replacing `YOUR_ACTUAL_API_KEY_HERE` with your actual API key:

    ```env
    EXPO_PUBLIC_TOMORROW_API_KEY=YOUR_ACTUAL_API_KEY_HERE
    ```

3.  **Important:** Ensure that the `.env` file is listed in your `.gitignore` file to prevent committing your API key to version control.
