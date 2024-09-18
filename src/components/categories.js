import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { categoryData } from '../constants/food';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../constants/color';
import Animated,{ FadeInDown } from 'react-native-reanimated';


export default function Categories({ categories,activeCategory, handleChangeCategory }) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{ marginHorizontal: 4 }}
      >
        {
          categories.map((cat, index) => {
            let isActive = cat.strCategory === activeCategory;
            const activeButtonStyle = isActive ? styles.active : styles.inactive;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                style={styles.items}
              >
                <View style={[styles.item, activeButtonStyle]}>
                  <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: hp(6), height: hp(6), borderRadius: hp(6) / 2 }}
                  />
                </View>
                <Text style={styles.textItem}>
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  items: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal:4,
  },
  item: {
    padding: 9,
    borderRadius: hp(6) , 
  },
  textItem: {
    color: color.black,
    fontSize: hp(1.6),
  },
  active: {
    backgroundColor: 'rgba(251, 191, 36, 1)',
  },
  inactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
  },
});
