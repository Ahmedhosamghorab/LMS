"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello from Express + TypeScript Server!');
});
app.listen(port, () => {
    console.log(`\x1b[32m[server]: Server is running at http://localhost:${port}\x1b[0m`);
});
//# sourceMappingURL=index.js.map