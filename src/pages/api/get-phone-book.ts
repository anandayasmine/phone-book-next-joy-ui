import { ContactAPI } from "@/app/data/api";

type TReq = {
  query: {
    query?: object | undefined;
    body?: object | undefined;
    id?: string | number | undefined;
  } | null;
};

type TRes = {
  status: (arg0: number) => {
    (): any;
    new (): any;
    json: {
      (arg0: { status: any; message?: any; payload?: any }): void;
      new (): any;
    };
  };
};

export default async (req: TReq, res: TRes) => {
  const data = await ContactAPI.getData(req.query);
  console.log("🚀 ~ file: get-phone-book.ts ~ line 24 ~ data", data)

  if (data.error) {
    res.status(200).json({ status: data.status, message: data.error });
  } else {
    res.status(200).json({ status: data.status, payload: data });
  }
};
