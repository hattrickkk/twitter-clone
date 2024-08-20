export const common = {
    color: {
        black: '#000000',
        white: '#FFFFFF',
        blue: '#1E97E1',
        darkBlue: '#1972E6',
        backBlue: '#0d161f',
        gray: '#e4eaed',
        buttonGray: '#2B3948',
        buttonDarkGray: '#1C2732',
    },

    lineHeight: {
        lh20: '20px',
        lh32: '32px',
    },

    transition: {
        standart: '0.3s all ease',
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
        sp40: '40px',
        sp45: '45px',
        sp55: '55px',
        sp100: '100px',
    },

    width: {
        w1: '1px',
        w28: '28px',
        w32: '32px',
        w400: '400px',
        w1000: '1000px',
    },

    borderSize: {
        bs1: '1px',
        bs2: '2px',
    },

    borderRadius: {
        br6: '6px',
        br42: '42px',
        br76: '76px',
    },

    containerWidth: '1430px',
}

const enum ThemeMode {
    light = 'LIGHT',
    dark = 'DARK',
}

export const lightTheme = {
    ...common,
    theme: ThemeMode.light,
    backgroundColor: common.color.white,
    textColor: common.color.black,
    hoverGray: 'rgba(0, 0, 0, 0.2)',
    borderGray: common.color.gray,
    secondaryButtonColor: common.color.backBlue,
    hoverSecondaryButtonColor: common.color.buttonGray,
}

export const darkTheme = {
    ...common,
    theme: ThemeMode.dark,
    backgroundColor: common.color.backBlue,
    textColor: common.color.white,
    hoverGray: common.color.gray,
    borderGray: 'rgba(255, 255, 255, 0.2)',
    secondaryButtonColor: common.color.buttonGray,
    hoverSecondaryButtonColor: common.color.buttonDarkGray,
}
