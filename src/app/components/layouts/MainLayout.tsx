import React, { Component } from 'react'
import { NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
import { IconButton, Grid, Stack, Typography } from '@mui/joy';
import Style, { mq } from '@/app/utils/Style'
import Router from 'next/router';

type Props = {
  children: React.ReactNode,
  title?: string
  back?: string
}

type State = {}

export default class MainLayout extends Component<Props, State> {
  state = {}



  render() {

    const {
      props: {
        children,
        title,
        back,
        endHeader,
      }
    } = this

    return (
      <Grid
        css={{
          padding: '1rem',
          backgroundColor: '#fafafa',
          minHeight: '100vh',
          [mq.sm]: {
            padding: '1rem',
            display: 'grid',
            justifyContent: 'center'
          },
        }}
        spacing={1}
      >
        <Stack
          css={{
            [mq.sm]: {
              width: '400px'
            },
          }}
        >
          <Stack
            direction={'row'}
            spacing={1}
            css={{
              padding: '2rem 0rem ',
              // paddingBottom: '2rem',
            }}
            justifyContent={'space-between'}
          >

            <Stack direction={'row'}>
              {
                back &&
                <IconButton
                  onClick={() => Router.push(back)}
                  className='animate__animated animate__fadeInLeft'
                >
                  <NavigateBeforeIcon
                    css={{
                      fontSize: '3rem',
                      color: 'var(--color-primary)',
                      padding: '0rem',
                      width: '1.5rem'
                    }}
                  />
                </IconButton>
              }

              <Typography level='h2' component='h1' className='animate__animated animate__fadeInLeft'>
                {title}
              </Typography>

            </Stack>


            {
              endHeader
            }

          </Stack>

          <Stack>
            {children}
          </Stack>

        </Stack>
      </Grid >
    )
  }
}