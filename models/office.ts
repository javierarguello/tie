export interface IOffice {
    name: string;
    url: string;
    location?: string;
    currentBatch?: IOfficeCurrentBatch | null;
}

export interface IOfficeCurrentBatch {
    year: number;
    batch: number;
    updatedAt: number;
}