import { registerThemes, useTheme } from 'react-native-themed-styles';
import { useColorScheme } from '../hooks';
import { StyleSheet } from 'react-native';
// React Native Elements The Theme Object
/*
interface theme {
  colors: {
    primary;
    secondary;
    white;
    black;
    grey0;
    grey1;
    grey2;
    grey3;
    grey4;
    grey5;
    greyOutline;
    searchBg;
    success;
    error;
    warning;
    divider;
    platform: {
      ios: {
        primary;
        secondary;
        grey;
        searchBg;
        success;
        error;
        warning;
      };
      android: {
        // Same as ios
      };
      web: {
        // Same as ios
      };
    };
  };
}
 */
/* for test */
const test_shell = StyleSheet.create({
  border: {
    borderRadius: 2,
    paddingHorizontal: 1,
    paddingVertical: 19,
    marginHorizontal: 10,
    backgroundColor: 'gray',
    display: 'flex',
    fontFamily: '',
  },
});

const borderRadius = 4;
const color_text1 = '#212934',
  color_text2 = '#3B4857',
  color_bg = '#FFFFFF',
  color_caption = '#D3DCE6',
  color_icons = '#8492A5';

const light = {
  backgroundColor: color_bg,
  textColor: 'gray',
  borderRadius,
  colors: {
    primary: '#357f7e',
    secondary: color_text2,
    white: '#ffffff',
    black: color_text1,
    // grey0;
    // grey1;
    // grey2;
    grey3: color_caption,
    // grey4;
    // grey5;
    // greyOutline;
    // searchBg;
    // success;
    // error;
    // warning;
    // divider;
  },
  Avatar: {
    overlayContainerStyle: {
      // width: 78, height: 78, borderRadius: 39, backgroundColor: color_icons
    },
  },
  Input: {
    fontSize: 14,
    containerStyle: { paddingHorizontal: 0, margin: 0 },
    inputContainerStyle: {
      height: 44,
      lineHeight: 44,
      borderWidth: 1,
      borderRadius,
      paddingHorizontal: 10,
    },
    labelStyle: {
      color: color_caption,
      lineHeight: 16,
    },
    errorStyle: {
      fontWeight: '600',
      fontSize: 15,
      color: color_caption,
    },
  },
  Button: {
    raised: true,
    paddingVertical: 10,
    buttonStyle: { height: 44, lineHeight: 44 },
  },
  SearchBar: {
    containerStyle: { backgroundColor: 'white', bordeWidth: 0 },
    inputContainerStyle: { borderBottomWidth: 1, overflow: 'visible' },
  },
  Text: {
    color: color_text2,
    h1Style: {
      fontFamily: 'Mulish',
      color: color_text1,
      fontSize: 22,
      fontWeight: '700',
      lineHeight: 28,
    },
    h2Style: {
      fontFamily: 'Mulish',
      color: color_text1,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    h3Style: { fontFamily: 'Mulish', color: color_text1 },
    h4Style: { fontFamily: 'Mulish', color: color_text1 },
    h5Style: { fontFamily: 'Mulish', color: color_text1 },
  },
  Icon: {
    // containerStyle: { backgroundColor: color_icons }
  },
};

const dark = {
  backgroundColor: 'black',
  textColor: 'white',
};

const styleSheetFactory = registerThemes(
  { light, dark: { ...light, ...dark } }, // All themes you want to use.
  () => {
    return useColorScheme() == 'dark' ? 'dark' : 'light';
  }, // A function that returns the name of the default theme.
);

const themes = styleSheetFactory(theme => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
    padding: 16,
    height: '100%',
  },
  p1: {
    padding: 16,
  },
  text: {
    color: theme.textColor,
  },
  view: {
    backgroundColor: theme.backgroundColor,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    color: color_caption,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRadius: { borderRadius },
  bg: {
    backgroundColor: theme.backgroundColor,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: theme.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: '',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey3,
    borderRadius: 4,
    color: 'gray',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey3,
    borderRadius: 4,
    color: 'gray',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
}));

export { themes, styleSheetFactory, useTheme, light, dark };
