import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/Screens/HomeScreen';
import TempScreen from './src/Screens/TempScreen';
import Cadastro from './src/Screens/Cadastro';
import Lancamento from './src/Screens/Lancamento';
import VisualizacaoPatrimonio from './src/Screens/Lancamento';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}/>
          <Stack.Screen
          name="Cadastro de Setores"
          component={TempScreen}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />
        <Stack.Screen
          name="Lancamento"
          component={Lancamento}
        />
        <Stack.Screen
          name="VisualizacaoPatrimonio"
          component={VisualizacaoPatrimonio}
        />
      </Stack.Navigator>

     
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
