export const transformPythonResponse = (response: any): Object => {
  let dto: string;
  if (response instanceof Object) {
    dto = JSON.stringify(response).replace(/NaN/g, 'null');
  }
  else {
    dto = response.replace(/NaN/g, 'null');
  }
  return JSON.parse(dto);
}