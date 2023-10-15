import axios from "axios";

type TParams = null | {
  query?: object;
  variables?: object;
  body?: object;
  id?: string | number;
};

export async function getData(params: TParams) {
  console.log("🚀 ~ file: ContactAPI.ts ~ line 10 ~ getData ~ params", params);

  const graphqlEndpoint = "https://wpe-hiring.tokopedia.net/graphql";

  const graphqlQuery = `
  query Contact($where: contact_bool_exp, $orderBy: [contact_order_by!]) {
    contact(where: $where, order_by: $orderBy) {
      created_at
      first_name
      id
      last_name
      updated_at
      phones {
        number
      }
    }
  }
`;

  try {
    const { data, status } = await axios.post(graphqlEndpoint, {
      query: graphqlQuery,
      variables: params?.variables,
      headers: {
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Origin": "https://wpe-hiring.tokopedia.net",
      },
    });
    console.log("🚀 ~ file: ContactAPI.ts ~ line 38 ~ getData ~ data", data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        "🚀 ~ file: ContactAPI.ts ~ line 56 ~ getData ~ error",
        error.message
      );
      return { error: error.message };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function getDataRouting(params: TParams) {
  try {
    const { data, status } = await axios.get("/api/get-phone-book");
    console.log(
      "🚀 ~ file: ContactAPI.ts ~ line 85 ~ getDataRouting ~ data, status ",
      data,
      status
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return { error: error.message };
    } else {
      console.log("unexpected error: ", error);
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function postData(params: TParams) {
  console.log("🚀 ~ file: ContactAPI.ts ~ line 10 ~ postData ~ params", params);

  const graphqlEndpoint = "https://wpe-hiring.tokopedia.net/graphql";

  const graphqlQuery = `
  mutation Insert_contact_one($object: contact_insert_input!) {
    insert_contact_one(object: $object) {
      first_name
      last_name
      id
      phones {
        number
      }
    }
  }
`;

  try {
    const { data, status } = await axios.post(graphqlEndpoint, {
      query: graphqlQuery,
      variables: params?.variables,
      headers: {
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Origin": "https://wpe-hiring.tokopedia.net",
      },
    });
    console.log("🚀 ~ file: ContactAPI.ts ~ line 38 ~ postData ~ data", data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        "🚀 ~ file: ContactAPI.ts ~ line 56 ~ postData ~ error",
        error.message
      );
      return { error: error.message };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function putData(params: TParams) {
  console.log("🚀 ~ file: ContactAPI.ts ~ line 10 ~ postData ~ params", params);

  const graphqlEndpoint = "https://wpe-hiring.tokopedia.net/graphql";

  const graphqlQuery = `
  mutation Update_contact_by_pk($pkColumns: contact_pk_columns_input!, $set: contact_set_input) {
    update_contact_by_pk(pk_columns: $pkColumns, _set: $set) {
      first_name
      last_name
      id
      phones {
        number
      }
      created_at
      updated_at
    }
  }
`;

  try {
    const { data, status } = await axios.post(graphqlEndpoint, {
      query: graphqlQuery,
      variables: params?.variables,
      headers: {
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Origin": "https://wpe-hiring.tokopedia.net",
      },
    });
    console.log("🚀 ~ file: ContactAPI.ts ~ line 38 ~ postData ~ data", data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        "🚀 ~ file: ContactAPI.ts ~ line 56 ~ postData ~ error",
        error.message
      );
      return { error: error.message };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
}
