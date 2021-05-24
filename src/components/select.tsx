import React from 'react';
import {RNPickerSelect, Icon} from '@components';
import {themes} from '@themes';
import {useTheme} from '@hooks';

const Select: React.FC<any> = ({
  style,
  showIcon = true,
  onValueChange = () => {},
  ...props
}) => {
  const [theme] = useTheme(themes);

  return (
    <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      onValueChange={onValueChange}
      style={{
        ...theme,
        iconContainer: {
          top: 10,
          right: 12,
        },
        ...style,
      }}
      items={[
        {label: 'Football', value: 'football'},
        {label: 'Baseball', value: 'baseball'},
        {label: 'Hockey', value: 'hockey'},
      ]}
      Icon={() => {
        if (showIcon)
          return (
            <Icon
              type="ionicon"
              name="chevron-down"
              containerStyle={{backgroundColor: '#0000000'}}
              size={24}
            />
          );
      }}
      {...props}
    />
  );
};

export default Select;
