#!/usr/bin/env node

/**
 * Auto-generated Sanity Cleanup Script
 * Generated on: 2025-08-07T22:35:32.297Z
 * 
 * WARNING: This script will DELETE and MODIFY data in your Sanity dataset.
 * Always test on a development dataset first!
 */

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'production', // or 'development' for testing
  token: 'your-write-token',
  useCdn: false
});

const ITEMS_TO_DELETE = [
  {
    "type": "faqCategory",
    "id": "adpXclQvR9WWEgUkbtDqyC",
    "reason": "Duplicate of \"Obuka i podrška\" (keeping faqCategory-62a0038f-9f0f-4575-a19b-8b8d00932ce5)"
  },
  {
    "type": "faqCategory",
    "id": "faqCategory-0ce949d5-34d7-408a-a877-998a4bf7eb1b",
    "reason": "Duplicate of \"Obuka i podrška\" (keeping faqCategory-62a0038f-9f0f-4575-a19b-8b8d00932ce5)"
  },
  {
    "type": "faqCategory",
    "id": "faqCategory-0ea134cb-88f6-4616-89de-81bf3a3054bd",
    "reason": "Duplicate of \"Finansijska pitanja\" (keeping faqCategory-b6f9aba7-75b8-4c20-9309-6e8faaee28fd)"
  },
  {
    "type": "faqCategory",
    "id": "faqCategory-1ef2c184-522e-44e6-b85f-a2bba903439f",
    "reason": "Duplicate of \"Opšta pitanja o franšizi\" (keeping faqCategory-13cb2bc0-c9ac-4c6f-924f-71d551be5ec1)"
  },
  {
    "type": "faqCategory",
    "id": "faqCategory-b10f85d1-bc5f-420f-9469-70cab0f407dc",
    "reason": "Duplicate of \"Operativna pitanja\" (keeping faqCategory-692f095f-80cb-4551-b768-6b0b008edb91)"
  },
  {
    "type": "faqCategory",
    "id": "faqCategory.opsta-pitanja",
    "reason": "Duplicate of \"Opšta pitanja\" (keeping faqCategory.general)"
  },
  {
    "type": "faq",
    "id": "faq-004b5dd6-4e27-44b9-b81e-272926286923",
    "reason": "Duplicate question (keeping faq-00ec4751-685c-4392-8f5e-981f71c0c5a8)"
  },
  {
    "type": "faq",
    "id": "faq-d8458672-bb94-43d6-add6-d58e303db918",
    "reason": "Duplicate question (keeping faq-0ab40f0a-627b-46c8-bca1-9e44cb392b01)"
  },
  {
    "type": "faq",
    "id": "hZm6tMI3obk6ZBXKfA9sBt",
    "reason": "Duplicate question (keeping faq-1)"
  },
  {
    "type": "faq",
    "id": "faq-ab5790e3-1967-417c-ae85-6bef73049303",
    "reason": "Duplicate question (keeping faq-1b3d363e-e8dd-45f9-a0c4-12b2f4f58cfe)"
  },
  {
    "type": "faq",
    "id": "hZm6tMI3obk6ZBXKfA9sKt",
    "reason": "Duplicate question (keeping faq-2)"
  },
  {
    "type": "faq",
    "id": "hWo33GCGxd3rDeD5Tiy8qn",
    "reason": "Duplicate question (keeping faq-3)"
  },
  {
    "type": "faq",
    "id": "faq-3cc31acd-a09d-4791-9885-b5c38548cf61",
    "reason": "Duplicate question (keeping faq-3f56014f-9ed6-4cc4-9021-0532a3d55219)"
  },
  {
    "type": "faq",
    "id": "faq-972fa3d6-32fd-43ca-b04f-af17005a94e0",
    "reason": "Duplicate question (keeping faq-5d8bd671-2a78-4154-80b9-d25598279bd3)"
  },
  {
    "type": "faq",
    "id": "faq-6fccd843-098b-4c2e-9801-d28222e56e0c",
    "reason": "Duplicate question (keeping faq-a7897e9d-aa6b-4efe-9d57-df4eb5927b31)"
  },
  {
    "type": "faq",
    "id": "faq-e467af0f-3cf4-4644-8a64-77a14612877e",
    "reason": "Duplicate question (keeping faq-81f05fde-16ae-4a3a-8baa-c9b0c9fc0c92)"
  },
  {
    "type": "faq",
    "id": "faq-e0121326-a7b0-4624-84ce-ca38beb1ed7a",
    "reason": "Duplicate question (keeping faq-cbde5b94-6c21-46fe-9579-8822613781aa)"
  },
  {
    "type": "faq",
    "id": "faq-fdd378f5-77ac-4b3d-b98c-beeaf2f26da5",
    "reason": "Duplicate question (keeping faq-e56957fa-0f99-4c84-9706-f2ea098c6b38)"
  },
  {
    "type": "faq",
    "id": "faq-fd10a8ca-25d8-4ee8-ae39-8b250364c921",
    "reason": "Duplicate question (keeping faq-f881f0af-29f4-4de5-abcd-65a88360332e)"
  },
  {
    "type": "calculatorResult",
    "id": "EIn1TO6kzkBkpMuRkFfJpQ",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "EIn1TO6kzkBkpMuRkFgcGy",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "EIn1TO6kzkBkpMuRkGY5vK",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "EIn1TO6kzkBkpMuRkGYjyV",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "RSzTvGgTwtY6EErbXmHqYB",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "RSzTvGgTwtY6EErbXmHqln",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "RSzTvGgTwtY6EErbXmHqw0",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "RSzTvGgTwtY6EErbXmHr6D",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "SBvfECCtZ11PRIA8QdD56u",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "SVDvN8W2oCA8eZWngUb3qw",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "SVDvN8W2oCA8eZWngUb44R",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "hZm6tMI3obk6ZBXKfAWHZt",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "calculatorResult",
    "id": "rWY7A01dUL9wO4NRCjB8Qe",
    "reason": "Calculator results are temporary data and should be deleted"
  },
  {
    "type": "franchiseField",
    "id": "SBvfECCtZ11PRIA8QdEqTj",
    "reason": "Duplicate fieldId \"telefon\" (keeping tqJG5yH49IKSFNIKiLWAqR)"
  },
  {
    "type": "franchiseField",
    "id": "SBvfECCtZ11PRIA8QdEqgD",
    "reason": "Duplicate fieldId \"zanimanje\" (keeping oWtMwMRBoarauLfrKfgED4)"
  },
  {
    "type": "franchiseField",
    "id": "SBvfECCtZ11PRIA8QdEqoX",
    "reason": "Duplicate fieldId \"motivacija_razlog\" (keeping tqJG5yH49IKSFNIKiLWB8B)"
  },
  {
    "type": "franchiseField",
    "id": "SBvfECCtZ11PRIA8QdEqum",
    "reason": "Duplicate fieldId \"iskustvo_edukacija\" (keeping tqJG5yH49IKSFNIKiLWBDV)"
  },
  {
    "type": "franchiseField",
    "id": "tqJG5yH49IKSFNIKiLMpcz",
    "reason": "Duplicate fieldId \"email\" (keeping SBvfECCtZ11PRIA8QdOW8m)"
  },
  {
    "type": "franchiseField",
    "id": "oWtMwMRBoarauLfrKfPanX",
    "reason": "Duplicate fieldId \"iskustvo\" (keeping SBvfECCtZ11PRIA8QdOWF1)"
  },
  {
    "type": "franchiseField",
    "id": "tqJG5yH49IKSFNIKiLMq3b",
    "reason": "Duplicate fieldId \"budjet\" (keeping SBvfECCtZ11PRIA8QdOXDM)"
  },
  {
    "type": "franchiseField",
    "id": "oWtMwMRBoarauLfrKfPaa4",
    "reason": "Duplicate fieldId \"obrazovanje\" (keeping tqJG5yH49IKSFNIKiLWAxX)"
  },
  {
    "type": "franchiseField",
    "id": "tqJG5yH49IKSFNIKiLMpXf",
    "reason": "Duplicate fieldId \"ime_prezime\" (keeping oWtMwMRBoarauLfrKfgDm8)"
  },
  {
    "type": "franchiseField",
    "id": "tqJG5yH49IKSFNIKiLMpiJ",
    "reason": "Duplicate fieldId \"lokacija\" (keeping tqJG5yH49IKSFNIKiLWB2r)"
  },
  {
    "type": "franchiseField",
    "id": "tqJG5yH49IKSFNIKiLMpsx",
    "reason": "Duplicate fieldId \"ciljevi_godina\" (keeping tqJG5yH49IKSFNIKiLWBIp)"
  },
  {
    "type": "franchiseField",
    "id": "tqJG5yH49IKSFNIKiLMpyH",
    "reason": "Duplicate fieldId \"dostupno_vreme\" (keeping tqJG5yH49IKSFNIKiLWBTT)"
  },
  {
    "type": "aboutAuthor",
    "id": "drafts.EIn1TO6kzkBkpMuRkFy78E",
    "reason": "Duplicate author \"Željana Radojičić Lukić\" (keeping most complete: EIn1TO6kzkBkpMuRkFy78E)"
  },
  {
    "type": "aboutAuthor",
    "id": "aboutAuthor",
    "reason": "Duplicate author \"Željana Radojičić Lukić\" (keeping most complete: EIn1TO6kzkBkpMuRkFy78E)"
  }
];

