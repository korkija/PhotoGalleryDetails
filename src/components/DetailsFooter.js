import * as React from 'react';
import {TouchableOpacity, Image, View, StyleSheet, Text} from 'react-native';
import shareImage from '../../assets/images/ShareThis.png';

const DetailsFooterM = ({shareCallback, details}) => {
  return (
    <>
      <View style={styles.detailView}>
        <TouchableOpacity style={styles.touchableBlock} onPress={shareCallback}>
          <Image
            style={styles.detailViewImage}
            resizeMode="cover"
            source={shareImage}
          />
        </TouchableOpacity>
      </View>
      {!!details && (
        <View style={styles.detailViewText}>
          <Text style={styles.text}>{details.author}</Text>
          <Text style={styles.text}>{details.camera}</Text>
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
  touchableBlock: {
    alignSelf: 'flex-end',
  },
  text: {
    color: '#fff',
  },
  detailViewText: {position: 'absolute', bottom: 50, left: 30},
});
