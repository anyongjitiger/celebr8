// Reactn documentation: https://github.com/CharlesStover/reactn#table-of-contents
import addReactNDevTools from 'reactn-devtools'
import init from 'reactn-persist'
import { AsyncStorage } from '@helpers'
// import './reducers'

export {
  getGlobal, // const token = getGlobal().auth.token
  resetGlobal, // resetGlobal()
  setGlobal, // setGlobal({ value: 3 })
  addCallback, // const callback = global => null; addCallback(callback)
  removeCallback, // removeCallback()
  useGlobal, // const [count, setCount] = useGlobal('count')
  useDispatch, // const add = useDispatch((count, n) => count + n, 'count'); add(9);
  getDispatch, // getDispatch().reducerName('hello');
  withInit, // withInit(INITIAL_STATE, INITIAL_REDUCERS)(AppComponent)
  /*
    withGlobal(
      global => ({
        value: global.value
      }),
      setGlobal => ({
        incrementValue: () => {
          setGlobal(global => ({ value: global.value + 1 }));
        }
      })
    )(MyComponent);
  */
  withGlobal,
} from 'reactn'

const globalInitialValue = {
  // persistant
  'token': undefined,
  'user': undefined,
}

const whitelist = ['token', 'user']

init({
  storage: AsyncStorage,
  whitelist,
  initialValue: globalInitialValue,
})

// Enable devtools.
addReactNDevTools()

export { globalInitialValue };
