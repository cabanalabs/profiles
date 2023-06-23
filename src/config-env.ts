
export class ConfigEnv {

  private map = new Map<string, any>();

  PROFILE_SERVER: string;
  MINT_SERVER: string;
  JWT_SECRET: string;
  TENANT: string;

  constructor() {
    this.PROFILE_SERVER = process.env.PROFILE_SERVER;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.TENANT = process.env.TENANT;
  }

  // apply(config: any) {
  //
  //   if (typeof config !== 'object') {
  //     throw new Error('Invalid config object');
  //   }
  //
  //   Object.keys(config).forEach((key) => {
  //     if (this.hasOwnProperty(key)) {
  //       this[key] = config[key];
  //     }
  //   });
  // }

  get(name: string) {
    return this.map.get(name);
  }

  set(map: { [key: string]: any }) {
    Object.keys(map).forEach((key) => {
      if (this.hasOwnProperty(key)) {
        this[key] = map[key];
      }
      else {
        this.map.set(key, map[key]);}
      }
    )
  }

  getSessionProperty(name: string) {
    const session = this.map.get('jwtPayload') || {};
    return session[name];
  }

  setSessionProperty(name: string, value: any) {
    const session = this.map.get('jwtPayload') || {};
    session[name] = value;
    this.map.set('jwtPayload', session);
  }
}

export const configEnv = new ConfigEnv();