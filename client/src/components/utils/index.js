
export const trimText = (text, length = 100) => {
    return text.length > length ? text.slice(0, length - 3) + "..." : text
}