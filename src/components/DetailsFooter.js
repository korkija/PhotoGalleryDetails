import * as React from 'react';
import {TouchableOpacity, Image, View, StyleSheet, Text} from 'react-native';
import shareImage from '../../assets/images/ShareThis.png';

const DetailsFooterM = ({shareCallback, details, paddingBottom}) => {
  return (
    <View style={[styles.container, {marginBottom: paddingBottom}]}>
      {!!details && (
        <View style={styles.detailViewText}>
          <Text style={styles.text}>{details.author}</Text>
          <Text style={styles.text}>{details.camera}</Text>
        </View>
      )}
      <View style={styles.detailView}>
        <TouchableOpacity style={styles.touchableBlock} onPress={shareCallback}>
          <Image
            style={styles.detailViewImage}
            resizeMode="cover"
            source={shareImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const DetailsFooter = React.memo(DetailsFooterM);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 10,
    bottom: 30,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  detailView: {
    alignItems: 'flex-end',
    flex: 1,
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
  detailViewText: {},
});
