enum RENEW_AUTH_DATA_STATUS {
  SUCCESS = 'success',
  FAILED = 'failed',
}

enum EVENT_TYPES {
  RENEW_AUTH_DATA = 'RENEW_AUTH_DATA',
  CHANNEL_MESSAGE = 'CHANNEL_MESSAGE',
  DIRECT_MESSAGE = 'DIRECT_MESSAGE',
}

export { RENEW_AUTH_DATA_STATUS, EVENT_TYPES };
