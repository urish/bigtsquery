declare module '@google-cloud/bigquery' {
  class Bigquery {
    public query<T = any>(options: {
      query: string;
      params?: any[];
      maxResults?: number;
    }): Promise<[T[]]>;
  }

  function create(options?: any): Bigquery;

  namespace create {

  }

  export = create;
}
