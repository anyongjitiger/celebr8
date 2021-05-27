import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Icon,
  Button,
  StatusBar,
  Svg,
  Pressable,
} from '@components';
import HomeHeader from './home-header';

const CreateStart: React.FC<any> = ({ navigation, ...restProps }) => {
  const IconView = (icon, type, text) => (
    <Pressable
      onPress={() => {
        console.log(text);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {type === 'svg' ? (
          <View style={styles.iconContainer}>{icon}</View>
        ) : (
          icon
        )}
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
  return (
    <View style={{ backgroundColor: '#E2EAEC' }}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader />
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={{ height: '35%', backgroundColor: 'transparent' }} />
      </Pressable>
      <View style={styles.container}>
        <View
          style={[
            styles.rowCenter,
            { paddingTop: 40, justifyContent: 'space-around' },
          ]}>
          {IconView(
            <Icon
              name="birthday-cake"
              type="font-awesome"
              color="#F1C40F"
              size={44}
              containerStyle={styles.iconContainer}
            />,
            'icon',
            'Birthday',
          )}
          {IconView(
            <Icon
              name="users"
              type="font-awesome-5"
              color="#208FDA"
              size={44}
              containerStyle={styles.iconContainer}
            />,
            'icon',
            'Meeting',
          )}
          {IconView(
            <Icon
              name="glass-cheers"
              type="font-awesome-5"
              color="#E77E23"
              size={44}
              containerStyle={styles.iconContainer}
            />,
            'icon',
            'Party',
          )}
        </View>
        <View
          style={[
            styles.rowCenter,
            { paddingTop: 40, justifyContent: 'space-around' },
          ]}>
          {IconView(
            <Icon
              name="island"
              type="fontisto"
              color="#2CCB6F"
              size={44}
              containerStyle={styles.iconContainer}
            />,
            'icon',
            'Trip',
          )}
          {IconView(
            <Svg icon="wedding-rings" size="44" color="#E84C3D" />,
            'svg',
            'Wedding',
          )}
          {IconView(
            <Icon
              name="border-all"
              type="font-awesome-5"
              color="#9955B3"
              size={44}
              containerStyle={styles.iconContainer}
            />,
            'icon',
            'Other',
          )}
        </View>
      </View>
      <Button
        containerStyle={{
          position: 'absolute',
          bottom: '10%',
          left: 0,
          right: 0,
          borderRadius: 8,
          marginHorizontal: '25%',
          paddingVertical: 0,
        }}
        buttonStyle={{ paddingHorizontal: 0 }}
        title="+ Create a New Share"
        onPress={() => {
          navigation.navigate('CreateActivity');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '60%',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#EAECEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateStart;
