import jsPDF from "jspdf"


export const exportDiagnosisReport =
  async (
    diagnosis
  ) => {

    try {

      const pdf = new jsPDF()

      let y = 20

      pdf.setFontSize(22)

      pdf.text(
        "AutoDiag Pro Report",
        20,
        y
      )

      y += 15

      pdf.setFontSize(14)

      pdf.text(
        `Vehicle: ${diagnosis.vehicle}`,
        20,
        y
      )

      y += 10

      pdf.text(
        `Root Cause: ${diagnosis.root_cause}`,
        20,
        y
      )

      y += 10

      pdf.text(
        `Confidence: ${diagnosis.root_cause_confidence}`,
        20,
        y
      )

      y += 10

      pdf.text(
        `Severity: ${diagnosis.severity_score}/5`,
        20,
        y
      )

      y += 15

      pdf.setFontSize(16)

      pdf.text(
        "Repair Summary",
        20,
        y
      )

      y += 10

      pdf.setFontSize(12)

      const summaryLines =
        pdf.splitTextToSize(
          diagnosis.summary,
          170
        )

      pdf.text(
        summaryLines,
        20,
        y
      )

      y += (
        summaryLines.length * 8
      ) + 10

      pdf.setFontSize(16)

      pdf.text(
        "Fix Sequence",
        20,
        y
      )

      y += 10

      pdf.setFontSize(12)

      diagnosis.fix_sequence.forEach(
        (step) => {

          const stepText = `
Step ${step.step}:
${step.action}

Difficulty:
${step.difficulty}

Tools:
${step.tool_needed}

Time:
${step.estimated_time_minutes} mins
          `

          const lines =
            pdf.splitTextToSize(
              stepText,
              170
            )

          pdf.text(
            lines,
            20,
            y
          )

          y += (
            lines.length * 7
          ) + 8
        }
      )

      pdf.save(
        `autodiag-${diagnosis.diagnosis_id}.pdf`
      )

    } catch (error) {

      console.error(
        "PDF generation failed:",
        error
      )
    }
  }