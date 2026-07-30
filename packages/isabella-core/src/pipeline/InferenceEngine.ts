import { YunValidator } from '../governance/YunValidator';
import { VectorMemoryStore } from '../memory/VectorMemoryStore';
import { DilithiumSigner } from '../pqc/DilithiumSigner';

export interface IsabellaContext {
  userId: string;
  nodeId: string;
  sessionToken: string;
  pqcNonce: string;
  federationScope: number; // 1 a 7 Federaciones
}

export interface IsabellaResponse {
  payload: string;
  signature: string;
  yunCompliant: boolean;
  latencyMs: number;
  tokensUsed: number;
  nodeSource: string;
}

export class IsabellaInferenceEngine {
  private yunValidator: YunValidator;
  private memoryStore: VectorMemoryStore;
  private signer: DilithiumSigner;

  constructor() {
    this.yunValidator = new YunValidator();
    this.memoryStore = new VectorMemoryStore();
    this.signer = new DilithiumSigner();
  }

  public async processQuery(
    prompt: string,
    context: IsabellaContext
  ): Promise<IsabellaResponse> {
    const startTime = Date.now();

    // Paso 1: Validación Constitucional Previa (YUN Engine)
    const preCheck = await this.yunValidator.evaluateInput(prompt, context.federationScope);
    if (!preCheck.allowed) {
      throw new Error(`[YUN_VIOLATION]: ${preCheck.reason}`);
    }

    // Paso 2: Recuperación de Memoria RAG y Estado Nodal
    const relevantContext = await this.memoryStore.retrieveContext(prompt, context.userId);
    const enrichedPrompt = this.constructSystemPrompt(prompt, relevantContext);

    // Paso 3: Ejecución Inferencia Cognitiva
    const rawOutput = await this.executeInference(enrichedPrompt);

    // Paso 4: Post-Validación y Control de Calidad
    const postCheck = await this.yunValidator.evaluateOutput(rawOutput);
    if (!postCheck.allowed) {
      throw new Error(`[YUN_POST_VIOLATION]: Salida descartada por inconsistencia de gobernanza.`);
    }

    // Paso 5: Firma Criptográfica Post-Cuántica (Dilithium-5)
    const signature = await this.signer.signPayload(postCheck.sanitizedOutput, context.pqcNonce);

    // Paso 06: Persistencia en Registro
    await this.memoryStore.persistInteraction(context.userId, prompt, postCheck.sanitizedOutput);

    return {
      payload: postCheck.sanitizedOutput,
      signature: signature,
      yunCompliant: true,
      latencyMs: Date.now() - startTime,
      tokensUsed: this.estimateTokens(enrichedPrompt + rawOutput),
      nodeSource: context.nodeId,
    };
  }

  private constructSystemPrompt(userQuery: string, retrievedContext: string[]): string {
    return `
[SYSTEM PROMPT: ISABELLA AI OMEGA CORE v4.0 ENTERPRISE]
Identidad: Asistente Cognitivo del Paradigma TAMV.
Nodo de Origen: Nodo Cero - Real del Monte, Hidalgo.
Lineamiento: Responder con precisión técnica, rigor académico y alineación a las 7 Federaciones.

[CONTEXTO DE MEMORIA RECUPERADO]
${retrievedContext.join('\n---\n')}

[CONSULTA DEL USUARIO]
${userQuery}
    `.trim();
  }

  private async executeInference(prompt: string): Promise<string> {
    const response = await fetch(process.env.ISABELLA_CORE_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ISABELLA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'isabella-omega-v4-enterprise',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2, // Baja temperatura para alta precisión técnica
        max_tokens: 4096,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}
