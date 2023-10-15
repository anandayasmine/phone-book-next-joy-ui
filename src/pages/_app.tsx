import type { AppProps } from 'next/app'
import '@/app/assets/styles/index.scss'
import App from 'next/app';
import { extendTheme, CssVarsProvider } from '@mui/joy/styles';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { JoyTheme } from '@/app/utils/Style'


class index extends App<AppProps> {

  componentDidMount(): void {
    AOS.init();


  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <CssVarsProvider theme={JoyTheme}>
          <Component {...pageProps} />
        </CssVarsProvider >
      </>
    )
  }
}

export default index
