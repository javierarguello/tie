import { OfficeInfo } from "@/components/OfficeInfo"
import { GetStaticProps } from "next"
import { IOffice } from "../models/office"
import fsPromises from "fs/promises"
import path from "path"
import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { HorizontalRule } from "../components/HorizontalRule"

export const getStaticProps: GetStaticProps = async (context) => {
  const jsonData = await fsPromises.readFile(
    path.join(process.cwd(), "./data/offices.json")
  )
  const offices = JSON.parse(jsonData.toString()) as IOffice[]
  return {
    props: {
      offices: offices,
    },
  }
}

const comments = [
  "¡Fantástico! Recibí el aviso de mi TIE por WhatsApp y fue súper cómodo. ¡Adiós a las esperas innecesarias! #TIEListo #ServicioRápido- José María",
  "Acabo de usar este servicio para mi TIE y estoy impresionada. La alerta por WhatsApp llegó justo a tiempo. ¡Muy eficiente! #TIEEspaña #Comodidad - Karina",
  "Recibir notificaciones de mi TIE por WhatsApp cambió el juego. Rápido, fácil y sin estrés. ¡Gracias por este servicio genial! #Innovación #ServicioExcelente - Glenn",
]

export default function Offices({ offices }: { offices: IOffice[] }) {
  const pageTitle = "Mi TIE - Consulta los últimos Lotes de TIE"
  const description = "Últimos Lotes de TIE"

  const [currentCommentIndex, setCurrentCommentIndex] = useState(0)

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCurrentCommentIndex(
        (currentCommentIndex) => (currentCommentIndex + 1) % comments.length
      )
    }, 1000 * 7)
    return () => {
      if (timer1 != null) {
        clearInterval(timer1)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={""} key="description" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:title" content={pageTitle} key="og:title" />
        <meta property="title" content={pageTitle} key="title" />
      </Head>

      <div className="flex flex-col items-start w-full">
        <div className="flex-col space-y-3 text-gray-700 text-center w-full">
          <div>
            Si deseas, te avisamos por WhatsApp cuando tu Lote sea publicado.
          </div>
          <button className="bg-blue-400 text-white rounded-md h-10 w-80">
            <Link href={"./subscription-form"}>
              Subscribirme al aviso por WhatsApp
            </Link>
          </button>
        </div>
        <div>
          <blockquote className="text-sm italic text-gray-900 pt-3">
            <svg
              className="w-4 h-4 text-gray-400 dark:text-gray-600 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <p className="bg-gray-100 p-2 rounded-xl justify-between">"{comments[currentCommentIndex]}"</p>
          </blockquote>
        </div>
        <HorizontalRule />
        {offices.map((office) => (
          <OfficeInfo
            key={office.name}
            name={office.name}
            location={office.location}
            currentBatch={office.currentBatch}
          />
        ))}
      </div>
    </>
  )
}
