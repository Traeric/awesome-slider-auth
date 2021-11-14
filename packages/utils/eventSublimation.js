/**
 * 
 * @param {Object} e 鼠标事件对象 
 * @param {Object} data 该方法需要的参数集合 
 * @param {Function} mouseupCallback 鼠标抬起后的回调事件
 * @param {Function} moveCallback 鼠标移动过程中的回调事件 
 */
function moveSliderEvent(e, data, mouseupCallback, moveCallback = null) {
    let {slider, sliderBar, progressRef} = data;
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
        moveLength = Math.max(-1, moveLength);
        moveLength = Math.min(sliderMoveMostLength, moveLength);

        // 移动滑块
        slider.value.style.left = `${moveLength}px`;
        // 渲染滑块移动过的地方的颜色
        progressRef.value.style.width = `${moveLength + 10}px`;
        // 执行自定义的移动方法
        moveCallback && moveCallback(moveLength, sliderMoveMostLength);
    }

    document.onmouseup = mouseUpEvent => {
        document.onmousemove = null;
        mouseupCallback(moveLength, sliderMoveMostLength);
        document.onmouseup = null;
    }
}

function close(ref) {
    ref.style.opacity = "0";
    ref.style.transition = "opacity .5s";
    setTimeout(() => {
        ref.style.display = "none";
        ref.style.transition = "none";
    }, 500);
}


export {
    moveSliderEvent,
    close,
};
