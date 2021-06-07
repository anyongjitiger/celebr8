import Storage from '@aws-amplify/storage'
import dev_config from './dev'
import prod_config from './prod';

const default_config = Object.freeze({
  // FORM_ERROR,
  APP_NAME: 'celebr8',
  API_URL: 'https://vshrmu5xxg.execute-api.us-east-1.amazonaws.com/prod',
  IMG_URL: 'https://cel-life-file.s3.us-east-2.amazonaws.com/',
  // API_URL_PROD: 'https://_',
  API_REQUEST_TIMEOUT: 25e3,
  SENTRY_DSN: 'https://364d916c2a82497ea4278ea5758f90d5@o486434.ingest.sentry.io/5543663',
  US_PHONE_MASK: `+00000000000000`,
  US_PHONE_PLACEHOLDER: '99) 123-4567',
  US_DIRTY_PHONE_LENGTH: 13,
  US_CLEAN_PHONE_LENGTH: 13,
  PUBNUB_SUBSCRIBE_KEY: 'sub-c-7192d740-1465-11eb-9b79-2636081330fc',
  PUBNUB_PUBLISH_KEY: 'pub-c-abfd547a-6e6b-4c38-8509-e3c8b2d90ef9',
  CHAT_PAGINATION_STEP: 25,
  LISTS_PAGINATION_STEP: 20,
  MEMORIES_MAX_COUNT_IN_CAROUSEL: 5,
  MAX_MEDIA_COUNT_FOR_UPLOAD: 10,
  MIN_MEDIA_COUNT_FOR_UPLOAD: 1,
  VALID_EXTENSIONS: {
    PHOTO: ['.jpeg', '.jpg', '.png'],
    VIDEO: ['.mp4', '.mov'],
  },
  // in Mb
  MAX_MEDIA_SIZE: {
    PHOTO: 12,
    VIDEO: 40,
  },
  // in sec
  MAX_VIDEO_DURATION: 15,
  AMPLIFY: {
    s3: {
      REGION: 'us-east-1',
      BUCKET: 'prod-celebr8-attachments-bucket',
      TEMP_BUCKET: 'prod-temporary-files-celebr8-attachments-bucket',
      BUCKET_WITH_AUDIO: 'prod-media-celebr8-attachments-bucket',
    },
    apiGateway: {
      REGION: 'us-east-1',
      URL: 'https://vshrmu5xxg.execute-api.us-east-1.amazonaws.com/prod',
    },
    cognito: {
      REGION: 'us-east-1',
      USER_POOL_ID: 'us-east-1_x3CQbchI3',
      APP_CLIENT_ID: '576g5r80s6uo61ps3bltrgq09j',
      IDENTITY_POOL_ID: 'us-east-1:79be8580-5196-47ef-9575-9ab877f67063',
    },
  },
  ENVIRONMENT: 'prod',
  AMPLIFY_STORAGE: {
    AWSS3: {
      REGION: 'us-east-1',
      BUCKET: 'prod-celebr8-attachments-bucket',
    }
  }
});


const config = __DEV__ ? { ...default_config, ...dev_config } : { ...default_config, ...prod_config };
Storage.configure(config.AMPLIFY_STORAGE);
export default Object.freeze(config);
