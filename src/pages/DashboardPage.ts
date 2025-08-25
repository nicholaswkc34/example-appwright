import { Device, expect } from 'appwright';
import { MobileBasePage } from '../pages/base/MobileBasePage';
import { NambarOption } from '../types/InterfacesYEnums';

/**
 * Página de Login para Appwright (móvil)
 */
export class DashboardPage extends MobileBasePage {
    // Mensajes y constantes
    private static readonly MSG_INVALID_USERNAME = 'Your username is invalid!';
    private static readonly MSG_SUCCESS_TITLE = 'Logged In Successfully';

    constructor(device: Device) {
        super(device);
    }

    /** Realiza el login con usuario y contraseña, identificados por label o id */

    public async navbarOptions(nambarOption: NambarOption): Promise<void> {
        switch (nambarOption) {
            case NambarOption.Perfil:
                const perfilNavbar = await this.getFirstVisibleLocator([
                    { type: 'id', value: 'com.olvati.optitrack2022:id/navigation_perfil' },
                    { type: 'xpath', value: '//android.widget.FrameLayout[@content-desc="Perfil"]', options: { exact: false } }
                ]);
                await perfilNavbar.tap();

                break;
            case NambarOption.Home:
                console.log(`Otros valores`);
                break;
            case NambarOption.About:
                console.log(`Otros valores`);

                break;
            case NambarOption.Contact:
                console.log(`Otros valores`);

                break;
        }
    }

    public async validateGreetingMessage(): Promise<void> {
        await this.assertVisible('text', 'Hola', { exact: false }, 'El mensaje de saludo no está visible');
    }

    /** Verifica estado exitoso del login */
    public async validateSuccessfulLogin(): Promise<void> {
        const successTextElement = this.locator('text', DashboardPage.MSG_SUCCESS_TITLE, { exact: false });
        await expect(successTextElement).toBeVisible();
        const actual = await successTextElement.getText();
        expect(actual).toContain(DashboardPage.MSG_SUCCESS_TITLE);
    }

    /** Verifica error por usuario inválido */
    public async validateFailedLogin(): Promise<void> {
        const errorTextElement = this.locator('text', DashboardPage.MSG_INVALID_USERNAME, { exact: false });
        await expect(errorTextElement).toBeVisible();
        const actual = await errorTextElement.getText();
        expect(actual).toContain(DashboardPage.MSG_INVALID_USERNAME);
    }
}
