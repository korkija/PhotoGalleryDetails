import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const ListItemM = ({imageUrl, imageId, openPicture, imageStyle}) => {
  return (
    <TouchableOpacity onPress={() => openPicture(imageId)} style={styles.item}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={imageStyle}
        source={{uri: imageUrl}}
      />
    </TouchableOpacity>
  );
};

export const ListItem = React.memo(ListItemM);

const styles: any = StyleSheet.create({
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
    width: 200,
    height: 200,
    backgroundColor: 'black',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
