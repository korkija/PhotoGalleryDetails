import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const ImageWithPreviewM = ({photoItem}) => {
  const [showPreview, setShowPreview] = useState(true);
  return (
    <>
      {showPreview && (
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.imageStyle}
          source={{
            uri: photoItem.cropped_picture,
          }}
        />
      )}
      {!!photoItem.details?.full_picture && (
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.imageStyle}
          source={{
            uri: photoItem.details?.full_picture,
          }}
          onLoadEnd={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export const ImageWithPreview = React.memo(ImageWithPreviewM);

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    width: width,
    height: width,
    position: 'absolute',
  },
});
