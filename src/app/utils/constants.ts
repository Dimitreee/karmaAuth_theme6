export const calHeightAttiude = (w) => 1 * w / 175;
export const calcWidthAttiude = (h) => 1 * h / 123;


const EXTRADITION_AGENCY = {
  x1: 0.15,
  y1: 0.1,
  x4: 0.93,
  y4: 0.2,
  name: 'Орган выдавший документ'
};

const DATE_OF_ISSUE = {
  x1: 0.18,
  y1: 0.2,
  x4: 0.41,
  y4: 0.23,
  name: 'Дата выдачи'
};

const UNIT_CODE = {
  x1: 0.57,
  y1: 0.17,
  x4: 0.93,
  y4: 0.23,
  name: 'Код подразделения'
};

const NAME = {
  x1: 0.48,
  y1: 0.62,
  x4: 0.85,
  y4: 0.69,
  name: 'Имя'
};

const LAST_NAME = {
  x1: 0.45,
  y1: 0.54,
  x4: 0.85,
  y4: 0.64,
  name: 'Фамилия'
};

const MIDDLE_NAME = {
  x1: 0.45,
  y1: 0.68,
  x4: 0.85,
  y4: 0.72,
  name: 'Отчество'
};

export {
  EXTRADITION_AGENCY,
  DATE_OF_ISSUE,
  UNIT_CODE,
  NAME,
  LAST_NAME,
  MIDDLE_NAME
};
