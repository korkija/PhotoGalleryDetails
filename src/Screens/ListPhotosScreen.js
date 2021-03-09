import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {
  FlatList,
  RefreshControl,
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  Share,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ListItem} from '../components/ListItem';
import {
  getPhotosThunk,
  loadMoreUsersThunk,
} from '../redux/store/actions/photoActions';
import {getToken} from '../redux/store/actions/authActions';
import {SafeAreaView} from 'react-navigation';
import {keyExtractor} from './helpers/index';

export const ListPhotosScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const {page, pictures, pageCount} = useSelector((state) => state.photoAPI);

  const loadNewData = useRef(true);
  const [
    imageThumbnailStylePortrait,
    setImageThumbnailStylePortrait,
  ] = useState();

  useEffect(() => {
    console.log('<><><><>========');
    prepareStyles();
    (async () => {
      await dispatch(getToken());
      // if (!tokenIsLoading) {
      await dispatch(getPhotosThunk());
      // }
    })();
  }, []);

  const loadMore = useCallback(async () => {
    console.log('******loadMore******');
    if (loadNewData.current) {
      if (page < pageCount) {
        loadNewData.current = false;
        await dispatch(loadMoreUsersThunk(page));
        loadNewData.current = true;
      }
    }
  }, [page, pageCount]);

  console.log('******RERENDER******');
  const prepareStyles = () => {
    console.log('******prepareStyles******');
    const {height, width} = Dimensions.get('window');
    const realWidth = height > width ? width : height;
    const portraitImageSize = realWidth / 2 - 10;
    setImageThumbnailStylePortrait(
      StyleSheet.flatten({
        width: portraitImageSize,
        height: portraitImageSize,
      }),
    );
  };
  // const onShare = useCallback(async (urlCropp, urlFull) => {
  //   try {
  //     const result = await Share.share({
  //       message: `cropp ${urlCropp} full ${urlFull}`,
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }, []);

  const openPicture = useCallback(
    (imageId, index) => {
      navigation.navigate('ModalGalleryScreen', {
        pictureDetails: pictures.find((pic) => pic.id === imageId.toString()),
        indexPhoto: index,
      });
    },
    [pictures],
  );

  const renderPicture = useCallback(
    (picture) => {
      const imageURL = picture.item.cropped_picture;
      const imageId = picture.item.id;
      return (
        <ListItem
          imageUrl={imageURL}
          imageId={imageId}
          imageStyle={imageThumbnailStylePortrait}
          openPicture={() => {
            openPicture(imageId, picture.index);
          }}
        />
      );
    },
    [pictures],
  );

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await dispatch(getPhotosThunk());
    setRefresh(false);
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          onEndReached={loadMore}
          onEndReachedThreshold={1}
          removeClippedSubviews
          refreshing={false}
          initialNumToRender={5}
          onRefresh={onRefresh}
          data={pictures}
          numColumns={2}
          renderItem={renderPicture}
          keyExtractor={keyExtractor}
          onEndThreshold={2}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
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
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
