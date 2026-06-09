export abstract class Request<TInput, TOutput> {
  abstract execute(input: TInput, signal?: AbortSignal): Promise<TOutput>;
}
