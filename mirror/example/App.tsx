import { StyleSheet, Text, View } from 'react-native';

import * as Mirror from 'mirror';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{Mirror.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
