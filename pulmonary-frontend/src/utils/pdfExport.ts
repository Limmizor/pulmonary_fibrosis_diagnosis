import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportToPDF = async (title: string, data: any) => {
  // 创建一个临时DOM元素来渲染报告内容
  const element = document.createElement('div')
  element.innerHTML = `
    <div style="padding:20px; font-family: sans-serif;">
      <h2>${title}</h2>
      <p><strong>疑似亚型：</strong> ${data.subtype}</p>
      <p><strong>置信度：</strong> ${(data.confidence * 100).toFixed(2)}%</p>
      <p><strong>病灶面积占比：</strong> ${data.lesion_area_ratio}%</p>
      <p><strong>分布范围：</strong> ${data.distribution_range}</p>
      <p><strong>影像所见：</strong> ${data.report_text}</p>
      <img src="${data.heatmap_url}" style="width:300px;" />
    </div>
  `
  document.body.appendChild(element)
  const canvas = await html2canvas(element)
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF()
  pdf.addImage(imgData, 'PNG', 10, 10, 190, 0)
  pdf.save('diagnosis_report.pdf')
  document.body.removeChild(element)
}