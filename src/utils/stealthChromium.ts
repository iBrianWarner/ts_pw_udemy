/* eslint-disable @typescript-eslint/no-empty-object-type */
import { BrowserType } from 'playwright';
import { chromium, PlaywrightExtraClass } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

chromium.use(stealthPlugin());

export const getStealthChromium = (): PlaywrightExtraClass & BrowserType<{}> =>
  chromium;
