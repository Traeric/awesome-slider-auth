class CodeBlockHandler {
    private code: string;
    private static tagFlag: Array<string> = ['import', "from", "public", "static", "private", "construct", "for", "in"];
    private static keyWordFlag : Array<string> = ["null", "undefined"];
    private static funcFlag: Array<string> = ['function', 'let', 'var', 'const'];

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
        let lineResult = `<div class="line"><div class="number">${lineNumber + 1}</div><div class="code">`;
        let tailResult = '</div></div>';
        let result = '';
        // 先处理制表符或空格
        if (lineCode.length > 0) {
            let curreWord = lineCode[0];
            lineCode = lineCode.slice(1, lineCode.length);
            while(curreWord === '\t' || curreWord === ' ') {
                lineResult += '<div class="tab">';
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
        // 数据类型 0标签类 1代码类
        let dataType = wordLine.startsWith("<") ? 0 : 1;
        for (let i = 0; i < wordLine.length; i++) {
            let currCode = wordLine[i];
            if (dataType === 0) {
                if (currCode === " " || currCode === "<" || currCode === "/" || currCode === ">" || currCode === '=') {
                    result += `<span class="${className}">${currStr}</span>` + currCode;
                    if (currCode === "<" || currCode === "/") {
                        className = 'tag';
                    }
                    if (currCode === " ") {
                        className = "attr";
                    }
                    if (currCode === ">") {
                        className = "normal";
                    }
                    if (currCode === "=") {
                        className = "val";
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
                        className = "attr-code";
                    }
                    if (currStr.startsWith("'") || currStr.startsWith('"')) {
                        className = "val";
                    }
                    if (currStr === "=") {
                        className = "tag";
                    }
                    if (CodeBlockHandler.tagFlag.indexOf(currStr) !== -1) {
                        className = "tag-code";
                    }
                    if (CodeBlockHandler.funcFlag.indexOf(currStr) !== -1) {
                        className = "func";
                    }
                    if (CodeBlockHandler.keyWordFlag.indexOf(currStr) !== -1) {
                        className = "key-word";
                    }
                    if (/\d+/.test(currStr)) {
                        className = "key-word";
                    }
                    result += `<span class="${className}">${currStr}</span>` + currCode;
                    // 清空当前的字符串已经类名
                    currStr = '';
                    className = "normal";
                    continue;
                }
            }
            // 如果是普通字符则存储到cur中 等下次遇到空格再统一用标签包裹
            currStr += currCode;
        }

        return result + currStr;
    }
}

export default CodeBlockHandler;