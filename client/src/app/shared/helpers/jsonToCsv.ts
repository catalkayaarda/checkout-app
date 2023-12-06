export function jsonToCsv(data: any, title: string) {
  const replacer = (key: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
  const header = Object.keys(data[0]);

  const csv = data.map((row: any) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  csv.unshift(header.join(','));
  const csvArray = csv.join('\r\n');

  const a = document.createElement('a');
  const blob = new Blob([csvArray], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = title;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}
