export const calHeightAttiude = (w) => 1 * w / 175;
export const calcWidthAttiude = (h) => 1 * h / 123;

const EXTRADITION_AGENCY = {
  x1: calcWidthAttiude(18),
  y1: calHeightAttiude(15),
  x4: calcWidthAttiude(115),
  y4: calHeightAttiude(33),
  name: "Орган выдавший документ"
};

const DATE_OF_ISSUE = {
  x1: calcWidthAttiude(23),
  y1: calHeightAttiude(35),
  x4: calcWidthAttiude(50),
  y4: calHeightAttiude(40),
  name: "Дата выдачи"
};

const UNIT_CODE = {
  x1: calcWidthAttiude(70),
  y1: calHeightAttiude(30),
  x4: calcWidthAttiude(115),
  y4: calHeightAttiude(40),
  name:"Код подразделения"
};

const NAME = {
  x1: calcWidthAttiude(60),
  y1: calHeightAttiude(110),
  x4: calcWidthAttiude(105),
  y4: calHeightAttiude(122),
  name: "Имя"
};

const LAST_NAME = {
  x1: calcWidthAttiude(60),
  y1: calHeightAttiude(100),
  x4: calcWidthAttiude(105),
  y4: calHeightAttiude(110),
  name: "Фамилия"
};

const MIDDLE_NAME = {
  x1: calcWidthAttiude(55),
  y1: calHeightAttiude(120),
  x4: calcWidthAttiude(105),
  y4: calHeightAttiude(128),
  name: "Отчество"
};

export {
  EXTRADITION_AGENCY,
  DATE_OF_ISSUE,
  UNIT_CODE,
  NAME,
  LAST_NAME,
  MIDDLE_NAME
};
