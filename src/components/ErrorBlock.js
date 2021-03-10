import * as React from 'react';
import {Dimensions, Text, Pressable, StyleSheet} from 'react-native';
import {setError} from '../redux/store/actions/photoActions';
import {useDispatch} from 'react-redux';
const {height} = Dimensions.get('window');

const ErrorBlockM = ({errorMessage}) => {
  const dispatch = useDispatch();
  const closeError = () => {
    dispatch(setError(false));
  };

  return (
    <Pressable
      onPress={closeError}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#aaf' : '#fff',
        },
        styles.container,
      ]}>
      <Text style={styles.textTitle}>Something wrong</Text>
      <Text numberOfLines={5}>{errorMessage}</Text>
    </Pressable>
  );
};

export const ErrorBlock = React.memo(ErrorBlockM);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    flex: 1,
    top: height / 2 - (150 / 3) * 2,
    padding: 10,
    height: 150,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 30,
    right: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {paddingVertical: 20, fontWeight: 'bold', fontSize: 18},
});
