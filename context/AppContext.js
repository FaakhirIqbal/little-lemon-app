// AppContext.js
import { createContext } from "react";
export const AppContext = createContext();

// useGlobalState.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isOnboardingCompleted: false,
};

export const useGlobalState = () => {
  const [globalState, setGlobalState] = useState(initialState);

  const setOnboardingCompleted = async (value = true) => {
    try {
      setGlobalState((prev) => ({
        ...prev,
        isOnboardingCompleted: value,
      }));
    } catch (error) {
      // handle error
      console.error("Error in setOnboardingCompleted: ", error);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setOnboardingCompleted(false);
    } catch (error) {
      // handle error
      console.error("Error in logOut: ", error);
    }
  };

  const getUser = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        setGlobalState((prev) => ({
          ...prev,
          user,
        }));
        return user;
      }
    } catch (error) {
      // handle error
      console.error("Error in getUser: ", error);
    }
  };

  const updateUser = async (userObject) => {
    try {
      if (userObject) {
        const userString = (await AsyncStorage.getItem("user")) || "{}";
        const user = JSON.parse(userString);

        const updatedUser = { ...user, ...userObject };
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

        setGlobalState((prev) => ({
          ...prev,
          user: updatedUser,
        }));
        return updatedUser;
      }
    } catch (error) {
      // handle error
      console.error("Error in updateUser: ", error);
    }
  };

  return {
    globalState,
    setGlobalState,
    setOnboardingCompleted,
    logOut,
    getUser,
    updateUser,
  };
};

// AppProvider.js
import React from "react";
import { AppContext } from "./AppContext";
import { useGlobalState } from "./useGlobalState";

export const AppProvider = ({ children }) => {
  const { globalState, setOnboardingCompleted, logOut, getUser, updateUser } = useGlobalState();

  return (
    <AppContext.Provider
      value={{
        globalState,
        setOnboardingCompleted,
        logOut,
        getUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
