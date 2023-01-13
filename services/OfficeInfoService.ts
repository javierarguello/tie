import { IOffice } from "@/models/office";
import puppeteer from "puppeteer";

export const offices: IOffice[] = [
    {
        name: "Barcelona C/Mallorca 213",
        url: "https://webparainmigrantes.com/numero-lote-nie-mallorca-213-de-barcelona",
        location: ""
    },
    {
        name: "Av. Poblados Madrid",
        url: "https://webparainmigrantes.com/lote-nie-avenida-poblados-madrid",
        location: ""
    },
    {
        name: "Las Palmas Gran Canaria",
        url: "https://webparainmigrantes.com/numero-lote-nie-las-palmas",
        location: ""
    },
    {
        name: "Alcobendas",
        url: "https://webparainmigrantes.com/cita-previa-extranjeria-alcobendas-y-lote-tie",
        location: ""
    },
    {
        name: "Alicante C/Mirra",
        url: "https://webparainmigrantes.com/tie-extranjeria-alicante-oficina-campo-de-mirra",
        location: ""
    },
    {
        name: "Valencia",
        url: "https://webparainmigrantes.com/oficina-extranjeros-valencia",
        location: ""
    }
]

export const updateInfo = async (): Promise<IOffice[]> => {
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const officeBatches = await Promise.all(offices.map(async office => {
        const page = await browser.newPage();

        await page.goto(office.url);

        const extractedText = await page.$eval('*', (el) => el.textContent);
        if (extractedText && extractedText.length > 0) {
            const matches = extractedText.match(/\d+\/\d+/g);

            const currentBatch = matches?.map(m => m.split("/"))
                .filter(m => m.length >= 2)
                .filter(m => m[0]?.length >= 3 && m[1]?.length >= 3)
                .map(m => {
                    return {
                        year: parseInt(m[0].length > 3 ? m[0] : m[1]),
                        batch: parseInt(m[1].length > 3 ? m[0] : m[1]),
                        updatedAt: Date.now()
                    };
                })
                .sort((a, b) => b.year - a.year)
                .sort((a, b) => b.batch - a.batch)
                .at(0);
            return {
                ...office,
                currentBatch: currentBatch ?? null
            }
        }

        return {
            ...office,
            currentBatch: null
        };
    }));

    return officeBatches;
}