import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
  ViewToken,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const STATUSBAR_OFFSET = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

const features = [
  {
    title: '⚡ Real-time Messaging',
    desc: 'Send and receive messages instantly with lightning speed.',
  },
  {
    title: '🔐 End-to-End Encryption',
    desc: 'Your conversations stay private and secure at all times.',
  },
  {
    title: '🌍 Connect Worldwide',
    desc: 'Chat with anyone, anywhere — build global friendships.',
  },
];

const WelcomeScreen = ({ navigation }: any) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  });

  const handlePrevious = () => {
    flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141E30" />

      {/* Top Buttons below StatusBar */}
      <View style={[styles.topButtons, { top: STATUSBAR_OFFSET }]}>
        {currentIndex === 1 && (
   <TouchableOpacity onPress={handlePrevious} style={styles.topLeftButton}>
   <Ionicons name="chevron-back" size={24} color="#00D1FF" />
 </TouchableOpacity>
        )}
        {(currentIndex === 0 || currentIndex === 1) && (
          <TouchableOpacity onPress={handleSkip} style={styles.topRightButton}>
            <Text style={styles.topButtonText}>Skip →</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Onboarding Cards */}
      <FlatList
        ref={flatListRef}
        data={features}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Get Started CTA */}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141E30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  topButtons: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : -10,
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  topLeftButton: {
    backgroundColor: '#1F2A40',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },  
  topRightButton: {
    padding: 8,
  },
  topButtonText: {
    color: '#00D1FF',
    fontWeight: '600',
  },
  card: {
    width,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D1FF',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#00D1FF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#141E30',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
