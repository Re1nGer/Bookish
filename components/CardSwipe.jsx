import { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const CardSwipe = ({ data, onSwipeLeft, onSwipeRight }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (evt, gestureState) => {
      pan.flattenOffset();
      
      const swipeThreshold = screenWidth * 0.3;
      const velocityThreshold = 500;
      
      if (Math.abs(gestureState.dx) > swipeThreshold || Math.abs(gestureState.vx) > velocityThreshold) {
        const direction = gestureState.dx > 0 ? 'right' : 'left';
        const toValue = direction === 'right' ? screenWidth : -screenWidth;
        
        // Animate card off screen
        Animated.timing(pan.x, {
          toValue,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          // Call appropriate callback
          if (direction === 'right') {
            onSwipeRight && onSwipeRight();
          } else {
            onSwipeLeft && onSwipeLeft();
          }
          
          // Reset position for next card
          pan.setValue({ x: 0, y: 0 });
          rotate.setValue(0);
        });
      } else {
        // Spring back to center
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
        
        Animated.spring(rotate, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  // Update rotation based on translateX
  useEffect(() => {
    const listener = pan.x.addListener(({ value }) => {
      const rotation = (value / screenWidth) * 30;
      rotate.setValue(rotation);
    });
    
    return () => pan.x.removeListener(listener);
  }, [pan.x, rotate]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { 
              rotate: rotate.interpolate({
                inputRange: [-30, 0, 30],
                outputRange: ['-30deg', '0deg', '30deg'],
                extrapolate: 'clamp',
              }) 
            },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.cardText}>{data.title}</Text>
      <Animated.Text
        style={[
                styles.cardDescription,
                {
                    opacity: pan.x.interpolate({
                        inputRange: [-screenWidth * 0.5, screenWidth * 0.5],
                        outputRange: [0,1],
                        extrapolate: 'clamp',
                    })
                }
            ]}>
            {data.description}
        </Animated.Text>
      
      {/* Optional: Add visual feedback */}
      <Animated.View 
        style={[
          styles.overlay,
          styles.leftOverlay,
          {
            opacity: pan.x.interpolate({
              inputRange: [-screenWidth * 0.5, 0],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.overlayText}>Revise</Text>
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.overlay,
          styles.rightOverlay,
          {
            opacity: pan.x.interpolate({
              inputRange: [0, screenWidth * 0.5],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.overlayText}>Remember</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: screenWidth * 0.85,
    height: 500,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cardDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  leftOverlay: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  rightOverlay: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  overlayText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
  },
});

export default CardSwipe;