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
