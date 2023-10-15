
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phones: Yup.array('Error').of(Yup.number('Error')
    .min(9999, 'Too Short!')
    .max(9999999999999999999999, 'Too Long!')
    .required('Required'),
  )

})

export default Object.assign({
  title: {
    id: 'Form Kontak',
    en: 'Form Contact'
  },
  back: '/',
  validationSchema,
  forms: {
    first_name: {
      label: {
        id: 'Nama Awal',
        en: 'First Name'
      },
      type: 'string'
    },
    last_name: {
      label: {
        id: 'Nama Akhir',
        en: 'Last Name'
      },
      type: 'string'
    },
    phones: {
      label: {
        id: 'Telepon',
        en: 'Phone'
      },
      type: 'number',
      addMultiple: true
    },
  },
  label: {
    save: {
      id: 'Simpan',
      en: 'Save',
    }
  }
})