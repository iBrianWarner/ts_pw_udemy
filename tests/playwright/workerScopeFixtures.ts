import { Logger } from '@/common/Logger';
import { test as base } from '@playwright/test';

export const test = base.extend<
  {
    infoTestLog: string;
  },
  {
    logger: Logger;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger();

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/playwright');
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { auto: true },
  ],
});
