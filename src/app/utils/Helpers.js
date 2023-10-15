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

export function filterDataByKeyword(data, keyword, property = 'name'){
	try{

		return data.filter(item=> keyword ? item[property].toLowerCase().includes(keyword.toLowerCase()) : true)

	}
	catch(err){
		
		console.log("🚀 ~ file: General.js ~ line 348 ~ filterDataByKeyword ~ err", err)
		return data

	}
}
