import { CrummmEmitterSystemInstance } from "crummm-emitter-system/dist";
export declare class MmmHtmlParser {
    protected static _instance: MmmHtmlParser;
    static readonly instance: MmmHtmlParser;
    protected _emitter: CrummmEmitterSystemInstance;
    constructor();
    onStart(listener: () => {}): void;
    start(): boolean;
}
