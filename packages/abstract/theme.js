

const colorTheme = {
    default: {
        backendColor: '#fff',
        fontColor: '#000',
        borderColor: '#000',
        borderRadius: '4px',
        hoverColor: '#eee',
        padding: "12px 20px",
    },
    defaultCircle: {
        backendColor: '#fff',
        fontColor: '#000',
        borderColor: '#000',
        borderRadius: '50%',
        hoverColor: '#eee',
        padding: "12px",
    },
    primary: {
        backendColor: '#afc8ba',
        fontColor: '#fff',
        borderColor: '#accdba',
        borderRadius: '4px',
        hoverColor: '#b9cfc3',
        padding: "12px 20px",
    },
    primaryCircle: {
        backendColor: '#afc8ba',
        fontColor: '#fff',
        borderColor: '#accdba',
        borderRadius: '50%',
        hoverColor: '#b9cfc3',
        padding: "12px",
    },
    positive: {
        backendColor: '#93b469',
        fontColor: '#fff',
        borderColor: '#94c66b',
        borderRadius: '4px',
        hoverColor: '#a0bc7b',
        padding: "12px 20px",
    },
    positiveCircle: {
        backendColor: '#93b469',
        fontColor: '#fff',
        borderColor: '#94c66b',
        borderRadius: '50%',
        hoverColor: '#a0bc7b',
        padding: "12px",
    },
    warning: {
        backendColor: '#e2bd3b',
        fontColor: '#fff',
        borderColor: '#f2c04d',
        borderRadius: '4px',
        hoverColor: '#e5c552',
        padding: "12px 20px",
    },
    warningCircle: {
        backendColor: '#e2bd3b',
        fontColor: '#fff',
        borderColor: '#f2c04d',
        borderRadius: '50%',
        hoverColor: '#e5c552',
        padding: "12px",
    },
    negative: {
        backendColor: '#eb652d',
        fontColor: '#fff',
        borderColor: '#e35c3e',
        borderRadius: '4px',
        hoverColor: '#ee7744',
        padding: "12px 20px",
    },
    negativeCircle: {
        backendColor: '#eb652d',
        fontColor: '#fff',
        borderColor: '#e35c3e',
        borderRadius: '50%',
        hoverColor: '#ee7744',
        padding: "12px",
    },
}


export function changeTheme(variable, themeType) {
    const colorThemeObj = colorTheme[themeType];
    variable.value.style.setProperty("--backend-color", colorThemeObj.backendColor);
    variable.value.style.setProperty("--font-color", colorThemeObj.fontColor);
    variable.value.style.setProperty("--border-color", colorThemeObj.borderColor);
    variable.value.style.setProperty("--border-radius", colorThemeObj.borderRadius);
    variable.value.style.setProperty("--hover-color", colorThemeObj.hoverColor);
    variable.value.style.setProperty("--padding", colorThemeObj.padding);
}

