import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { router, useRouter } from 'expo-router';

export default function Connector() {
  const router=useRouter()
  const StyledTouchableOpacity = styled(TouchableOpacity); 
  const StyledText = styled(Text);
  
  const ws = new WebSocket('ws://192.168.43.8:8080');
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1)); // For button animations

  // Animate button fade effect
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.8, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
  };

  ws.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  ws.onmessage = (e) => {
    console.log('Received message:', e.data);
  };

  ws.onerror = (e) => {
    console.error('WebSocket error:', e.message);
    router.push('/scan')
  };

  ws.onclose = (e) => {
    console.log('WebSocket connection closed');
   
  };

  const startMirroring = () => {
    ws.send('start');
    animateButton();
    Alert.alert('Mirroring Started', 'Your screen mirroring has started successfully!');
  };

  const stopMirroring = () => {
    ws.send('stop');
    animateButton();
    Alert.alert('Mirroring Stopped', 'Your screen mirroring has been stopped.');
  };

  const enableMouse = () => {
    ws.send('mouse-event');
  };

  const toggleControls = () => {
    setControlsEnabled(!controlsEnabled);
    
    if (!controlsEnabled) {
      // stopMirroring() 
      enableMouse();
      Alert.alert('Mouse Controls Enabled', 'you can now control your Phone with the Mouse and Keyboard!');
    }
    else{
      stopMirroring();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F4F8', padding: 24 }}>
      <View style={{ width: '100%', alignItems: 'center', paddingBottom: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#2D3748', marginBottom: 10, textAlign: 'center' }}>
          Screen Mirroring Control
        </Text>
        <Text style={{ fontSize: 16, color: '#718096', textAlign: 'center', maxWidth: 280 }}>
          Manage your screen mirroring and input controls with ease.
        </Text>
      </View>

      <View className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <Animated.View style={{ opacity: fadeAnim }}>
          <StyledTouchableOpacity 
            onPress={startMirroring}
            style={{ 
              backgroundColor: '#4299E1', 
              borderRadius: 16, 
              paddingVertical: 18, 
              marginBottom: 20, 
              shadowColor: '#000', 
              shadowOpacity: 0.15, 
              shadowRadius: 6, 
              shadowOffset: { width: 0, height: 4 } 
            }}
            activeOpacity={0.85}
          >
            <StyledText 
              style={{ 
                textAlign: 'center', 
                color: '#FFF', 
                fontSize: 18, 
                fontWeight: '600' 
              }}
            >
              Start Mirroring
            </StyledText>
          </StyledTouchableOpacity>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <StyledTouchableOpacity 
            onPress={stopMirroring}
            style={{ 
              backgroundColor: '#F56565', 
              borderRadius: 16, 
              paddingVertical: 18, 
              marginBottom: 20, 
              shadowColor: '#000', 
              shadowOpacity: 0.15, 
              shadowRadius: 6, 
              shadowOffset: { width: 0, height: 4 } 
            }}
            activeOpacity={0.85}
          >
            <StyledText 
              style={{ 
                textAlign: 'center', 
                color: '#FFF', 
                fontSize: 18, 
                fontWeight: '600' 
              }}
            >
              Stop Mirroring
            </StyledText>
          </StyledTouchableOpacity>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <StyledTouchableOpacity 
            onPress={toggleControls}
            style={{ 
              backgroundColor: controlsEnabled ? '#38A169' : '#ED8936', 
              borderRadius: 16, 
              paddingVertical: 18, 
              shadowColor: '#000', 
              shadowOpacity: 0.15, 
              shadowRadius: 6, 
              shadowOffset: { width: 0, height: 4 } 
            }}
            activeOpacity={0.85}
          >
            <StyledText 
              style={{ 
                textAlign: 'center', 
                color: '#FFF', 
                fontSize: 18, 
                fontWeight: '600' 
              }}
            >
              {(!controlsEnabled) ? 'Enable Mouse Controls' : 'Disable Mouse Controls'}
            </StyledText>
          </StyledTouchableOpacity>
        </Animated.View>
      </View>

      <View style={{ marginTop: 40, width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: '#A0AEC0' }}>
          Mouse Controls Status: {controlsEnabled ? 'Controls Enabled' : 'Controls Disabled'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
