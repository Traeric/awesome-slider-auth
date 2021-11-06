import {ptWordList} from "./WordGather";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {reactive} from "vue";

export class GenerateText {
    public static fontFamily: Array<string> = ['SimSun', 'SimHei', 'KaiTi', 'Microsoft Yahei', 'Microsoft JhengHei', 'MSimSun', 'FangSong'];
    public static fontStyle: string[] = ['normal', 'italic', 'oblique'];
    private static fontColor: Array<string> = ['#67C23A', '#409EFF', '#E6A23C', '#F56C6C'];
    private context: CanvasRenderingContext2D;
    private canvasObj: HTMLCanvasElement;
    private image: HTMLImageElement;
    private wordList: Array<WordInfo>;
    private _authWordList: Array<WordInfo>;
    private dotList: UnwrapNestedRefs<DotInfo[]>;

    public constructor (canvas: HTMLCanvasElement, dotList: UnwrapNestedRefs<DotInfo[]>) {
        this.canvasObj = canvas;
        this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
        this.image = new Image();
        this.wordList = [];
        this._authWordList = [];
        this.dotList = dotList;
    }

    get authWordList(): Array<WordInfo> {
        return this._authWordList;
    }

    private clear(): void {
        this.wordList = [];
        this._authWordList = [];
        this.dotList.length = 0;
    }

    /**
     * 刷新画板
     * @param backgroundPath 背景图片
     * @param callback canvas加载完后的回调
     * @param wordCount 字数
     */
    public refreshCanvas(backgroundPath: string, callback: Function, wordCount: number = 5): void {
        this.image.src = backgroundPath;
        this.image.onload = () => {
            this.clear();
            // 绘制背景图片
            this.context.drawImage(this.image, 0, 0, this.canvasObj.width, this.canvasObj.height);
            const imageData: ImageData = this.context.getImageData(0, 0, this.canvasObj.width, this.canvasObj.height);
            // 设置亮度
            this.brightness(imageData, -15);
            this.context.putImageData(imageData, 0, 0);
            // 生成文字位置跟角度
            for (let i = 0; i < wordCount; i++) {
                // 前后20像素不暂时文字
                const positionX = Math.random() * (this.canvasObj.width - 60) + 30;
                const positionY = Math.random() * (this.canvasObj.height - 60) + 30;
                if (this.avaliablePosition(positionX, positionY, this.wordList)) {
                    const rotate: number = Math.random() * 360;
                    this.wordList.push({
                        positionX,
                        positionY,
                        rotate,
                        word: ''
                    });
                } else {
                    // 如果此次生成的位置与之前的重复 则重新生成
                    i--;
                }
            }
            // 将文字输出到画板上
            this.wordList.map(wordItem => {
                const wordIndex: number = Math.floor(Math.random() * ptWordList.length);
                const wordText: string = ptWordList[wordIndex];
                wordItem.word = wordText;
                this.drawText(wordItem.positionX, wordItem.positionY, wordText);
            });
            // 设置认证的文字
            for (let i = 0; i < this.wordList.length - 1; i++) {
                this._authWordList.push(this.wordList[i]);
            }
            callback();
        };
    }

    /**
     * 设置图像的亮度
     * @param pixels 图片对象
     * @param delta 亮度值
     * @returns 设置亮度后的效果图
     */
    private brightness(pixels: ImageData, delta: number) {
        const d = pixels.data;
        for (let i = 0; i < d.length; i += 4) {
          d[i] += delta;     // red
          d[i + 1] += delta; // green
          d[i + 2] += delta; // blue
        }
        return pixels;
    };

    /**
     * 查看生成的随机位置是否可用
     * @param x 随机生成的x
     * @param y 随机生成的y
     * @param wordArr 已经生成的位置
     * @returns 该随机位置是否可用
     */
    private avaliablePosition(x: number, y: number, wordArr: Array<WordInfo>): boolean {
        let status: boolean = true;
        for (let i = 0; i < wordArr.length; i++) {
            let offsetX = Math.abs(wordArr[i].positionX - x);
            let offsetY = Math.abs(wordArr[i].positionY - y);
            // 50是根据30px字体的大小估算的
            if (offsetX < 50 && offsetY < 50) {
                status = false;
            }
        }
        return status;
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
        const familyIndex: number = Math.floor(Math.random() * GenerateText.fontFamily.length);
        const styleIndex: number = Math.floor(Math.random() * GenerateText.fontStyle.length);
        const colorIndex: number = Math.floor(Math.random() * GenerateText.fontColor.length);
        const fontFamily: string = GenerateText.fontFamily[familyIndex];
        const fontStyle: string = GenerateText.fontStyle[styleIndex];
        const fontColor: string = GenerateText.fontColor[colorIndex];
        // 开始在画布上写文字
        this.context.font = `${fontStyle} bolder ${fontSize}px ${fontFamily}`;
        this.context.textAlign = 'center';
        // 旋转文字
        this.rotateText(Math.random() * 360, x, y);
        if (Math.random() <= 0.5) {
            this.context.fillStyle = fontColor;
            this.context.fillText(word, 0, 0);
        } else {
            this.context.strokeStyle = fontColor;
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

    public drawDot(event: MouseEvent, wrapContainer: HTMLElement): void {
        const subContainer: HTMLElement = wrapContainer.parentElement as HTMLElement;
        const parentContainer: HTMLElement = subContainer.parentElement as HTMLElement;
        // 获取鼠标点击的位置 因为存在绝对定位 需要算出子元素相对于父元素的定位 + 父元素相对于浏览器页面的定位 = 子元素相对于浏览器的定位
        let left: number = event.clientX - (parentContainer.offsetLeft + subContainer.offsetLeft);
        let top: number = event.clientY - (parentContainer.offsetTop + subContainer.offsetTop) + 90;
        // 设置文字
        const dotText: number = this.dotList.length + 1;
        this.dotList.push({
            text: dotText.toString(),
            top,
            left
        });
        // 验证
        console.log(top, left);
    }
}

/**
 * 文字的信息 包括位置 文字宽度等
 */
export interface WordInfo {
    positionX: number;
    positionY: number;
    rotate: number;
    word: string;
}

export interface DotInfo {
    text: string;
    top: number;
    left: number;
}
