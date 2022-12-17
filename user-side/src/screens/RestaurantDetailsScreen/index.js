import {View, FlatList, ActivityIndicator } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import { useState } from 'react';
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../../models';


const RestaurantDetailsPage = () => {
    const[restaurant, setRestaurant] = useState(null);
    const[dishes, setDishes] = useState([]);

    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params?.id;

    useEffect(() => {
        if(!id){
            return;
        }
        DataStore.query(Restaurant, id).then(setRestaurant);

        DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(setDishes)
    }, [id])

    if(!restaurant){
        return <View style={styles.activityIndicator}><ActivityIndicator size={"large"} color={"black"} /></View>
    }

    return (
<View style={styles.page}>

    <FlatList 
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({item}) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
    />

    <Ionicons
    name="arrow-back-circle" 
    size={45} color="white" 
    style={styles.iconContainer}
    onPress={() => navigation.goBack()}
     />
    
</View>
    );
};

export default RestaurantDetailsPage;