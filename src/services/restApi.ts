import {sign as jwtSign} from 'jsonwebtoken'
import {configEnv} from "../config-env";
import * as crypto from "crypto";

export class RestApi {
  private readonly server: 'mint' | 'profile';

  constructor(server: 'mint' | 'profile') {
    this.server = server;
  }

  $post<T> (url: string, data?: any, options?: RestApiOptions, queryParams?: object): Promise<T> {
    return this.httpRequest(url, 'POST', data, options, queryParams);
  }

  $get<T> (url: string, queryParams?: object, options?: RestApiOptions): Promise<T> {
    return this.httpRequest(url, 'GET', null, options, queryParams);
  }

  $put<T> (url: string, data?: any, options?: RestApiOptions, queryParams?: object): Promise<T> {
    return this.httpRequest(url, 'PUT', data, options, queryParams);
  }

  $delete<T> (url: string, data?: any, options?: RestApiOptions, queryParams?: object): Promise<T> {
    return this.httpRequest(url, 'DELETE', data, options, queryParams);
  }

  private async httpRequest(path: string, method: string, body: any, options: RestApiOptions, queryParams: any) {

    if (!configEnv.JWT_SECRET) throw new Error('Config.JWT_SECRET must be set');
    if (this.server === 'profile' && !configEnv.PROFILE_SERVER) throw new Error('Config.PROFILE_SERVER must be set');
    if (this.server === 'mint' && !configEnv.MINT_SERVER) throw new Error('Config.MINT_SERVER must be set');

    const jti = crypto.randomBytes(24).toString('base64');
    let jwtPayload = configEnv.get('jwtPayload') || {};

    jwtPayload = { ...jwtPayload, jti };

    if (options && options.jwt) Object.assign(jwtPayload, options.jwt);

    const token = jwtSign(jwtPayload, configEnv.JWT_SECRET, { expiresIn: '1h' });
    const baseUrl = this.server === 'profile' ? configEnv.PROFILE_SERVER : configEnv.MINT_SERVER;

    if (path.charAt(0) === '/')  path = path.substring(1);

    let url = `${baseUrl}/${this.server}/${path}`;

    const paramStr = queryParams && this.serializeParams(queryParams);

    if (paramStr) {
      url += `?${paramStr}`;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    console.log('postApi', url, jwtPayload, JSON.stringify(body,null,2), token);

    let result = await fetch(url, {method, headers, body: body && JSON.stringify(body)});

    if (!result.ok) {
      const error = await result.text();
      console.log('postApi.error', result.status, result.statusText);
      throw new Error(`RestApi ${path} FAILED\n ${error}`);
    }

    console.log(result.headers.get('Content-Type'));

    if (result.headers.get('Content-Type').includes('application/json')) return result.json();

    return result.text();
  }

  private serializeParams(obj: any) {
    if (obj) {
      const keyMap = Object.keys(obj).map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
      });

      return keyMap.join('&');
    }
    return '';
  }

}

export class RestApiOptions {
  jwt?: object;
  headers?: object;
}