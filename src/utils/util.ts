import { usePapaParse } from "react-papaparse";

exports.downloadResource = (
  res: any,
  fileName: string,
  fields: any,
  data: any
) => {
  const { jsonToCSV } = usePapaParse();

  const csv = jsonToCSV(data);
  res.header("Content-Type", "text/csv");
  res.attachment(fileName);
  return res.send(csv);
};
