// Import the AppProvider from the context directory for state management across the app
import { AppProvider } from "./context/AppContext";

// Import the Navigation component which handles the screen navigation in the app
import Navigation from "/Navigation";

// Define the main App component
export default function App() {
  return (
    // Wrap the entire app with AppProvider to provide a global state/context
    <AppProvider>
      /* The Navigation component is where all the screen navigation logic resides */
      <Navigation />
    </AppProvider>
  );
}
