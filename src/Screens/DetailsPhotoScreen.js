import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet, Dimensions, Share, FlatList} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {DetailsFooter} from '../components/DetailsFooter';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {getPhotoDetailsThunk} from '../redux/store/actions/photoActions';
import {SafeAreaView} from 'react-navigation';
import {keyExtractor} from './helpers/index';
import {DetailsItem} from '../components/DetailsItem';

const {width, height} = Dimensions.get('window');

const DetailsPhotoScreenM = ({route}) => {
  const {pictureDetails, indexPhoto} = route.params;
  const dispatch = useDispatch();
  const picturesDetails = useSelector(
    (state) => state.photoAPI.picturesDetails,
  );

  const [activeItem, setActiveItem] = useState();

  const [details, setDetails] = useState(
    picturesDetails[indexPhoto].details
      ? picturesDetails[indexPhoto].details
      : null,
  );
  console.log('**//****/////******', picturesDetails);
  useEffect(() => {
    if (activeItem) {
      console.log('**//****/////***activeItem.current***', activeItem);
      const {index, id} = activeItem;
      if (!picturesDetails[index].details) {
        console.log('@@@@@@@@@@', picturesDetails);
        console.log('@@@@@@@@@@', picturesDetails[index]);
        (async () => {
          await dispatch(getPhotoDetailsThunk(id));
        })();
      }
    }
  }, [activeItem]);

  // useEffect(() => {
  //   const test = picturesDetails[indexPhoto];
  //   if (test && !details) {
  //     setDetails(test.details);
  //   }
  // }, [picturesDetails]);

  const onShare = async ({cropp, full}) => {
    try {
      const result = await Share.share({
        message: `cropp ${cropp} full ${full}`,
        // message: `cropp ${pictureDetails.cropped_picture} full ${details?.full_picture}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  // const onShare = useCallback(async () => {
  //   try {
  //     const result = await Share.share({
  //       message: `cropp ${pictureDetails.cropped_picture} full ${details?.full_picture}`,
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }, [details, pictureDetails.cropped_picture]);

  const _onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    // console.log('Changed in this iteration', changed);
    // console.log('@@@@@@@@@@', picturesDetails[viewableItems[0].index]);
    setActiveItem({
      id: viewableItems[0].item.id,
      index: viewableItems[0].index,
    });
    // console.log('111  activeItem.current', activeItem.current);
    // test({
    //   id: viewableItems[0].item.id,
    //   index: viewableItems[0].index,
    // });
    // if (!picturesDetails[viewableItems[0].index].details) {
    //   (async () => {
    //     await dispatch(getPhotoDetailsThunk(viewableItems[0].item.id));
    //   })();
    // }
  }, []);
  const test = ({id, index}) => {
    if (!picturesDetails[index].details) {
      console.log('@@@@@@@@@@', picturesDetails);
      console.log('@@@@@@@@@@', picturesDetails[index]);
      (async () => {
        await dispatch(getPhotoDetailsThunk(id));
      })();
    }
  };

  console.log('<<<<<<<indexFlatList', indexPhoto);
  return (
    <View style={styles.container}>
      <FlatList
        // onEndReached={loadMore}
        onEndReachedThreshold={1}
        removeClippedSubviews
        horizontal={true}
        refreshing={false}
        initialNumToRender={5}
        // onRefresh={onRefresh}
        data={picturesDetails}
        initialScrollIndex={indexPhoto}
        onViewableItemsChanged={_onViewableItemsChanged}
        viewAreaCoveragePercentThreshold={100}
        // numColumns={2}
        pagingEnabled
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        snapToInterval={width}
        renderItem={({item, index}) => {
          // console.log('item', item);
          // console.log('item.cropped_picture', item.item.cropped_picture);
          return (
            <DetailsItem picture={item} indexPhoto={index} onShare={onShare} />
            // <View style={styles.imageContainer}>
            //   <ImageZoom
            //     cropWidth={width - 10}
            //     cropHeight={height}
            //     imageWidth={width - 10}
            //     imageHeight={width}>
            //     <FastImage
            //       resizeMode={FastImage.resizeMode.cover}
            //       style={styles.imageStyle}
            //       source={{
            //         // uri: details?.full_picture
            //         //   ? details.full_picture
            //         uri: item.item.cropped_picture,
            //       }}
            //     />
            //   </ImageZoom>
            // </View>
          );
        }}
        keyExtractor={keyExtractor}
        onEndThreshold={2}
      />
      {/*<View style={styles.imageContainer}>*/}
      {/*  <ImageZoom*/}
      {/*    cropWidth={width}*/}
      {/*    cropHeight={height}*/}
      {/*    imageWidth={width}*/}
      {/*    imageHeight={width}>*/}
      {/*    <FastImage*/}
      {/*      resizeMode={FastImage.resizeMode.cover}*/}
      {/*      style={styles.imageStyle}*/}
      {/*      source={{*/}
      {/*        uri: details?.full_picture*/}
      {/*          ? details.full_picture*/}
      {/*          : pictureDetails.cropped_picture,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </ImageZoom>*/}
      {/*</View>*/}
      {/*<DetailsFooter*/}
      {/*  pictureUrls={{*/}
      {/*    urlCropp: pictureDetails.cropped_picture,*/}
      {/*    urlFull: details?.full_picture,*/}
      {/*  }}*/}
      {/*  details={details}*/}
      {/*  shareCallback={() =>*/}
      {/*    onShare(pictureDetails.cropped_picture, details?.full_picture)*/}
      {/*  }*/}
      {/*/>*/}
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
    paddingHorizontal: 5,
  },
  imageStyle: {
    flex: 1,
    width: width,
    height: width,
  },
});
