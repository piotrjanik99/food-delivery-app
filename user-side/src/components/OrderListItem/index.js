import {View, Text, Image} from 'react-native';
import OrderScreen from '../../screens/OrdersScreen';

const OrderListItem = ({order}) => {
    return (
        <View style={{flexDirection: "row", margin: 10, alignItems: "center"}}>
            <Image
            source={{uri: order.Restaurant.image}}
            style={{width: 90, height: 90, marginRight: 5,}}
            />

            <View>
            <Text style={{fontWeight: '700', fontSize: 16}}>{order.Restaurant.name}</Text>
            <Text style={{marginVertical: 5, color: '#696969'}}>3 items &#8226; $38.45</Text>
            <Text style={{color: '#696969'}}>{order.createdAt} &#8226; {order.status}</Text>
            </View>
        </View>
    );
};

export default OrderListItem;