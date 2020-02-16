export const lowerCase = string => string.replace(/^\w/, c => c.toLowerCase())

export const kebabCase = string => lowerCase(string).replace(/ /g, '-')

export const capitalize = string => string.replace(/^\w/, c => c.toUpperCase())

export const usdFormat = num => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
}).format(num / 100)

export const totalPrice = purchasedItems => purchasedItems.reduce((total, { price }) => total + price, 0)

export const formatDate = timestamp => new Date(timestamp).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
})