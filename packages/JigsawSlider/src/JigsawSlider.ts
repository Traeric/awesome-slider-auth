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
                // 获取鼠标初始点击的位置
                const mouseStartX = event.clientX;
                const mouseStartY = event.clientY;
                document.onmousemove = me => {
                    // 获取要移动的距离
                    const offsetTop = me.clientY - mouseStartY;
                    const offsetLeft = me.clientX - mouseStartX;

                    
                }
            });
        }
    }
}

export default JigsawHandler;
