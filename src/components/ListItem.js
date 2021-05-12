import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const ListItemM = ({imageUrl, imageId, openPicture, imageStyle}) => {
  return (
    <TouchableOpacity onPress={openPicture} style={styles.item}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={imageStyle}
        source={{uri: imageUrl}}
      />
    </TouchableOpacity>
  );
};

export const ListItem = React.memo(ListItemM);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorContainer: {
    padding: 30,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'black',
    padding: 2,
  },
});
