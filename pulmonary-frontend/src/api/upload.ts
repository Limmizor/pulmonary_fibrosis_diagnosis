import client from './client'

export interface UploadResponse {
  case_id: number
  message: string
}

export const uploadDICOM = (file: File): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append('dicom', file)
  return client.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}