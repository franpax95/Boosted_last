export const beautifyDate = str => {
    const date = new Date(str);

    const yyyy = date.getFullYear().toString().padStart(4, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");

    const hh = date.getHours().toString().padStart(2, "0");
    const mn = date.getMinutes().toString().padStart(2, "0");


    return `${dd}-${mm}-${yyyy} ${hh}:${mn}`;
}
