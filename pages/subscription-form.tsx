import { OfficeInfo } from '@/components/OfficeInfo'
import { GetStaticProps } from 'next'
import Head from "next/head";
import { HorizontalRule } from "../components/HorizontalRule";
import SubscriptionForm from "../components/SubscriptionForm";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
        },
    }
}

export default function SubscriptionPage() {
    const pageTitle = "Mi TIE - Subscripción de Notificaciones de Lote TIE";
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

            <div className="flex flex-col items-start w-full space-y-4">
                <div className="flex-col space-y-3 text-gray-700 text-center w-full">
                    <div>Aquí te podrás susbcribir a nuestro servicio de avisos por WhatsApp, este servicio es Pago.</div>
                    <div>Asegúrate que tus datos sean correctos y revisa nuestros <Link className="text-blue-700 underline" href="./tc">Términos y Condiciones.</Link></div>
                </div>
                <div className="w-full">
                    <button
                        type="button"
                        className="bg-blue-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        <a href="https://buy.stripe.com/eVa2aX5k59ricucdQQ">
                            Subscribirme por 0.99€
                        </a>
                    </button>
                </div>
                <div className="w-full text-center">
                    Escríbemos a <a className="text-blue-700 underline" href="mailto:soporte@mi-tie.es">soporte@mi-tie.es</a> por cualquier duda.
                </div>
            </div>
        </>
    )
}
