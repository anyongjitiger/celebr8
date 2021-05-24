export default Object.freeze({
  // FORM_ERROR,
  APP_NAME: 'celebr8life',
  API_URL: 'https://vshrmu5xxg.execute-api.us-east-1.amazonaws.com/prod',
  // API_URL_PROD: 'https://_',
  SENTRY_DSN: 'https://364d916c2a82497ea4278ea5758f90d5@o486434.ingest.sentry.io/5543663',
  PUBNUB_SUBSCRIBE_KEY: 'sub-c-7192d740-1465-11eb-9b79-2636081330fc',
  PUBNUB_PUBLISH_KEY: 'pub-c-abfd547a-6e6b-4c38-8509-e3c8b2d90ef9',
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
})
