
import { apiData } from '../data/apiData.js';
import { mockData } from '../data/mockData.js';

// Enhanced statistics calculation
export function calculateStats() {
    console.log(apiData)
    const total = apiData.reduce((sum, t) => {
        const amount = parseFloat(t.extracted_amount);
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    const received = apiData.filter(t => t.transaction_type === 'received')
        .reduce((sum, t) => {
            const amount = parseFloat(t.extracted_amount);
            return sum + (isNaN(amount) ? 0 : amount);
        }, 0);
    const payments = apiData.filter(t => t.transaction_type === 'payment')
        .reduce((sum, t) => {
            const amount = parseFloat(t.extracted_amount);
            return sum + (isNaN(amount) ? 0 : amount);
        }, 0);
    const uniqueContacts = new Set(apiData.map(t => t.sender_or_receiver)).size;

    // Additional stats
    const avgTransaction = total / apiData.length;
    const netFlow = received - payments;

    return { total, received, payments, uniqueContacts, avgTransaction, netFlow };
}

// Extract balance from transaction messages
export function extractBalance(body) {
    const balanceMatch = body.match(/balance[:\s]*([0-9,]+)\s*RWF/i);
    return balanceMatch ? parseFloat(balanceMatch[1].replace(/,/g, '')) : null;
}