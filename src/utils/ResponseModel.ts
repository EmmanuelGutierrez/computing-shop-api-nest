import { config } from '../config/config';

class ResponseModel {
  private _message: string | string[] = '';
  private _error = null;

  public newError(error: string, message?: string) {
    this._error = error;
    this.setMessage(message);
    return this.send();
  }

  public setMessage(message: string) {
    this._message = message;
  }

  /* private print(response) {
    if (config.ENV === 'env' && this._error) {
      console.log(response);
    }
  } */

  public send(data?: Array<Record<string, any>> | Record<string, any> | null) {
    const response = {
      error: this._error,
      message: this._message,
      data: data,
    };
    /* this.print(response); */

    return response;
  }
}

export { ResponseModel };
