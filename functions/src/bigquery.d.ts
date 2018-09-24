declare module '@google-cloud/common' {
  class Service {}
  class ServiceObject {}
  class Operation {}
  interface ApiResponse {}
  interface PaginationToken {}
  namespace util {
    class ApiError extends Error {
      errors: any[];
      response: ApiResponse;
    }
  }
}
declare module '@google-cloud/bigquery' {
  import * as common from '@google-cloud/common';
  import * as storage from '@google-cloud/storage';
  import * as stream from 'stream';

  export = BigQuery;

  class BigQuery extends common.Service {
    constructor(options: BigQuery.ClientConfig);

    readonly location: string;

    static date(value: string | BigQuery.BigQueryDateOptions): BigQuery.BigQueryDate;
    static datetime(value: string | BigQuery.BigQueryDateTimeOptions): BigQuery.BigQueryDateTime;
    static time(value: string | BigQuery.BigQueryTimeOptions): BigQuery.BigQueryTime;
    static timestamp(value: string | Date): BigQuery.BigQueryTimestamp;

    private static mergeSchemaWithRows_(schema, rows);
    private static getType_(value);
    private static valueToQueryParameter_(value);

    date(value: string | BigQuery.BigQueryDateOptions): BigQuery.BigQueryDate;
    datetime(value: string | BigQuery.BigQueryDateTimeOptions): BigQuery.BigQueryDateTime;
    time(value: string | BigQuery.BigQueryTimeOptions): BigQuery.BigQueryTime;
    timestamp(value: string | Date): BigQuery.BigQueryTimestamp;

    createDataset(
      id: string,
      callback: (
        err: Error | null,
        dataset: BigQuery.Dataset | null,
        apiResponse: common.ApiResponse,
      ) => void,
    ): void;
    createDataset(
      id: string,
      options: BigQuery.DatasetOptions | undefined,
      callback: (
        err: Error | null,
        dataset: BigQuery.Dataset | null,
        apiResponse: common.ApiResponse,
      ) => void,
    ): void;
    createDataset(
      id: string,
      options?: BigQuery.DatasetOptions,
    ): PromiseLike<[BigQuery.Dataset, common.ApiResponse]>;
    getDatasets(callback: (err: Error | null, datasets: BigQuery.Dataset[] | null) => void): void;
    getDatasets(
      options: BigQuery.DatasetsOptions & BigQuery.AutoPaginationOptions | undefined,
      callback: (err: Error | null, datasets: BigQuery.Dataset[] | null) => void,
    ): void;
    getDatasets(
      options: BigQuery.DatasetsOptions & BigQuery.ManualPaginationOptions,
      callback: (
        err: Error | null,
        datasets: BigQuery.Dataset[] | null,
        nextQuery: common.PaginationToken | null,
        apiResponse: storage.ApiResponse,
      ) => void,
    ): void;
    getDatasets(
      options?: BigQuery.DatasetsOptions & BigQuery.AutoPaginationOptions,
    ): Promise<[BigQuery.Dataset[]]>;
    getDatasets(
      options: BigQuery.DatasetsOptions & BigQuery.ManualPaginationOptions,
    ): Promise<[BigQuery.Dataset[], common.PaginationToken | null, common.ApiResponse]>;
    getDatasetsStream(
      options?: BigQuery.DatasetsOptions & BigQuery.PaginationOptions,
    ): BigQuery.ReadableObjectStream<BigQuery.Dataset>;
    dataset(id: string, options?: BigQuery.LocationOptions): BigQuery.Dataset;

    createJob(
      options: BigQuery.JobOptions,
      callback: (
        err: Error | null,
        job: BigQuery.Job | null,
        apiResponse: common.ApiResponse,
      ) => void,
    ): void;
    createJob(options: BigQuery.JobOptions): PromiseLike<[BigQuery.Job, common.ApiResponse]>;
    getJobs(callback: (err: Error | null, jobs: BigQuery.Job[] | null) => void): void;
    getJobs(
      options: BigQuery.JobsOptions & BigQuery.AutoPaginationOptions | undefined,
      callback: (err: Error | null, jobs: BigQuery.Job[] | null) => void,
    ): void;
    getJobs(
      options: BigQuery.JobsOptions & BigQuery.ManualPaginationOptions,
      callback: (
        err: Error | null,
        jobs: BigQuery.Job[] | null,
        nextQuery: common.PaginationToken | null,
        apiResponse: common.ApiResponse,
      ) => void,
    ): void;
    getJobs(
      options?: BigQuery.JobsOptions & BigQuery.AutoPaginationOptions,
    ): Promise<[BigQuery.Job[]]>;
    getJobs(
      options: BigQuery.JobsOptions & BigQuery.ManualPaginationOptions,
    ): Promise<[BigQuery.Job[], common.PaginationToken | null, common.ApiResponse]>;
    getJobsStream(
      options?: BigQuery.JobsOptions & BigQuery.PaginationOptions,
    ): BigQuery.ReadableObjectStream<BigQuery.Job>;
    job(id: string, options?: BigQuery.LocationOptions): BigQuery.Job;

