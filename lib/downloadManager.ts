// Enhanced download manager with progress tracking and error handling

interface DownloadProgress {
  loaded: number
  total: number
  percentage: number
}

interface DownloadOptions {
  onProgress?: (progress: DownloadProgress) => void
  onError?: (error: Error) => void
  onComplete?: () => void
  filename?: string
}

export async function downloadFile(url: string, options: DownloadOptions = {}) {
  const { onProgress, onError, onComplete, filename } = options

  try {
    // Fetch with progress tracking
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentLength = response.headers.get('content-length')
    const total = contentLength ? parseInt(contentLength, 10) : 0

    if (!response.body) {
      throw new Error('Response body is empty')
    }

    const reader = response.body.getReader()
    const chunks: Uint8Array[] = []
    let loaded = 0

    // Read the response stream
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      if (value) {
        chunks.push(value)
        loaded += value.length

        // Report progress
        if (onProgress && total > 0) {
          onProgress({
            loaded,
            total,
            percentage: Math.round((loaded / total) * 100)
          })
        }
      }
    }

    // Combine all chunks
    const blob = new Blob(chunks as BlobPart[])
    
    // Create download link
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    
    // Set filename from Content-Disposition header or provided filename
    const contentDisposition = response.headers.get('content-disposition')
    let downloadFilename = filename
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (filenameMatch) {
        downloadFilename = filenameMatch[1].replace(/['"]/g, '')
      }
    }
    
    if (downloadFilename) {
      link.download = downloadFilename
    }

    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Cleanup
    URL.revokeObjectURL(downloadUrl)
    
    onComplete?.()
    
  } catch (error) {
    console.error('Download failed:', error)
    onError?.(error as Error)
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileTypeIcon(resourceType: string): string {
  // Return resource type as string for now - should be replaced with proper icons
  const types: Record<string, string> = {
    pdf: 'PDF',
    doc: 'DOC',
    docx: 'DOCX',
    xlsx: 'XLSX',
    xls: 'XLS',
    ppt: 'PPT',
    pptx: 'PPTX',
    txt: 'TXT',
    zip: 'ZIP',
    rar: 'RAR',
    mp4: 'MP4',
    avi: 'AVI',
    mp3: 'MP3',
    wav: 'WAV',
    jpg: 'JPG',
    jpeg: 'JPEG',
    png: 'PNG',
    gif: 'GIF'
  }
  
  return types[resourceType.toLowerCase()] || 'FILE'
}