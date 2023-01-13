import Head from 'next/head'
import Image from 'next/image'
import { Inter, Poppins } from '@next/font/google'
import { PageSEO } from '@/components/PageSEO'
import { OfficeInfo } from '@/components/OfficeInfo'
import { HorizontalRule } from "@/components/HorizontalRule"
import { GetServerSideProps } from 'next'
import * as OfficeInfoService from "../services/OfficeInfoService";
import { IOffice } from "../models/office";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });
const poppinsStrong = Poppins({ weight: ["900"], subsets: ["latin"] });

const CACHE_TIME_IN_MIN = parseInt(process.env.CACHE_TIME_IN_MIN as string);
let lastOfficeUpdateTimestamp: number | null = null;
let offices: IOffice[] | null;

const tryUpdateOffices = async () => {
  try {
    console.log("Updating offices...");
    offices = await OfficeInfoService.updateInfo();
    lastOfficeUpdateTimestamp = Date.now();
  } catch (error) {
    console.error("Error updating offices", error);
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!offices || !lastOfficeUpdateTimestamp || (Date.now() - lastOfficeUpdateTimestamp) / 1000 / 60 >= CACHE_TIME_IN_MIN) {
    await tryUpdateOffices();
  }

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
