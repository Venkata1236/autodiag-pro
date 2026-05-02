import json
from pathlib import Path

import chromadb
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

from app.core.config import settings
from app.core.logger import logger
from app.rag.formatter import format_dtc_document


class OBDKnowledgeBaseEmbedder:
    def __init__(self):
        self.client = chromadb.PersistentClient(
            path=settings.CHROMA_DB_PATH
        )

        self.embedding_function = OpenAIEmbeddingFunction(
            api_key=settings.OPENAI_API_KEY,
            model_name="text-embedding-ada-002"
        )

        self.collection = self.client.get_or_create_collection(
            name="obd_knowledge_base",
            embedding_function=self.embedding_function
        )

        logger.info("ChromaDB collection initialized")

    def load_json_file(self, file_path: str) -> list[dict]:
        """
        Load DTC JSON knowledge base file.
        """

        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    def embed_documents(self, documents: list[dict]) -> None:
        """
        Convert DTC records into embeddings and store in ChromaDB.
        """

        for document in documents:
            formatted_text = format_dtc_document(document)

            metadata = {
                "code": document.get("code"),
                "category": document.get("category"),
                "system": document.get("system"),
                "severity": document.get("severity")
            }

            self.collection.upsert(
                documents=[formatted_text],
                metadatas=[metadata],
                ids=[document.get("code")]
            )

            logger.info(
                f"Embedded DTC code: {document.get('code')}"
            )

    def build_knowledge_base(self) -> None:
        """
        Load and embed all knowledge base JSON files.
        """

        kb_path = Path(
            "app/rag/knowledge_base"
        )

        json_files = [
            "p_codes.json",
            "c_codes.json",
            "b_codes.json",
            "u_codes.json"
        ]

        total_documents = 0

        for file_name in json_files:
            file_path = kb_path / file_name

            if not file_path.exists():
                logger.warning(
                    f"Knowledge base file missing: {file_name}"
                )
                continue

            logger.info(
                f"Loading knowledge base file: {file_name}"
            )

            documents = self.load_json_file(file_path)

            self.embed_documents(documents)

            total_documents += len(documents)

        logger.info(
            f"Knowledge base build completed "
            f"with {total_documents} documents"
        )


if __name__ == "__main__":
    embedder = OBDKnowledgeBaseEmbedder()

    embedder.build_knowledge_base()