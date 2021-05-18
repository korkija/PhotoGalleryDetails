import React, {useCallback} from 'react';
import {View, StyleSheet, Dimensions, Share, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPhotoDetailsThunk} from '../redux/store/actions/photoActions';
import {keyExtractor} from './helpers/index';
import {DetailsItem} from '../components/DetailsItem';
import {ErrorBlock} from '../components/ErrorBlock';
import {getPicturesSelector, getErrorSelector} from '../redux/store/selectors';

const {width} = Dimensions.get('window');

const DetailsPhotoScreenM = ({route}) => {
  const {indexPhoto} = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  // const {error: errorToken} = useSelector((state) => state.authAPI);
  // const pictures = useSelector((state) => state.photoAPI.pictures);
  const errorToken = useSelector(getErrorSelector);
  const pictures = useSelector(getPicturesSelector);

  const onShare = async ({cropp, full}) => {
    try {
      await Share.share({
        message: `cropp ${cropp} full ${full}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <DetailsItem
          picture={item}
          indexPhoto={index}
          safeArea={insets}
          onShare={onShare}
        />
      );
    },
    [pictures],
  );

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length) {
      dispatch(getPhotoDetailsThunk(viewableItems?.[0]?.item.id));
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        onEndReachedThreshold={1}
        removeClippedSubviews
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        data={pictures}
        initialScrollIndex={indexPhoto}
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        pagingEnabled
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        snapToInterval={width}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndThreshold={2}
      />
      {!!errorToken && <ErrorBlock errorMessage={errorToken} />}
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
