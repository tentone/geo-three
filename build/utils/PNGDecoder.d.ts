export declare class PNGDecoder {
    private static readonly SIGNATURE;
    static decode(buffer: ArrayBuffer): Promise<ImageData>;
    private static decompress;
    private static reconstruct;
    private static paeth;
    static scaleImageData(src: ImageData, dstWidth: number, dstHeight: number): ImageData;
}
