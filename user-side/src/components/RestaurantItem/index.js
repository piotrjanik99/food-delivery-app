import { StyleSheet, Image, View, Text } from 'react-native';

const RestaurantItem = ({restaurant}) => {
  return(
    <View style={styles.restaurantContainter}>
        <Image 
          source={{uri: restaurant.image,
         }}
          style={styles.image}
      />
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>${restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} minutes</Text>
      </View>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
    restaurantContainter:{
      marginVertical: 10,
    },
    image:{
      width: '100%',
      aspectRatio: 6 / 3,
      marginBottom: 5,
    },
    title:{
      fontSize: 16,
      fontWeight: "500",
      marginVertical: 5,
    },
    subtitle:{
      color: "grey",
    },
  });
  