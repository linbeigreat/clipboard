interface ClipboardOptions {
    data: string | object | string[];
    separator?: string;
    rowSeparator?: string;
    container?: HTMLElement | HTMLBodyElement;
}
declare function clipboard(options: ClipboardOptions): Promise<unknown>;
export default clipboard;
