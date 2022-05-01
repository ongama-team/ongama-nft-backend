import 'dotenv/config';
import winston from 'winston';

// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston';

const transports = [new winston.transports.Console()];

if (process.env.NODE_ENV !== 'development') {
  const loggingWinston = new LoggingWinston({
    prefix: process.env.NODE_ENV,
  });
  transports.push(loggingWinston as any);
}

// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
export const logger = winston.createLogger({
  level: 'info',
  transports,
});

export default logger;
