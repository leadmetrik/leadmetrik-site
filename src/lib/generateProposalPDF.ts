interface SelectedAddOn {
  name: string
  price: number
}

interface ProposalData {
  name: string
  email: string
  date: string
  fbAdsBudget: 'basic' | 'recommended'
  selectedAddOns: SelectedAddOn[]
  monthlyTotal: number
  setupTotal: number
  signature?: string
}

// Lead Metrik brand colors
const ORANGE = '#F5A623'
const CHARCOAL = '#2D3748'
const GRAY = '#6B7280'
const LIGHT_GRAY = '#F9FAFB'

export async function generateProposalPDF(data: ProposalData, logoBase64: string): Promise<void> {
  // Dynamic import for client-side only
  const pdfMakeModule = await import('pdfmake/build/pdfmake')
  const pdfFontsModule = await import('pdfmake/build/vfs_fonts')
  
  const pdfMake = pdfMakeModule.default || pdfMakeModule
  const pdfFonts = pdfFontsModule.default || pdfFontsModule
  
  ;(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs || (pdfFonts as any).vfs

  const docDefinition: any = {
    pageSize: 'LETTER',
    pageMargins: [50, 80, 50, 60],
    
    // Header on every page
    header: {
      columns: [
        {
          image: logoBase64,
          width: 140,
          margin: [50, 20, 0, 0]
        },
        {
          text: 'Digital Marketing Services Agreement',
          alignment: 'right',
          color: GRAY,
          fontSize: 10,
          margin: [0, 35, 50, 0]
        }
      ]
    },
    
    // Footer on every page
    footer: (currentPage: number, pageCount: number) => ({
      columns: [
        {
          text: 'Lead Metrik | leadmetrik.com | support@leadmetrik.com',
          fontSize: 8,
          color: GRAY,
          margin: [50, 0, 0, 0]
        },
        {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'right',
          fontSize: 8,
          color: GRAY,
          margin: [0, 0, 50, 0]
        }
      ],
      margin: [0, 20, 0, 0]
    }),
    
    content: [
      // Title section
      {
        text: 'SERVICE AGREEMENT',
        fontSize: 24,
        bold: true,
        color: CHARCOAL,
        margin: [0, 0, 0, 5]
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 3, lineColor: ORANGE }]
      },
      
      // Client info box
      {
        margin: [0, 20, 0, 20],
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: 'PREPARED FOR', fontSize: 9, color: GRAY, margin: [0, 0, 0, 3] },
                  { text: 'Dr. Ogonna — MediSlim', fontSize: 14, bold: true, color: CHARCOAL }
                ],
                fillColor: LIGHT_GRAY,
                margin: [15, 12, 15, 12]
              },
              {
                stack: [
                  { text: 'DATE', fontSize: 9, color: GRAY, margin: [0, 0, 0, 3] },
                  { text: data.date, fontSize: 14, bold: true, color: CHARCOAL }
                ],
                fillColor: LIGHT_GRAY,
                margin: [15, 12, 15, 12]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingLeft: () => 0,
          paddingRight: () => 0,
          paddingTop: () => 0,
          paddingBottom: () => 0
        }
      },
      
      // Investment Summary
      {
        text: 'INVESTMENT SUMMARY',
        fontSize: 14,
        bold: true,
        color: ORANGE,
        margin: [0, 10, 0, 10]
      },
      {
        table: {
          widths: ['*', 'auto'],
          body: [
            [
              { text: 'Setup Fee (one-time)', fontSize: 11, color: CHARCOAL },
              { text: `$${data.setupTotal.toLocaleString()}`, fontSize: 11, bold: true, color: CHARCOAL, alignment: 'right' }
            ],
            [
              { text: 'Monthly Retainer (base)', fontSize: 11, color: CHARCOAL },
              { text: '$1,200/mo', fontSize: 11, color: CHARCOAL, alignment: 'right' }
            ],
            // Add-ons header if any
            ...(data.selectedAddOns.length > 0 ? [[
              { text: 'SELECTED ADD-ONS', fontSize: 9, color: GRAY, colSpan: 2, margin: [0, 10, 0, 5] }, {}
            ]] : []),
            // Add-on rows
            ...data.selectedAddOns.map(addon => [
              { text: `✓ ${addon.name}`, fontSize: 11, color: CHARCOAL, margin: [10, 0, 0, 0] },
              { text: `$${addon.price}/mo`, fontSize: 11, color: CHARCOAL, alignment: 'right' }
            ]),
            // Monthly total
            [
              { text: 'MONTHLY TOTAL', fontSize: 12, bold: true, color: CHARCOAL, fillColor: '#FFF7ED', margin: [0, 8, 0, 8] },
              { text: `$${data.monthlyTotal.toLocaleString()}/mo`, fontSize: 14, bold: true, color: ORANGE, fillColor: '#FFF7ED', alignment: 'right', margin: [0, 6, 0, 6] }
            ]
          ]
        },
        layout: {
          hLineWidth: (i: number, node: any) => (i === node.table.body.length ? 0 : 0.5),
          vLineWidth: () => 0,
          hLineColor: () => '#E5E7EB',
          paddingTop: () => 6,
          paddingBottom: () => 6
        }
      },
      
      // Ad Budgets
      {
        margin: [0, 15, 0, 0],
        stack: [
          { text: 'CLIENT-PAID AD BUDGETS (paid directly to platforms):', fontSize: 9, color: GRAY, margin: [0, 0, 0, 5] },
          { text: `• Google Ads: ~$1,500/mo`, fontSize: 10, color: CHARCOAL, margin: [10, 0, 0, 3] },
          { text: `• Facebook/Instagram Ads: ${data.fbAdsBudget === 'basic' ? '$100/mo' : '$200-$400/mo (recommended)'}`, fontSize: 10, color: CHARCOAL, margin: [10, 0, 0, 0] }
        ]
      },
      
      // Services Included
      {
        text: 'SERVICES INCLUDED',
        fontSize: 14,
        bold: true,
        color: ORANGE,
        margin: [0, 25, 0, 10]
      },
      {
        ul: [
          'Google Ads audit + conversion tracking setup',
          'Facebook/Instagram Ads setup + management',
          'On-site keyword optimization',
          'Google Business Profile audit + optimization',
          'Local SEO & citation building (press releases, guest posts, backlinks)',
          'Monthly 20-minute strategy call (Thursdays via Google Meet or in-office)',
          'Performance reporting & recommendations'
        ],
        fontSize: 11,
        color: CHARCOAL,
        markerColor: ORANGE
      },
      
      // Key Terms
      {
        text: 'KEY TERMS',
        fontSize: 14,
        bold: true,
        color: ORANGE,
        margin: [0, 25, 0, 10]
      },
      {
        ol: [
          { text: [{ text: 'Payment Terms: ', bold: true }, 'Setup fee due upon signing. Monthly retainer billed on the 1st of each month.'] },
          { text: [{ text: 'Cancellation: ', bold: true }, 'Month-to-month agreement. Cancel anytime with 30 days written notice.'] },
          { text: [{ text: 'Access: ', bold: true }, 'Client agrees to provide necessary access to website, Google Business Profile, and ad accounts.'] },
          { text: [{ text: 'Results: ', bold: true }, 'While we employ best practices, specific rankings cannot be guaranteed as search algorithms vary.'] }
        ],
        fontSize: 10,
        color: CHARCOAL
      },
      
      // Page break before signature
      { text: '', pageBreak: 'before' },
      
      // Signature Section
      {
        text: 'ACCEPTANCE & SIGNATURE',
        fontSize: 14,
        bold: true,
        color: ORANGE,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'By signing below, I acknowledge that I have read, understood, and agree to the terms and conditions outlined in this agreement. I authorize Lead Metrik to begin services upon receipt of the setup fee.',
        fontSize: 10,
        color: CHARCOAL,
        margin: [0, 0, 0, 20]
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: 'Client Name', fontSize: 9, color: GRAY, border: [false, false, false, false] },
              { text: 'Email', fontSize: 9, color: GRAY, border: [false, false, false, false] }
            ],
            [
              { text: data.name, fontSize: 12, bold: true, color: CHARCOAL, border: [false, false, false, true], margin: [0, 5, 0, 10] },
              { text: data.email, fontSize: 12, color: CHARCOAL, border: [false, false, false, true], margin: [0, 5, 0, 10] }
            ],
            [
              { text: 'Signature', fontSize: 9, color: GRAY, border: [false, false, false, false], margin: [0, 20, 0, 0] },
              { text: 'Date Signed', fontSize: 9, color: GRAY, border: [false, false, false, false], margin: [0, 20, 0, 0] }
            ],
            [
              data.signature 
                ? { image: data.signature, width: 150, border: [false, false, false, true], margin: [0, 5, 0, 10] }
                : { text: '[Digital Signature]', fontSize: 12, italics: true, color: GRAY, border: [false, false, false, true], margin: [0, 20, 0, 10] },
              { text: data.date, fontSize: 12, color: CHARCOAL, border: [false, false, false, true], margin: [0, 25, 0, 10] }
            ]
          ]
        },
        layout: {
          hLineColor: () => '#E5E7EB'
        }
      },
      
      // Document ID
      {
        text: `Document ID: LM-${Date.now().toString(36).toUpperCase()}`,
        fontSize: 8,
        color: GRAY,
        margin: [0, 30, 0, 0],
        alignment: 'center'
      }
    ],
    
    defaultStyle: {
      font: 'Roboto'
    }
  }
  
  // Generate and download
  pdfMake.createPdf(docDefinition).download(`Lead-Metrik-Agreement-${data.date.replace(/,?\s+/g, '-')}.pdf`)
}

// Function to load logo as base64
export async function loadLogoBase64(): Promise<string> {
  const response = await fetch('/lead-metrik-logo.jpg')
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
