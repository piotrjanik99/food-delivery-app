import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsPage from '../screens/RestaurantDetailsScreen';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import Basket from '../screens/Basket';
import OrderScreen from '../screens/OrdersScreen';
import OrderDetails from '../screens/OrderDetails';
import Profile from '../screens/ProfileScreen';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useAuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { dbUser } = useAuthContext();

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {dbUser ? (
            <Stack.Screen name="Home" component={HomeTabs}></Stack.Screen>
            ) : (
            <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
            )}
        </Stack.Navigator>
    );
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
    return(
        <Tab.Navigator screenOptions={{headerShown: false}} barStyle= {{backgroundColor: 'white'}}>
            <Tab.Screen name='Home' component={HomeStackNavigator} options={{tabBarIcon: ({color}) => <Entypo name="home" size={24} color={color} /> }}/>
            <Tab.Screen name='Orders' component={OrdersStackNavigator} options={{tabBarIcon: ({color}) => <FontAwesome5 name="clipboard-list" size={24} color={color} /> }}/>
            <Tab.Screen name='Profile' component={Profile} options={{tabBarIcon: ({color}) => <FontAwesome name="user" size={24} color={color} /> }}/>
        </Tab.Navigator>
    );
};

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
    return(
        <HomeStack.Navigator>
        <HomeStack.Screen  name="Restaurants" component={HomeScreen} />
        <HomeStack.Screen  options={{headerShown: false}} name="Restaurant" component={RestaurantDetailsPage} />
        <HomeStack.Screen  name="Dish" component={DishDetailsScreen} />
        <HomeStack.Screen  name="Basket" component={Basket} />
        </HomeStack.Navigator>
    );
};

const OrdersStack = createNativeStackNavigator();
const OrdersStackNavigator = () => {
    return(
        <OrdersStack.Navigator>
        <OrdersStack.Screen  name="Orders" component={OrderScreen} />
        <OrdersStack.Screen  name="Order" component={OrderDetails} />
        </OrdersStack.Navigator>
    );
};

export default RootNavigator;