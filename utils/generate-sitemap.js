const fs = require("fs");
const globby = require("globby");
const DATA = require("../public/data").DATA;

const getDate = new Date().toISOString();

const YOUR_AWESOME_DOMAIN = "https://cryptorationale.com";

(async () => {
  const pages = await globby([
    // include
    "pages/*.js",
    // exclude
    // "!../pages/**/_*.js",
    "!pages/_*.js",
    // "!../pages/api",
  ]);

  const allPages = pages.concat(
    Object.keys(DATA).map((id) => `exchanges/${id}`)
  );

  // console.log(
  //   allPages.map((page) => page.replace("pages/", "").replace(".js", ""))
  // );

  const pagesSitemap = `
    ${allPages
      .map((page) => {
        const path = page.replace("pages/", "").replace(".js", "");
        const routePath = path === "index" ? "" : path;
        return `
          <url>
            <loc>${YOUR_AWESOME_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
      })
      .join("")}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${pagesSitemap}
    </urlset>
  `;

  fs.writeFileSync("public/sitemap.xml", generatedSitemap.trim(), "utf8");
})();
