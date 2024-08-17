import { Bot } from 'grammy';

export class TelegramBotProvider {
  private bot: Bot;

  constructor(private readonly botToken: string) {
    console.log('Creating bot');
    this.createBot();
  }

  private createBot(): void {
    this.bot = new Bot(this.botToken);
  }

  public getBot(): Bot {
    return this.bot;
  }
}
