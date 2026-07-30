# ==============================================================================
# CONFIGURACIÓN GENERAL ISABELLA AI (OMEGA CORE)
# ==============================================================================
ISABELLA_VERSION="v4.0.0-enterprise"
ISABELLA_NODE_ORIGIN="N0-RDM-LDTOCS-01"
ISABELLA_PRIMARY_LANGUAGE="es-MX"

# ==============================================================================
# ENDPOINTS DE INFERENCIA Y LLM BACKENDS
# ==============================================================================
ISABELLA_CORE_ENDPOINT="https://api.isabella.tamv.online/v4/infer"
ISABELLA_API_KEY="isa_live_enterprise_omega_core_v4_rdm_node"
ISABELLA_FALLBACK_OLLAMA_URL="http://localhost:11434/api/generate"
ISABELLA_MAX_TOKEN_BUDGET=8192
ISABELLA_DEFAULT_TEMPERATURE=0.2

# ==============================================================================
# GOBERNANZA YUN & 7 FEDERACIONES
# ==============================================================================
YUN_CONSTITUTION_ACTIVE=true
YUN_FEDERATION_COUNT=7
YUN_STRICT_MODE=true
YUN_AUDIT_LOG_ENABLED=true

# ==============================================================================
# BASE DE DATOS VECTORIAL Y MEMORIA EPISÓDICA
# ==============================================================================
VECTOR_STORE_PROVIDER="qdrant"
VECTOR_STORE_ENDPOINT="https://qdrant.tamv.online:6333"
VECTOR_COLLECTION_NAME="isabella_memory_rdm"
VECTOR_EMBEDDING_MODEL="text-embedding-3-large"
VECTOR_DIMENSION=3072

# ==============================================================================
# CRIPTOGRAFÍA POST-CUÁNTICA (PQC)
# ==============================================================================
PQC_DILITHIUM_PRIVKEY_PATH="/etc/tamv/keys/dilithium5.key"
PQC_KYBER_PUBKEY_PATH="/etc/tamv/keys/kyber1024.pub"
