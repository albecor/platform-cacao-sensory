export const isEmail = (val) =>
  /^([a-zA-Z0-9_.-]){0,20}@(([a-zA-Z0-9-]){0,20}\.)+([a-zA-Z0-9]{2,4})+$/.test(
    val
  );

export const isNumeric = (val) => /^[0-9]+$/.test(val);
export const isFloat = (val) => /^\d\.?\d?$/.test(val);

export const isMobile = (val) =>
  /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/.test(val.toString());

export const isStrongPws = (val) =>
  /^(?=.*[A-Z])(?=.*[-#!$@%^&*()_+|~=`{}[\]:";'<>?,./])(?=.*[0-9])(?=.*[a-z]).{8,}$/gm.test(
    val
  );

export const removeEmptyAndUndefined = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null && v !== '')
  );

export const getTimeName = () => {
  let timeName = 'Buenas noches';
  const hours = new Date().getHours();
  if (hours < 12) timeName = 'Buenos días';
  else if (hours < 18) timeName = 'Buenas tardes';
  return timeName;
};

export const formatDate = (date) => {
  const dateFormatted = new Date(date);
  return dateFormatted.toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'medium' });
};
