
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width / 3;

const SwipeableWrapper = ({ children, showDots = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;

  // Convert children to array for easier handling
  const childrenArray = React.Children.toArray(children);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue(gesture.dx);
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx < -SWIPE_THRESHOLD && currentIndex < childrenArray.length - 1) {
        // Swipe left to next
        Animated.timing(position, {
          toValue: -width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue(0);
        });
      } else if (gesture.dx > SWIPE_THRESHOLD && currentIndex > 0) {
        // Swipe right to previous
        Animated.timing(position, {
          toValue: width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex - 1);
          position.setValue(0);
        });
      } else {
        // Return to center
        Animated.timing(position, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    }
  });

  const getCardStyle = () => {
    return {
      transform: [{ translateX: position }]
    };
  };

  // Indicator dots
  const renderDots = () => {
    if (!showDots) return null;
    
    return (
      <View style={styles.dotsContainer}>
        {childrenArray.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[styles.componentWrapper, getCardStyle()]} 
        {...panResponder.panHandlers}
      >
        {childrenArray[currentIndex]}
      </Animated.View>
      {renderDots()}
    </View>
  );
};

SwipeableWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  showDots: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  componentWrapper: {
    flex: 1,
    position: 'relative',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2196F3',
  },
});

export default SwipeableWrapper;