const ITEMS_TO_RENAME = [
  {
    "type": "locationData",
    "id": "RSzTvGgTwtY6EErbXkDn2n",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "RSzTvGgTwtY6EErbXkDnD0",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "SVDvN8W2oCA8eZWngS38iw",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "SVDvN8W2oCA8eZWngS38wR",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "SVDvN8W2oCA8eZWngS399w",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "SVDvN8W2oCA8eZWngS39fR",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "rWY7A01dUL9wO4NRChSndc",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "rWY7A01dUL9wO4NRChSnpU",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "rWY7A01dUL9wO4NRChSo1M",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  },
  {
    "type": "locationData",
    "id": "rWY7A01dUL9wO4NRChSoP6",
    "field": "centerCount",
    "from": "centerCount",
    "to": "centreCount",
    "reason": "Rename from American to British spelling"
  }
];

async function deleteDocuments() {
  console.log('🗑️ Starting deletion process...');
  
  for (const item of ITEMS_TO_DELETE) {
    try {
      console.log(`Deleting ${item.type} ${item.id}: ${item.reason}`);
      await client.delete(item.id);
      console.log('✅ Deleted successfully');
    } catch (error) {
      console.log(`❌ Failed to delete ${item.id}: ${error.message}`);
    }
  }
}

async function renameFields() {
  console.log('🔄 Starting rename process...');
  
  // This would need custom logic for each rename operation
  // For now, just log what needs to be renamed
  ITEMS_TO_RENAME.forEach(item => {
    console.log(`Rename needed: ${item.type} ${item.id} - ${item.reason}`);
  });
}

async function main() {
  console.log('🚀 Starting Sanity cleanup process...');
  console.log(`Items to delete: ${ITEMS_TO_DELETE.length}`);
  console.log(`Items to rename: ${ITEMS_TO_RENAME.length}`);
  
  // Uncomment the lines below when ready to execute
  // await deleteDocuments();
  // await renameFields();
  
  console.log('✅ Cleanup process completed!');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { deleteDocuments, renameFields };