    createQueryJob<T = any>(
      options: BigQuery.QueryJobOptions,
      callback: (
        err: Error | null,
        job: BigQuery.Job<T> | null,
        apiResponse: common.ApiResponse,
      ) => void,
    ): void;
    createQueryJob<T = any>(
      options: BigQuery.QueryJobOptions,
    ): PromiseLike<[BigQuery.Job<T>, common.ApiResponse]>;
    createQueryStream<T = any>(
      query: string | BigQuery.QueryWithPagination,
    ): BigQuery.ReadableObjectStream<T>;
    query<T = any>(
      query: string | BigQuery.Query,
      callback: (err: Error | null, rows: T[] | null, apiResponse: common.ApiResponse) => void,
    ): void;
    query<T = any>(
      query: string | BigQuery.Query,
      options: BigQuery.QueryOptions | undefined,
      callback: (err: Error | null, rows: T[] | null, apiResponse: common.ApiResponse) => void,
    ): void;
    query<T = any>(
      query: string | BigQuery.Query,
      options?: BigQuery.QueryOptions,
    ): Promise<[T[], common.ApiResponse]>;
  }

  namespace BigQuery {
    interface BigQueryDate {
      value: string;
    }
    interface BigQueryDateOptions {
      year: string | number;
      month: string | number;
      day: string | number;
    }
    interface BigQueryDateTime {
      value: string;
    }
    interface BigQueryDateTimeOptions {
      year: string | number;
      month: string | number;
      day: string | number;
      hours?: string | number;
      minutes?: string | number;
      seconds?: string | number;
      fractional?: string | number;
    }
    interface BigQueryTime {
      value: string;
    }
    interface BigQueryTimeOptions {
      hours?: string | number;
      minutes?: string | number;
      seconds?: string | number;
      fractional?: string | number;
    }
    interface BigQueryTimestamp {
      value: string;
    }
    type DataType =
      | BigQueryDate
      | BigQueryDateTime
      | BigQueryTime
      | number
      | string
      | boolean
      | object;
    interface ClientConfig {
      /**
       * The project ID from the Google Developer's
       * Console, e.g. 'grape-spaceship-123'. We will also check the environment
       * variable `GCLOUD_PROJECT` for your project ID. If your app is running in
       * an environment which supports {@link https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application Application Default Credentials},
       * your project ID will be detected automatically.
       */
      projectId?: string;
      /**
       * Full path to the a .json, .pem, or .p12 key
       * downloaded from the Google Developers Console. If you provide a path to a
       * JSON file, the `projectId` option above is not necessary. NOTE: .pem and
       * .p12 require you to specify the `email` option as well.
       */
      keyFilename?: string;
      /**
       * An OAUTH access token. If provided, we will not
       * manage fetching, re-using, and re-minting access tokens.
       */
      token?: string;
      /**
       * Account email address. Required when using a .pem
       * or .p12 keyFilename.
       */
      email?: string;
      /**
       * Credentials object.
       */
      credentials?: Credentials;
      /**
       * Automatically retry requests if the
       * response is related to rate limits or certain intermittent server errors.
       * We will exponentially backoff subsequent requests by default.
       */
      autoRetry?: boolean;
      /**
       * Maximum number of automatic retries
       * attempted before returning the error.
       */
      maxRetries?: number;
      /**
       * Custom promise module to use instead of
       * native Promises.
       */
      promise?: PromiseConstructorLike;
      /**
       * The geographic location of all datasets and
       * jobs referenced and created through the client.
       */
      location?: string;
      /**
       * Additional OAuth scopes to use in requests. For
       * example, to access an external data source, you may need the
       * `https://www.googleapis.com/auth/drive.readonly` scope.
       */
      scopes?: string[];
    }
    interface LocationOptions {
      location?: string;
    }
    interface PaginationOptions {
      autoPaginate?: boolean;
      maxApiCalls?: number;
      maxResults?: number;
      pageToken?: string;
    }
    interface AutoPaginationOptions extends PaginationOptions {
      autoPaginate?: true;
    }
    interface ManualPaginationOptions extends PaginationOptions {
      autoPaginate: false;
    }
    interface Credentials {
      client_email?: string;
      private_key?: string;
    }
    interface DatasetOptions extends LocationOptions {}
    interface DatasetsOptions {
      all?: boolean;
    }
    interface QueryJobOptions extends JobOptions {
      destination?: Table;
      dryRun?: boolean;
      query: string | Query;
      useLegacySql?: boolean;
    }
    interface JobOptions extends LocationOptions {
      jobId?: string;
      jobPrefix?: string;
    }
    interface JobsOptions {
      allUsers?: boolean;
      projection?: string;
      stateFilter?: string;
    }
    interface Query extends JobOptions {
      params: Record<string, DataType> | DataType[];
      query: string;
      useLegacySql?: boolean;
    }
    interface QueryWithPagination extends Query, PaginationOptions {}
    interface QueryOptions {
      maxResults?: number;
      timeoutMs?: number;
    }

