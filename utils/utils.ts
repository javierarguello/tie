export const postId2Tile = (id: string) => {
    return id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export const getFirstParagraph = (htmlContent: string) => {
    const endOfFirstParagraphIndex = htmlContent.toLowerCase().indexOf("</p>");
    return htmlContent.substring(0, endOfFirstParagraphIndex + 4).trim();
}

export const removeHtmlFromContent = (htmlContent: string) => {
    return htmlContent.replace(/(<([^>]+)>)/ig, "");
}