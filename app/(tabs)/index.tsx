import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// Adjust the import path for WeatherDisplay relative to app/(tabs)/
// This path assumes WeatherDisplay is in 'components' at the root level
import WeatherDisplay from "../../components/WeatherDisplay";

// --- Interface Definitions ---
interface TomorrowWeatherDataValues {
  temperature: number;
  temperatureApparent: number; // Feels Like
  humidity: number;
  weatherCode: number; // Represents weather condition
  windSpeed: number;
}

interface TomorrowWeatherData {
  time: string;
  values: TomorrowWeatherDataValues;
}

interface TomorrowApiResponse {
  data: TomorrowWeatherData;
  location: {
    name: string; // The API will return the resolved location name here
    lat: number;
    lon: number;
  };
}

const API_KEY = "TOMORROW_API_KEY";
const UNITS = "metric";

// --- Main Screen Component ---
export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<TomorrowApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationInput, setLocationInput] = useState<string>("London"); // Default location name

  // Function to fetch weather data based on location name
  const fetchWeatherByLocationName = async (locationName: string) => {
    // Construct API URL dynamically using the location name
    // Ensure the location name is properly URL-encoded
    const encodedLocation = encodeURIComponent(locationName.trim());
    const API_URL = `https://api.tomorrow.io/v4/weather/realtime?location=${encodedLocation}&apikey=${API_KEY}&units=${UNITS}`;

    setLoading(true);
    setError(null);
    setWeatherData(null); // Clear previous data
    Keyboard.dismiss();

    try {
      const response = await axios.get<TomorrowApiResponse>(API_URL);
      // Check if the response contains the expected data structure
      if (
        response.data &&
        response.data.data &&
        response.data.data.values &&
        response.data.location
      ) {
        setWeatherData(response.data);
      } else {
        // Handle cases where the API might return data but not the expected weather values
        console.error(
          "Unexpected API response structure or location not found:",
          response.data
        );
        // Rely on the generic error message here, as response.data is typed as TomorrowApiResponse
        // and doesn't have a 'message' property in this success case.
        const errorMessage = "Location not found or invalid API response."; // Use only the generic message
        setError(errorMessage);
        Alert.alert("API Error", errorMessage);
      }
    } catch (err: any) {
      console.error("Error fetching weather data:", err);
      // Extract error message from Tomorrow.io response if available
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.type ||
        err.message ||
        "Failed to fetch weather data";
      setError(errorMessage);
      Alert.alert("Fetch Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handler for the fetch button press
  const handleFetchPress = () => {
    const locationName = locationInput.trim();

    // Basic validation
    if (!locationName) {
      Alert.alert("Invalid Input", "Please enter a location name.");
      setError("Location name cannot be empty.");
      return;
    }

    fetchWeatherByLocationName(locationName);
  };

  // --- Render Logic ---
  return (
    // TouchableWithoutFeedback allows dismissing keyboard by tapping outside inputs
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={locationInput}
          onChangeText={setLocationInput}
          placeholder="Enter City Name (e.g., Paris, Chicago)"
          autoCapitalize="words" // Capitalize city names appropriately
          returnKeyType="done"
          onSubmitEditing={handleFetchPress} // Allow fetching on submit
        />

        <Button
          title="Fetch Weather"
          onPress={handleFetchPress}
          disabled={loading}
        />

        {/* Display Area */}
        <View style={styles.displayArea}>
          {/* Loading Indicator */}
          {loading && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loadingIndicator}
            />
          )}

          {/* Weather Display Component */}
          {!loading && (
            <WeatherDisplay
              weatherData={weatherData}
              error={error} // Pass error state to WeatherDisplay
              loading={loading}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40, // Add padding at the top
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "flex-start", // Align labels to the left
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%", // Make input take full width
    borderRadius: 5,
  },
  displayArea: {
    flex: 1, // Take remaining space
    width: "100%",
    alignItems: "center",
    justifyContent: "center", // Center weather display/indicator
    marginTop: 20,
  },
  loadingIndicator: {
    // Styles for the loading indicator
  },
});
