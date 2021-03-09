import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Dimensions, Share, FlatList} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {getPhotoDetailsThunk} from '../redux/store/actions/photoActions';
import {DetailsFooter} from './DetailsFooter';

const {width, height} = Dimensions.get('window');

const DetailsItemM = ({picture, indexPhoto, onShare}) => {
  console.log('indexPhoto', indexPhoto);
  const dispatch = useDispatch();
  const picturesDetails = useSelector(
    (state) => state.photoAPI.picturesDetails,
  );
  const [details, setDetails] = useState(
    picturesDetails[indexPhoto].details
      ? picturesDetails[indexPhoto].details
      : null,
  );
  // console.log('**//****/////******', picturesDetails);
  // useEffect(() => {
  //   console.log('@@@@@@@@@@', picturesDetails[indexPhoto].details);
  //   if (!picturesDetails[indexPhoto].details) {
  //     (async () => {
  //       await dispatch(getPhotoDetailsThunk(picture.id));
  //     })();
  //   }
  // }, []);

  useEffect(() => {
    const test = picturesDetails[indexPhoto];
    if (test && !details) {
      setDetails(test.details);
    }
  }, [picturesDetails]);

  // console.log('<<<<<<<indexFlatList', indexPhoto);
  return (
    <View style={styles.imageContainer}>
      <ImageZoom
        cropWidth={width - 10}
        cropHeight={height}
        imageWidth={width - 10}
        imageHeight={width}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.imageStyle}
          source={{
            uri: picture.details?.full_picture
              ? picture.details.full_picture
              : picture.cropped_picture,
          }}
        />
      </ImageZoom>
      <DetailsFooter
        pictureUrls={{
          urlCropp: picture.cropped_picture,
          urlFull: picture.details?.full_picture,
        }}
        details={details}
        shareCallback={() =>
          onShare(picture.cropped_picture, picture.details?.full_picture)
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
  imageStyle: {
    flex: 1,
    width: width,
    height: width,
  },
});
