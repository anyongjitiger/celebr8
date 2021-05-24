import * as React from 'react';
import {getAllContacts} from '@services';
import {TContact} from '@types';

import {useTranslation, useTheme, useState, useEffect} from '@hooks';

import {
  View,
  ListItem,
  Avatar,
  CheckBox,
  Header,
  SearchBar,
  Button,
  NameAvatar,
  Icon,
} from '@components';

import {themes} from '@themes';

const filterUsersBySearch = (searchValue: string) => (
  user: TContact,
): boolean => {
  const searchByValue = user.name ? user.name : `${user.phoneNumber}`;
  return searchValue
    ? searchByValue.toLowerCase().includes(searchValue.trim().toLowerCase())
    : true;
};

const AddContact: React.FC<any> = ({route, navigation}) => {
  const [theme] = useTheme(themes);
  const {t} = useTranslation();
  const [allContacts, setContacts] = useState<TContact[]>([]);
  const [selectList, setSelect] = useState<TContact[]>([]);
  const [searchValue, setSearch] = useState('');

  const onSelected = (item: TContact) => {
    const i = selectList.findIndex((c: TContact) => {
      return c.id === item.id;
    });
    if (i > -1) {
      selectList.splice(i, 1);
    } else {
      selectList.push(item);
    }
    setSelect([...selectList]);
    // console.log('onSelected selectList', selectList);
  };
  function done() {
    const {screen} = route.params;
    navigation.navigate({
      name: screen,
      params: {contacts: selectList},
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

  return (
    <View style={theme.container}>
      <Header
        backgroundColor="white"
        leftComponent={
          <Icon
            // size={25}
            name="arrowleft"
            type="antdesign"
            color="#D3DCE6"
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
            // fontSize: 16,
            // lineHeight: 24,
          },
        }}
        rightComponent={{
          style: {
            color: '#212934',
            fontWeight: '600',
            // fontSize: 16,
            // lineHeight: 24,
          },
          onPress: done,
          text: 'Add',
        }}
      />
      <SearchBar
        placeholder="Type Here..."
        lightTheme={true}
        inputContainerStyle={{backgroundColor: 'white'}}
        onChangeText={onChangeSearchTxt}
        value={searchValue}
      />
      <>
        {filteredUsers.map((item, i) => (
          <ListItem key={i}>
            <CheckBox
              checked={onChecked(item)}
              onPress={() => {
                onSelected(item);
              }}
              containerStyle={{
                margin: 0,
                padding: 0,
                borderWidth: 0,
                marginHorizontal: 0,
              }}
            />
            {item.picture ? (
              <Avatar
                source={{uri: item.picture}}
                avatarStyle={{margin: 0, padding: 0, borderWidth: 0}}
                rounded
              />
            ) : (
              <NameAvatar name={item.name} color={'#D3DCE6'} />
            )}
            <ListItem.Content
              style={{margin: 0, padding: 0, borderWidth: 0}}
              onPress={() => {
                onSelected(item);
              }}>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </>
    </View>
  );
};

export default AddContact;
