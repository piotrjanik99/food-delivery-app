import { View, Text, TextInput, StyleSheet, Alert, Pressable, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../../models';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native'
import { Restaurant } from '../../models';
import { useOrderContext } from '../../contexts/OrderContext';
import { useBasketContext } from '../../contexts/BasketContext';
import OrderListItem from "../../components/OrderListItem";
import RestaurantItem from '../../components/RestaurantItem';
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { dbUser } = useAuthContext();
  const { orders } = useOrderContext();
  const { basketContext } = useBasketContext();

  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const [modalVisible, setModalVisible] = useState(false);
  const [favouriteRestaurant, setFavouriteRestaurant] = useState([]);
  var createdAt = new Date(dbUser?.createdAt).toLocaleDateString()
  var updatedAt = new Date(dbUser?.updatedAt).toLocaleDateString()

  const fetchFavourites = async () => {
    const results = await DataStore.query(Restaurant, (r) => r.rating("gt", 4.4));
    setFavouriteRestaurant(results)
  }

  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const results = await DataStore.query(Restaurant);
    setRestaurants(results);
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const { sub, setDbUser } = useAuthContext();

  const navigation = useNavigation();

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.goBack();
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.name = name;
        updated.address = address;
        updated.lat = parseFloat(lat);
        updated.lng = parseFloat(lng);
      })
    );
    setDbUser(user);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          sub,
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <Pressable onPress={onSave} style={styles.button} >
      <Text style={styles.buttonText}>
          Save
      </Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your statistics</Text>
            <Text>Name: {name} </Text>
            <Text>User created at: {createdAt}</Text>
            <Text>User updated at: {updatedAt}</Text>
            <Text>Your recent orders:</Text>
            <FlatList
              style={styles.ordersList}
              data={orders}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <OrderListItem order={item} />}
            />
            <Ionicons
              name="arrow-forward-circle-outline"
              size={45}
              color="black"
              style={styles.iconContainer}
            />
            <Ionicons
              name="arrow-down-circle-outline"
              size={45}
              color="black"
              style={styles.secondIconContainer}
            />
            <Text style={styles.fav}>Your favourite places:</Text>
            <FlatList
              style={styles.restaurantList}
              data={favouriteRestaurant}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <RestaurantItem  restaurant={item} />}
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)} style={styles.statsButton}>
        <Text style={styles.buttonText}>Statistics</Text>
      </Pressable>

      <Pressable onPress={() => Auth.signOut()} style={styles.signOutButton} >
      <Text style={styles.buttonText}>
          Sign out
      </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  iconContainer:{
    position: 'absolute',
    top: 238,
    left: 0, 
},
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
  ordersList:{
    height: '100%'
  },
  restaurantList:{
    marginBottom: 45
  },
  secondIconContainer:{
    marginTop: -45
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
    borderRadius: 30,
    color: "white",
    margin: 10
  },
  signOutButton:{
    backgroundColor: "#a30202",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
    borderRadius: 30,
    color: "white",
    margin: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  statsButton: {
    backgroundColor: "#002782",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
    borderRadius: 30,
    color: "white",
    margin: 10
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
    fontWeight: "bold",
    fontSize: 30
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  
});

export default Profile;
