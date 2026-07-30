export interface YunEvaluationResult {
  allowed: boolean;
  reason?: string;
  sanitizedOutput: string;
}

export class YunValidator {
  private readonly FEDERATION_RULES = [
    'FED_1_INFRASTRUCTURE_SOVEREIGNTY',
    'FED_2_ALGORITHMIC_GOVERNANCE',
    'FED_3_TERRITORIAL_ECONOMIC_IDENTITY',
    'FED_4_OPEN_SCIENCE_AND_AUDIT',
    'FED_5_PHYGITAL_GAMIFICATION',
    'FED_6_DECENTRALIZED_FEDERATION',
    'FED_7_POST_QUANTUM_SECURITY',
  ];

  public async evaluateInput(prompt: string, scope: number): Promise<YunEvaluationResult> {
    if (scope < 1 || scope > 7) {
      return {
        allowed: false,
        reason: 'Ámbito de Federación inválido. Debe estar entre 1 y 7.',
        sanitizedOutput: '',
      };
    }

    // Reglas de bloqueo estricto
    const maliciousPatterns = [
      /centralized-override-attempt/i,
      /extract-private-keys/i,
      /bypass-yun-constitution/i,
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(prompt)) {
        return {
          allowed: false,
          reason: 'Detección de intento de elusión de gobernanza constitucional.',
          sanitizedOutput: '',
        };
      }
    }

    return { allowed: true, sanitizedOutput: prompt };
  }

  public async evaluateOutput(rawOutput: string): Promise<YunEvaluationResult> {
    // Sanitización de salida para prevenir fugas de credenciales o alucinaciones estructurales
    let sanitized = rawOutput.replace(/sk_live_[a-zA-Z0-9]+/g, '[REDACTED_KEY]');

    return {
      allowed: true,
      sanitizedOutput: sanitized,
    };
  }
}
