import { showMessage, hideMessage, MessageOptions } from "react-native-flash-message";

function show(option: MessageOptions) {
  return showMessage({
    floating: true,
    type: 'success',
    icon: 'auto',
    style: { borderRadius: 4 }, ...option
  })
}

export default { show, hide: hideMessage };
