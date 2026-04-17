import client from './client'

export interface DiagnosisResult {
  case_id: number
  subtype: string
  confidence: number
  lesion_area_ratio: number
  distribution_range: string
  heatmap_url: string
  report_text: string
}

export const getDiagnosis = (caseId: number): Promise<DiagnosisResult> => {
  return client.get(`/diagnosis/${caseId}`)
}

export const triggerDiagnosis = (caseId: number): Promise<DiagnosisResult> => {
  return client.post(`/diagnosis/${caseId}`)
}