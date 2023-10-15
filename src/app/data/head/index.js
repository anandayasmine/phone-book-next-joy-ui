import * as head from "./index.list";

export function getHead(params) {

  try {



    // =========================================
    // ======== Initialize First Params ========
    // =========================================

    const headName = params?.name




    // =========================================
    // ============== Get Data Head ============
    // =========================================

    let result = head[headName]



    // ==================================
    // ========= Return Result ==========
    // ==================================

    return result



  }
  catch (err) {

    console.log("🚀 ~ file: index.js ~ line 23 ~ getDataHead ~ err", err)

  }
}


export function locale(label) {

  try {

    if (label) {

      let Router = { locale: 'id' }

      try {

        Router = require('next/router')?.default

      }
      catch (err) { }



      const lang = Router?.locale || localStorage?.lang || 'id'


      if (typeof label == 'object' && Object.keys(label)?.length > 0) {

        return label[lang] || ''

      }
      else {
        return label || ''
      }

    }
    else {

      return ''

    }


  }
  catch (err) {

    console.log("🚀 ~ file: Helpers.js ~ line 1237 ~ compareObject ~ err", err)
    return label || ''

  }

}

export * from './index.list'
