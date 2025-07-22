import React, { useEffect } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
interface ImageSliderProps {
  images: ImageSourcePropType[];
}

const ImageSlider = ({ images }: { images: any[] }) => {
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
      translateX.value = withTiming(-currentIndex.value * width, { duration: 500 });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          style={[styles.slider]}
          renderItem={({ item }) => (
            <Animated.View style={[{ width, height: '100%' }, animatedStyle]}>
              <Image  source={item}  style={styles.image}/>
            </Animated.View>
          )} />
    </ View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flexDirection: 'row',
    width: width, // Adjust based on number of images
    overflow: 'visible',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height:'auto',
    aspectRatio: 1, // Maintain aspect ratio
  },
});

export default ImageSlider;