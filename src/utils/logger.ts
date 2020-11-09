import { Category } from 'typescript-logging'

export class Logger {
  private static instance: Logger
  public categoryLogger: Category

  private constructor() {
    this.categoryLogger = new Category('category')
  }

  public static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger()
    }

    return this.instance
  }
}
