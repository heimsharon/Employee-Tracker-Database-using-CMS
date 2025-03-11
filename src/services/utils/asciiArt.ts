// This is the title image displayed when the application is loaded

import chalk from 'chalk';

export function displayAsciiArt() {
  const asciiArt = `
${chalk.blue('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')}
${chalk.blue('+')}                                                          ${chalk.blue('+')}
${chalk.blue('+')}                      ${chalk.green('Employee Tracker App')}                      ${chalk.blue('+')}
${chalk.blue('+')}                                                          ${chalk.blue('+')}
${chalk.blue('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')}
  `;
  console.log(asciiArt);
}