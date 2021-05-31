import React from 'react';
import { RNPickerSelect, Icon } from '@components';
import { themes } from '@themes';
import { useTheme } from '@hooks';

const Select: React.FC<any> = ({
  style,
  showIcon = true,
  items,
  onValueChange = () => {},
  ...props
}) => {
  const [theme] = useTheme(themes);

  return (
    <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      placeholder={{}}
      onValueChange={onValueChange}
      style={{
        ...theme,
        ...style,
      }}
      items={items}
      Icon={() => {
        if (showIcon) {
          return (
            <Icon type="fontisto" name="clock" color={'#8492A5'} size={22} />
          );
        }
      }}
      {...props}
    />
  );
};

export default Select;
