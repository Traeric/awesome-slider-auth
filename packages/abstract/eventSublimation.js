/**
 * 
 * @param {Object} e 鼠标事件对象 
 * @param {Object} data 该方法需要的参数集合 
 * @param {Function} mouseupCallback 鼠标抬起后的回调事件 
 */
function moveSliderEvent(e, data, mouseupCallback) {
    let {slider, sliderBar} = data;
    // 记录鼠标点击时滑块的初始位置
    const startPosition = e.clientX;
    // 获取滑块最大能移动的距离
    const sliderMoveMostLength = sliderBar.value.offsetWidth - slider.value.offsetWidth;
    let moveLength = 0;
    document.onmousemove = moveEvent => {
        const movePosition = moveEvent.clientX;
        // 计算滑块移动的距离
        moveLength = movePosition - startPosition;
        // 限制移动距离
        moveLength = Math.max(0, moveLength);
        moveLength = Math.min(sliderMoveMostLength, moveLength);

        // 移动滑块
        slider.value.style.left = `${moveLength}px`;
        // 渲染滑块移动过的地方的颜色
        sliderBar.value.style.background = `linear-gradient(to right, #a0cfff, #a0cfff ${moveLength / sliderMoveMostLength * 100}%, #ddd ${moveLength / sliderMoveMostLength * 100}%, #ddd)`;
    }

    document.onmouseup = mouseUpEvent => {
        document.onmousemove = null;
        mouseupCallback(moveLength);
        document.onmouseup = null;
    }
}




export default {
    moveSliderEvent,
};
