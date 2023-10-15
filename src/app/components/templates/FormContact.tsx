import React, { Component } from 'react'
import { MainLayout } from '..'
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Alert,
  IconButton,
  Card,
} from '@mui/joy'
import { InfoOutlined, CloseRounded, Close } from '@mui/icons-material';
import { Formik } from 'formik';
import { locale } from '@/app/data/head';
import { alertDetail } from '@/app/utils/Style'


type Props = {
  title: string,
  head: any,
  initialValues: object,
  fieldMultiple?: object,
  onSubmitForm?: Promise<void>
}

type State = {
  alert: any
  fieldMultiple: any
}

export default class FormContact extends Component<Props, State> {

  private refFormik = React.createRef<HTMLDivElement>();

  state = {
    fieldMultiple: {},
    alert: {
      open: false,
      type: 'danger',
      message: 'Error'
    }
  }

  async handleSubmit() {

    console.log("🚀 ~ file: FormContact.tsx ~ line 65 ~ FormContact ~ handleSubmit ~ this.refFormik", this.refFormik)
    if (this.props.onSubmitForm) {

      const response = await this.props.onSubmitForm(this.refFormik.values)
      console.log("🚀 ~ file: FormContact.tsx ~ line 52 ~ FormContact ~ handleSubmit ~ response", response)

      this.setState({
        alert: {
          open: true,
          type: response?.success ? 'success' : 'danger',
          message: response?.message || 'Error',
        }
      })

    }

  }

  handleCloseAlert() {

    this.setState({
      alert: {
        open: false,
      }
    })

  }


