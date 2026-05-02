import chromadb
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

from app.core.config import settings
from app.core.constants import CODE_CATEGORY_MAPPING
from app.core.logger import logger


class OBDRetriever:
    def __init__(self):
        self.client = chromadb.PersistentClient(
            path=settings.CHROMA_DB_PATH
        )

        self.embedding_function = OpenAIEmbeddingFunction(
            api_key=settings.OPENAI_API_KEY,
            model_name="text-embedding-ada-002"
        )

        self.collection = self.client.get_collection(
            name="obd_knowledge_base",
            embedding_function=self.embedding_function
        )

        logger.info("OBD retriever initialized")

    def detect_category_filter(
        self,
        fault_codes: list[str]
    ) -> dict | None:
        """
        Apply metadata filtering if all codes belong
        to same category.
        """

        categories = set()

        for code in fault_codes:
            category_prefix = code[0]

            mapped_category = CODE_CATEGORY_MAPPING.get(
                category_prefix
            )

            if mapped_category:
                categories.add(mapped_category)

        if len(categories) == 1:
            category = list(categories)[0]

            logger.info(
                f"Applying metadata filter: {category}"
            )

            return {"category": category}

        return None

    def build_query_text(
        self,
        fault_codes: list[str],
        symptoms: str
    ) -> str:
        """
        Create optimized semantic query text.
        """

        joined_codes = " ".join(fault_codes)

        return (
            f"Fault Codes: {joined_codes}. "
            f"Symptoms: {symptoms}"
        )

    def retrieve(
        self,
        fault_codes: list[str],
        symptoms: str
    ) -> list[dict]:
        """
        Retrieve relevant DTC records from ChromaDB.
        """

        query_text = self.build_query_text(
            fault_codes=fault_codes,
            symptoms=symptoms
        )

        category_filter = self.detect_category_filter(
            fault_codes
        )

        logger.info(
            f"Running retrieval query: {query_text}"
        )

        results = self.collection.query(
            query_texts=[query_text],
            n_results=settings.RETRIEVAL_TOP_K,
            where=category_filter
        )

        retrieved_documents = []

        documents = results.get("documents", [[]])[0]

        metadatas = results.get("metadatas", [[]])[0]

        for document, metadata in zip(
            documents,
            metadatas
        ):
            retrieved_documents.append(
                {
                    "document": document,
                    "metadata": metadata
                }
            )

        logger.info(
            f"Retrieved {len(retrieved_documents)} records"
        )

        return retrieved_documents