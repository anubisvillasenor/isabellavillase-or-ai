export class DilithiumSigner {
  constructor() {}

  public async signPayload(payload: string, nonce: string): Promise<string> {
    // Placeholder: firma simulada
    return `DILITHIUM5_SIGNATURE_PLACEHOLDER(${Buffer.from(payload).toString('base64').slice(0,32)})`;
  }
}
