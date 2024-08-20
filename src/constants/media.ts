const MediaSizes = {
    LARGE_DESKTOP: 1330,
    NORMAL_DESKTOP: 1170,
    TABLET: 680,
    PHONE: 460,
}

export const MEDIA = Object.entries(MediaSizes).reduce(
    (obj, [key, value]) => {
        return {
            ...obj,
            [key]: ` screen and (max-width: ${value}px)`,
        }
    },
    {} as Record<keyof typeof MediaSizes, number>
)
