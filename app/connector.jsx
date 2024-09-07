//   




import { useEffect } from 'react';
import { Button } from 'react-native';

export default function App() {
  const ws = new WebSocket('ws://192.168.31.102:8080'); // Replace with your PC's IP

  ws.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  ws.onmessage = (e) => {
    console.log('Received message:', e.data);
  };

  ws.onerror = (e) => {
    console.error('WebSocket error:', e.message);
  };

  ws.onclose = (e) => {
    console.log('WebSocket connection closed');
  };

  const startMirroring = () => {
    ws.send('start');
  };

  return <Button className="h-screen w-screen flex justify-center items-center" title="Start Mirroring" onPress={startMirroring} />;
}


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { captureScreen } from 'react-native-view-shot';

// const Connector = () => {
//   const [message, setMessage] = useState('');
//   const [textInput, setTextInput] = useState('');
//   const [ws, setWs] = useState(null);
//   const [imageUri, setImageUri] = useState(null);
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [captureInterval, setCaptureInterval] = useState(null);
//   const viewRef = useRef(null); // Ref for capturing the view

//   useEffect(() => {
//     const socket = new WebSocket(''); // Update with your server's IP

//     socket.onopen = () => {
//       console.log('Connected to WebSocket server');
//       setWs(socket);
//     };

//     socket.onmessage = (e) => {
//       console.log('Message from server:', e.data);
//       setMessage(e.data);
//     };

//     socket.onerror = (e) => {
//       console.error('WebSocket error:', e.message);
//     };

//     socket.onclose = (e) => {
//       console.log('WebSocket connection closed:', e.code, e.reason);
//     };

//     return () => {
//       socket.close();
//       if (captureInterval) {
//         clearInterval(captureInterval);
//       }
//     };
//   }, [captureInterval]);

//   const sendMessage = () => {
//     if (ws) {
//       ws.send(textInput); // Send the text input value to the server
//     }
//   };

//   const captureAndSendScreen = () => {
//     captureScreen({
//       format: 'jpg',
//       quality: 0.8,
//     }).then(uri => {
//       setImageUri(uri);
//       fetch(uri)
//         .then(response => response.blob())
//         .then(blob => {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             const base64data = reader.result.split(',')[1];
//             if (ws) {
//               ws.send(base64data); // Send the captured image data to the server
//             }
//           };
//           reader.readAsDataURL(blob);
//         })
//         .catch(err => console.error(err));
//     }).catch(error => console.error(error));
//   };

//   const startCapture = () => {
//     if (!isCapturing) {
//       setIsCapturing(true);
//       const intervalId = setInterval(captureAndSendScreen, 5000); // Capture every 5 seconds
//       setCaptureInterval(intervalId);
//     }
//   };

//   const stopCapture = () => {
//     if (isCapturing) {
//       setIsCapturing(false);
//       clearInterval(captureInterval);
//       setCaptureInterval(null);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View ref={viewRef}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your message"
//           value={textInput}
//           onChangeText={setTextInput}
//         />
//         <Button title="Send Message" onPress={sendMessage} />
//         <Button title="Start Screen Capture" onPress={startCapture} />
//         <Button title="Stop Screen Capture" onPress={stopCapture} />
//         {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//         <Text>{message ? `Message from server: ${message}` : 'Waiting for message...'}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '100%',
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginTop: 16,
//   },
// });

// export default Connector;
