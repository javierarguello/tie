import { OfficeInfo } from '@/components/OfficeInfo'
import { GetStaticProps } from 'next'
import Head from "next/head";
import { HorizontalRule } from "../components/HorizontalRule";
import SubscriptionForm from "../components/SubscriptionForm";

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
        },
    }
}

export default function SubscriptionPage() {
    const pageTitle = "Mi TIE - Términos y Condiciones";
    const description = "Términos y Condiciones Servicio de Subscripción de Notificaciones de Lote TIE"
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
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4">Términos y Condiciones del Servicio</h1>
                    <p className="mb-4 font-bold">1. Aceptación de los Términos y Condiciones:</p>
                    <p className="mb-4">
                        Al utilizar el servicio de suscripción de notificaciones por WhatsApp para los lotes de TIE en Migraciones, aceptas automáticamente los términos y condiciones aquí presentados. Si no estás de acuerdo con alguno de los términos, te rogamos que no utilices el servicio.
                    </p>
                    <p className="mb-4 font-bold">2. Servicio de Suscripción:</p>
                    <p className="mb-4">
                        El servicio proporcionado tiene como finalidad enviar notificaciones a través de la plataforma de mensajería WhatsApp cuando Migraciones publique los lotes de Tarjeta de Identidad de Extranjero. No obstante, es importante aclarar que las notificaciones pueden experimentar retrasos y/o no llegar a tiempo, pudiendo tardar hasta 10 días desde la publicación oficial.
                    </p>
                    <p className="mb-4 font-bold">3. Uso Responsable:</p>
                    <p className="mb-4">
                        El usuario se compromete a hacer un uso responsable y adecuado del servicio de suscripción de notificaciones. Queda prohibido utilizar este servicio para cualquier propósito ilegal, inmoral o que pueda violar los derechos de terceros. Además, no se podrá utilizar el servicio para fines comerciales o de lucro personal.
                    </p>
                    <p className="mb-4 font-bold">4. No Garantía de Entrega o Tiempo:</p>
                    <p className="mb-4">
                        Si bien nos esforzamos por proporcionar un servicio confiable y oportuno, no podemos garantizar la entrega de las notificaciones de manera inmediata ni asegurar que todas las notificaciones serán entregadas con éxito. El usuario reconoce que pueden existir circunstancias ajenas a nuestro control que afecten la entrega de las notificaciones.
                    </p>
                    <p className="mb-4 font-bold">5. No Reembolso:</p>
                    <p className="mb-4">
                        El costo asociado al servicio de suscripción de notificaciones por WhatsApp no es reembolsable bajo ninguna circunstancia. Independientemente de si se reciben o no las notificaciones oportunamente, no se realizarán devoluciones del dinero.
                    </p>
                    <p className="mb-4 font-bold">6. Privacidad y Datos Personales:</p>
                    <p className="mb-4">
                        El usuario reconoce y acepta que al utilizar el servicio, proporcionará su número de teléfono y otros datos personales. Nos comprometemos a proteger la privacidad de tus datos y a utilizarlos únicamente con fines relacionados con el servicio de suscripción. Puedes consultar nuestra Política de Privacidad para obtener más información sobre el tratamiento de tus datos personales.
                    </p>
                    <p className="mb-4 font-bold">7. Modificaciones a los Términos y Condiciones:</p>
                    <p className="mb-4">
                        Nos reservamos el derecho de realizar modificaciones a estos términos y condiciones en cualquier momento. En caso de que se realicen cambios significativos, te notificaremos por medio de la plataforma WhatsApp y/o publicaremos una versión actualizada de los términos en nuestro sitio web.
                    </p>
                    <p className="mb-4 font-bold">8. Finalización del Servicio:</p>
                    <p className="mb-4">
                        Tanto el usuario como nosotros podemos dar por terminado el servicio de suscripción de notificaciones en cualquier momento y sin previo aviso. En caso de incumplimiento de estos términos y condiciones, nos reservamos el derecho de cancelar la suscripción sin derecho a reembolso.
                    </p>
                </div>
            </div>
        </>
    )
}
