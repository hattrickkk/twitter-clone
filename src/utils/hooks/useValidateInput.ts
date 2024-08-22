import {
    Control,
    ControllerRenderProps,
    FieldError,
    FieldValues,
    Path,
    PathValue,
    useController,
} from 'react-hook-form'

type ReturnType<T extends FieldValues> = [ControllerRenderProps<T, Path<T>>, FieldError | undefined]

export const useValidateInput = <T extends FieldValues>(name: Path<T>, control: Control<T, string>): ReturnType<T> => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: '' as PathValue<T, Path<T>>,
    })
    return [field, error]
}
