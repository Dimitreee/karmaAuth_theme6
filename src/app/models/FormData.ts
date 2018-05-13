import { extendObservable } from 'mobx';

export const FormData = (formData) => {
  extendObservable(formData, {
    division_number: { name: 'Код подразделения', value: '' },
    first_name: { name: 'Имя', value: '' },
    gender: { name: 'Пол', value: '' },
    last_name: { name: 'Фамилия', value: '' },
    middle_name: { name: 'Отчество', value: '' },
    passport_number: { name: 'Серия и Номер', value: '' },
    recieve_date: { name: 'Дата выдачи', value: '' }
  });
};
