
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

  async postData(formValue: any) {

    console.log("🚀 ~ file: [id].tsx ~ line 71 ~ index ~ postData ~ formValue", formValue)


    const phones = formValue?.phones?.map(item => {
      return {
        number: item?.toString()
      }
    })

    const response = await ContactAPI.postData({
      variables: {
        "object": {
          "first_name": formValue?.first_name,
          "last_name": formValue?.last_name,
          "phones": {
            "data": phones
          },
        }
      }
    })

    console.log("🚀 ~ file: [id].tsx ~ line 89 ~ index ~ postData ~ response", response)

    const refactorResponse: any = {}

    if (response?.data) {

      refactorResponse['success'] = true
      refactorResponse['message'] = 'Success'
      Router.push('/form-contact/' + response?.data?.insert_contact_one?.id)

    }
    else {

      refactorResponse['error'] = true
      refactorResponse['message'] = response?.errors[0]?.message || 'Error'

    }

    console.log("🚀 ~ file: [id].tsx ~ line 109 ~ index ~ postData ~ refactorResponse", refactorResponse)

    return refactorResponse

  }

  async componentDidMount(): Promise<void> {
    const head = getHead({ name: 'headFormContact' })

    const initialValues = {
      first_name: '',
      last_name: '',
      phones: [],
    }

    this.setState({
      head,
      initialValues,
      title: locale(head?.title),
    })
  }

  async componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, snapshot?: any): Promise<void> {
  }

  render() {
    const {
      state: {
        head,
        title,
        initialValues,
        fieldMultiple,
      }
    } = this
    console.log("🚀 ~ file: index.tsx ~ line 103 ~ index ~ render ~ this", this)

    return (
      <FormContact
        title={title}
        head={head}
        initialValues={initialValues}
        fieldMultiple={fieldMultiple}
        onSubmitForm={this.postData.bind(this)}
      />
    )
  }
}

export default withRouter(index)
