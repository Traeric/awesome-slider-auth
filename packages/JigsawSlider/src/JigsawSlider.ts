class JigsawHandler {
    private bgRef: HTMLDivElement;
    private currentBlockSerial: number;
    /**
     * 正确的block顺序
     */
    private rightSerial: number[];
    /**
     * 当前的block顺序
     */
    private currentSerial: number[];
    private blockPosition: Map<number, string>;
    private loadImage: HTMLImageElement;

    constructor(bgRef: HTMLDivElement) {
        this.bgRef = bgRef;
        this.currentBlockSerial = -1;
        this.rightSerial =[];
        this.currentSerial = [];
        // 初始化每个图块的初始位置
        this.blockPosition = new Map();
        this.blockPosition[0] = "top: 0; left: 0; transition: all .5s;";
        this.blockPosition[1] = `top: 0; left: ${bgRef.offsetWidth / 2 + 2}px; transition: all .5s;`;
        this.blockPosition[2] = `top: ${bgRef.offsetHeight / 2 + 2}px; left: 0; transition: all .5s;`;
        this.blockPosition[3] = `top: ${bgRef.offsetHeight / 2 + 2}px; left: ${bgRef.offsetWidth / 2 + 2}px; transition: all .5s;`;
        this.loadImage = new Image();
    }

    public initPanel(background: string, callback?: Function): void {
        // 初始化数据
        this.currentBlockSerial = -1;
        this.rightSerial = [];
        this.currentSerial = [];
        // 设置背景
        let blocks: NodeListOf<HTMLDivElement> = this.bgRef.querySelectorAll(".block");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.cssText = "";
            // 设置拼图块的大小与背景
            blocks[i].style.height = `${this.bgRef.offsetHeight * 0.5 - 2}px`;
            blocks[i].style.width = `${this.bgRef.offsetWidth * 0.5 - 2}px`;
            blocks[i].style.backgroundImage = `url(${background})`;
            // 为每个block设置序号
            blocks[i].setAttribute("serial", i.toString());
            this.rightSerial.push(i);
            this.currentSerial.push(i);
        }
        // 等待背景图加载完毕
        this.loadImage.src = background;
        this.loadImage.onload = () => {
            // 随机选出要打乱的两个拼图
            let serial1 = Math.floor(Math.random() * 4);
            let serial2 = -1;
            while (serial2 === -1 || serial2 === serial1) {
                serial2 = Math.floor(Math.random() * 4);
            }
            // 交换背景
            let serialBlock1 = window.getComputedStyle(blocks[serial1], null).backgroundPosition;
            let serialBlock2 = window.getComputedStyle(blocks[serial2], null).backgroundPosition;
            blocks[serial1].style.backgroundPosition = serialBlock2;
            blocks[serial2].style.backgroundPosition = serialBlock1;
            // 调整正确结果的位置
            this.rightSerial[serial1] = serial2;
            this.rightSerial[serial2] = serial1;
            // 图片加载完后回调
            callback?.();
        }
    }

    public moveEvent(successCallback?: Function, failCallback?: Function): void {
        let blocks: NodeListOf<HTMLDivElement> = this.bgRef.querySelectorAll(".block");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].onmousedown = event => {
                const currentDom = <HTMLDivElement>event.currentTarget;
                this.currentBlockSerial = parseInt(currentDom.getAttribute("serial")!);
                // 设置z-index 防止被别的拼图盖住
                currentDom.style.zIndex = '1000';
                // 获取鼠标初始点击的位置
                const mouseStartX = event.clientX;
                const mouseStartY = event.clientY;
                // 获取拼图当前的top及left值
                let top = currentDom.offsetTop;
                let left = currentDom.offsetLeft;
                document.onmousemove = me => {
                    // 获取要设置的top及left
                    let offsetTop = top + me.clientY - mouseStartY;
                    let offsetLeft = left + me.clientX - mouseStartX;
                    // 限制拼图位置不能超过展示框
                    offsetTop = Math.max(offsetTop, 0);
                    offsetTop = Math.min(offsetTop, this.bgRef.offsetHeight - currentDom.offsetHeight);
                    offsetLeft = Math.max(offsetLeft, 0);
                    offsetLeft = Math.min(offsetLeft, this.bgRef.offsetWidth - currentDom.offsetWidth);
                    // 设置拼图位置
                    currentDom.style.top = `${offsetTop}px`;
                    currentDom.style.left = `${offsetLeft}px`;
                    currentDom.style.transition = 'none';
                    // 判断是否移动
                    this.checkBlockMove(offsetTop + currentDom.offsetHeight / 2,
                        offsetLeft + currentDom.offsetWidth / 2, currentDom);
                }

                document.onmouseup = me => {
                    // 禁用鼠标移动事件
                    document.onmousemove = null;
                    // 恢复当前节点的z-index
                    currentDom.style.zIndex = '100';
                    // 将当前移动的块移动到未被占的区域
                    currentDom.style.cssText += this.blockPosition[this.currentBlockSerial];
                    setTimeout(() => {
                        // 判断用户移动是否正确
                        let authResult = this.rightSerial.every((item, index) => {
                            return this.currentSerial[index] === item;
                        });
                        // 认证回调
                        authResult ? successCallback?.() : failCallback?.();
                    }, 500);
                    document.onmouseup = null;
                }
            }
        }
    }

    /**
     * 判断当前滑块是否移动到了其他的区域 并与其换位 并调换各自的序号与当前的序号列表以及当前空缺的区域序号
     * @param top 当前滑块的中心top
     * @param left 当前滑块的中心left
     * @param currentDom 当前滑块
     * @returns void
     */
    private checkBlockMove(top: number, left: number, currentDom: HTMLDivElement): void {
        // 判断当前拼图到了哪个区域 通过top与left判断 top在上部为0 在下部为1；left在左部为0 在右部为1
        // 判断当前滑块在哪个区域通过二进制判断 例top为0 left为1 则是01 表示第一块区域（区域从0开始）
        let binary1 = -1;
        let binary2 = -1;
        if (top < this.bgRef.offsetHeight / 2 - this.bgRef.offsetHeight * 0.15) {
            binary1 = 0;
        }
        if (top > this.bgRef.offsetHeight / 2 + this.bgRef.offsetHeight * 0.15) {
            binary1 = 1;
        }
        if (left < this.bgRef.offsetWidth / 2 - this.bgRef.offsetWidth * 0.15) {
            binary2 = 0;
        }
        if (left > this.bgRef.offsetWidth / 2 + this.bgRef.offsetWidth * 0.15) {
            binary2 = 1;
        }
        // 计算区域
        const areaSerial = parseInt(binary1.toString() + binary2.toString(), 2);
        if (areaSerial === this.currentBlockSerial || binary1 === -1 || binary2 === -1) {
            // 如果滑块仍在自己的区域 则不用处理
            return;
        }
        // 将区块换位
        const waitMoveBlock = this.bgRef.querySelectorAll(".block")[this.currentSerial[areaSerial]] as HTMLDivElement;
        waitMoveBlock.style.cssText += this.blockPosition[this.currentBlockSerial];
        // 调整当前滑块的顺序
        let moveBlockSerial = this.currentSerial[areaSerial];
        this.currentSerial[areaSerial] = this.currentSerial[this.currentBlockSerial];
        this.currentSerial[this.currentBlockSerial] = moveBlockSerial;
        // 调整dom里面的顺序
        waitMoveBlock.setAttribute("serial", this.currentBlockSerial.toString());
        currentDom.setAttribute("serial", areaSerial.toString());
        this.currentBlockSerial = areaSerial;
    }
}

export default JigsawHandler;
