import * as React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

// export const ListItem extends React.PureComponent<Props> {
export const ListItem = ({imageUrl, imageId, openPicture, imageStyle}) => {
  // function ListItemM({imageUrl, imageId, openPicture, imageStyle}) {
  // const { imageUrl, imageId, openPicture, imageStyle } = this.props
  // console.log('00000<<<<< imageId', imageId);
  return (
    <TouchableOpacity onPress={() => openPicture(imageId)} style={styles.item}>
      {/*<Image style={imageStyle} resizeMode="cover" source={{uri: imageUrl}} />*/}
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={imageStyle}
        source={{uri: imageUrl}}
      />
    </TouchableOpacity>
  );
};

// export const ListItem = React.memo(ListItemM);

const styles: any = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,

    // width:,
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
