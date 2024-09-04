const colors = {
    black: '#000000',
    blackText: 'rgba(0, 0, 0, 0.7)',
    white: '#FFFFFF',
    blue: '#1E97E1',
    darkBlue: '#1972E6',
    backBlue: '#0d161f',
    gray: '#e4eaed',
    buttonGray: '#2B3948',
    buttonDarkGray: '#1C2732',
    red: '#EF1C5C',
    disableBlue: '#9DCBE6',
    green: 'green',
    blueGray: '#536471',
    lightGray: '#F7F9F9',
    darkGray: '#A0A0A0',
    blackWithOpacity: 'rgba(0, 0, 0, 0.2)',
    whiteWithOpacity: 'rgba(255, 255, 255, 0.25)',
}

export const common = {
    color: {
        ...colors,
    },

    lineHeight: {
        lh20: '20px',
        lh24: '24px',
        lh32: '32px',
    },

    transition: {
        standart: '0.3s all ease',
        smooth: 'all ease 0.4s',
    },

    fontFamily: {
        roboto: '"Roboto", sans-serif',
        robotoSerif: 'Roboto Serif, serif',
        segoeUI: '"Segoe UI", sans-serif',
    },

    fontSize: {
        fs11: '11px',
        fs13: '13px',
        fs14: '14px',
        fs16: '16px',
        fs18: '18px',
        fs20: '20px',
        fs22: '22px',
        fs24: '24px',
        fs30: '30px',
        fs34: '34px',
        fs42: '42px',
        fs56: '56px',
        fs84: '84px',
    },

    fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        heavy: 900,
    },

    space: {
        sp5: '5px',
        sp8: '8px',
        sp10: '10px',
        sp15: '15px',
        sp18: '18px',
        sp20: '20px',
        sp25: '25px',
        sp30: '30px',
        sp35: '35px',
        sp40: '40px',
        sp45: '45px',
        sp50: '50px',
        sp55: '55px',
        sp65: '65px',
        sp70: '70px',
        sp75: '75px',
        sp95: '95px',
        sp100: '100px',
    },

    width: {
        w1: '1px',
        w1d5: '1.5px',
        w3: '3px',
        w6: '6px',
        w10: '10px',
        w15: '15px',
        w20: '20px',
        w25: '25px',
        w28: '28px',
        w32: '32px',
        w40: '40px',
        w45: '45px',
        w50: '50px',
        w100: '100px',
        w130: '130px',
        w150: '150px',
        w185: '185px',
        w200: '200px',
        w230: '230px',
        w300: '300px',
        w370: '370px',
        w400: '400px',
        w410: '410px',
        w450: '450px',
        w670: '670px',
        w1000: '1000px',
    },

    borderSize: {
        bs1: '1px',
        bs2: '2px',
    },

    borderRadius: {
        br2: '2px',
        br6: '6px',
        br10: '10px',
        br20: '20px',
        br42: '42px',
        br76: '76px',
    },

    containerWidth: '1430px',
    opacity: 0.6,
    inputColor: colors.white,
    dropdownItemColor: colors.gray,
    secondaryButtonColor: colors.backBlue,
    hoverSecondaryButtonColor: colors.buttonGray,
}

export const enum ThemeMode {
    light = 'LIGHT',
    dark = 'DARK',
}

export const lightTheme = {
    ...common,
    theme: ThemeMode.light,
    backgroundColor: common.color.white,
    textColor: common.color.black,
    hoverGray: common.color.blackWithOpacity,
    borderGray: common.color.gray,
    dropdownIconColor: '#9D9EA0',
    boxShadowForContextMenu: `0 0px 8px ${common.color.blackWithOpacity}`,
    textShadow: `0 4px 4px ${common.color.blackWithOpacity}`,
    scrollBarThemeColor: common.color.gray,
    copyrightColor: common.color.backBlue,
    usersSectionColor: common.color.lightGray,
    textSecondary: common.color.darkGray,
}

export const darkTheme = {
    ...common,
    theme: ThemeMode.dark,
    backgroundColor: common.color.backBlue,
    textColor: common.color.white,
    hoverGray: common.color.gray,
    borderGray: 'rgba(255, 255, 255, 0.2)',
    dropdownIconColor: common.color.buttonDarkGray,
    boxShadowForContextMenu: '0px 0px 10px rgba(255, 255, 255, 0.1)',
    textShadow: `0 4px 4px ${common.color.whiteWithOpacity}`,
    scrollBarThemeColor: common.color.buttonDarkGray,
    copyrightColor: common.color.gray,
    usersSectionColor: common.color.buttonDarkGray,
    textSecondary: common.color.whiteWithOpacity,
}
