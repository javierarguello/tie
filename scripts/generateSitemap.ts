import { SITE_URL } from "../data/websiteData";
import fs from "fs";
import fsPromises from "fs/promises";
import prettier from "prettier";

; (async () => {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc.json")
    const pages = await fsPromises.readdir("./data/posts")

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://mi-tie.es/offices</loc></url>
            ${pages.map(page => page.split(".")[0])
            .map((page) => `<url><loc>${SITE_URL}/posts/${page}</loc></url>`)
            .join("")}
        </urlset>
    `

    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: "html",
    })

    // eslint-disable-next-line no-sync
    fs.writeFileSync("public/sitemap.xml", formatted)
})()
