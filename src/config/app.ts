export const APP_CONFIG = {
  loadComplete: false, // Set to false to load only one polygon per municipality
  batchSize: 50, // Number of records to fetch per batch
  retryAttempts: 3, // Number of retry attempts for failed requests
  retryDelay: 500, // Base delay in milliseconds for retry attempts
  initialLoad: false, // Controls whether to load polygons on initial app load
} as const;