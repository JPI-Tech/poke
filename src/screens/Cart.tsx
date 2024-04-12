import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NavigationConstants} from '../navigation/Navigation.constants';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {removeItem} from '../redux/cart/cart.slice';

const Cart = () => {
  const navigation = useNavigation();
  const {items} = useSelector((state: RootState) => state.cart); // Get items from the Redux store
  const dispatch = useDispatch();

  const calculateTotal = useCallback(() => {
    let total = 0;
    items.forEach(item => {
      total += calcuateCost(item.weight) * item.quantity!;
    });
    return total;
  }, [items]);

  const calcuateCost = (weight: number) => {
    const costs = Math.round(weight * 0.38);
    return costs;
  };
  const [totalCost, setTotalCost] = useState<number>(calculateTotal());
  useEffect(() => {
    setTotalCost(calculateTotal());
  }, [calculateTotal, items]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const CheckoutItem = (props: {
    name: string;
    weight: number;
    cost?: number;
    image: string;
    item: any;
  }) => {
    const {name, weight, image, item} = props;

    return (
      <View style={styles.checkoutItemContainer}>
        <View style={styles.checkoutItemRow}>
          <Image
            style={styles.item}
            source={{uri: image}}
            resizeMode="contain"
          />
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.column}>
              <Text>Weight {weight}</Text>
              <Text style={styles.cost}>
                Cost: {` $${calcuateCost(weight)}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.amount}>
          <View style={styles.amountContainer}>
            <TouchableOpacity onPress={() => dispatch(removeItem(item))}>
              <Image
                style={styles.image}
                source={require('../assets/icons/deleteIcon/delete.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView>
        <Text style={styles.header}>Checkout Cart</Text>
        <View style={styles.itemsHeader}>
          <Text style={{marginTop: 5}}>Items</Text>
        </View>
        <View style={styles.divider} />
        <FlatList
          data={items}
          renderItem={({item}) => (
            <CheckoutItem
              item={item}
              name={item.name}
              weight={item.weight}
              image={item?.sprites!.front_default!}
            />
          )}
        />
        <View style={styles.divider} />
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.amountText}> Total </Text>
        <Text style={styles.amountCost}> ${totalCost} USD</Text>
      </View>
      <View style={styles.buyNow}>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => navigation.navigate(NavigationConstants.CONFIRMATION)}>
          <Text style={styles.checkoutText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  flex: {flex: 1},
  header: {marginHorizontal: 10, fontSize: 18, fontWeight: 'bold'},
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  icons: {width: 50, height: 50},
  divider: {
    backgroundColor: 'black',
    height: 1,
    opacity: 0.2,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  item: {width: 100, height: 100, borderRadius: 20},
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginLeft: 10,
  },
  amount: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  amountContainer: {
    flexDirection: 'column',
    width: 10,
  },
  amountText: {fontSize: 14},
  amountCost: {fontSize: 18, fontWeight: 'bold'},
  checkoutItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 10,
  },
  column: {flexDirection: 'column'},
  checkoutItemRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
  },
  checkout: {
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  totalContainer: {
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  buyNow: {marginBottom: 20, marginHorizontal: 20},
  name: {fontWeight: '600'},
  cost: {fontWeight: '600'},
  image: {width: 24, height: 24},
});
export default Cart;
