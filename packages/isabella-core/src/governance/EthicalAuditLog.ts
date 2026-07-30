export class EthicalAuditLog {
  public async record(entry: { userId?: string; action: string; detail?: string }) {
    // Placeholder: log to console (in production, write to audit store)
    console.log('[YUN_AUDIT]', entry);
  }
}
