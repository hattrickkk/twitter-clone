const mediaSizes = {
    LARGE_DESKTOP: 1330,
    NORMAL_DESKTOP: 1170,
    TABLET: 680,
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
