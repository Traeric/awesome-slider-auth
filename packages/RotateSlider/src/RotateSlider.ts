class RotateSliderHandler {
    private canvasObj: HTMLCanvasElement;
    private bgImg: HTMLImageElement;
    private context: CanvasRenderingContext2D;
    private rotate: HTMLDivElement;
    private radius: number;

    constructor(canvasObj: HTMLCanvasElement, rotate: HTMLDivElement, radius: number = 40) {
        this.canvasObj = canvasObj;
        this.context = canvasObj.getContext('2d')!;
        this.bgImg = new Image();
        this.radius = radius;
        this.rotate = rotate;
    }

    /**
     * 初始化背景以及拼图旋转角度
     * @param background 背景图片路径
     */
    public initSliderBackground(background: string): void {
        this.bgImg.src = background;
        // 元素的跨域资源请求不需要凭证标志设置 防止使用其它网站图片时出现跨域问题
        this.bgImg.crossOrigin = "anonymous";
        this.bgImg.onload = () => {
            // 将图片放到画布上
            this.context.drawImage(this.bgImg, 0, 0, this.canvasObj.offsetWidth, this.canvasObj.offsetHeight);
            // 设置旋转模块的角度
            const rotateAngle = Math.random() * 360;
            // this.rotate.style.transform = `rotate(${rotateAngle}deg)`;
            // 设置旋转模块的背景
            const xp = this.canvasObj.offsetWidth / 2 - this.radius / 2;
            const yp = this.canvasObj.offsetHeight / 2 - this.radius / 2;
            console.log(xp, yp);
            this.rotate.style.height = `${this.radius}px`;
            this.rotate.style.width = `${this.radius}px`;
            this.rotate.style.top = `${yp}px`;
            this.rotate.style.left = `${xp}px`;
            this.rotate.style.backgroundImage = `url(${background})`;
            this.rotate.style.backgroundSize = `${this.canvasObj.offsetWidth}px ${this.canvasObj.offsetHeight}px`;
            this.rotate.style.backgroundPosition = `-${xp}px -${yp}px`;
        };
    }
}

export {
    RotateSliderHandler,
}
