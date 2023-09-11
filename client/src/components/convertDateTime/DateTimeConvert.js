const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
export function ConvertDatetime(params) {
    const inputDate = new Date(params);
    const formattedDate = inputDate.toLocaleString('en-GB', options);
    return formattedDate
}