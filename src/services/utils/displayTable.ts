import Table from 'cli-table3';

export function displayTableWithoutIndex(data: any[]) {
  if (data.length === 0) {
    console.log('No data available.');
    return;
  }

  const headers = Object.keys(data[0]);
  const table = new Table({
    head: headers,
    colWidths: headers.map(() => 20),
  });

  data.forEach(row => {
    table.push(headers.map(header => row[header]));
  });

  console.log(table.toString());
}