  componentDidMount(): void {
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevProps?.initialValues != this.props.initialValues) {
    }
  }



  render() {

    const {
      state: {
        alert,
        fieldMultiple,
      },
      props: {
        head,
        title,
        initialValues,
      }
    } = this
    console.log("🚀 ~ file: FormContact.tsx ~ line 216 ~ FormContact ~ render ~ this", this)

    const forms = Object.keys(head?.forms || {})

    return (
      <MainLayout title={title} back={head?.back}>

        <Alert
          className={'animate__animated animate__faster ' + (alert?.open ? 'animate__fadeIn' : 'animate__fadeOut hide')}
          type={alert?.type}
          variant="soft"
          color={alertDetail[alert?.type]?.color}
          endDecorator={
            <IconButton
              variant="soft"
              color={alertDetail[alert?.type]?.color}
              onClick={this.handleCloseAlert.bind(this)}
            >
              <CloseRounded />
            </IconButton>
          }
          css={{
            marginBottom: '1rem'
          }}
        >
          {alert?.message}
        </Alert>

        <Card css={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}>
          <Formik
            initialValues={initialValues}
            validationSchema={head?.validationSchema}
            enableReinitialize
          >
            {formik => {

              this.refFormik = formik

              return (
                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={2} >
                    {
                      forms?.length > 0 &&
                      forms.map((formKeys, formIndex) => {

                        const formItem = head?.forms[formKeys]


                        const Field = (fieldMultipleIndex?: number) => {

                          const error = formItem.addMultiple ? (formik?.errors[formKeys] && formik?.errors[formKeys][fieldMultipleIndex]) : formik?.errors[formKeys]

                          const fieldName = formItem.addMultiple ? formKeys + '_' + fieldMultipleIndex : formKeys

                          return (
                            <FormControl error={Boolean(error)} key={'form-' + formIndex + (formItem.addMultiple ? fieldMultipleIndex : '')}
                              className='animate__animated animate__fadeInUp'
                              css={{
                                animationDuration: (((formIndex > 4 ? 8 : formIndex) + 4) / 5) + 's !important'
                              }}
                            >
                              <FormLabel>{locale(formItem?.label) + ((formItem.addMultiple && formik.values[formKeys]?.length > 1) ? ' ' + (fieldMultipleIndex + 1) : '')}</FormLabel>
                              <Input
                                endDecorator={
                                  formItem.addMultiple &&
                                  <IconButton
                                    onClick={() => {

                                      let newFieldMultiple = formik.values[formKeys]
                                      newFieldMultiple = newFieldMultiple.filter((newFieldMultipleItem, newFieldMultipleIndex) => newFieldMultipleIndex != fieldMultipleIndex)

                                      console.log("🚀 ~ file: FormContact.tsx ~ line 171 ~ FormContact ~ Field ~ newFieldMultiple", newFieldMultiple)

                                      formik.setFieldValue(formKeys, newFieldMultiple, true)

                                    }}
                                    variant="solid"
                                    color="primary"
                                    disabled={formik.values[formKeys]?.length < 2}
                                    css={{
                                      color: '#97C3F0',
                                      backgroundColor: '#E3EFFB',
                                      '&.Mui-disabled': {
                                        color: 'var(--joy-palette-neutral-200, #DDE7EE)',
                                        backgroundColor: 'var(--joy-palette-neutral-100, #F0F4F8)'
                                      }
                                    }}
                                  >
                                    <Close />
                                  </IconButton>
                                }
                                placeholder={locale(formItem?.placeholder)}
                                type={formItem?.type}
                                onChange={(event) => {

                                  let value: any = event.target.value
                                  console.log("🚀 ~ file: FormContact.tsx ~ line 180 ~ FormContact ~ Field ~ value", value)

                                  switch (formItem?.type) {

                                    case 'number': {

                                      value = parseInt(value)
                                      value = Number.isNaN(value) ? null : value

                                    } break

                                  }
                                  console.log("🚀 ~ file: FormContact.tsx ~ line 180 ~ FormContact ~ Field ~ value", value)


                                  if (formItem.addMultiple) {

                                    let refactorValueArray = formik.values[formKeys]
                                    console.log("🚀 ~ file: FormContact.tsx ~ line 183 ~ FormContact ~ Field ~ refactorValueArray", refactorValueArray)

                                    refactorValueArray[fieldMultipleIndex] = value

                                    formik.setFieldValue(formKeys, refactorValueArray, true)

                                  }
                                  else {

                                    formik.setFieldValue(fieldName, value, true)

                                  }

                                  // formik.handleChange()

                                }}
                                onBlur={formik.handleBlur}
                                id={fieldName}
                                name={fieldName}
                                value={formik.values ? formItem.addMultiple ? (formik?.values[formKeys] && formik?.values[formKeys][fieldMultipleIndex]) : formik.values[formKeys] : ''}

                              />

                              {
                                error &&
                                <FormHelperText>
                                  <InfoOutlined />
                                  {error}
                                </FormHelperText>
                              }
                            </FormControl>
                          )
                        }

                        switch (formItem?.type) {

                          default: {

                            return (
                              <>
                                {
                                  formItem.addMultiple ?
                                    <>
                                      {
                                        (formik?.values && formik?.values[formKeys])?.map((field, fieldIndex) => Field(fieldIndex))
                                      }
                                      <Button
                                        className='animate__animated animate__fadeInUp'
                                        css={{
                                          animationDuration: (((formIndex > 4 ? 8 : formIndex) + 4) / 5) + 's !important'
                                        }}
                                        onClick={() => {

                                          let newFieldMultiple = formik.values[formKeys]

                                          const isContinuous = newFieldMultiple?.length

                                          if (isContinuous) {

                                            newFieldMultiple.push(null)

                                          }
                                          else {

                                            newFieldMultiple = [null]

                                          }

                                          formik.setFieldValue(formKeys, newFieldMultiple, true)


                                        }}>Tambah Telepon</Button>
                                    </>
                                    :
                                    Field(1)

                                }
                              </>
                            )

                          } break

                        }

                      })
                    }
                    <Button
                      onClick={this.handleSubmit.bind(this)}
                      disabled={!formik.isValid}
                      variant='outlined'
                      className='animate__animated animate__fadeInUp'
                      css={{
                        marginTop: '1rem !important',
                        animationDuration: (8 / 5) + 's !important'
                      }}
                      size='lg'
                    >
                      {locale(head?.label?.save)}
                    </Button>



                  </Stack>

                </form>
              )
            }}

          </Formik>
        </Card>


      </MainLayout >
    )
  }
}