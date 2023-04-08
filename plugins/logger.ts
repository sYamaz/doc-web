export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export interface ILogger{
  debug(...obj: any[]): void
  info(...obj: any[]): void
  warn(...obj: any[]): void
  error(...obj: any[]): void
  fatal(...obj: any[]): void
  /** logLevelの変更 */
  setLevel(level: LogLevel):void
  /** 現在のlogLevelの取得 */
  getLevel(): LogLevel
}

abstract class BasicLogger implements ILogger{
  private level:LogLevel = 'info'
  private whiteList:Set<LogLevel> = new Set<LogLevel>(['info', 'warn', 'error', 'fatal'])
  
  constructor(level:LogLevel = 'info') {
    this.setLevel(level)
  }

  getLevel(): LogLevel {
    return this.level
  }

  setLevel(level: LogLevel): void {
    this.level = level
    switch (this.level){
      case 'debug':
        this.whiteList = new Set<LogLevel>(['debug', 'info', 'warn', 'error', 'fatal'])
        return
      case 'info':
        this.whiteList = new Set<LogLevel>(['info', 'warn', 'error', 'fatal'])
        return
      case 'warn':
        this.whiteList = new Set<LogLevel>(['warn', 'error', 'fatal'])
        return
      case 'error':
        this.whiteList = new Set<LogLevel>(['error', 'fatal'])
        return
      case 'fatal':
        this.whiteList = new Set<LogLevel>(['fatal'])
        return
    }
  }

  debug(...obj: any[]): void {
    if (this.whiteList.has('debug')){
      this.log('debug', obj)
    }
  }
  info(...obj: any[]): void {
    if (this.whiteList.has('info')){
      this.log('info', obj)
    }
  }
  warn(...obj: any[]): void {
    if (this.whiteList.has('warn')){
      this.log('warn', obj)
    }
  }
  error(...obj: any[]): void {
    if (this.whiteList.has('error')){
      this.log('error', obj)
    }
  }
  fatal(...obj: any[]): void {
    if (this.whiteList.has('fatal')){
      this.log('fatal', obj)
    }
  }

  abstract log(logLevel: LogLevel, ...obj:any[]): void
}

export class ConsoleLogger extends BasicLogger{
  constructor(logLevel: LogLevel) {
    super(logLevel)
  }

  log(logLevel: LogLevel, ...obj: any[]): void {
    switch(logLevel){
      case "fatal":
        console.error(logLevel, obj)
        return
      case "error":
        console.error(logLevel, obj)
        return
      case "warn":
        console.warn(logLevel, obj)
        return
      default:
        console.log(logLevel, obj)
        return
    }
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const logger: ILogger = new ConsoleLogger('debug')
  return {
    provide: {
      logger: logger
    }
  }
})