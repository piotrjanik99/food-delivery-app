import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import BasketDishItem from '../../components/BasketDishItem';
import { useBasketContext } from '../../contexts/BasketContext';
import { useOrderContext } from '../../contexts/OrderContext';
import { useNavigation } from '@react-navigation/native';

const Basket = () => {  
    const {restaurant, basketDishes, totalPrice} = useBasketContext();
    const {createOrder} = useOrderContext();
    const navigation = useNavigation();

    const onCreateOrder = async() =>{
        await createOrder();
        navigation.goBack()
    }

    return (
        <View style={styles.page}>

            <Text style={styles.name}>{restaurant?.name}</Text>
            <Text style={{fontWeight: "500", marginTop: 20, fontSize: 15}}>Your items</Text>

            <FlatList 
            data={basketDishes}
            renderItem={({item}) => <BasketDishItem basketDish={item}/>}
            />

            <View style={styles.separator}/>

            <Pressable onPress={onCreateOrder} style={styles.button}>
                <Text style={styles.buttonText}>Create Order &#8226; $ {totalPrice.toFixed(2)}</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    page:{
        flex:1,
        width: '100%',
        paddingVertical: 30, //temp fix
        padding: 10,
    },
    name:{
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 10,
    },
    description:{
        color: '#696969',
    },
    separator:{
        height: 2,
        backgroundColor: 'lightgray',
        marginVertical: 10,
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    quantity:{
        fontSize: 25,
        fontWeight: "bold",
        marginHorizontal: 20,
    },
    button:{
        backgroundColor: 'black',
        marginTop:"auto",
        padding: 20,
        alignItems: "center",
        borderRadius: 30
    },
    buttonText:{
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
    quantityContainer:{
        backgroundColor: "lightgray",
        paddingHorizontal: 5,
        marginRight: 5,
        paddingVertical: 2,
        borderRadius: 3,
    },
    itemName:{
        fontWeight: "600",
        letterSpacing: 0.5
    },
});

export default Basket;