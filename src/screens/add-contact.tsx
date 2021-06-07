import * as React from 'react';
import { getAllContacts } from '@services';
import { TContact } from '@types';

import { useTranslation, useTheme, useState, useEffect } from '@hooks';

import {
  View,
  ListItem,
  Avatar,
  CheckBox,
  Header,
  SearchBar,
  NameAvatar,
  Icon,
  FlatList,
  StatusBar,
  ScrollView,
} from '@components';

import { themes } from '@themes';
import { SafeAreaView } from 'react-native-safe-area-context';

const filterUsersBySearch = (searchValue: string) => (
  user: TContact,
): boolean => {
  const searchByValue = user.name ? user.name : `${user.phoneNumber}`;
  return searchValue
    ? searchByValue.toLowerCase().includes(searchValue.trim().toLowerCase())
    : true;
};

const AddContact: React.FC<any> = ({ route, navigation }) => {
  const [theme] = useTheme(themes);
  const { t } = useTranslation();
  const [allContacts, setContacts] = useState<TContact[]>([]);
  const [selectList, setSelect] = useState<TContact[]>([]);
  const [searchValue, setSearch] = useState('');

  const onSelected = (item: TContact) => {
    console.log(' onSelected...');
    const i = selectList.findIndex((c: TContact) => {
      return c.id === item.id;
    });
    if (i > -1) {
      selectList.splice(i, 1);
    } else {
      selectList.push(item);
    }
    setSelect([...selectList]);
  };

  function done() {
    const { screen } = route.params;
    navigation.navigate({
      name: screen,
      params: { contacts: selectList },
      merge: true,
    });
  }

  const onChecked = (item: TContact) => {
    const checked = selectList.findIndex(c => c.id === item.id) > -1;
    return checked;
  };

  const onChangeSearchTxt = (txt: any): void => {
    setSearch(txt);
  };

  const sortByName = (c1: TContact, c2: TContact) => {
    return c1.name === c2.name ? 0 : c1.name > c2.name ? 1 : -1;
  };

  const filteredUsers = allContacts
    .sort(sortByName)
    .filter(filterUsersBySearch(searchValue));

  useEffect(() => {
    getAllContacts().then(mappedContacts => {
      setContacts([...mappedContacts]);
    });
  }, []);

  useEffect(() => {}, [selectList]);

  const randerItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        containerStyle={{
          paddingHorizontal: 0,
          paddingVertical: 8,
          marginVertical: 0,
        }}>
        <ListItem.CheckBox
          checked={onChecked(item)}
          onPress={() => {
            onSelected(item);
          }}
          containerStyle={{
            borderWidth: 0,
            marginHorizontal: 0,
            marginVertical: 0,
            paddingHorizontal: 0,
          }}
        />
        {item.picture ? (
          <Avatar
            source={{ uri: item.picture }}
            size="medium"
            containerStyle={{ width: 40, height: 40 }}
            rounded
          />
        ) : (
          <NameAvatar
            name={item.name}
            style={{ paddingLeft: 0 }}
            color={'#D3DCE6'}
          />
        )}
        <ListItem.Content
          style={{ paddingHorizontal: 0, marginHorizontal: 0 }}
          onPress={() => {
            onSelected(item);
          }}>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={[theme.container, theme.p0]}>
      <StatusBar barStyle="dark-content" />
      <Header
        backgroundColor="white"
        leftComponent={
          <Icon
            name="arrowleft"
            type="antdesign"
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        centerComponent={{
          text: t('People'),
          style: {
            color: '#212934',
            fontWeight: '700',
            fontSize: 16,
            lineHeight: 24,
          },
        }}
        rightComponent={{
          style: {
            color: '#212934',
            fontWeight: '700',
            fontSize: 16,
            lineHeight: 24,
          },
          onPress: done,
          text: 'Add',
        }}
      />
      <SearchBar
        placeholder="Type Here..."
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: 'white' }}
        onChangeText={onChangeSearchTxt}
        value={searchValue}
      />

      <ScrollView style={theme.container}>
        <>
          {filteredUsers.map((item, index) => (
            <ListItem
              onPress={() => {
                onSelected(item);
              }}
              key={index}
              containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 8,
                marginVertical: 0,
              }}>
              <ListItem.CheckBox
                checked={onChecked(item)}
                containerStyle={{
                  borderWidth: 0,
                  marginHorizontal: 0,
                  marginVertical: 0,
                  paddingHorizontal: 0,
                }}
              />
              {item.picture ? (
                <Avatar
                  source={{ uri: item.picture }}
                  size="medium"
                  containerStyle={{ width: 40, height: 40 }}
                  rounded
                />
              ) : (
                <NameAvatar
                  name={item.name}
                  style={{ paddingLeft: 0 }}
                  color={'#D3DCE6'}
                />
              )}
              <ListItem.Content
                style={{ paddingHorizontal: 0, marginHorizontal: 0 }}
                onPress={() => {
                  onSelected(item);
                }}>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddContact;
