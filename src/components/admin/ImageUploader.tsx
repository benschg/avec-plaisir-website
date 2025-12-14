import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, LinearProgress, Paper } from '@mui/material'
import { Upload } from 'lucide-react'

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<void>
  disabled?: boolean
}

export default function ImageUploader({
  onUpload,
  disabled = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return

      for (const file of acceptedFiles) {
        setUploading(true)
        setProgress(0)

        try {
          await onUpload(file)
        } catch (error) {
          console.error('Upload failed:', error)
        }

        setUploading(false)
        setProgress(0)
      }
    },
    [onUpload, disabled]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: true,
    disabled: disabled || uploading,
  })

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 4,
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
      <Typography variant="body1" gutterBottom>
        {isDragActive
          ? 'Bilder hier ablegen...'
          : 'Bilder hierher ziehen oder klicken zum Auswählen'}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        JPG, PNG oder WebP
      </Typography>

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
