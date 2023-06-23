import {AuthService} from "./auth-service";
import {configEnv} from "../config-env";

describe('auth-service', () => {

  const authService = new AuthService();

  // configEnv.set({
  //   TENANT: '1234'
  // })

  it('should check registration', async () => {
    const reg = await authService.session({ id: '1234', name: 'Test', platform: 'discord'});
    console.log(reg);
    expect(reg).toBeDefined();
  })
})