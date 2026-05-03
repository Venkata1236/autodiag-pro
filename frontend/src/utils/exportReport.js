import jsPDF from "jspdf"
import html2canvas from "html2canvas"


export const exportDiagnosisReport =
  async (
    elementId,
    fileName = "diagnosis-report"
  ) => {

    const element =
      document.getElementById(
        elementId
      )

    if (!element) {
      return
    }

    const canvas =
      await html2canvas(element)

    const imageData =
      canvas.toDataURL("image/png")

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    )

    const pdfWidth =
      pdf.internal.pageSize.getWidth()

    const pdfHeight =
      (canvas.height * pdfWidth)
      / canvas.width

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    )

    pdf.save(
      `${fileName}.pdf`
    )
  }