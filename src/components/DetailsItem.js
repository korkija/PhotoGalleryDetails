import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {useSelector} from 'react-redux';
import {DetailsFooter} from './DetailsFooter';
import {ImageWithPreview} from './ImageWithPreview';

const {width, height} = Dimensions.get('window');

const DetailsItemM = ({indexPhoto, onShare, safeArea}) => {
  const picturesDetails = useSelector(
    (state) => state.photoAPI.picturesDetails,
  );
  const [photoItem, setPhotoItem] = useState(picturesDetails[indexPhoto]);

  useEffect(() => {
    const test = picturesDetails[indexPhoto];
    if (test?.details && !photoItem?.details) {
      setPhotoItem(test);
    }
  }, [picturesDetails]);

  const scaleValue = useRef(1);

  console.log('safeArea.bottom', safeArea.bottom);
  return (
    <View style={[styles.imageContainer]}>
      <ImageZoom
        style={{paddingBottom: safeArea.top + 40}}
        cropWidth={width - 10}
        cropHeight={height}
        imageWidth={width - 10}
        imageHeight={width}
        onStartShouldSetPanResponder={(e) => {
          return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
        }}
        onMove={({scale}) => {
          scaleValue.current = scale;
        }}>
        <View
          style={{flex: 1}}
          onStartShouldSetResponder={(e) => {
            return e.nativeEvent.touches.length < 2 && scaleValue.current <= 1;
          }}>
          <ImageWithPreview photoItem={photoItem} />
        </View>
      </ImageZoom>
      <DetailsFooter
        details={photoItem.details}
        paddingBottom= {safeArea.bottom}
        shareCallback={() =>
          onShare({
            cropp: photoItem.cropped_picture,
            full: photoItem.details?.full_picture,
          })
        }
      />
    </View>
  );
};

export const DetailsItem = React.memo(DetailsItemM);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
