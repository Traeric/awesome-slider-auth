import {auth0, auth1, auth2, auth3, auth4, auth5, auth6} from "../../utils/pictureAdapter.js";

class ScratchHandler {
    private bgRef: HTMLDivElement;
    private authCanvas: HTMLCanvasElement;
    private coverCanvas: HTMLCanvasElement;
    private authCtx: CanvasRenderingContext2D;
    private coverCtx: CanvasRenderingContext2D;
    private static authPitureArr: string[] = [auth0, auth1, auth2, auth3, auth4, auth5, auth6];
    
    constructor(bgRef: HTMLDivElement, authCanvas: HTMLCanvasElement, coverCanvas: HTMLCanvasElement) {
        this.bgRef = bgRef;
        this.authCanvas = authCanvas;
        this.coverCanvas = coverCanvas;
        this.authCtx = authCanvas.getContext('2d')!;
        this.coverCtx= coverCanvas.getContext('2d')!;
    }

    public initPanel(background: string, callback?: Function): void {
        let bgPromise = new Promise((resolve) => {
            let bgImg = new Image();
            bgImg.src = background;
            bgImg.onload = () => {
                resolve(bgImg);
            }
        });
        let authPromise = new Promise(resolve => {
            let authImg = new Image();
            authImg.src = ScratchHandler.authPitureArr[Math.floor(Math.random() * ScratchHandler.authPitureArr.length)];
            authImg.onload = () => {
                resolve(authImg);
            }
        });
        // 等待图片加载完成
        Promise.all([bgPromise, authPromise]).then((result) => {
            // 初始化遮罩层
            this.coverCtx.clearRect(0, 0, this.coverCanvas.width, this.coverCanvas.height);
            this.authCtx.clearRect(0, 0, this.authCanvas.width, this.authCanvas.height);
            this.coverCtx.globalCompositeOperation = 'source-over';
            this.coverCtx.fillStyle = '#c5c5c5';
            this.coverCtx.fillRect(0, 0, this.coverCanvas.width, this.coverCanvas.height);
            this.coverCtx.globalCompositeOperation = 'destination-out';
            // 初始化背景
            this.bgRef.style.backgroundImage = `url(${background})`;
            // 初始化认证层
            const authX = Math.random() * (this.authCanvas.width - 100) + 50;
            const authY = Math.random() * (this.authCanvas.height - 100) + 50;
            this.authCtx.drawImage(result[1] as HTMLImageElement, authX - 50, authY - 50, 100, 100);
            // 图片准备完成后的回调
            callback?.();
        });
    }

    public shadowClickEvent(successCallback?: Function, failCallback?: Function): void {
        this.coverCanvas.onmousedown = de => {
            let startX = de.clientX - this.coverCanvas.getBoundingClientRect().left;
            let startY = de.clientY - this.coverCanvas.getBoundingClientRect().top;;
            document.onmousemove = e => {
                // 获取鼠标在操作区的x与y坐标
                let moveX = e.clientX - this.coverCanvas.getBoundingClientRect().left;
                let moveY = e.clientY - this.coverCanvas.getBoundingClientRect().top;
                if (moveX < 0 || moveX > this.coverCanvas.offsetWidth || moveY < 0 || moveY > this.coverCanvas.offsetHeight) {
                    return;
                }
                this.coverCtx.save();
                this.coverCtx.beginPath();
                this.coverCtx.moveTo(startX, startY);
                this.coverCtx.lineCap = "round";　　 
		        this.coverCtx.lineJoin = "round";　
		        this.coverCtx.lineWidth = 20;
                this.coverCtx.lineTo(moveX, moveY);
                this.coverCtx.closePath();
                this.coverCtx.stroke();
                this.coverCtx.restore();
                startX = moveX;
                startY = moveY;
            }
            document.onmouseup = e => {
                document.onmousemove = null;
                document.onmouseup = null;
                // 验证
                this.auth() ? successCallback?.() : failCallback?.();
            }
        }
    }

    private auth(): boolean {
        // 获取两个canvas的像素对象
        let authData = this.authCtx.getImageData(0, 0, this.authCanvas.width, this.authCanvas.height).data;
        let coverData = this.coverCtx.getImageData(0, 0, this.coverCanvas.width, this.coverCanvas.height).data;
        // 记录遮罩层被涂开的像素 如果涂开过多也认为失败
        let coverRemovePx = 0;
        let result = true;
        // 允许20个像素的误差
        let errorCount = 20;
        for (let i = 0; i < authData.length; i += 4) {
            // authData中颜色不全为0的需要和coverData中全为0的完全重合 否则失败
            if (coverData[i] === 0 && coverData[i + 1] === 0 && coverData[i + 1] === 0) {
                coverRemovePx++;
            }
            if (authData[i] === 0 && authData[i + 1] === 0 && authData[i + 2] === 0) {
                continue;
            }
            // 到此认证层的像素不为0 需要判断遮罩层是否涂开
            if (coverData[i] !== 0 || coverData[i + 1] !== 0 || coverData[i + 1] !== 0) {
                if (errorCount-- >= 0) {
                    continue;
                }
                result = false;
                break;
            }
        }
        if (result) {
            // 需在只涂开70%的情况下完成认证才有效
            result = coverRemovePx / (this.authCanvas.width * this.authCanvas.height) < 0.7;
        }
        return result;
    }
}

export {
    ScratchHandler,
}
