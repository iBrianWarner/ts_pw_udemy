import { LogLevel } from '@/common/typedefs/logsLevels.typedefs';

export class Logger {
  private levels: LogLevel[];

  private currentLevel: LogLevel;

  constructor(level = LogLevel.INFO) {
    this.levels = [
      LogLevel.ERROR,
      LogLevel.WARN,
      LogLevel.INFO,
      LogLevel.DEBUG,
    ];
    this.currentLevel = level;
  }

  shouldLog(level: LogLevel): boolean {
    return this.levels.indexOf(level) >= this.levels.indexOf(this.currentLevel);
  }

  log(level: LogLevel, message: string): void {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();

      console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
    }
  }

  debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }

  info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  warn(message: string): void {
    this.log(LogLevel.WARN, message);
  }

  error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }
}
