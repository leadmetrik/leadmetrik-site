'use client'

import { useRef, useEffect, useState } from 'react'
import SignaturePadLib from 'signature_pad'

interface SignaturePadProps {
  onSignatureChange?: (dataUrl: string | null) => void
  onSave?: (dataUrl: string | null) => void
}

export default function SignaturePad({ onSignatureChange, onSave }: SignaturePadProps) {
  const handleChange = (dataUrl: string | null) => {
    onSignatureChange?.(dataUrl)
    onSave?.(dataUrl)
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signaturePadRef = useRef<SignaturePadLib | null>(null)
  const [isSigning, setIsSigning] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePadLib(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 0)',
      })

      signaturePadRef.current.addEventListener('beginStroke', () => {
        setIsSigning(true)
      })

      signaturePadRef.current.addEventListener('endStroke', () => {
        if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
          handleChange(signaturePadRef.current.toDataURL())
        }
      })

      // Handle resize
      const resizeCanvas = () => {
        if (canvasRef.current && signaturePadRef.current) {
          const ratio = Math.max(window.devicePixelRatio || 1, 1)
          const canvas = canvasRef.current
          canvas.width = canvas.offsetWidth * ratio
          canvas.height = canvas.offsetHeight * ratio
          canvas.getContext('2d')?.scale(ratio, ratio)
          signaturePadRef.current.clear()
        }
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        signaturePadRef.current?.off()
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const clearSignature = () => {
    signaturePadRef.current?.clear()
    setIsSigning(false)
    handleChange(null)
  }

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        className={`signature-canvas w-full h-32 ${isSigning ? 'signing' : ''}`}
      />
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Draw your signature above</p>
        <button
          type="button"
          onClick={clearSignature}
          className="text-sm text-brand-orange hover:text-orange-600 font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
