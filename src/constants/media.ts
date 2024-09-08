const mediaSizes = {
    EXTRA_LARGE_DESKTOP: 1375,
    LARGE_DESKTOP: 1330,
    NORMAL_DESKTOP: 1170,
    LARGE_TABLET: 1050,
    NORMAL_TABLET: 868,
    TABLET: 680,
    LARGE_PHONE: 590,
    PHONE: 460,
}

export const MEDIA = Object.entries(mediaSizes).reduce(
    (obj, [key, value]) => {
        return {
            ...obj,
            [key]: ` screen and (max-width: ${value}px)`,
        }
    },
    {} as Record<keyof typeof mediaSizes, number>
)
