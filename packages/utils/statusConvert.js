import {IconStatus} from "./enums";

function changeFaildStatus(slider, progressRef, iconStatus) {
    iconStatus.value = IconStatus.Fail;
    slider.style.borderColor = "#f46262";
    slider.style.boxShadow = "0 0 3px #f46262";
    progressRef.style.backgroundColor = '#fa96a0';
    progressRef.style.borderColor = '#F56C6C';
    // 将滑块归位
    slider.style.left = "-1px";
    progressRef.style.width = "10px";
    slider.style.transition = 'left .5s';
    progressRef.style.transition = 'width .5s';
}

function changeSuccessStatus(slider, progressRef, iconStatus) {
    iconStatus.value = IconStatus.Success;
    slider.style.borderColor = "#61c231";
    slider.style.boxShadow = "0 0 3px #61c231";
    progressRef.style.backgroundColor = '#d1edc4';
    progressRef.style.borderColor = '#67c23a';
}

function changeDefaultStatus(slider, progressRef, iconStatus) {
    iconStatus.value = IconStatus.Normal;
    slider.style.cssText = "";
    progressRef.style.cssText = "";
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