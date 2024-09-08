import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import defaultAvatar from '@/assets/avatar.svg'
import defaultBanner from '@/assets/profile/banner.png'
import { Folders } from '@/constants/fireStoreCollections'
import { INIT_DROPDOWNS_VALUES } from '@/constants/initValues'
import { InputsNames } from '@/constants/inputsNames'
import { Messages } from '@/constants/messages'
import { MONTHS } from '@/constants/month'
import { Status } from '@/constants/responseStatus'
import { EditProfileFormData } from '@/customTypes/form'
import { ImageState } from '@/customTypes/tweet'
import { UserInfoDoc } from '@/customTypes/user'
import { selectUser } from '@/store/selectors'
import { setNotification } from '@/store/slices/notificationSlice'
import { setUser } from '@/store/slices/userSlice'
import { ErrorMessage, FileInput, Form } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { ChangePhotoIcon } from '@/ui/changePhotoIcon'
import { compareUserData } from '@/utils/compareUserData'
import { dateHelper } from '@/utils/dateHepler'
import { uploadPicture } from '@/utils/firebase/pictures'
import { getUser, isFieldVauleValid, updateUserInfo, UpdateUserInfoParams } from '@/utils/firebase/user'
import { useHandleFileInput } from '@/utils/hooks/useHandleFileInput'
import { usePictureURL } from '@/utils/hooks/usePictureURL'
import { useValidateInput } from '@/utils/hooks/useValidateInput'
import { EditProfileSchema } from '@/utils/validationSchemas/validationEditProfileSchema'

import {
    Avatar,
    AvatarBack,
    AvatarImage,
    AvatarWrapper,
    BannerBack,
    BannerImage,
    BannerWrapper,
    EditingProfileSection,
    InputsWrapper,
    Photos,
    Title,
    Wrapper,
} from './styled'
import { DropdownsGroup } from '../dropdownsGroup'
import { InputWithError } from '../InputWithError'

type Image = Partial<ImageState>

type Props = {
    isPopupOpen: boolean
    closePopup: VoidFunction
}

