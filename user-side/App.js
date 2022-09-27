import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantDetailsPage from './src/screens/RestaurantDetailsScreen';
import DishDetailsScreen from './src/screens/DishDetailsScreen';
import Basket from './src/screens/Basket';
import OrderScreen from './src/screens/OrdersScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen/> */}
      {/* <RestaurantDetailsPage/> */}
      {/* <DishDetailsScreen/> */}
      {/* <Basket /> */}
      <OrderScreen />

      <StatusBar style="light" />
    </View>
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
