import React from 'react';
// export { default as DateTimePicker } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { themes, useTheme } from '@themes';
import { Input, Icon, Platform, TouchableHighlight } from '@components';
import { useState } from '@hooks';

const DatePicker: React.FC<TProp> = ({ dateConfig, ...Props }) => {
  const [date, setDate] = useState(Props.date || new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  console.log('Props', Props);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    Props.onChangeText(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#ffffff"
      onPress={showDatepicker}>
      <>
        <Input
          leftIcon={
            <Icon type="material-community" name="calendar" color="gray" />
          }
          editable={false}
          value={date.toLocaleDateString()}></Input>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            {...dateConfig}
          />
        )}
      </>
    </TouchableHighlight>
  );
};

export default DatePicker;

type TProp = {
  dateConfig?: {};
  onChangeText(date: Date);
  date: Date;
};
