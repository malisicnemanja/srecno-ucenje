// Client-side helper for writing to Sanity through secure API route
export async function saveSanityDocument(type: string, data: Record<string, any>) {
  try {
    const response = await fetch('/api/sanity/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _type: type,
        data,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to save data')
    }

    return await response.json()
  } catch (error) {
    console.error('Error saving to Sanity:', error)
    throw error
  }
}

// Helper for patching documents
export async function patchSanityDocument(documentId: string, operations: {
  inc?: Record<string, number>
  set?: Record<string, unknown>
}) {
  try {
    const response = await fetch('/api/sanity/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'patch',
        documentId,
        operations,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update data')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating Sanity document:', error)
    throw error
  }
}