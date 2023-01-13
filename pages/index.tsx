import Image from 'next/image'
import { Poppins } from '@next/font/google'
import { PageSEO } from '@/components/PageSEO'
import { OfficeInfo } from '@/components/OfficeInfo'
import { HorizontalRule } from "@/components/HorizontalRule"
import { GetStaticProps } from 'next'
import { IOffice } from "../models/office";
import fsPromises from 'fs/promises'
import path from 'path'

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });
const poppinsStrong = Poppins({ weight: ["900"], subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async (context) => {
  const jsonData = await fsPromises.readFile(path.join(process.cwd(), "./data/offices.json"));
  const offices = JSON.parse(jsonData.toString()) as IOffice[];
  return {
    props: {
      offices: offices
    },
  }
}

export default function Home({ offices }: { offices: IOffice[] }) {
  return (
    <>
      <PageSEO title="Mi TIE" description="Información de tu TIE" />
      <main className={`flex flex-col ${poppins.className} m-5 text-sm items-center md:px-10 px-5 space-y-4`}>
        <div className="flex flex-row items-start justify-left space-x-4">
          <div className="min-w-[60px]">
            <Image src="/mitie.png" alt="Mi TIE" width={120} height={14} />
          </div>
          <div className={`text-3xl font-bold ${poppinsStrong.className}`}>Información de tu TIE</div>
        </div>
        <div className="text-gray-700">Consulta aquí los últimos lotes para recoger tu TIE en las comisarías</div>
        <HorizontalRule />
        <div className="flex flex-col items-start w-full">
          {offices.map(office =>
            <OfficeInfo key={office.name} name={office.name} currentBatch={office.currentBatch} />
          )}
        </div>
      </main>
    </>
  )
}
