import { OfficeInfo } from '@/components/OfficeInfo'
import { GetStaticProps } from 'next'
import { IOffice } from "../models/office";
import fsPromises from 'fs/promises'
import path from 'path'
import Head from "next/head";
import { HorizontalRule } from "../components/HorizontalRule";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
  const jsonData = await fsPromises.readFile(path.join(process.cwd(), "./data/offices.json"));
  const offices = JSON.parse(jsonData.toString()) as IOffice[];
  return {
    props: {
      offices: offices
    },
  }
}

export default function Offices({ offices }: { offices: IOffice[] }) {
  const pageTitle = "Mi TIE - Consulta los últimos Lotes de TIE";
  const description = "Últimos Lotes de TIE"
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={""} key="description" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:title" content={pageTitle} key="og:title" />
        <meta property="title" content={pageTitle} key="title" />
      </Head>

      <div className="flex flex-col items-start w-full">
        <div className="flex-col space-y-3 text-gray-700 text-center w-full">
          <div>Si deseas, te avisamos por WhatsApp cuando tu Lote sea publicado.</div>
          <button className="bg-blue-400 text-white rounded-md h-10 w-80" >
            <Link href={"./subscription-form"}>Subscribirme al aviso por WhatsApp</Link>
          </button>
        </div>
        <HorizontalRule />
        {offices.map(office =>
          <OfficeInfo key={office.name} name={office.name} location={office.location} currentBatch={office.currentBatch} />
        )}
      </div>
    </>
  )
}
