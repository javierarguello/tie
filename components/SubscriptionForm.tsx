import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SubscriptionForm: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            loteTIE: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            loteTIE: Yup.string().matches(/^\d{4}\/\d{3,5}$/, 'Formato de Lote TIE no válido').required('Requerido'),
            phoneNumber: Yup.string().matches(/^(\+34|0034)?[6789]\d{8}$/, 'Teléfono inválido').required('Requerido'),
        }),
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="loteTIE" className="block text-gray-700 font-bold mb-2">
                    Lote TIE (ejemplo 2023/999)
                </label>
                <input
                    type="text"
                    id="loteTIE"
                    name="loteTIE"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.loteTIE}
                    className={`border rounded-md w-full px-3 py-2 ${formik.errors.loteTIE && formik.touched.loteTIE ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {formik.touched.loteTIE && formik.errors.loteTIE && (
                    <div className="text-red-500 mt-1">{formik.errors.loteTIE}</div>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                    Tu número de celular con WhatsApp
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    className={`border rounded-md w-full px-3 py-2 ${formik.errors.phoneNumber && formik.touched.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="text-red-500 mt-1">{formik.errors.phoneNumber}</div>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
                Subscribirme por 0.99€
            </button>
        </form>
    );
};

export default SubscriptionForm;
