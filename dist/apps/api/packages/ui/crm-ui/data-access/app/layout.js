"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
const google_1 = require("next/font/google");
const providers_1 = require("./providers");
const inter = (0, google_1.Inter)({ subsets: ['latin'] });
exports.metadata = {
    title: 'AzizSys CRM - قمرة القيادة التفاعلية',
    description: 'واجهة CRM متقدمة مع ذكاء اصطناعي',
};
function RootLayout({ children, }) {
    return (<html lang="ar" dir="rtl" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <providers_1.Providers>
          {children}
        </providers_1.Providers>
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map