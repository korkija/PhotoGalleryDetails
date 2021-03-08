import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  FlatList,
  RefreshControl,
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ListItem} from '../components/ListItem';
import {
  getPhotosThunk,
  loadMoreUsersThunk,
  getToken,
} from '../redux/store/actions/photoActions';
import {SafeAreaView} from 'react-navigation';

const keyExtractor = (item, page) => item.id.toString() + page;

export const ListPhotosScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const {tokenIsLoading, page, pictures, pageCount} = useSelector(
    (state) => state.photoAPI,
  );

  const loadNewData = useRef(true);
  const [
    imageThumbnailStylePortrait,
    setImageThumbnailStylePortrait,
  ] = useState();

  useEffect(() => {
    prepareStyles();
    (async () => {
      await dispatch(getToken());
      if (!tokenIsLoading) {
        await dispatch(getPhotosThunk());
      }
    })();
  }, []);

  const loadMore = async () => {
    if (loadNewData.current) {
      if (page < pageCount) {
        loadNewData.current = false;
        await dispatch(loadMoreUsersThunk(page));
        loadNewData.current = true;
      }
    }
  };

  const prepareStyles = () => {
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

  const openPicture = (imageId, index) => {
    navigation.navigate('ModalGalleryScreen', {
      pictureDetails: pictures.find((pic) => pic.id === imageId.toString()),
      indexPhoto: index,
    });
  };

  const renderPicture = useCallback(
    (picture) => {
      const imageURL = picture.item.cropped_picture;
      const imageId = picture.item.id;
      // console.log('WWWWW', picture.item);
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

  const onRefresh = async () => {
    setRefresh(true);
    await dispatch(getPhotosThunk());
    setRefresh(false);
  };

  return (
    <View style={styles.page}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          onEndReached={loadMore}
          onEndReachedThreshold={1}
          // removeClippedSubviews
          refreshing={false}
          // initialNumToRender={20}
          data={pictures}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refresh}
              colors={['#fa6f44']}
              tintColor="#f28e26"
            />
          }
          numColumns={2}
          renderItem={renderPicture}
          keyExtractor={(item, index) => keyExtractor(item, index)}
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
