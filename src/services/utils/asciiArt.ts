// filepath: src/services/utils/asciiArt.ts
// This is the title image displayed when the application is loaded

import chalk from 'chalk';

// Displays ASCII art banner in the console when the app starts
export function displayAsciiArt() {
  // Define the ASCII art with colored borders and title
  const asciiArt = `
${chalk.blue('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')}
${chalk.blue('+')}                                                          ${chalk.blue('+')}
${chalk.blue('+')}                   ${chalk.green('Employee Tracker App')}                   ${chalk.blue('+')}
${chalk.blue('+')}                                                          ${chalk.blue('+')}
${chalk.blue('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')}
  `;
  // Output the ASCII art to the console
  console.log(asciiArt);
}