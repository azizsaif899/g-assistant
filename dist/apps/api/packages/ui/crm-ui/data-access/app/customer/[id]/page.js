"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomerPage;
const CustomerProfile_1 = require("../../components/customer/CustomerProfile");
function CustomerPage({ params }) {
    return <CustomerProfile_1.CustomerProfile customerId={params.id}/>;
}
//# sourceMappingURL=page.js.map