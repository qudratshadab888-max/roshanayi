import type { PaymentInvoice, PaymentReceipt } from '~/types'

const pdfSafe = (value: string | number) =>
  String(value)
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')

const buildPdf = (title: string, lines: string[]) => {
  const content = [
    'BT',
    '/F1 20 Tf',
    '54 750 Td',
    `(${pdfSafe(title)}) Tj`,
    '/F1 11 Tf',
    ...lines.flatMap((line) => ['0 -26 Td', `(${pdfSafe(line)}) Tj`]),
    'ET'
  ].join('\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${new TextEncoder().encode(content).length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((object, index) => {
    offsets.push(new TextEncoder().encode(pdf).length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })
  const xrefOffset = new TextEncoder().encode(pdf).length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  return new Blob([pdf], { type: 'application/pdf' })
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export const downloadInvoicePdf = (invoice: PaymentInvoice) => {
  downloadBlob(buildPdf('Roshanayi Academy Invoice', [
    `Invoice ID: ${invoice.id}`,
    `Parent: ${invoice.parentName}`,
    `Student: ${invoice.studentName}`,
    `Course: ${invoice.courseName}`,
    `Class Type: ${invoice.classType}`,
    `Amount: $${invoice.amount.toFixed(2)} ${invoice.currency}`,
    `Invoice Date: ${invoice.invoiceDate}`,
    `Due Date: ${invoice.dueDate}`,
    `Status: ${invoice.status}`
  ]), `${invoice.id}.pdf`)
}

export const downloadReceiptPdf = (receipt: PaymentReceipt) => {
  downloadBlob(buildPdf('Roshanayi Academy Receipt', [
    `Receipt ID: ${receipt.id}`,
    `Invoice ID: ${receipt.invoiceId}`,
    `Parent: ${receipt.parentName}`,
    `Student: ${receipt.studentName}`,
    `Course: ${receipt.courseName}`,
    `Amount Paid: $${receipt.amountPaid.toFixed(2)} ${receipt.currency}`,
    `Payment Date: ${receipt.paymentDate}`,
    `Payment Method: ${receipt.paymentMethod}`,
    `Transaction ID: ${receipt.transactionId || 'Not provided'}`,
    `Received By: ${receipt.receivedBy}`
  ]), `${receipt.id}.pdf`)
}
