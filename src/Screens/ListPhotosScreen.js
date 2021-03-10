import React, {useEffect, useState, useRef, useCallback} from 'react';
import {FlatList, Dimensions, StyleSheet, View, StatusBar} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {ListItem} from '../components/ListItem';
import {
  getPhotosThunk,
  loadMoreUsersThunk,
} from '../redux/store/actions/photoActions';
import {getToken} from '../redux/store/actions/authActions';
import {SafeAreaView} from 'react-navigation';
import {keyExtractor} from './helpers/index';
import {ErrorBlock} from '../components/ErrorBlock';

const {height, width} = Dimensions.get('window');

export const ListPhotosScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {page, pictures, pageCount} = useSelector((state) => state.photoAPI);
  const {token, error: errorToken} = useSelector((state) => state.authAPI);

  const loadNewData = useRef(true);
  const [
    imageThumbnailStylePortrait,
    setImageThumbnailStylePortrait,
  ] = useState();

  useEffect(() => {
    prepareStyles();
    (async () => {
      await dispatch(getToken());
    })();
  }, []);

  useEffect(() => {
    if (errorToken !== false && !!token) {
      (async () => {
        // await dispatch(loadMoreUsersThunk(-1));
        await dispatch(getPhotosThunk());
      })();
    }
  }, [errorToken, token]);

  const loadMore = useCallback(async () => {
    if (loadNewData.current) {
      if (page < pageCount) {
        loadNewData.current = false;
        await dispatch(loadMoreUsersThunk(page));
        loadNewData.current = true;
      }
    }
  }, [page, pageCount]);

  const prepareStyles = useCallback(() => {
    const realWidth = height > width ? width : height;
    const portraitImageSize = realWidth / 2 - 10;
    setImageThumbnailStylePortrait(
      StyleSheet.flatten({
        width: portraitImageSize,
        height: portraitImageSize,
      }),
    );
  }, [width]);

  const openPicture = useCallback(
    (imageId, index) => {
      navigation.navigate('GalleryScreen', {
        pictureDetails: pictures.find((pic) => pic.id === imageId.toString()),
        indexPhoto: index,
      });
    },
    [pictures],
  );

  const renderPicture = useCallback(
    (picture) => {
      const imageId = picture.item.id;
      return (
        <ListItem
          imageUrl={picture.item.cropped_picture}
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
    await dispatch(getPhotosThunk());
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
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
          onEndThreshold={4}
        />
      </SafeAreaView>
      {!!errorToken && <ErrorBlock errorMessage={errorToken} />}
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
