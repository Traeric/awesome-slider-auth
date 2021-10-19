function changeFaildStatus(slider, sliderBar, sliderIcon, moveRate) {
    sliderIcon.value.setAttribute("class", "iconfont icon-shibai1");
    sliderIcon.value.style.color = "#fff";
    slider.value.style.backgroundColor = "#F56C6C";
    slider.value.style.borderColor = "#f46262";
    sliderBar.value.style.background = `linear-gradient(to right, #f56c6cd1, #f56c6cd1 ${moveRate}%, #ddd ${moveRate}%, #ddd)`;
}

function changeSuccessStatus(slider, sliderBar, sliderIcon, moveRate) {
    sliderIcon.value.setAttribute("class", "iconfont icon-wancheng");
    sliderIcon.value.style.color = "#fff";
    sliderIcon.value.style.transform = "rotate(0deg)";
    slider.value.style.backgroundColor = "#67C23A";
    slider.value.style.borderColor = "#61c231";
    sliderBar.value.style.background = `linear-gradient(to right, #67c23abf, #67c23abf ${moveRate}%, #ddd ${moveRate}%, #ddd)`;
}

function changeDefaultStatus(slider, sliderBar, sliderIcon) {
    slider.value.style.cssText = "";
    sliderBar.value.style.cssText = "";
    sliderIcon.value.style.cssText = "";
    sliderIcon.value.setAttribute("class", "iconfont icon-zuobian");
    sliderIcon.value.style.transform = "rotate(180deg)";
    slider.value.style.transition = "left .5s";

    setTimeout(() => {
        slider.value.style.cssText = "";
    }, 500);
}


export default {
    changeFaildStatus,
    changeSuccessStatus,
    changeDefaultStatus,
};