import React, { Component } from 'react'
import { MainLayout } from '@/app/components/layouts'
import {
  Box,
  Stack,
  Input,
  List,
  ListItem,
  ListItemDecorator,
  ListItemContent,
  Avatar,
  Typography,
  Chip,
  Card,
  IconButton,
  ListItemButton,
  Skeleton,
  Grid,
} from '@mui/joy';
import { Add, AddCircleOutlined, Star } from '@mui/icons-material';

import _ from 'lodash';

import { filterDataByKeyword } from '@/app/utils/Helpers'
import Style from '@/app/utils/Style'
import Router from 'next/router';


function SkeletonListProfile(props) {
  return (
    <Stack spacing={2}>
      {
        Array(props?.row)?.fill(1)?.map((item, index) =>
          <Stack direction={'row'} key={'skeleton-' + index} sx={{ m: 'auto', gap: 2, alignItems: 'center' }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Stack width={'100%'}>
              <Skeleton variant="rectangular" width={'100%'} height="1em" sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width={'80%'} height="1em" />
            </Stack>
          </Stack>
        )
      }
    </Stack>
  )
}



type TProps = {
  title?: string
  head?: any
  data?: Array
};

type TState = {
  mainClassName: string
  searchValue: string
  favs: Array
};

type TEvent = {
  type: string
  value: any
};

export default class ContactLists extends Component<TProps, TState> {

  state: TState = {
    mainClassName: 'template-contact-lists',
    favs: [],
    searchValue: ''
  }

  handleEvent(params: TEvent) {

    switch (params?.type) {

      case 'fav-button': {

        let newFavs = [...this.state.favs]

        if (newFavs.find(fav => fav == params?.value.id)) {

          newFavs = newFavs.filter(fav => fav != params?.value.id)

        }
        else {

          newFavs.push(params?.value.id)

        }

        newFavs = _.uniq(newFavs)

        this.setState({
          favs: newFavs
        })

      } break

    }


  }


  render() {

    const {
      state: {
        favs,
        searchValue,
      },
      props: {
        title,
        data
      }
    } = this

    const isDataReady = data?.length > 0

    return (
      <MainLayout title={title}
        endHeader={
          <IconButton
            onClick={()=>Router.push('/form-contact')}
          >
            <AddCircleOutlined
              css={{
                color: 'var(--color-secondary)'
              }}
            />
          </IconButton>
        }
        
      >
  <Card className='animate__animated animate__fadeIn animate__faster'>

    <Stack>
      <Input placeholder="Search in here…" onChange={(event) => {
        this.setState({
          searchValue: event?.target.value
        })
      }} />
    </Stack>

    <List
      sx={{
        '--ListItemDecorator-size': '56px',
        '--List-gap': '0.5rem'
      }}

    >

      {
        isDataReady ?
          filterDataByKeyword(data, searchValue, 'first_name')?.map((item: any, index: number) => {
            return (
              <ListItem key={'contact-' + index}
                className='animate__animated animate__fadeInUp'
                css={{
                  animationDuration: (((index > 4 ? 8 : index) + 4) / 5) + 's !important'
                }}
                endAction={
                  <IconButton aria-label="Favorite" size="sm"
                    onClick={this.handleEvent.bind(this, {
                      type: 'fav-button',
                      value: item,
                    })}

                    aria-pressed={favs.find((fav) => fav == item.id) ? 'true' : 'false'}

                    css={(theme) => {
                      return {
                        'svg': {
                          color: 'var(--joy-palette-neutral-300, #CDD7E1)',
                        },

                        [`&[aria-pressed="true"]`]: {
                          ...theme.variants.soft.warning,
                          'svg': {
                            color: '#EA9A3E',
                          },
                        },
                      }
                    }}

                  >
                    <Star css={{
                    }} />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={() => Router.push('/form-contact/' + item.id)}
                >
                  <ListItemDecorator>
                    <Avatar alt={item?.first_name?.toUpperCase()} />
                  </ListItemDecorator>
                  <ListItemContent>
                    <Typography
                      level="title-sm"
                      css={{
                        fontWeight: 700,
                      }}
                      noWrap
                    >
                      {item?.first_name + ' ' + item?.last_name}
                    </Typography>
                    {
                      item?.phones?.length > 0 &&
                      <Stack direction={'row'} spacing={1}>
                        <Typography level="body-xs" noWrap
                          textColor={'neutral.400'}
                        >
                          {item?.phones[0].number}
                        </Typography>
                        {
                          item?.phones?.length > 1 &&
                          <Chip
                            startDecorator={
                              <Add css={{
                                fontSize: '0.7rem',
                                color: '#9FA6AD'
                              }}
                              />}
                            css={{
                              color: 'var(--color-primary)',
                              fontWeight: 700,
                              transform: 'scale(0.8)',
                              backgroundColor: 'var(--joy-palette-neutral-100, #F0F4F8)',
                            }}
                          >
                            <Typography level="body-xs" noWrap
                              css={{
                                // color: 'var(--joy-palette-neutral-500, #636B74)',
                                fontWeight: 500,
                              }}
                              textColor='neutral.400'

                            >
                              {item?.phones?.length - 1}
                            </Typography>
                          </Chip>
                        }
                      </Stack>
                    }
                  </ListItemContent>
                </ListItemButton>

              </ListItem>

            )
          })
          :
          <SkeletonListProfile
            row={15}
          />
      }

    </List>

  </Card>
      </MainLayout >
    )
  }
}
