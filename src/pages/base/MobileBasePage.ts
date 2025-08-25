import { Device, expect } from 'appwright';

export abstract class MobileBasePage {
  protected readonly device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  protected locator(
    type: 'text' | 'id' | 'xpath',
    value: string,
    options?: { exact?: boolean }
  ) {
    switch (type) {
      case 'text':
        return this.device.getByText(value, options);
      case 'id':
        return this.device.getById(value, options);
      case 'xpath':
        return this.device.getByXpath(value);
      default:
        throw new Error(`Locator type '${type}' not supported`);
    }
  }

  public async tap(
    type: 'text' | 'id' | 'xpath',
    value: string,
    options?: { exact?: boolean }
  ): Promise<void> {
    await this.locator(type, value, options).tap();
  }

  public async fill(
    type: 'text' | 'id' | 'xpath',
    value: string,
    input: string,
    options?: { exact?: boolean }
  ): Promise<void> {
    await this.locator(type, value, options).fill(input);
  }

  public async getText(
    type: 'text' | 'id' | 'xpath',
    value: string,
    options?: { exact?: boolean }
  ): Promise<string> {
    return (await this.locator(type, value, options).getText()) ?? '';
  }

  public async assertTextContains(
    type: 'text' | 'id' | 'xpath',
    value: string,
    expected: string,
    options?: { exact?: boolean },
    message?: string
  ): Promise<void> {
    const el = this.locator(type, value, options);
    const actualText = await el.getText();
    expect(actualText, message).toContain(expected);
  }

  public async assertVisible(
    type: 'text' | 'id' | 'xpath',
    value: string,
    options?: { exact?: boolean },
    message?: string
  ): Promise<void> {
    const el = this.locator(type, value, options);
    await expect(el, message).toBeVisible();
  }

  public async isVisible(
    type: 'text' | 'id' | 'xpath',
    value: string,
    options?: { exact?: boolean }
  ): Promise<boolean> {
    return this.locator(type, value, options).isVisible();
  }

  public async navigateAndValidate(
    clickType: 'text' | 'id' | 'xpath',
    clickValue: string,
    validateType: 'text' | 'id' | 'xpath',
    validateValue: string,
    options?: { exact?: boolean }
  ): Promise<void> {
    await this.tap(clickType, clickValue, options);
    await this.assertVisible(validateType, validateValue, options);
  }

  public async getFirstVisibleLocator(
    candidates: Array<{ type: 'text' | 'id' | 'xpath', value: string, options?: { exact?: boolean } }>
  ) {
    for (const c of candidates) {
      const locator = this.locator(c.type, c.value, c.options);
      try {
        const isVisible = await locator.isVisible();
        if (isVisible) return locator;
      } catch {
        // Si falla, pasa al siguiente
      }
    }

    throw new Error('No se encontró ningún localizador visible con las opciones dadas');
  }
}
