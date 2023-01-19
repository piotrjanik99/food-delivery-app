import { StyleSheet, FlatList, View, Pressable, Text, Alert, Modal, ImageBackground } from 'react-native';
import RestaurantItem from '../../components/RestaurantItem';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [recommendedRestaurant, setRecommendedRestaurant] = useState([]);
  const [recommendedRestaurant2, setRecommendedRestaurant2] = useState([]);

  const fetchRestaurants = async () => {
    const results = await DataStore.query(Restaurant);
    setRestaurants(results);
  }

  const fetchRecommendations = async () => {
    const results = await DataStore.query(Restaurant, (r) => r.rating("eq", 4.856792898536915));
    setRecommendedRestaurant(results)
  }

  const fetchRecommendations2 = async () => {
    const results = await DataStore.query(Restaurant, (r) => r.minDeliveryTime("lt", 8));
    setRecommendedRestaurant2(results)
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  useEffect(() => {
    fetchRecommendations2();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.page}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Today's recommendations for you</Text>
            <Text> Recommendation 1: </Text>
            <FlatList
              style={styles.recommendationsList}
              data={recommendedRestaurant}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <RestaurantItem  restaurant={item} />}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text> Recommendation 2: </Text>
            <FlatList
              style={styles.recommendationsList}
              data={recommendedRestaurant2}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <RestaurantItem  restaurant={item} />}
              onPress={() => setModalVisible(!modalVisible)}
            />
            {/* <Text onPress={() => setModalVisible(!modalVisible)}> Recommendation 3: </Text>
            <FlatList
              style={styles.recommendationsList}
              data={recommendedRestaurant}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <RestaurantItem  restaurant={item} />}
            /> */}
            <Pressable style={[styles.orderButton, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Order now!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Dont know what to eat?</Text>
      </Pressable>
      <FlatList
        style={styles.restaurantList}
        data={restaurants}
        renderItem={({item}) => <RestaurantItem onPress={() => setModalVisible(!modalVisible)} restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
      </View>
  );
}

const styles = StyleSheet.create({
    page:{
        padding: 10,
    },
    restaurantList:{
      marginTop: 50
    },
    orderButton: {
      backgroundColor: "black",
      marginTop: 10,
      padding: 10,
      alignItems: "center",
      borderRadius: 30,
      color: "white",
      margin: 10,
    },
    button:{
      backgroundColor: "black",
      marginTop: 10,
      padding: 10,
      alignItems: "center",
      borderRadius: 30,
      color: "white",
      margin: 10,
      width: 300,
      position: "absolute",
      zIndex: 999,
      marginLeft: 50
    },
    
    buttonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 18,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
});
