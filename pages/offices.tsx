import { OfficeInfo } from '@/components/OfficeInfo'
import { GetStaticProps } from 'next'
import { IOffice } from "../models/office";
import fsPromises from 'fs/promises'
import path from 'path'

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
  return (
    <div className="flex flex-col items-start w-full">
      {offices.map(office =>
        <OfficeInfo key={office.name} name={office.name} location={office.location} currentBatch={office.currentBatch} />
      )}
    </div>
  )
}
