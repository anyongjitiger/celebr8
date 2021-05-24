import React from 'react';
import {View, Text, StyleSheet, Card, Avatar} from '@components';
const NotificationItem: React.FC<any> = ({navigation, ...restProps}) => {
  const {sender, link, title, content} = restProps.message;
  return (
    <>
      <Card containerStyle={styles.card}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.highlight}>{title}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, paddingRight: 2}}>
            <Avatar rounded size={25} source={{uri: sender.img}} />
            <Text style={{marginLeft: 10}}>
              <Text style={{fontWeight: '700'}}>{sender.name}</Text> {content}
            </Text>
          </View>
        </View>
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    // marginTop: 8,
    borderRadius: 4,
  },
  highlight: {
    fontWeight: '700',
    color: '#39817E',
    fontSize: 14,
    padding: 5,
  },
  lightFont: {
    fontWeight: '300',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NotificationItem;
