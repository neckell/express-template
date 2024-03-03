export const convertDate = (inputDate: string) => {
  if (!inputDate) return ''
  const dateParts = inputDate.split('-');
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

export const pythonDateToDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export const dateToPythonDate = (dateString: string) => {
  const dt = new Date(dateString)
  const formattedDate = dt.toUTCString()
  return formattedDate
}

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
