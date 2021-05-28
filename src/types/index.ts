export type {
  TextInput,
  ViewStyle,
  ImageProps,
  FlatListProps,
  TextStyle,
  ImageStyle,
  ViewProps,
  TextProps,
  GestureResponderHandlers,
  PanResponderInstance,
  ViewToken,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from 'react-native'
export type { ReactNode, Dispatch, SetStateAction } from 'react'
export type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
export type { Contact } from 'react-native-contacts';
export type { default as TContact } from './contact';
export type { UnderlayParams } from 'react-native-swipeable-item';
export type { Image, ImageOrVideo, ImageCropPicker } from "react-native-image-crop-picker";
export type { QueryParams } from '../services/db_fetch';

export type TFile = {
  id: number,
  user_id: number;
  expe_id: number;
  file_name: string;
  file_path: string;
  uploda_date: number;
}

export type TExperience = {
  

}

export type Tparticipant = {

}

export type TExpeType = {

}

export type TexpeTypeMusic = {

}


export type { default as TUser } from './user'
