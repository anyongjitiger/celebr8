import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import i18n from "@i18n";
import { Contact, TContact } from "@types";

const requestReadPermission = () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: i18n.t('Contacts'),
      message: i18n.t('This app would like to view your contacts.'),
      buttonPositive: i18n.t('Please accept bare mortal'),
    })
    .then(permissionAnswer => {
      if (permissionAnswer === 'denied') {
        return;
      }
      return Contacts.getAll();
    });
  }
  return Contacts.getAll();
}
const getAllContacts = () =>
  requestReadPermission()
    .then(contacts => {
      const mappedContacts: TContact[] =
        contacts
          ?.filter(
            ({ phoneNumbers, givenName, familyName }: Contact) =>
              phoneNumbers[0]?.number && (givenName || familyName),
          )
          ?.map(
            ({
              givenName,
              familyName,
              recordID,
              emailAddresses,
              phoneNumbers,
              thumbnailPath,
            }: Contact) => {
              return {
                name:
                  givenName && familyName
                    ? `${givenName} ${familyName}`
                    : `${givenName || familyName}`,
                id: recordID,
                email: emailAddresses[0]?.email,
                phoneNumber: phoneNumbers[0].number,
                picture: thumbnailPath,
              };
            },
          ) || [];
      return Promise.resolve(mappedContacts);
    })
  ;

export default getAllContacts;
