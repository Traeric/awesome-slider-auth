class RotateSliderHandler {
    private bgImg: HTMLImageElement;
    private rotate: HTMLDivElement;
    private radius: number;
    private rotateAngle: number;

    constructor(bgImg: HTMLImageElement, rotate: HTMLDivElement, radius: number = 40) {
        this.bgImg = bgImg;
        this.radius = radius;
        this.rotate = rotate;
        this.rotateAngle = 0;
    }

    /**
     * 初始化背景以及拼图旋转角度
     * @param background 背景图片路径
     */
    public initSliderBackground(background: string, callback?: Function): void {
        this.bgImg.src = background;
        // 元素的跨域资源请求不需要凭证标志设置 防止使用其它网站图片时出现跨域问题
        this.bgImg.crossOrigin = "anonymous";
        this.bgImg.onload = () => {
            // 设置旋转模块的背景
            const xp = this.bgImg.offsetWidth / 2 - this.radius / 2 - 1;
            const yp = this.bgImg.offsetHeight / 2 - this.radius / 2 - 1;
            this.rotate.style.height = `${this.radius}px`;
            this.rotate.style.width = `${this.radius}px`;
            this.rotate.style.top = `${yp}px`;
            this.rotate.style.left = `${xp}px`;
            this.rotate.style.backgroundImage = `url(${background})`;
            this.rotate.style.backgroundSize = `${this.bgImg.offsetWidth}px ${this.bgImg.offsetHeight}px`;
            this.rotate.style.backgroundPosition = `-${xp}px -${yp}px`;
            // 设置旋转模块的角度
            this.rotateAngle = Math.random() * 360;
            while (this.rotateAngle <= 30 || this.rotateAngle >= 330) {
                // 限制不能小于30度
                this.rotateAngle = Math.random() * 360;
            }
            this.rotate.style.transform = `rotate(${this.rotateAngle}deg)`;
            callback?.();
        };
    }

    public realRotate(moveRate: number): void {
        const moveAngle = this.rotateAngle + 360 * moveRate;
        // 设置旋转角度
        this.rotate.style.transform = `rotate(${moveAngle}deg)`;
    }

    /**
     * 认证
     * @param moveRate 已经移动的比例
     * @param errorRange 允许的误差奇偶阿杜
     * @returns 认证结果 
     */
    public auth(moveRate: number, errorRange: number = 5): boolean {
        // 计算移动了的角度
        let moveAngle = moveRate * 360;
        // 初始角度 + 移动角度 = 360表示归为成功
        return Math.abs(moveAngle + this.rotateAngle - 360) <= errorRange;
    }

    public resetRotate(): void {
        this.rotate.style.transform = `rotate(${this.rotateAngle}deg)`;
        this.rotate.style.transition = "transform .5s";
        setTimeout(() => {
            this.rotate.style.transition = "";
        }, 500);
    }
}

export {
    RotateSliderHandler,
}
