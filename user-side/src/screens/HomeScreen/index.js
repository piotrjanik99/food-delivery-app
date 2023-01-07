import { StyleSheet, FlatList, View, Pressable, Text, Alert, Modal } from 'react-native';
import RestaurantItem from '../../components/RestaurantItem';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const results = await DataStore.query(Restaurant);
    setRestaurants(results);
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

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
            <FlatList
            data={restaurants}
            renderItem={({item}) => <RestaurantItem restaurant={item} />}
            showsVerticalScrollIndicator={false}
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Order now!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Dont know what to eat?</Text>
      </Pressable>
      <FlatList
        data={restaurants}
        renderItem={({item}) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
      
      </View>
  );
}

const styles = StyleSheet.create({
    page:{
        padding: 10,
    },
    button: {
      backgroundColor: "black",
      marginTop: 10,
      padding: 10,
      alignItems: "center",
      borderRadius: 30,
      color: "white",
      margin: 10,
      position: "relative"
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
