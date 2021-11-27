class JigsawHandler {
    private bgRef: HTMLDivElement;

    constructor(bgRef: HTMLDivElement) {
        this.bgRef = bgRef;
    }

    public initPanel(background: string): void {
        // 设置背景
        let blocks: NodeListOf<HTMLDivElement> = this.bgRef.querySelectorAll(".block");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.backgroundImage = `url(${background})`;
        }
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
        // 触发移动事件
        this.moveEvent(blocks);
    }

    private moveEvent(blocks: NodeListOf<HTMLDivElement>): void {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].addEventListener("mousedown", event => {
                const currentDom = <HTMLDivElement>event.currentTarget;
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
                }
            });
        }
    }
}

export default JigsawHandler;
