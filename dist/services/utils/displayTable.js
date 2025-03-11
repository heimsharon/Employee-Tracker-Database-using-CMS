"use strict";
// This file is formatting how the tables are displayed
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayTableWithoutIndex = void 0;
const cli_table3_1 = __importDefault(require("cli-table3"));
function displayTableWithoutIndex(data) {
    if (data.length === 0) {
        console.log('No data available.');
        return;
    }
    const headers = Object.keys(data[0]);
    const table = new cli_table3_1.default({
        head: headers,
        colWidths: headers.map(() => 20),
    });
    data.forEach(row => {
        table.push(headers.map(header => row[header]));
    });
    console.log(table.toString());
}
exports.displayTableWithoutIndex = displayTableWithoutIndex;