export const EditProfileForm = memo(({ isPopupOpen, closePopup }: Props) => {
    const [dropdownsValues, setDropdownValues] = useState(INIT_DROPDOWNS_VALUES)
    const [isEditing, setIsEditing] = useState(false)
    const [dropdownError, setDropdownError] = useState('')
    const [bannerImage, setBannerImage] = useState<Image>({} as Image)
    const [avatarImage, setAvatarImage] = useState<Image>({} as Image)
    const [userInfo, setUserInfo] = useState<UserInfoDoc>({} as UserInfoDoc)
    const [initUserInfo, setInitUserInfo] = useState<UserInfoDoc>({} as UserInfoDoc)
    const avatarInputRef = useRef<HTMLInputElement>(null)
    const bannerInputRef = useRef<HTMLInputElement>(null)

    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm<EditProfileFormData>({
        resolver: yupResolver(EditProfileSchema),
        mode: 'onChange',
    })

    const [userNameField, userNameError] = useValidateInput(InputsNames.USER_NAME, control)
    const [nameField, nameError] = useValidateInput(InputsNames.DISPLAY_NAME, control)
    const [phoneNumberField, phoneNumberError] = useValidateInput(InputsNames.PHONE_NUMBER, control)
    const [descriptionField, descriptionError] = useValidateInput(InputsNames.DESCRIPTION, control)

    const [handleChangeBannerClick, handleBannerInputFileChange] = useHandleFileInput(bannerInputRef, setBannerImage)
    const [handleChangeAvatarClick, handleAvatarInputFileChange] = useHandleFileInput(avatarInputRef, setAvatarImage)

    const avatar = usePictureURL(userInfo.photoURL)
    const banner = usePictureURL(userInfo.banner)

    useEffect(() => {
        setIsEditing(false)
        getUser(currentUser?.uid as string)
            .then(res => {
                setUserInfo(res as UserInfoDoc)
                setInitUserInfo(res as UserInfoDoc)
                const { birthDate } = res as UserInfoDoc

                if (birthDate) {
                    const [day, month, year] = birthDate.split('/')
                    setDropdownValues({
                        day: {
                            isSelected: true,
                            value: day,
                        },
                        month: {
                            isSelected: true,
                            value: month,
                        },
                        year: {
                            isSelected: true,
                            value: year,
                        },
                    })
                }
                reset({ ...(res as UserInfoDoc), userName: res?.userName ?? res?.uid })
                setDropdownError('')
            })
            .catch(err => console.error(err))
    }, [isPopupOpen])

    const handleInputChange = useCallback(({ currentTarget: { value, name } }: ChangeEvent<HTMLInputElement>) => {
        setUserInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value,
            }
        })
    }, [])

    const handleEditProfileButtonClick = useCallback(() => setIsEditing(true), [])

    const onSubmitHandler = useCallback(
        async (formData: EditProfileFormData) => {
            const { day, month, year } = dropdownsValues
            setDropdownError('')
            if (
                compareUserData(initUserInfo, userInfo) &&
                !avatarImage.path &&
                !bannerImage.path &&
                `${day.value}/${month.value}/${year.value}` === initUserInfo.birthDate
            ) {
                closePopup()
                setIsEditing(false)
            } else {
                const updatedUserInfo: UpdateUserInfoParams = {
                    ...formData,
                    uid: userInfo.uid,
                    userName_lowercase: formData.displayName.toLowerCase(),
                    displayName_lowercase: formData.userName.toLowerCase(),
                }

                if (avatarImage.file) {
                    const avatar = await uploadPicture([avatarImage.file], Folders.USERS)
                    updatedUserInfo.photoURL = (avatar as string[])[0]
                }
                if (bannerImage.file) {
                    const banner = await uploadPicture([bannerImage.file], Folders.USERS)
                    updatedUserInfo.banner = (banner as string[])[0]
                }

                if (!day.isSelected || !month.isSelected || !year.isSelected) {
                    setDropdownError(Messages.DATE_REQUIRED)
                    return
                }
                const selectedDate = dateHelper.getDate({
                    year: +year.value,
                    month: MONTHS.indexOf(month.value as string),
                    day: +day.value,
                })
                if (selectedDate > dateHelper.getCurrentDate()) {
                    setDropdownError(Messages.GREATER_DATE)
                    return
                }

                if (`${day.value}/${month.value}/${year.value}` !== initUserInfo.birthDate) {
                    const monthValue = isNaN(+month.value) ? MONTHS.indexOf(month.value as string) + 1 : month.value
                    updatedUserInfo.birthDate = `${day.value}/${monthValue}/${year.value}`
                }

                const isUserNameValidResult = await isFieldVauleValid({
                    value: formData.userName,
                    fieldName: 'userName',
                    uid: userInfo.uid,
                })
                if (!isUserNameValidResult) {
                    dispatch(setNotification({ status: Status.FAIL, message: Messages.USER_EXISTS }))
                    return
                }

                const isPhoneNumberValidResult = await isFieldVauleValid({
                    value: formData.phoneNumber,
                    fieldName: 'phoneNumber',
                    uid: userInfo.uid,
                })
                if (!isPhoneNumberValidResult) {
                    dispatch(setNotification({ status: Status.FAIL, message: Messages.PHONE_NUMBER_IN_USE }))
                    return
                }

                const { status, message } = await updateUserInfo(updatedUserInfo)
                if (status === Status.SUCCESS) {
                    closePopup()
                    setAvatarImage({})
                    setBannerImage({})
                    setIsEditing(false)
                    dispatch(
                        setUser({
                            uid: currentUser?.uid as string,
                            accessToken: currentUser?.accessToken as string,
                            displayName: updatedUserInfo.displayName,
                            photoURL: updatedUserInfo.photoURL || null,
                            userName: updatedUserInfo.userName,
                        })
                    )
                } else {
                    dispatch(setNotification({ status: Status.FAIL, message }))
                }
            }
        },
        [initUserInfo, userInfo, avatarImage, bannerImage, dropdownsValues]
    )

    return (
        <EditingProfileSection>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <Title>Edit Profile</Title>
                <Wrapper>
                    <Photos>
                        <BannerWrapper onClick={handleChangeBannerClick} $disable={!isEditing}>
                            <BannerImage src={banner ?? bannerImage.path ?? defaultBanner} alt='user-banner' />
                            <BannerBack>
                                <ChangePhotoIcon />
                            </BannerBack>
                            <FileInput type='file' onChange={handleBannerInputFileChange} ref={bannerInputRef} />
                        </BannerWrapper>
                        <Avatar>
                            <AvatarWrapper onClick={handleChangeAvatarClick} $disable={!isEditing}>
                                <AvatarImage src={avatarImage.path ?? avatar ?? defaultAvatar} alt='user-avatar' />
                                <AvatarBack>
                                    <ChangePhotoIcon />
                                </AvatarBack>
                            </AvatarWrapper>
                            <FileInput type='file' onChange={handleAvatarInputFileChange} ref={avatarInputRef} />
                        </Avatar>
                    </Photos>
                    <InputsWrapper>
                        <InputWithError
                            placeholder='Name'
                            disable={!isEditing}
                            name={InputsNames.DISPLAY_NAME}
                            error={nameError}
                            controllerProps={nameField}
                            value={userInfo.displayName}
                            handleInputChange={handleInputChange}
                        />
                        <InputWithError
                            placeholder='Username'
                            disable={!isEditing}
                            name={InputsNames.USER_NAME}
                            error={userNameError}
                            controllerProps={userNameField}
                            value={userInfo.userName ?? userInfo.uid}
                            handleInputChange={handleInputChange}
                        />
                        <InputWithError
                            placeholder='Phone Number'
                            disable={!isEditing}
                            name={InputsNames.PHONE_NUMBER}
                            error={phoneNumberError}
                            controllerProps={phoneNumberField}
                            value={userInfo.phoneNumber ?? ''}
                            handleInputChange={handleInputChange}
                        />
                        <InputWithError
                            placeholder='Description'
                            disable={!isEditing}
                            name={InputsNames.DESCRIPTION}
                            error={descriptionError}
                            controllerProps={descriptionField}
                            value={userInfo.description}
                            handleInputChange={handleInputChange}
                        />
                    </InputsWrapper>
                    <DropdownsGroup
                        setDropdownValues={setDropdownValues}
                        dropdownsValues={dropdownsValues}
                        birthDate={userInfo.birthDate}
                        disable={!isEditing}
                    />
                    <ErrorMessage $visibility={!!dropdownError}>{dropdownError}</ErrorMessage>
                </Wrapper>
                {isEditing && (
                    <PrimaryButton type='submit' disable={!isValid} isProcessing={isSubmitting}>
                        Save changes
                    </PrimaryButton>
                )}
            </Form>
            {!isEditing && <PrimaryButton onClick={handleEditProfileButtonClick}>Edit Profile</PrimaryButton>}
        </EditingProfileSection>
    )
})
