"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayAsciiArt = void 0;
const chalk_1 = __importDefault(require("chalk"));
function displayAsciiArt() {
    const asciiArt = `
${chalk_1.default.blue('++++++++++++++++++++++++++++++++++++++++++++++')}
${chalk_1.default.blue('+')}                                            ${chalk_1.default.blue('+')}
${chalk_1.default.blue('+')}            ${chalk_1.default.green('Employee Tracker App')}            ${chalk_1.default.blue('+')}
${chalk_1.default.blue('+')}                                            ${chalk_1.default.blue('+')}
${chalk_1.default.blue('++++++++++++++++++++++++++++++++++++++++++++++')}
  `;
    console.log(asciiArt);
}
exports.displayAsciiArt = displayAsciiArt;
