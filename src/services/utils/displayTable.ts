// filepath: src/services/utils/displayTable.ts
// This file contains functions to display data in a formatted table in the console.
import Table from 'cli-table3';

// Displays a table in the console without an index column
export function displayTableWithoutIndex(data: any[]) {
  // If there is no data, notify the user and exit
  if (data.length === 0) {
    console.log('No data available.');
    return;
  }

  // Get the headers from the first data object
  const headers = Object.keys(data[0]);
  // Create a new table with headers and fixed column widths
  const table = new Table({
    head: headers,
    colWidths: headers.map(() => 20),
  });

  // Add each row of data to the table
  data.forEach(row => {
    table.push(headers.map(header => row[header]));
  });

  // Output the table to the console
  console.log(table.toString());
}