class CaptchaHandler {
    private canvasObj: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private result: string|number = 0;
    private textArr: number[] = [];

    constructor (canvasObj: HTMLCanvasElement) {
        this.canvasObj = canvasObj;
        this.context = canvasObj.getContext('2d')!;
        // 将字母和数字的ASCII码值初始化到数组中
        for (let i = 48; i <= 57; i++) {
            this.textArr.push(i);
        }
        for (let i = 65; i <= 90; i++) {
            this.textArr.push(i);
        }
        for (let i = 97; i <= 122; i++) {
            this.textArr.push(i);
        }
    }

    public initPicture(text?: string, result?: string|number, color?: string): void {
        // 生成文字
        if (text === undefined || result === undefined) {
            // 如果用户未传入 需要手动生成
            text = this.generateText();
        } else {
            // 如果用户输入了结果 则使用用户的结果进行认证
            this.result = result;
        }
        // 清空canvas
        this.context.clearRect(0, 0, this.canvasObj.offsetWidth, this.canvasObj.offsetHeight);
        // 渲染文字
        this.drawText(text, color);
        // 画干扰线
        this.drawLine();
        // 画干扰点
        this.drawPoint();
    }

    /**
     * 认证用户输入是否正确
     * @param input 用户的输入
     * @returns 认证结果
     */
    public auth(input: string|number): boolean {
        if (typeof input === "string") {
            // 转小写
            input = input.toLocaleLowerCase();
        }
        return input == this.result;
    }

    /**
     * 绘制干扰点
     */
    private drawPoint(): void {
        this.context.save();
        const pointNum = this.randomInt(30, 60);
        for(let i = 0; i < pointNum; i++) {
            this.context.fillStyle = this.randomColor(200, 220);
            this.context.beginPath();
            this.context.arc(this.randomInt(0, this.canvasObj.offsetWidth), this.randomInt(0, this.canvasObj.offsetHeight), 1.5, 0, 2 * Math.PI);
            this.context.fill();
        }
        this.context.restore();
    }

    /**
     * 绘制干扰线
     */
    private drawLine(): void {
        this.context.save();
        const lineNum = this.randomInt(2, 3);
        const splitWidth = this.canvasObj.offsetWidth / 5;
        for(let i = 0; i < lineNum; i++) {
            this.context.strokeStyle = this.randomColor(40, 180);
            this.context.beginPath();
            // 绘制起始点
            this.context.moveTo(this.randomInt(0, splitWidth), this.randomInt(0, this.canvasObj.offsetHeight));
            // 绘制中间点
            for (let j = 1; j <= 3; j++) {
                // 绘制中间点2
                this.context.arcTo(splitWidth * j, this.randomInt(0, this.canvasObj.offsetHeight), 
                        this.randomInt(splitWidth * j, splitWidth * (j + 1)), this.randomInt(0, this.canvasObj.offsetHeight), 10);
            }
            // 绘制结束点
            this.context.lineTo(this.randomInt(this.canvasObj.offsetWidth - splitWidth, this.canvasObj.offsetWidth), 
            this.randomInt(0, this.canvasObj.offsetHeight));
            this.context.stroke();
        }
        this.context.restore();
    }

    private randomInt(start: number, end: number): number {
        return Math.floor(Math.random() * (end - start) + start);
    }

    private randomColor(min: number, max: number): string {
        let r = this.randomInt(min, max);
        let g = this.randomInt(min, max);
        let b = this.randomInt(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    /**
     * 填写文字
     * @param text 待填写的文字 
     * @param color 文字颜色
     */
    private drawText(text: string, color?: string): void {
        this.context.save();
        for (let i = 0; i < text.length; i++) {
            let txt = text[i];
            this.context.font = Math.floor(Math.random() * 6 + this.canvasObj.offsetHeight * .6) + 'px SimHei';
            this.context.textBaseline = 'middle';
            this.context.fillStyle = color || "#3eaf7c";
            this.context.shadowOffsetX = Math.floor(Math.random() * 6 + -3);
            this.context.shadowOffsetY = Math.floor(Math.random() * 6 + -3);
            this.context.shadowBlur = Math.floor(Math.random() * 6 + -3);
            this.context.shadowColor = "rgba(0, 0, 0, 0.3)";
            let x = this.canvasObj.offsetWidth / text.length * i + 5;
            let y = this.canvasObj.offsetHeight / 2;
            let deg = Math.floor(Math.random() * 60 + -30);
            /** 设置旋转角度和坐标原点* */
            this.context.translate(x, y);
            this.context.rotate(deg * Math.PI / 180);
            this.context.fillText(txt, 0, 0);
            /** 恢复旋转角度和坐标原点* */
            this.context.rotate(-deg * Math.PI / 180);
            this.context.translate(-x, -y);
        }
        this.context.restore();
    }

    /**
     * 生成验证文字
     * @returns 返回验证文字
     */
    private generateText(): string {
        let text: string = "";
        if (Math.random() <= 0.5) {
            // 使用英文+数字的方式
            for (let i = 0; i < 4; i++) {
                text += String.fromCharCode(this.textArr[Math.floor(Math.random() * this.textArr.length)]);
            }
            // 设置最终的验证结果
            this.result = text.toLocaleLowerCase();
        } else {
            // 使用加减法的方式
            const num1: number = parseInt(String.fromCharCode(Math.floor(Math.random() * 9 + 48)));
            const num2: number = parseInt(String.fromCharCode(Math.floor(Math.random() * 9 + 48)));
            if (Math.random() <= 0.5) {
                // 乘法
                text = `${num1}x${num2}=`;
                this.result = num1 * num2;
            } else {
                // 加法
                text = `${num1}+${num2}=`;
                this.result = num1 + num2;
            }
        }
        return text;
    }
}


export {
    CaptchaHandler,
}
