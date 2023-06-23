import {AuthService} from "./services/auth-service";
import {configEnv} from "./config-env";
import {ProfileService} from "./services/profile-service";
import {BadgeService} from "./services/badge-service";
import {MintService} from "./services/mint-service";

export * from './types';

export const cabana = {
  config: configEnv,
  auth: new AuthService(),
  badges: new BadgeService(),
  profile: new ProfileService(),
  mint: new MintService()
};