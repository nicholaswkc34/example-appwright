import { Device, expect } from 'appwright';
import { MobileBasePage } from '../pages/base/MobileBasePage';

/**
 * Página de Login para Appwright (móvil)
 */
export class PerfilPage extends MobileBasePage {
    // Mensajes y constantes
    private static readonly TEXT_LOGIN_BUTTON = 'INGRESAR';
    private static readonly TEXT_LOGOUT_BUTTON = 'CERRAR SESION';

    constructor(device: Device) {
        super(device);
    }

    /** Realiza el login con usuario y contraseña, identificados por label o id */
    public async logout(): Promise<void> {

        const logoutButton = await this.getFirstVisibleLocator([
            { type: 'text', value: 'CERRAR SESION', options: { exact: false } },
            { type: 'id', value: 'logout' }
        ]);

        await logoutButton.tap();
    }

    /** Verifica estado exitoso del login */
    public async validateSuccessfulLogout(): Promise<void> {
        const successTextElement = this.locator('text', PerfilPage.TEXT_LOGIN_BUTTON, { exact: false });
        await expect(successTextElement).toBeVisible();
    }

    /** Verifica error por usuario inválido */
    public async validateFailedLogout(): Promise<void> {
        const errorTextElement = this.locator('text', PerfilPage.TEXT_LOGOUT_BUTTON, { exact: false });
        await expect(errorTextElement).toBeVisible();
        const actual = await errorTextElement.getText();
        expect(actual).toContain(PerfilPage.TEXT_LOGOUT_BUTTON);
    }
}