    class Dataset extends common.ServiceObject {
      constructor(bigQuery: BigQuery, id: string, options?: DatasetOptions);

      readonly location: string | undefined;
      readonly bigQuery: BigQuery;

      createQueryJob<T = any>(
        options: QueryJobOptions,
        callback: (err: Error | null, job: Job<T> | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createQueryJob<T = any>(options: QueryJobOptions): PromiseLike<[Job<T>, common.ApiResponse]>;
      createQueryStream<T = any>(
        query: string | BigQuery.QueryWithPagination,
      ): ReadableObjectStream<T>;
      query<T = any>(
        query: string | Query,
        callback: (err: Error | null, rows: T[] | null, apiResponse: common.ApiResponse) => void,
      ): void;
      query<T = any>(
        query: string | Query,
        options: QueryOptions | undefined,
        callback: (err: Error | null, rows: T[] | null, apiResponse: common.ApiResponse) => void,
      ): void;
      query<T = any>(
        query: string | Query,
        options?: QueryOptions,
      ): Promise<[T[], common.ApiResponse]>;

      createTable<T = any>(
        id: string,
        callback: (
          err: Error | null,
          table: Table<T> | null,
          apiResponse: common.ApiResponse,
        ) => void,
      ): void;
      createTable<T = any>(
        id: string,
        options: Dataset.TableOptions | undefined,
        callback: (
          err: Error | null,
          table: Table<T> | null,
          apiResponse: common.ApiResponse,
        ) => void,
      ): void;
      createTable<T = any>(
        id: string,
        options?: Dataset.TableOptions,
      ): Promise<[Table<T>, common.ApiResponse]>;
      getTables(callback: (err: Error | null, tables: Table[] | null) => void): void;
      getTables(
        options: AutoPaginationOptions | undefined,
        callback: (err: Error | null, tables: Table[] | null) => void,
      ): void;
      getTables(
        options: ManualPaginationOptions,
        callback: (
          err: Error | null,
          tables: Table[] | null,
          nextQuery: common.PaginationToken | null,
          apiResponse: common.ApiResponse,
        ) => void,
      ): void;
      getTables(options?: AutoPaginationOptions): Promise<[Table[]]>;
      getTables(
        options: ManualPaginationOptions,
      ): Promise<[Table[], common.PaginationToken | null, common.ApiResponse]>;
      getTablesStream(options?: PaginationOptions): ReadableObjectStream<Table>;
      table<T = any>(id: string, options?: LocationOptions): Table<T>;

      delete(callback: (err: Error | null, apiResponse: common.ApiResponse) => void): void;
      delete(
        options: Dataset.DeleteOptions | undefined,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      delete(options?: Dataset.DeleteOptions): Promise<[common.ApiResponse]>;
    }

    namespace Dataset {
      interface TableOptions {
        schema?: string | object;
      }
      interface DeleteOptions {
        force?: boolean;
      }
    }

    class Job<T = any> extends common.Operation {
      constructor(bigQuery: BigQuery, id: string, options?: LocationOptions);

      readonly location: string | undefined;
      readonly bigQuery: BigQuery;

      cancel(callback: (err: Error | null, apiResponse: common.ApiResponse) => void): void;
      cancel(): Promise<[common.ApiResponse]>;

      getQueryResults(callback: (err: Error | null, rows: T[] | null) => void): void;
      getQueryResults(
        options: QueryOptions & AutoPaginationOptions | undefined,
        callback: (err: Error | null, rows: T[] | null) => void,
      ): void;
      getQueryResults(
        options: QueryOptions & ManualPaginationOptions,
        callback: (
          err: Error | null,
          rows: T[] | null,
          nextQuery: common.PaginationToken | null,
          apiResponse: common.ApiResponse,
        ) => void,
      ): void;
      getQueryResults(options?: QueryOptions & AutoPaginationOptions): Promise<[T[]]>;
      getQueryResults(
        options: QueryOptions & ManualPaginationOptions,
      ): Promise<[T[], common.PaginationToken | null, common.ApiResponse]>;
      getQueryResultsStream(options?: QueryOptions & PaginationOptions): ReadableObjectStream<T>;

      private poll_(callback);
    }

    class Table<T = any> extends common.ServiceObject {
      constructor(dataset: Dataset, id: string, options?: LocationOptions);

      readonly location: string | undefined;
      readonly bigQuery: BigQuery;
      readonly dataset: Dataset;

      copy(
        destination: Table<T>,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      copy(
        destination: Table<T>,
        metadata: Table.CopyMetadata | undefined,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      copy(destination: Table<T>, metadata?: Table.CopyMetadata): Promise<[common.ApiResponse]>;

      copyFrom(
        sourceTables: Table<T> | ReadonlyArray<Table<T>>,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      copyFrom(
        sourceTables: Table<T> | ReadonlyArray<Table<T>>,
        metadata: Table.CopyMetadata | undefined,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      copyFrom(
        sourceTables: Table<T> | ReadonlyArray<Table<T>>,
        metadata?: Table.CopyMetadata,
      ): Promise<[common.ApiResponse]>;

      createCopyJob(
        destination: Table<T>,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createCopyJob(
        destination: Table<T>,
        metadata: Table.CopyMetadata | undefined,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createCopyJob(
        destination: Table<T>,
        metadata?: Table.CopyMetadata,
      ): Promise<[Job, common.ApiResponse]>;

      createCopyFromJob(
        sourceTables: Table<T> | ReadonlyArray<Table<T>>,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createCopyFromJob(
        sourceTables: Table<T> | ReadonlyArray<Table<T>>,
        metadata: Table.CopyMetadata | undefined,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createCopyFromJob(
        sourceTables: Table<T> | ReadonlyArray<Table<T>>,
        metadata?: Table.CopyMetadata,
      ): Promise<[Job, common.ApiResponse]>;

      createExtractJob(
        destination: string | storage.File,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createExtractJob(
        destination: string | storage.File,
        options: Table.ExtractOrLoadOptions | undefined,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createExtractJob(
        destination: string | storage.File,
        options?: Table.ExtractOrLoadOptions,
      ): Promise<[Job, common.ApiResponse]>;

      createLoadJob(
        source: string | storage.File,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createLoadJob(
        source: string | storage.File,
        options: Table.ExtractOrLoadOptions | undefined,
        callback: (err: Error | null, job: Job | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createLoadJob(
        source: string | storage.File,
        options?: Table.ExtractOrLoadOptions,
      ): Promise<[Job, common.ApiResponse]>;

      createQueryJob<U = any>(
        options: QueryJobOptions,
        callback: (err: Error | null, job: Job<U> | null, apiResponse: common.ApiResponse) => void,
      ): void;
      createQueryJob<U = any>(options: QueryJobOptions): PromiseLike<[Job<U>, common.ApiResponse]>;

      createQueryStream<U = any>(
        query: string | BigQuery.QueryWithPagination,
      ): ReadableObjectStream<U>;

      extract(
        destination: string | storage.File,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      extract(
        destination: string | storage.File,
        options: Table.ExtractOrLoadOptions | undefined,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      extract(
        destination: string | storage.File,
        options?: Table.ExtractOrLoadOptions,
      ): Promise<[common.ApiResponse]>;

      getRows(callback: (err: Error | null, rows: T[] | null) => void): void;
      getRows(
        options: AutoPaginationOptions | undefined,
        callback: (err: Error | null, rows: T[] | null) => void,
      ): void;
      getRows(
        options: ManualPaginationOptions,
        callback: (
          err: Error | null,
          rows: T[] | null,
          nextQuery: common.PaginationToken | null,
          apiResponse: common.ApiResponse,
        ) => void,
      ): void;
      getRows(options?: AutoPaginationOptions): Promise<[T[]]>;
      getRows(
        options: ManualPaginationOptions,
      ): Promise<[T[], common.PaginationToken | null, common.ApiResponse]>;

      createReadStream(options: PaginationOptions): ReadableObjectStream<T>;

      insert(
        row: T | ReadonlyArray<T>,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      insert(
        row: T | ReadonlyArray<T>,
        options: Table.InsertOptions | undefined,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      insert(
        row: T | ReadonlyArray<T>,
        options?: Table.InsertOptions,
      ): Promise<[common.ApiResponse]>;

      createWriteStream(metadata?: Table.CopyMetadata): WritableObjectStreams<T>;

      load(
        source: string | storage.File,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      load(
        source: string | storage.File,
        metadata: Table.ExtractOrLoadOptions | undefined,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      load(
        source: string | storage.File,
        metadata?: Table.ExtractOrLoadOptions,
      ): Promise<[common.ApiResponse]>;

      query<U = any>(
        query: string | Query,
        callback: (err: Error | null, rows: U[] | null, apiResponse: common.ApiResponse) => void,
      ): void;
      query<U = any>(
        query: string | Query,
        options: QueryOptions | undefined,
        callback: (err: Error | null, rows: U[] | null, apiResponse: common.ApiResponse) => void,
      ): void;
      query<U = any>(
        query: string | Query,
        options?: QueryOptions,
      ): Promise<[U[], common.ApiResponse]>;

      setMetadata(
        metadata: Table.Metadata,
        callback: (err: Error | null, apiResponse: common.ApiResponse) => void,
      ): void;
      setMetadata(metadata: Table.Metadata): Promise<[common.ApiResponse]>;

      private static createSchemaFromString_(str);
      private static encodeValue_(value);
      private static formatMetadata_(options);
    }

    namespace Table {
      interface CopyMetadata {
        jobId?: string;
        jobPrefix?: string;
      }
      interface ExtractOrLoadOptions {
        format?: 'CSV' | 'JSON' | 'AVRO' | 'PARQUET';
        gzip?: boolean;
        jobId?: string;
        jobPrefix?: string;
      }
      interface InsertOptions {
        autoCreate?: boolean;
        ignoreanyValues?: boolean;
        raw?: boolean;
        schema?: string | object;
        skipInvalidRows?: boolean;
        templateSuffix?: string;
      }
      interface Metadata {
        name: string;
        description: string;
        schema: string | object;
      }
    }

    interface ReadableObjectStream<T> extends stream.Readable {
      read(size?: number): T | undefined;
      unshift(chunk: T): void;
      pipe<TDest extends WritableObjectStreams<T> | NodeJS.WritableStream>(
        destination: TDest,
        options?: { end?: boolean },
      ): TDest;
      unpipe<TDest extends WritableObjectStreams<T> | NodeJS.WritableStream>(
        destination?: TDest,
      ): this;
      addListener(event: string, listener: (...args: any[]) => void): this;
      addListener(event: 'close', listener: () => void): this;
      addListener(event: 'data', listener: (chunk: T) => void): this;
      addListener(event: 'end', listener: () => void): this;
      addListener(event: 'readable', listener: () => void): this;
      addListener(event: 'error', listener: (err: Error) => void): this;
      emit(event: string | symbol, ...args: any[]): boolean;
      emit(event: 'close'): boolean;
      emit(event: 'data', chunk: T): boolean;
      emit(event: 'end'): boolean;
      emit(event: 'readable'): boolean;
      emit(event: 'error', err: Error): boolean;
      on(event: string, listener: (...args: any[]) => void): this;
      on(event: 'close', listener: () => void): this;
      on(event: 'data', listener: (chunk: T) => void): this;
      on(event: 'end', listener: () => void): this;
      on(event: 'readable', listener: () => void): this;
      on(event: 'error', listener: (err: Error) => void): this;
      once(event: string, listener: (...args: any[]) => void): this;
      once(event: 'close', listener: () => void): this;
      once(event: 'data', listener: (chunk: T) => void): this;
      once(event: 'end', listener: () => void): this;
      once(event: 'readable', listener: () => void): this;
      once(event: 'error', listener: (err: Error) => void): this;
      prependListener(event: string, listener: (...args: any[]) => void): this;
      prependListener(event: 'close', listener: () => void): this;
      prependListener(event: 'data', listener: (chunk: T) => void): this;
      prependListener(event: 'end', listener: () => void): this;
      prependListener(event: 'readable', listener: () => void): this;
      prependListener(event: 'error', listener: (err: Error) => void): this;
      prependOnceListener(event: string, listener: (...args: any[]) => void): this;
      prependOnceListener(event: 'close', listener: () => void): this;
      prependOnceListener(event: 'data', listener: (chunk: T) => void): this;
      prependOnceListener(event: 'end', listener: () => void): this;
      prependOnceListener(event: 'readable', listener: () => void): this;
      prependOnceListener(event: 'error', listener: (err: Error) => void): this;
      removeListener(event: string, listener: (...args: any[]) => void): this;
      removeListener(event: 'close', listener: () => void): this;
      removeListener(event: 'data', listener: (chunk: T) => void): this;
      removeListener(event: 'end', listener: () => void): this;
      removeListener(event: 'readable', listener: () => void): this;
      removeListener(event: 'error', listener: (err: Error) => void): this;
    }

    interface WritableObjectStreams<T> extends stream.Writable {
      write(chunk: T, cb?: Function): boolean;
      write(chunk: T, encoding?: string, cb?: Function): boolean;
      end(cb?: Function): void;
      end(chunk: T, cb?: Function): void;
      end(chunk: T, encoding?: string, cb?: Function): void;
      addListener(event: string, listener: (...args: any[]) => void): this;
      addListener(event: 'close', listener: () => void): this;
      addListener(event: 'drain', listener: () => void): this;
      addListener(event: 'error', listener: (err: Error) => void): this;
      addListener(event: 'finish', listener: () => void): this;
      addListener(
        event: 'pipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      addListener(
        event: 'unpipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      emit(event: string | symbol, ...args: any[]): boolean;
      emit(event: 'close'): boolean;
      emit(event: 'drain'): boolean;
      emit(event: 'error', err: Error): boolean;
      emit(event: 'finish'): boolean;
      emit(event: 'pipe', src: ReadableObjectStream<T> | stream.Readable): boolean;
      emit(event: 'unpipe', src: ReadableObjectStream<T> | stream.Readable): boolean;
      on(event: string, listener: (...args: any[]) => void): this;
      on(event: 'close', listener: () => void): this;
      on(event: 'drain', listener: () => void): this;
      on(event: 'error', listener: (err: Error) => void): this;
      on(event: 'finish', listener: () => void): this;
      on(event: 'pipe', listener: (src: ReadableObjectStream<T> | stream.Readable) => void): this;
      on(event: 'unpipe', listener: (src: ReadableObjectStream<T> | stream.Readable) => void): this;
      once(event: string, listener: (...args: any[]) => void): this;
      once(event: 'close', listener: () => void): this;
      once(event: 'drain', listener: () => void): this;
      once(event: 'error', listener: (err: Error) => void): this;
      once(event: 'finish', listener: () => void): this;
      once(event: 'pipe', listener: (src: ReadableObjectStream<T> | stream.Readable) => void): this;
      once(
        event: 'unpipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      prependListener(event: string, listener: (...args: any[]) => void): this;
      prependListener(event: 'close', listener: () => void): this;
      prependListener(event: 'drain', listener: () => void): this;
      prependListener(event: 'error', listener: (err: Error) => void): this;
      prependListener(event: 'finish', listener: () => void): this;
      prependListener(
        event: 'pipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      prependListener(
        event: 'unpipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      prependOnceListener(event: string, listener: (...args: any[]) => void): this;
      prependOnceListener(event: 'close', listener: () => void): this;
      prependOnceListener(event: 'drain', listener: () => void): this;
      prependOnceListener(event: 'error', listener: (err: Error) => void): this;
      prependOnceListener(event: 'finish', listener: () => void): this;
      prependOnceListener(
        event: 'pipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      prependOnceListener(
        event: 'unpipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      removeListener(event: string, listener: (...args: any[]) => void): this;
      removeListener(event: 'close', listener: () => void): this;
      removeListener(event: 'drain', listener: () => void): this;
      removeListener(event: 'error', listener: (err: Error) => void): this;
      removeListener(event: 'finish', listener: () => void): this;
      removeListener(
        event: 'pipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
      removeListener(
        event: 'unpipe',
        listener: (src: ReadableObjectStream<T> | stream.Readable) => void,
      ): this;
    }
  }
}
