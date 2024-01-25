import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetDatabase } from "../database";

/**
 * Resets the application data by clearing AsyncStorage and resetting the database.
 * Displays an alert to inform the user about the status of the reset operation.
 */
export default resetApp = async () => {
  try {
    // Clear all keys and values from AsyncStorage
    await AsyncStorage.clear();

    // Reset the SQLite database to its initial state
    await resetDatabase();

    // Inform the user that the reset operation was successful
    alert("App's AsyncStorage and database have been reset. Please restart the app.");
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error resetting the app's AsyncStorage and database:", error);

    // Inform the user that the reset operation failed
    alert("An error occurred while resetting the app's data. Please try again.");
  }
};
