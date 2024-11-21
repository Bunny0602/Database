import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TrailerScreen from "./screens/TrailerScreen";
import ActionScreen from "./screens/ActionScreen";
import HorrorScreen from "./screens/HorrorScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#6200ea" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trai-Film" }}
        />

        {/* Action Screen */}
        <Stack.Screen
          name="ActionScreen"
          component={ActionScreen}
          options={{ title: "Action Movies" }}
        />

        {/* Horror Screen */}
        <Stack.Screen
          name="HorrorScreen"
          component={HorrorScreen}
          options={{ title: "Horror Movies" }}
        />

        {/* Trailer Screen */}
        <Stack.Screen
          name="TrailerScreen"
          component={TrailerScreen}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
