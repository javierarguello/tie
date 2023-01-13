// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as OfficeInfoService from "../../services/OfficeInfoService";

type ResultData = {
  ok: boolean;
  offices?: any;
}

const API_ACCESS_CODE = process.env.API_ACCESS_CODE;

const isValidAccessCode = (authorization?: string) => {
  if (authorization && authorization.length > 0) {
    const token = authorization.split("Bearer").at(1)?.trim();
    return token === API_ACCESS_CODE;
  }
  return false;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultData>
) {

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }
  if (!isValidAccessCode(req.headers.authorization)) {
    return res.status(403).json({ ok: false });
  }

  const officeBatches = await OfficeInfoService.updateInfo();
  res.status(200).json({ ok: true, offices: officeBatches });
}
