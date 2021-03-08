import * as React from 'react';
import {TouchableOpacity, Image, View, StyleSheet, Text} from 'react-native';
import shareImage from '../../assets/images/ShareThis.png';

const DetailsFooterM = ({pictureUrls, shareCallback, details}) => {
  if (!pictureUrls) return null;
  return (
    <>
      <View style={styles.detailView}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={shareCallback}>
          <Image
            style={styles.detailViewImage}
            resizeMode="cover"
            source={shareImage}
          />
        </TouchableOpacity>
      </View>
      {!!details && (
        <View style={{position: 'absolute', bottom: 50, left: 30}}>
          <Text style={{color: '#fff'}}>{details.author}</Text>
          <Text style={{color: '#fff'}}>{details.camera}</Text>
        </View>
      )}
    </>
  );
};

export const DetailsFooter = React.memo(DetailsFooterM);

const styles = StyleSheet.create({
  detailView: {
    position: 'absolute',
    bottom: 30,
    width: 60,
    right: 20,
    flexDirection: 'row',
  },
  detailViewImage: {
    width: 50,
    height: 50,
  },
});
