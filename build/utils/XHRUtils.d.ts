export declare class XHRUtils {
    static get(url: string): Promise<any>;
    static getRaw(url: string): Promise<ArrayBuffer>;
    static request(url: string, type: string, header?: any, body?: any, onLoad?: Function, onError?: Function, onProgress?: Function): XMLHttpRequest;
}
