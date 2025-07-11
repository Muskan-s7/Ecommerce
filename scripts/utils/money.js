export function formatCurrency(priceCents){
    return (Math.round(priceCents)/100).toFixed(2);//displays 2 decimal places
}

export default formatCurrency;