import Image from 'next/image'
import { Poppins } from '@next/font/google'
import { PageSEO } from '@/components/PageSEO'
import { HorizontalRule } from "@/components/HorizontalRule"
import Link from "next/link";

const poppins = Poppins({ weight: ["400", "800", "900"], subsets: ["latin"] });
const poppinsStrong = Poppins({ weight: ["900"], subsets: ["latin"] });

export default function MainLayout({ children }: { children: JSX.Element }) {
    return (
        <>
            <PageSEO title="Mi TIE" description="Información del estado de entrega de TIE en comisarías de España" />
            <main className={`flex flex-col ${poppins.className} m-5 text-sm items-center md:px-10 px-5 space-y-4`}>
                <div className="flex flex-row items-start justify-left space-x-4">
                    <Link href={"/"}>
                        <div className="min-w-[60px]">

                            <Image src="/mitie.png" alt="Mi TIE" width={120} height={14} />
                        </div>
                    </Link>
                    <div className={`text-3xl font-bold ${poppinsStrong.className}`}>Información de tu TIE</div>
                </div>
                <div className="text-gray-700">Consulta aquí los últimos lotes para recoger tu TIE en las comisarías de España</div>
                <HorizontalRule />
                {children}
            </main>
        </>
    )
}
