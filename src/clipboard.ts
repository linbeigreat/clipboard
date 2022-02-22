interface ClipboardOptions {
    data: string | object | string[]
    separator?: string
    rowSeparator?: string
    container?: HTMLElement | HTMLBodyElement // 当有弹框时会复制失败，此时需将弹框的html传入至此参数中
}

class Clipboard {
    data: string | object | string[] = ""
    separator?: string = "："
    rowSeparator?: string = "\n"
    writeText = ""
    container?: HTMLElement

    constructor(options: ClipboardOptions) {
        this.setAttributes(options)
        this.handleData()
    }

    private setAttributes(options: ClipboardOptions) {
        for (const attribute in options) {
            if (this.hasOwnProperty(attribute)) {
                this[attribute] = options[attribute]
            }
        }
    }

    private handleData() {
        if (typeof this.data === 'string') {
            this.writeText = this.data
        } else if (Array.isArray(this.data)) {
            for (const text of this.data) {
                this.writeText += text + this.rowSeparator
            }
        } else if (this.data !== null && typeof this.data === 'object') {
            for (const key in this.data) {
                this.writeText += key + this.separator + this.data[key] + this.rowSeparator
            }
        }
    }

    writeToClipboard(resolve: () => void, reject: () => void) {
        if (this.clipboardAble()) {
            navigator.clipboard.writeText(this.writeText).then(resolve).catch(reject)
        } else {
            const textarea = document.createElement("textarea")
            if (!this.container) {
                this.container = document.querySelector("body")!
            }
            this.container.appendChild(textarea)
            textarea.value = this.writeText
            textarea.select()
            if (document.execCommand("copy")) {
                resolve()
            } else {
                reject()
            }
            this.container.removeChild(textarea)
        }
    }

    clipboardAble(): boolean {
        return !!navigator.clipboard
    }
}

function clipboard(options: ClipboardOptions) {
    return new Promise((resolve, reject) => {
        new Clipboard(options).writeToClipboard(resolve as () => void, reject);
    });
}

export default clipboard;