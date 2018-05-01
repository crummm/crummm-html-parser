import { CrummmEmitterSystemInstance } from "crummm-emitter-system/dist";

export class MmmHtmlParser {
  //
  // STATIC
  //

  protected static _instance: MmmHtmlParser;
  public static get instance(): MmmHtmlParser {
    return this._instance || new MmmHtmlParser();
  }

  //
  // INSTANCE
  //

  protected _emitter = new CrummmEmitterSystemInstance();

  constructor() {}

  public onStart(listener: () => {}) {
    this._emitter.on('start', listener);
  }

  public start() {
    this._emitter.emit('start');
    return true;
  }
}
