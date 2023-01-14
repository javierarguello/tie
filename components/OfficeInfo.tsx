import { IOfficeCurrentBatch } from "@/models/office";
import React from 'react'
import { HorizontalRule } from "./HorizontalRule";

export const OfficeInfo = ({ name, location, currentBatch }: { name: string; location?: string; currentBatch?: IOfficeCurrentBatch | null; }) => {
    const formatDatePart = (date: number) => date.toString().padStart(2, "0");
    const getFormattedDate = (timestamp: number) => {
        const updatedAt = new Date(timestamp);
        return `${formatDatePart(updatedAt.getDate())}/${formatDatePart(updatedAt.getMonth() + 1)}/${formatDatePart(updatedAt.getFullYear())}`;
    };
    return (
        <>
            <div className="flex flex-row space-x-5 text-gray-700">
                <div className="text-blue-800 w-32 md:w-80">
                    {location ?
                        <a href={location} target="_blank">{name}</a>
                        : name}
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-row space-x-2">
                        <div>Lote</div>
                        <div className="font-bold">{currentBatch ? `${currentBatch.year}/${currentBatch.batch}` : "N/D"}</div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div>Actualizado</div>
                        <div>{currentBatch ? getFormattedDate(currentBatch.updatedAt) : "N/D"}</div>
                    </div>
                </div>
            </div>
            <HorizontalRule />
        </>
    )
}
