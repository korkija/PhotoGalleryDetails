import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Dimensions, Share} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {DetailsFooter} from '../components/DetailsFooter';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {getPhotoDetailsThunk} from '../redux/store/actions/photoActions';

const {width, height} = Dimensions.get('window');

const DetailsPhotoScreenM = ({route}) => {
  const dispatch = useDispatch();
  const pictures = useSelector((state) => state.photoAPI.pictures);
  const [details, setDetails] = useState(
    route.params.pictureDetails.details
      ? route.params.pictureDetails.details
      : null,
  );

  useEffect(() => {
    if (!route.params.pictureDetails.details) {
      (async () => {
        await dispatch(getPhotoDetailsThunk(route.params.pictureDetails.id));
      })();
    }
  }, []);

  useEffect(() => {
    const test = pictures[route.params.indexPhoto];
    if (test && !details) {
      setDetails(test.details);
    }
  }, [pictures]);

  const onShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `cropp ${route.params.pictureDetails.cropped_picture} full ${details?.full_picture}`,
      });
    } catch (error) {
      alert(error.message);
    }
  }, [details, route.params.pictureDetails.cropped_picture]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={width}
          imageHeight={width}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={styles.imageStyle}
            source={{
              uri: details?.full_picture
                ? details.full_picture
                : route.params.pictureDetails.cropped_picture,
            }}
          />
        </ImageZoom>
      </View>
      <DetailsFooter
        pictureUrls={{
          urlCropp: route.params.pictureDetails.cropped_picture,
          urlFull: details?.full_picture,
        }}
        details={details}
        shareCallback={onShare}
      />
    </View>
  );
};

export const DetailsPhotoScreen = React.memo(DetailsPhotoScreenM);

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
  },
  imageStyle: {
    flex: 1,
    width: width,
    height: width,
  },
});
