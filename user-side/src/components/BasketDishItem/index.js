import {View, Text, StyleSheet, FlatList} from 'react-native';

const BasketDishItem = ({basketDish}) => {
    return (
        <View style={styles.row}>
        <View style={styles.quantityContainer}>
            <Text>{basketDish.quantity}</Text>
        </View>
        <Text style={styles.itemName}>{basketDish.Dish?.name}</Text>
        <Text style={{marginLeft: "auto"}}>$ {basketDish.Dish?.price}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    row:{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
        paddingHorizontal: 10,
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

export default BasketDishItem;