

// https://reactjs.org/docs/hooks-reference.html
export {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
} from 'react'

// https://reactnative.dev/docs/usecolorscheme
export { useColorScheme, useWindowDimensions  } from 'react-native'

export { useTheme } from "react-native-themed-styles"

// https://react.i18next.com/latest/usetranslation-hook
export { useTranslation } from 'react-i18next' // const { t, i18n } = useTranslation();]

// https://github.com/react-navigation/react-navigation-hooks#docs
export {
  useNavigation, // const { navigate, push, goBack } = useNavigation();
  useRoute, // const { params } = useRoute();
  useFocusEffect, // useFocusEffect(() => null);
  useIsFocused, // const isFocused = useIsFocused();
} from '@react-navigation/core'

// https://github.com/CharlesStover/reactn#useglobalkeyof-state
export {
  useGlobal, // const [ myNumber, setMyNumber ] = useGlobal('myNumber')
  useDispatch, // const add = useDispatch((count, n) => count + n, 'count'); add(9)
} from 'reactn'

export {
  useScrollToTop, // useScrollToTop(scrollViewRef);
} from '@react-navigation/native'


export {
  useSafeAreaInsets, // const { top, right, bottom, left } = useSafeAreaInsets()
} from 'react-native-safe-area-context'

// https://github.com/DmitriyNikolenko/react-axios-helpers#usage
/*
const { data, error, fetching, fetched, fetch, cancel, canceled } = useRequest({
    request: delay => ({
      method: 'put',
      url: `https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=${delay}ms`
    }),
    onRequest: (params) => null,
    onSuccess: (data, params) => null,
  onError: (error, params) => null,
  cancelOnUnmount: false, // default true
  }, [delay])
*/
// export { useRequest } from 'react-axios-helpers'
export { default as FastImage } from 'react-native-fast-image'
