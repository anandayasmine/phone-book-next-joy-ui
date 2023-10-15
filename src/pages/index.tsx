
import { ContactLists } from '@/app/components'
import { ContactAPI } from '@/app/data/api';
import React, { Component, ReactPropTypes } from 'react'
import { getHead, locale } from '@/app/data/head'

type TProps = {
  message: string
}

type TState = {
  head?: object
  title?: string,
  data?: any,
}

export default class index extends Component<TProps, TState> {

  state: TState = {
  }

  async getContactList() {

    const response = await ContactAPI.getData(
      {
        variables: {
          "orderBy": [
            {
              "created_at": "desc",
            }
          ]
        }
      }
    )
    return response?.data?.contact

  }

  async onSubmitForm(formValue: any) {


  }


  async componentDidMount(): Promise<void> {

    const head = await getHead({ name: 'headContactLists' })
    const data = await this.getContactList()

    await this.setState({
      head,
      title: locale(head?.title),
      data: data
    })

  }

  render() {
    const {
      state: {
        title,
        head,
        data
      }
    } = this
    return (
      <ContactLists
        // getData={this.getCustomer.bind(this)}
        // onSubmitForm={this.onSubmitForm.bind(this)}
        title={title}
        head={head}
        data={data}
      />
    )
  }
}
