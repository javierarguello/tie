import { IOffice } from "../models/office"
import puppeteer from "puppeteer"

export const offices: IOffice[] = [
  {
    name: "Barcelona C/Mallorca 213",
    url: "https://webparainmigrantes.com/numero-lote-nie-mallorca-213-de-barcelona",
    location:
      "https://www.google.com/maps/place/Polic%C3%ADa+Nacional/@41.3910163,2.1585693,15z/data=!4m2!3m1!1s0x0:0x45a94ec8c78852dc?sa=X&ved=2ahUKEwivuInd_sb8AhVkaqQEHS0WBxwQ_BJ6BAhkEAg",
  },
  {
    name: "Av. Poblados Madrid",
    url: "https://webparainmigrantes.com/lote-nie-avenida-poblados-madrid",
    location:
      "https://www.google.com/maps/place/Comisar%C3%ADa+Polic%C3%ADa+Nacional+de+Latina/@40.38283,-3.7601366,17z/data=!3m1!4b1!4m5!3m4!1s0xd418841c3114915:0x7dfec4eb3d964e64!8m2!3d40.38283!4d-3.7575617",
  },
  {
    name: "Santa Engracia Madrid",
    url: "https://webparainmigrantes.com/extranjeria-santa-engracia-lote-nie",
    location:
      "https://www.google.com/maps/place/Calle+de+Sta+Engracia,+18,+28010+Madrid/data=!4m2!3m1!1s0xd42288c454a871f:0x5adb4c735cf57aca?sa=X&ved=2ahUKEwiCn-S-l7eCAxWpSfEDHacOCgkQ8gF6BAggEAA",
  },
  {
    name: "Las Palmas Gran Canaria",
    url: "https://webparainmigrantes.com/numero-lote-nie-las-palmas",
    location:
      "https://www.google.com/maps/place/Oficina+De+Extranjer%C3%ADa+en+Las+Palmas+de+Gran+Canaria/@28.1131027,-15.4215238,15z/data=!4m2!3m1!1s0x0:0xf9043ca858a2d157?sa=X&ved=2ahUKEwjQw_yV_8b8AhV3aqQEHQDzB2EQ_BJ6BAhpEAg",
  },
  {
    name: "Alcobendas",
    url: "https://webparainmigrantes.com/cita-previa-extranjeria-alcobendas-y-lote-tie",
    location:
      "https://www.google.com/maps/place/Comisar%C3%ADa+Polic%C3%ADa+Nacional+de+Alcobendas/@40.5472067,-3.6356341,15z/data=!4m2!3m1!1s0x0:0xcb5d9d0911c73f76",
  },
  {
    name: "Alicante C/Mirra",
    url: "https://webparainmigrantes.com/tie-extranjeria-alicante-oficina-campo-de-mirra",
    location:
      "https://www.google.com/maps/place/TIE+Extranjer%C3%ADa/@38.3584862,-0.4963129,15z/data=!4m2!3m1!1s0x0:0x894fbea6208a789?sa=X&ved=2ahUKEwiym4Kv_8b8AhXNUKQEHdUvAX0Q_BJ6BAheEAg",
  },
  {
    name: "Valencia",
    url: "https://webparainmigrantes.com/oficina-extranjeros-valencia",
    location:
      "https://www.google.com/search?rlz=1C5CHFA_enMX1002MX1002&tbs=lf:1,lf_ui:2&tbm=lcl&sxsrf=AJOqlzUUMLkAmPtIbw6W5ba2t5c1l5DcnQ:1673697111122&q=valencia+oficina+de+extranjeria&rflfq=1&num=10&rldimm=10053576862908538673&ved=2ahUKEwjllZTO_8b8AhWrSvEDHb3LCwYQu9QIegQIDBAJ#rlfi=hd:;si:10053576862908538673;mv:[[39.493094899999996,-0.3654415],[39.4584434,-0.41372729999999996]];tbs:lrf:!1m4!1u2!2m2!2m1!1e1!2m1!1e2!3sIAE,lf:1,lf_ui:2",
  },
]

export const updateInfo = async (): Promise<IOffice[]> => {
  console.log("Init updating offices...")

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  })

  const officeBatches = await Promise.all(
    offices.map(async (office) => {
      const page = await browser.newPage()

      await page.goto(office.url)

      // const extractedText = await page.$eval("*", (el) => el.textContent)

      const allText: string[] = await page.evaluate(() => {
        const elements = document.querySelectorAll(
          ".the-content :not(#rank-math-faq)"
        )
        const results: string[] = []
        elements.forEach((element) => {
          if (
            element.textContent != null &&
            element.closest("#rank-math-faq") == null
          ) {
            results.push(element.textContent)
          }
        })
        return results
      })

      const allMatches = allText.join(" ").match(/(20\d{2}\/\d{3,4})/g)

      if (allMatches != null && allMatches.length > 0) {
        const allBatches = allMatches
          ?.map((m) => m.split("/"))
          .filter((m) => m.length >= 2)
          .filter((m) => m[0]?.length >= 3 && m[1]?.length >= 3)
          .map((m) => {
            return {
              year: parseInt(m[0]),
              batch: parseInt(m[1]),
              updatedAt: Date.now(),
            }
          })
          .map((m) => ({
            ...m,
            sortKey: m.year * 10000 + m.batch,
          }))
          .sort((a, b) => b.sortKey - a.sortKey)

        const currentBatch = allBatches?.at(0)

        return {
          ...office,
          currentBatch: currentBatch ?? null,
        }
      }

      return {
        ...office,
        currentBatch: null,
      }
    })
  )

  await browser.close()
  console.log("End updating offices", officeBatches)
  return officeBatches
}
