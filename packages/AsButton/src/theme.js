const colorTheme = {
    default: {
        backendColor: '#fff',
        fontColor: '#606266',
        borderColor: '#dcdfe6',
        borderRadius: '4px',
        hoverBackendColor: '#ecf5ff',
        hoverBorderColor: '#c6e2ff',
        hoverFontColor: "#409eff",
    },
    primary: {
        backendColor: '#409eff',
        fontColor: '#fff',
        borderColor: '#409eff',
        borderRadius: '4px',
        hoverBackendColor: '#66b1ff',
        hoverBorderColor: '#66b1ff',
        hoverFontColor: "#fff",
    },
    positive: {
        backendColor: '#67c23a',
        fontColor: '#fff',
        borderColor: '#67c23a',
        borderRadius: '4px',
        hoverBackendColor: '#85ce61',
        hoverBorderColor: '#85ce61',
        hoverFontColor: "#fff",
    },
    warning: {
        backendColor: '#ffc82c',
        fontColor: '#fff',
        borderColor: '#ffc014',
        borderRadius: '4px',
        hoverBackendColor: '#ffd257',
        hoverBorderColor: '#ffd257',
        hoverFontColor: "#fff",
    },
    negative: {
        backendColor: '#eb652d',
        fontColor: '#fff',
        borderColor: '#e35c3e',
        borderRadius: '4px',
        hoverBackendColor: '#f0885c',
        hoverBorderColor: '#f0885c',
        hoverFontColor: "#fff",
    },
}

const sizeObject = {
    mini: "5px 10px",
    miniCircle: "5px",
    normal: "12px 20px",
    normalCircle: "12px",
    small: "10px 15px",
    smallCircle: "10px",
};

const roundObject = {
    circle: "255px",
    round: "20px",
};


export function changeTheme(variable, props) {
    const colorThemeObj = colorTheme[props.type];
    variable.value.style.setProperty("--backend-color", colorThemeObj.backendColor);
    variable.value.style.setProperty("--font-color", colorThemeObj.fontColor);
    variable.value.style.setProperty("--border-color", colorThemeObj.borderColor);
    variable.value.style.setProperty("--border-radius", colorThemeObj.borderRadius);
    variable.value.style.setProperty("--hover-backend-color", colorThemeObj.hoverBackendColor);
    variable.value.style.setProperty("--hover-border-color", colorThemeObj.hoverBorderColor);
    variable.value.style.setProperty("--hover-font-color", colorThemeObj.hoverFontColor);
    // 如果设置了圆角
    if (props.circle) {
        variable.value.style.setProperty("--border-radius", roundObject.circle);
    }
    // 如果设置了椭圆样式
    if (props.round) {
        variable.value.style.setProperty("--border-radius", roundObject.round);
    }
    // 如果设置了背景半透明
    let backendColor = colorThemeObj.backendColor;
    let fontColor = colorThemeObj.fontColor;
    if (props.plain) {
        backendColor = backendColor + "1a";
        fontColor = colorThemeObj.borderColor;
        variable.value.style.setProperty("--backend-color", backendColor);
        variable.value.style.setProperty("--font-color", fontColor);
        variable.value.style.setProperty("--hover-backend-color", colorThemeObj.backendColor);
        variable.value.style.setProperty("--hover-font-color", "#fff");
    }
    // 如果设置了禁用按钮
    if (props.disabled || props.loading) {
        if (props.loading) {
            variable.value.style.setProperty("--disabled", "wait");
        }
        if (props.disabled) {
            variable.value.style.setProperty("--disabled", "not-allowed");
        }
        variable.value.style.setProperty("--opacity", "0.5");
        variable.value.style.setProperty("--hover-backend-color", backendColor);
        variable.value.style.setProperty("--hover-font-color", fontColor);
        variable.value.style.setProperty("--hover-border-color", colorThemeObj.borderColor);
    }
    // 设置大小
    let sizeKey = props.size;
    if (props.circle) {
        sizeKey += "Circle";
    }
    variable.value.style.setProperty("--padding", sizeObject[sizeKey]);
}

