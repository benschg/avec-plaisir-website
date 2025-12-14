import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, LinearProgress, Paper } from '@mui/material'
import { Upload } from 'lucide-react'

interface ImageUploaderProps {
  onUpload: (file: File, onProgress: (progress: number) => void) => Promise<void>
  disabled?: boolean
}

export default function ImageUploader({
  onUpload,
  disabled = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentFile, setCurrentFile] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return

      setUploading(true)
      setTotalFiles(acceptedFiles.length)

      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i]
        setCurrentFile(i + 1)
        // Calculate base progress for this file in the batch
        const fileBaseProgress = (i / acceptedFiles.length) * 100
        const fileWeight = 100 / acceptedFiles.length

        try {
          await onUpload(file, (fileProgress) => {
            // Combine batch progress with individual file progress
            const totalProgress = fileBaseProgress + (fileProgress / 100) * fileWeight
            setProgress(totalProgress)
          })
        } catch (error) {
          console.error('Upload failed:', error)
        }
      }

      setUploading(false)
      setProgress(0)
      setCurrentFile(0)
      setTotalFiles(0)
    },
    [onUpload, disabled]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: true,
    disabled: disabled || uploading,
  })

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: { xs: 2, sm: 4 },
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        cursor: disabled || uploading ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: disabled || uploading ? 'grey.300' : 'primary.main',
          backgroundColor:
            disabled || uploading ? 'background.paper' : 'action.hover',
        },
      }}
    >
      <input {...getInputProps()} />
      <Upload
        size={48}
        style={{ color: '#9e9e9e', marginBottom: 16 }}
      />
      <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
        {isDragActive
          ? 'Bilder hier ablegen...'
          : 'Bilder hierher ziehen oder klicken zum Auswählen'}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        JPG, PNG, WebP oder HEIC
      </Typography>

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="text.secondary">
            {totalFiles > 1
              ? `Bild ${currentFile} von ${totalFiles} (${Math.round(progress)}%)`
              : `${Math.round(progress)}%`}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
