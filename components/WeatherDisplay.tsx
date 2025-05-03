import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Reuse or import the Tomorrow.io data structure definitions from App.tsx
// For simplicity here, let's redefine the core parts needed.
interface TomorrowWeatherDataValues {
  temperature: number;
  temperatureApparent: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
}
interface TomorrowWeatherData {
  time: string;
  values: TomorrowWeatherDataValues;
}
interface TomorrowApiResponse {
  data: TomorrowWeatherData;
  location: {
    name: string;
    lat: number;
    lon: number;
  };
}

// Update Props to expect the Tomorrow.io API response structure
interface Props {
  weatherData: TomorrowApiResponse | null; // Changed from WeatherData
  error: string | null;
  loading: boolean;
}

// Function to provide a basic description for common weather codes (can be expanded)
// See: https://docs.tomorrow.io/reference/data-layers-weather-codes
const getWeatherDescription = (code: number): string => {
  const descriptions: { [key: number]: string } = {
    0: "Unknown",
    1000: "Clear, Sunny",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Light Rain",
    4200: "Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Light Snow",
    5100: "Heavy Snow",
    5101: "Flurries",
    6000: "Freezing Drizzle",
    6001: "Light Freezing Rain",
    6200: "Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  };
  return descriptions[code] || `Code: ${code}`; // Fallback to code number
};

const WeatherDisplay: React.FC<Props> = ({ weatherData, error, loading }) => {
  if (loading) {
    // Display loading state within the component's styled container if preferred,
    // but App.tsx already shows a top-level indicator.
    // Return null or a minimal loader if App's indicator is sufficient.
    return null; // App.tsx handles the main loading indicator
  }

  if (error) {
    return (
      // Use a container for error message for consistent styling
      <View style={styles.container}>
        <Text style={styles.errorText}>Error fetching weather: {error}</Text>
      </View>
    );
  }

  // Check if the core data structure exists
  if (
    !weatherData ||
    !weatherData.data ||
    !weatherData.data.values ||
    !weatherData.location
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No weather data available or data format is incorrect.
        </Text>
      </View>
    );
  }

  // Extract values using the Tomorrow.io structure
  const values = weatherData.data.values;
  const locationName =
    weatherData.location.name ||
    `Lat: ${weatherData.location.lat.toFixed(
      2
    )}, Lon: ${weatherData.location.lon.toFixed(2)}`; // Use name if available
  const conditionDescription = getWeatherDescription(values.weatherCode);

  return (
    <View style={styles.container}>
      {/* Use location name from the API response */}
      <Text style={styles.title}>Weather in {locationName}</Text>

      {/* Access data fields according to TomorrowWeatherDataValues */}
      <Text style={styles.text}>
        Temperature: {values.temperature.toFixed(1)}°C
      </Text>
      <Text style={styles.text}>
        Feels like: {values.temperatureApparent.toFixed(1)}°C
      </Text>
      <Text style={styles.text}>
        {/* Display weather description based on code */}
        Condition: {conditionDescription}
      </Text>
      <Text style={styles.text}>Humidity: {values.humidity.toFixed(0)}%</Text>
      <Text style={styles.text}>
        Wind Speed: {values.windSpeed.toFixed(1)} m/s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff", // Light blue background
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // for Android shadow
    minWidth: "80%", // Ensure container takes some space even for short messages
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center", // Center title
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default WeatherDisplay;
