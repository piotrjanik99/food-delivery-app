import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import restaurants from '../../../assets/data/restaurants.json';
import {AntDesign} from '@expo/vector-icons'

const dish = restaurants[0].dishes[0];

const DishDetailsScreen = () => {

    const [quantity, setQuantity] = useState(1);

    const onMinus = () => {
        if(quantity > 1){
        setQuantity(quantity - 1)
        }
    }

    const onPlus = () => {
        setQuantity(quantity + 1)
    }

    const getTotal = () => {
        return (dish.price * quantity).toFixed(2);
    }

    return (
        <View style={styles.page}>

            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <View style={styles.separator}/>

            <View style={styles.row}>
            <AntDesign name="minuscircleo" size={45} color={"black"} onPress={onMinus}/>
            <Text style={styles.quantity}>{quantity}</Text>
            <AntDesign name="pluscircleo" size={45} color={"black"} onPress={onPlus}/>
            </View>

            <View style={styles.button}>
                <Text style={styles.buttonText}>Add {quantity} to cart &#8226; ${getTotal()}</Text>
            </View>

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
        fontSize: 30,
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
        justifyContent: "center",
        marginTop: 50,
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
});

export default DishDetailsScreen;