function changeFaildStatus(slider, progressRef, sliderIcon) {
    sliderIcon.setAttribute("class", "iconfont icon-shibai1");
    sliderIcon.style.color = "#F56C6C";
    slider.style.borderColor = "#f46262";
    slider.style.boxShadow = "0 0 3px #f46262";
    progressRef.style.backgroundColor = '#fa96a0';
    progressRef.style.borderColor = '#F56C6C';
    // 将滑块归位
    slider.style.left = "0";
    progressRef.style.width = "10px";
    slider.style.transition = 'left .5s';
    progressRef.style.transition = 'width .5s';
}

function changeSuccessStatus(slider, progressRef, sliderIcon) {
    sliderIcon.setAttribute("class", "iconfont icon-wancheng");
    sliderIcon.style.color = "#67C23A";
    sliderIcon.style.transform = "rotate(0deg)";
    slider.style.borderColor = "#61c231";
    slider.style.boxShadow = "0 0 3px #61c231";
    progressRef.style.backgroundColor = '#d1edc4';
    progressRef.style.borderColor = '#67c23a';
}

function changeDefaultStatus(slider, progressRef, sliderIcon) {
    slider.style.cssText = "";
    progressRef.style.cssText = "";
    sliderIcon.style.cssText = "";
    sliderIcon.setAttribute("class", "iconfont icon-zuobian");
    sliderIcon.style.transform = "rotate(180deg)";
    slider.style.transition = "left .5s";

    setTimeout(() => {
        slider.style.cssText = "";
    }, 500);
}


export default {
    changeFaildStatus,
    changeSuccessStatus,
    changeDefaultStatus,
};