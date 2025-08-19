'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomerData = useCustomerData;
const react_query_1 = require("@tanstack/react-query");
function useCustomerData(customerId) {
    const { data: customer, isLoading, error } = (0, react_query_1.useQuery)({
        queryKey: ['customer', customerId],
        queryFn: async () => {
            // Mock data - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                id: customerId,
                name: 'أحمد محمد العلي',
                company: 'شركة النور للتقنية',
                email: 'ahmed@alnoor-tech.com',
                phone: '+966501234567',
                region: 'الرياض',
                status: 'active',
                createdAt: '2024-01-15',
                engagementScore: 85,
                totalDeals: 3,
                totalValue: 450000,
                lastContactDays: 2,
                responseRate: 92,
                activeDeals: [
                    {
                        id: '1',
                        title: 'نظام إدارة المخزون',
                        value: 150000,
                        stage: 'proposal'
                    },
                    {
                        id: '2',
                        title: 'تطبيق الجوال',
                        value: 85000,
                        stage: 'negotiation'
                    }
                ]
            };
        },
        enabled: !!customerId,
    });
    return {
        customer,
        isLoading,
        error
    };
}
//# sourceMappingURL=useCustomerData.js.map