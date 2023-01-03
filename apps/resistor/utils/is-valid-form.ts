export const isValidForm = (form: Record<string, unknown>) => {
  const values = Object.values(form);
  const isAllValuesValid = values.every((value) => value !== '');

  return isAllValuesValid;
};

export default isValidForm;
