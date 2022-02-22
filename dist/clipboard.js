"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Clipboard {
    constructor(options) {
        this.data = "";
        this.separator = "：";
        this.rowSeparator = "\n";
        this.writeText = "";
        this.setAttributes(options);
        this.handleData();
    }
    setAttributes(options) {
        for (const attribute in options) {
            if (this.hasOwnProperty(attribute)) {
                this[attribute] = options[attribute];
            }
        }
    }
    handleData() {
        if (typeof this.data === 'string') {
            this.writeText = this.data;
        }
        else if (Array.isArray(this.data)) {
            for (const text of this.data) {
                this.writeText += text + this.rowSeparator;
            }
        }
        else if (this.data !== null && typeof this.data === 'object') {
            for (const key in this.data) {
                this.writeText += key + this.separator + this.data[key] + this.rowSeparator;
            }
        }
    }
    writeToClipboard(resolve, reject) {
        if (this.clipboardAble()) {
            navigator.clipboard.writeText(this.writeText).then(resolve).catch(reject);
        }
        else {
            const textarea = document.createElement("textarea");
            if (!this.container) {
                this.container = document.querySelector("body");
            }
            this.container.appendChild(textarea);
            textarea.value = this.writeText;
            textarea.select();
            if (document.execCommand("copy")) {
                resolve();
            }
            else {
                reject();
            }
            this.container.removeChild(textarea);
        }
    }
    clipboardAble() {
        return !!navigator.clipboard;
    }
}
function clipboard(options) {
    return new Promise((resolve, reject) => {
        new Clipboard(options).writeToClipboard(resolve, reject);
    });
}
exports.default = clipboard;
