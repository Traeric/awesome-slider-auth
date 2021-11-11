import type {themeType} from "./AsCodeBlock.typing";

class CodeBlockHandler {
    private code: string;
    private static tagFlag: Array<string> = ['import', "from", "public", "static", "private", "construct"];
    private static keyWordFlag : Array<string> = ["null", "undefined"];
    private static funcFlag: Array<string> = ['function', 'let', 'var', 'const', "for", "in"];

    constructor(code: string) {
        this.code = code;
    }

    public parseCode(): string {
        // 将数据按行拆分
        const codeArr = this.code.split("\n");
        let resultCode = "";
        for (let i = 0; i < codeArr.length; i++) {
            resultCode += this.parseSingleLine(codeArr[i], i);
        }

        return resultCode;
    }

    private parseSingleLine(lineCode: string, lineNumber: number): string {
        let lineResult = `<div class="ascb-line"><div class="ascb-number">${lineNumber + 1}</div><div class="ascb-code">`;
        let tailResult = '</div></div>';
        let result = '';
        // 先处理制表符或空格
        if (lineCode.length > 0) {
            let curreWord = lineCode[0];
            lineCode = lineCode.slice(1, lineCode.length);
            while(curreWord === '\t' || curreWord === ' ') {
                lineResult += '<div class="ascb-tab">';
                tailResult = '</div>' + tailResult;
                // 去除制表符并去除下一个字符
                curreWord = lineCode[0];
                lineCode = lineCode.slice(1, lineCode.length);
            }
            if (curreWord !== null && curreWord !== undefined) {
                lineCode = curreWord + lineCode;
                // 处理剩余字符串
                result = this.dealWithData(lineCode);
            }
        }
        return lineResult + result + tailResult;
    }

    private dealWithData(wordLine: string): string {
        let result = "";
        let className = "";
        let currStr = "";
        let tagInner = false;
        // 数据类型 0标签类 1代码类
        let dataType = wordLine.startsWith("<") ? 0 : 1;
        for (let i = 0; i < wordLine.length; i++) {
            let currCode = wordLine[i];
            if (dataType === 0) {
                if (currCode === " " || currCode === "<" || currCode === "/" || currCode === ">" || currCode === '=') {
                    result += `<span class="${className}">${currStr}</span>` + currCode;
                    if (currCode === "<" || currCode === "/") {
                        className = 'ascb-tag';
                        tagInner = true;
                    }
                    if (currCode === " " && tagInner) {
                        className = "ascb-attr";
                    }
                    if (currCode === ">") {
                        className = "ascb-normal";
                        tagInner = false;
                    }
                    if (currCode === "=") {
                        className = "ascb-val";
                    }
                    // 清空当前的字符串已经类名
                    currStr = '';
                    continue;
                }
            } else {
                // 代码类数据
                if (currCode === " " || currCode === "(" || currCode === ")" || currCode === ";" || currCode === ",") {
                    if ((currStr.startsWith("'") || currStr.startsWith('"')) && !(currStr.endsWith("'") || currStr.endsWith('"'))) {
                        continue;
                    }
                    if (currCode === "(") {
                        className = "ascb-attr-code";
                    }
                    if (currStr.startsWith("'") || currStr.startsWith('"')) {
                        className = "ascb-val";
                    }
                    if (currStr === "=") {
                        className = "ascb-tag";
                    }
                    if (CodeBlockHandler.tagFlag.indexOf(currStr) !== -1) {
                        className = "ascb-tag-code";
                    }
                    if (CodeBlockHandler.funcFlag.indexOf(currStr) !== -1) {
                        className = "ascb-func";
                    }
                    if (CodeBlockHandler.keyWordFlag.indexOf(currStr) !== -1) {
                        className = "ascb-key-word";
                    }
                    if (/\d+/.test(currStr)) {
                        className = "ascb-key-word";
                    }
                    result += `<span class="${className}">${currStr}</span>` + currCode;
                    // 清空当前的字符串已经类名
                    currStr = '';
                    className = "ascb-normal";
                    continue;
                }
            }
            // 如果是普通字符则存储到cur中 等下次遇到空格再统一用标签包裹
            currStr += currCode;
        }

        return result + currStr;
    }
}

class ThemeHandler {
    // 可选主题
    static themeMap: object = {
        "light": {
            tagColor: "#f81d22",
            attrColor: "#0b8235",
            valColor: "#008dff",
            keyWordColor: "#528dff",
            funcColor: "#008dff",
            normalColor: "#24292f",
            tagCodeColor: "#008dff",
            attrCodeColor: "#f81d22",
            numberColor: "#C0C4CC",
            numberBorderColor: "#C0C4CC",
            codeBackgroundColor: "#f5f7fa",
            baseColor: "#24292f"
        },
        "dark": {
            tagColor: "#f92672",
            attrColor: "#a6e22e",
            valColor: "#e6db74",
            keyWordColor: "#8481ff",
            funcColor: "#66d9ef",
            normalColor: "#f8f8f2",
            tagCodeColor: "#f92659",
            attrCodeColor: "#a6e22e",
            numberColor: "#90908a",
            numberBorderColor: "#464741",
            codeBackgroundColor: "#272822",
            baseColor: "#f8f8f2"
        }
    }
    private themeDom: HTMLElement;

    constructor(themeDom: HTMLElement) {
        this.themeDom = themeDom;
    }

    public changeTheme(theme: themeType): void {
        // 获取主题
        let themeObj = ThemeHandler.themeMap[theme];
        // 切换主题
        this.themeDom.style.setProperty("--tag-color", themeObj.tagColor);
        this.themeDom.style.setProperty("--attr-color", themeObj.attrColor);
        this.themeDom.style.setProperty("--val-color", themeObj.valColor);
        this.themeDom.style.setProperty("--key-word-color", themeObj.keyWordColor);
        this.themeDom.style.setProperty("--func-color", themeObj.funcColor);
        this.themeDom.style.setProperty("--normal-color", themeObj.normalColor);
        this.themeDom.style.setProperty("--tag-code-color", themeObj.tagCodeColor);
        this.themeDom.style.setProperty("--attr-code-color", themeObj.attrCodeColor);
        this.themeDom.style.setProperty("--number-color", themeObj.numberColor);
        this.themeDom.style.setProperty("--number-border-color", themeObj.numberBorderColor);
        this.themeDom.style.setProperty("--code-background-color", themeObj.codeBackgroundColor);
        this.themeDom.style.setProperty("--base-color", themeObj.baseColor);
    }
}

export {
    CodeBlockHandler,
    ThemeHandler
}
