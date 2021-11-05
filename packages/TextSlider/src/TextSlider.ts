class GenerateText {
    public static fontFamily: Array<string> = ['SimSun', 'SimHei', 'KaiTi', 'Microsoft Yahei', 'Microsoft JhengHei', 'MSimSun', 'FangSong'];
    public static fontStyle: string[] = ['normal', 'italic', 'oblique'];
    private static fontColor: Array<string> = ['#67C23A', '#409EFF', '#E6A23C', '#F56C6Cs'];
    private context: CanvasRenderingContext2D;
    private canvasObj: HTMLCanvasElement;
    private image: HTMLImageElement;


    public constructor (canvas: HTMLCanvasElement) {
        this.canvasObj = canvas;
        this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
        this.image = new Image();
    }

    public refreshCanvas(backgroundPath: string, wordCount: number = 5): void {
        this.image.src = backgroundPath;
        this.image.onload = () => {
            // 绘制背景图片
            this.context.drawImage(this.image, 0, 0, this.canvasObj.width, this.canvasObj.height);
            // 生成文字
            for (let i = 0; i < wordCount; i++) {
                const positionX = Math.random() * (this.canvasObj.width + );

            }
        };
    }

    /**
     * 在画布上绘制文字
     * @param x 文字x轴
     * @param y 文字y轴
     * @param word 待绘制的文字
     * @param fontSize 字体大小
     * @returns 返回文字信息
     */
    private drawText(x: number, y: number, word: string, fontSize: number = 30): TextMetrics {
        this.context.save();
        // 随机选取字体
        const familyIndex: number = Math.floor(Math.random() * (GenerateText.fontFamily.length));
        const styleIndex: number = Math.floor(Math.random() * (GenerateText.fontStyle.length));
        const colorIndex: number = Math.floor(Math.random() * (GenerateText.fontColor.length));
        const fontFamily: string = GenerateText.fontFamily[familyIndex];
        const fontStyle: string = GenerateText.fontStyle[styleIndex];
        const fontColor: string = GenerateText.fontColor[colorIndex];
        // 开始在画布上写文字
        this.context.font = `${fontStyle} bolder ${fontSize}px ${fontFamily}`;
        this.context.textAlign = 'center';
        this.context.strokeStyle = fontColor;
        // 旋转文字
        this.rotateText(Math.random() * 360, x, y);
        if (Math.random() <= 0.5) {
            this.context.fillText(word, 0, 0);
        } else {
            this.context.strokeText(word, 0, 0);
        }
        let textMetrics: TextMetrics = this.context.measureText(word);
        this.context.restore();
        return textMetrics;
    }

    /**
     * 旋转字体
     * @param deg 旋转角度
     * @param x 字体x位置
     * @param y 字体y位置
     */
    private rotateText(deg: number, x: number, y: number): void {
        this.context.translate(x, y);
        this.context.rotate(Math.PI / 180 * deg);
    }
}

/**
 * 文字的信息 包括位置 文字宽度等
 */
interface TextInfo {
    positionX: number;
    positionY: number;
    textMetrics: TextMetrics;
    rotate: number;
}
