export class VectorMemoryStore {
  constructor() {}

  public async retrieveContext(prompt: string, userId: string): Promise<string[]> {
    // Placeholder: retornar contexto vacío
    return [];
  }

  public async persistInteraction(userId: string, prompt: string, output: string): Promise<void> {
    // Placeholder: no-op
    return;
  }
}
