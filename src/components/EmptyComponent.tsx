import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

interface Props {
  isLoading: boolean;
}

const height = Dimensions.get('window').height;

export const EmptyComponent = React.memo(({isLoading}: Props) => {
  return (
    <View
      style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={styles.textTitle}>No data</Text>
      )}
    </View>
  );
});

const styles=StyleSheet.create({
    container: {
        flex: 1,
        height: height / 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {color: '#fff', fontSize: 24},
  });
  