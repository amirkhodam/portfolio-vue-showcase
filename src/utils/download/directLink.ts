import type { IDownloadMediaReq } from '@/lib/api'
import { useServices } from '@/lib/services'
import axios from 'axios'

export async function downloadDirectLink(
  url: string,
  name: string,
  callback?: (percentCompleted: number) => void
) {
  const res = await axios.get(url, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent: any) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      callback && callback(percentCompleted)
    }
  })
  prepareExportVideo(res.data, name)
}

export async function downloadDirectLink_service(
  data: IDownloadMediaReq,
  name: string,
  callback?: (percentCompleted: number) => void
) {
  const service = useServices().media
  const res = await service.download(data, callback)
  let blob: Blob = new Blob([res], { type: 'application/zip' })
  downloadBlob(blob, `${name}.zip`)
}

export async function prepareExportVideo(blob: Blob, name: string) {
  const a = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  a.style.display = 'none'
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
