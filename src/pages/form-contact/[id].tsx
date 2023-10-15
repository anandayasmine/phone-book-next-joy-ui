
import { FormContact } from '@/app/components'
import { ContactAPI } from '@/app/data/api';
import React, { Component, ReactPropTypes } from 'react'
import { getHead, locale } from '@/app/data/head'
import Router, { withRouter } from 'next/router';

type TProps = {
  message: string
};
type TState = {
  head?: object,
  data?: object,
  fieldMultiple?: object,
  title: string,
};
class index extends Component<TProps, TState> {

  state: TState = {
    head: undefined,
    title: ''
  }

  async assignDataContact(value: any) {

    const id = parseInt(value || Router?.query?.id)

    console.log("🚀 ~ file: [id].tsx ~ line 21 ~ index ~ assignDataContact ~ id", id)

    const response = await ContactAPI.getData({
      variables: {
        "where": {
          "id": {
            "_eq": id
          }
        }
      }
    })

    console.log("🚀 ~ file: [id].tsx ~ line 41 ~ index ~ assignDataContact ~ response?.data", response?.data)
    let data = response?.data?.contact[0]

    console.log("🚀 ~ file: [id].tsx ~ line 45 ~ index ~ data?.phones?.forEach ~ data?.phones", data?.phones)

    let flatPhone = {}

    data?.phones?.forEach((phone: { number: any; }, phoneIndex: number) => {

      flatPhone['phones_' + phoneIndex] = parseInt(phone?.number)

    })

    const phones = data?.phones?.flatMap(item => Number.isInteger(parseInt(item.number)) ? parseInt(item.number) : false).filter(item => item)

    data = {
      ...data,
      ...flatPhone,
      phones
    }

    console.log("🚀 ~ file: index.tsx ~ line 46 ~ index ~ refactorData ~ data", data)

    await this.setState({
      id: id,
      data: data,
      fieldMultiple: { phones: phones }
    })

  }

  async putData(formValue: any) {

    console.log("🚀 ~ file: [id].tsx ~ line 71 ~ index ~ putData ~ formValue", formValue)
    const id = parseInt(formValue?.id || Router?.query?.id)

    console.log("🚀 ~ file: [id].tsx ~ line 21 ~ index ~ putData ~ id", id)


    const phones = formValue?.phones?.map(item => {
      return {
        number: item?.toString()
      }
    })

    const response = await ContactAPI.putData({
      variables: {
        "pkColumns": {
          "id": id
        },
        "set": {
          "first_name": formValue?.first_name,
          "last_name": formValue?.last_name,
        }
      }
    })

    console.log("🚀 ~ file: [id].tsx ~ line 89 ~ index ~ putData ~ response", response)

    const refactorResponse: any = {}

    if (response?.data) {

      refactorResponse['success'] = true
      refactorResponse['message'] =  'Success'

    }
    else {

      refactorResponse['error'] = true
      refactorResponse['message'] = response?.errors[0]?.message || 'Error'

    }
    console.log("🚀 ~ file: [id].tsx ~ line 109 ~ index ~ putData ~ refactorResponse", refactorResponse)

    return refactorResponse

  }

  async componentDidMount(): Promise<void> {
    const head = getHead({ name: 'headFormContact' })
    await this.assignDataContact(this.props.router.query?.id)

    this.setState({
      head,
      title: locale(head?.title)
    })
  }

  async componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, snapshot?: any): Promise<void> {
    if (prevProps.router.query.id != this.props.router.query.id) {
      await this.assignDataContact(this.props.router.query?.id)
    }
  }

  render() {
    const {
      state: {
        head,
        title,
        data,
        fieldMultiple,
        id,
      }
    } = this
    return (
      <FormContact
        id={id}
        title={title}
        head={head}
        initialValues={data}
        fieldMultiple={fieldMultiple}
        onSubmitForm={this.putData.bind(this)}
      />
    )
  }
}

export default withRouter(index)
