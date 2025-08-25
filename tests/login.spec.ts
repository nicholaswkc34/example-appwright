import { test } from 'appwright';
import { LoginPage } from '../src/pages/LoginPage'; // ajusta la ruta si es diferente
import { DashboardPage } from '../src/pages/DashboardPage';
import { NambarOption } from '../src/types/InterfacesYEnums';
import { PerfilPage } from '../src/pages/PerfilPage';

function sleep(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

test('Login Optitrack - exitoso', async ({ device }) => {
  const loginPage = new LoginPage(device);
  const dashboardPage = new DashboardPage(device);
  const perfilPage = new PerfilPage(device);
  
  await loginPage.login('Jsrios', 'olva24');
  await loginPage.validateSuccessfulLogin();
  await sleep(7);
  await dashboardPage.navbarOptions(NambarOption.Perfil);
  await perfilPage.logout();
  await perfilPage.validateSuccessfulLogout();
});

// test("Login optitrack", async ({
//   device,
// }) => {
//   // Dismiss splash screen
// //   await device.getByText("Skip").tap();

//  // sleep 10mins
// // await sleep(600000);

//   // Enter search term
//   const UserInput = device.getByText("Usuario", { exact: true });
//   await UserInput.tap();
//   await UserInput.fill("Jsrios");

//   const PasswordInput = device.getByText("Password", { exact: true });
//   await PasswordInput.tap();
//   await PasswordInput.fill("olva24");

//   // Open search result and assert
//   await device.getByText("INGRESAR").tap();

// //   await device.getByText("OK").tap();

//   await expect(device.getById("com.olvati.optitrack2022:id/navigation_perfil", { exact: true })).toBeVisible();

//   await sleep(7);

//   const Perfil = device.getById("com.olvati.optitrack2022:id/navigation_perfil", { exact: true });
// //   const Perfil = device.getByXpath(`//android.widget.FrameLayout[@content-desc="Perfil"]`);
//   await Perfil.tap();

//   await device.getByText("CERRAR SESION").tap();

  
//   await device.getByText("CERRAR SESIÓN").tap();
// });

// test("Logout optitrack", async ({
//   device,
// }) => {
//   // Dismiss splash screen
// //   await device.getByText("Skip").tap();

//   // Enter search term
//   const Perfil = device.getByText("Perfil", { exact: true });
//   await Perfil.tap();

//   await device.getByText("CERRAR SESION").tap();

  
//   await device.getByText("CERRAR SESIÓN").tap();

// });