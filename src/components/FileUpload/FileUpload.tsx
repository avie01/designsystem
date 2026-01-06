import React, { useState, useRef, useCallback, useEffect } from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Chip from '../Chip/ChipTW';
import './FileUpload.css';

export type FileUploadVariant = 'dropzone' | 'compact' | 'button' | 'picture-card' | 'horizontal';
export type FileStatus = 'pending' | 'uploading' | 'complete' | 'error' | 'analyzing';

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
  error?: string;
  preview?: string;
  aiAnalysis?: AIAnalysisResult;
}

export interface AIAnalysisResult {
  summary?: string;
  category?: string;
  tags?: string[];
  confidence?: number;
  extractedText?: string;
  suggestions?: string[];
}

export interface FileUploadProps {
  /** Display variant */
  variant?: FileUploadVariant;
  /** Label for the upload component */
  label?: string;
  /** Helper text below dropzone */
  helperText?: string;
  /** Accepted file types (e.g., ".pdf,.doc" or "image/*") */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Controlled files array */
  value?: UploadedFile[];
  /** Callback when files change */
  onChange?: (files: UploadedFile[]) => void;
  /** Callback when files are selected (before processing) */
  onFilesSelected?: (files: File[]) => void;
  /** Callback when a file is removed */
  onFileRemove?: (fileId: string, file: File) => void;
  /** Upload handler - return promise that resolves when upload complete */
  onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<void>;
  /** AI analysis handler - called after upload for document understanding */
  onAnalyze?: (file: File) => Promise<AIAnalysisResult>;
  /** Enable AI analysis automatically after upload */
  enableAI?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show file list */
  showFileList?: boolean;
  /** Custom dropzone heading text */
  dropzoneText?: string;
  /** Custom dropzone description text (use {browse} placeholder for link) */
  dropzoneSubtext?: string;
  /** Custom button text for button variant */
  buttonText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Full width */
  fullWidth?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  variant = 'dropzone',
  label,
  helperText,
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  value,
  onChange,
  onFilesSelected,
  onFileRemove,
  onUpload,
  onAnalyze,
  enableAI = false,
  disabled = false,
  error = false,
  errorMessage,
  size = 'md',
  showFileList = true,
  dropzoneText,
  dropzoneSubtext,
  buttonText = 'Upload File',
  className,
  fullWidth = false,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const dragCounter = useRef(0);

  // Generate unique IDs for aria-describedby and aria-live
  const instanceId = useRef(`file-upload-${Math.random().toString(36).substr(2, 9)}`);
  const helperId = `${instanceId.current}-helper`;
  const errorId = `${instanceId.current}-error`;
  const statusId = `${instanceId.current}-status`;

  const files = value ?? internalFiles;
  const setFiles = (updater: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])) => {
    const newFiles = typeof updater === 'function' ? updater(files) : updater;
    if (value === undefined) {
      setInternalFiles(newFiles);
    }
    onChange?.(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `Exceeds ${formatFileSize(maxSize)} limit`;
    }
    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) return fileExtension === type.toLowerCase();
        if (type.endsWith('/*')) return fileType.startsWith(type.replace('/*', '/'));
        return fileType === type;
      });
      if (!isAccepted) return 'File type not allowed';
    }
    return null;
  };

  const createPreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(undefined);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => resolve(undefined);
      reader.readAsDataURL(file);
    });
  };

  const processFiles = useCallback(async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    if (!multiple && fileArray.length > 1) {
      fileArray.length = 1;
    }
    if (files.length + fileArray.length > maxFiles) {
      return;
    }

    const processedFiles: UploadedFile[] = [];
    for (const file of fileArray) {
      const validationError = validateFile(file);
      const preview = await createPreview(file);
      processedFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        progress: 0,
        status: validationError ? 'error' : 'pending',
        error: validationError || undefined,
        preview,
      });
    }

    const newFilesList = multiple ? [...files, ...processedFiles] : processedFiles;
    setFiles(newFilesList);
    onFilesSelected?.(fileArray);

    // Auto-upload
    if (onUpload) {
      for (const uploadedFile of processedFiles) {
        if (uploadedFile.status === 'pending') {
          setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'uploading' } : f));
          try {
            await onUpload(uploadedFile.file, (progress) => {
              setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, progress } : f));
            });
            setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'complete', progress: 100 } : f));

            // AI Analysis after upload
            if (enableAI && onAnalyze) {
              setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'analyzing' } : f));
              try {
                const analysis = await onAnalyze(uploadedFile.file);
                setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'complete', aiAnalysis: analysis } : f));
              } catch {
                setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'complete' } : f));
              }
            }
          } catch {
            setFiles(prev => prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'error', error: 'Upload failed' } : f));
          }
        }
      }
    }
  }, [files, multiple, maxFiles, onFilesSelected, onUpload, onAnalyze, enableAI]);

  // Fix drag-leave flicker: use counter to track nested drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (!disabled && dragCounter.current === 1) {
      setIsDragActive(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragActive(false);
    if (disabled) return;
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [disabled, processFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    if (inputRef.current) inputRef.current.value = '';
  }, [processFiles]);

  const handleBrowseClick = () => inputRef.current?.click();

  const handleRemoveFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (file) onFileRemove?.(fileId, file.file);
  };

  const getFileIcon = (file: File): string => {
    const type = file.type;
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type.startsWith('audio/')) return 'music';
    if (type.includes('pdf')) return 'document--pdf';
    if (type.includes('spreadsheet') || type.includes('excel')) return 'table-split';
    if (type.includes('document') || type.includes('word')) return 'document';
    if (type.includes('zip') || type.includes('compressed')) return 'zip';
    return 'document';
  };

  // Cleanup previews
  useEffect(() => {
    return () => {
      files.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, []);

  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      className="file-upload__input"
      accept={accept}
      multiple={multiple}
      onChange={handleInputChange}
      disabled={disabled}
      aria-hidden="true"
      tabIndex={-1}
    />
  );

  // Build aria-describedby value
  const getAriaDescribedBy = () => {
    const ids: string[] = [];
    if (helperText && !errorMessage) ids.push(helperId);
    if (errorMessage) ids.push(errorId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  // VARIANT: Button only
  if (variant === 'button') {
    return (
      <div className={`file-upload file-upload--button ${fullWidth ? 'file-upload--full-width' : ''} ${className || ''}`}>
        {label && <label className="file-upload__label">{label}</label>}
        {hiddenInput}
        <Button
          variant="primary"
          size="large"
          onClick={handleBrowseClick}
          disabled={disabled}
          aria-describedby={getAriaDescribedBy()}
          style={fullWidth ? { width: '100%' } : undefined}
        >
          <Icon name="upload" size={20} style={{ marginRight: '8px' }} />
          Upload Documents
        </Button>
        {helperText && !errorMessage && <p id={helperId} className="file-upload__helper">{helperText}</p>}
        {errorMessage && <p id={errorId} className="file-upload__error">{errorMessage}</p>}
        <div id={statusId} aria-live="polite" aria-atomic="true" className="sr-only">
          {files.length > 0 && `${files.length} file${files.length !== 1 ? 's' : ''} uploaded`}
        </div>
        {showFileList && files.length > 0 && <FileList files={files} onRemove={handleRemoveFile} getFileIcon={getFileIcon} formatFileSize={formatFileSize} compact />}
      </div>
    );
  }

  // VARIANT: Compact (inline for forms/drawers)
  if (variant === 'compact') {
    return (
      <div className={`file-upload file-upload--compact ${fullWidth ? 'file-upload--full-width' : ''} ${className || ''}`}>
        {label && <label className="file-upload__label">{label}</label>}
        {hiddenInput}
        <div
          className={`file-upload__compact-zone ${isDragActive ? 'file-upload__compact-zone--active' : ''} ${disabled ? 'file-upload__compact-zone--disabled' : ''} ${error ? 'file-upload__compact-zone--error' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={!disabled ? handleBrowseClick : undefined}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={isDragActive ? 'Drop files here to upload' : 'Upload files - drag and drop or click to browse'}
          aria-describedby={getAriaDescribedBy()}
          aria-invalid={error || !!errorMessage}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBrowseClick(); } }}
        >
          <Icon name="upload" size={20} className="file-upload__compact-icon" />
          <span className="file-upload__compact-text">
            {isDragActive ? 'Drop here' : dropzoneText || 'Drop files or click to upload'}
          </span>
          {accept && <span className="file-upload__compact-accept">{accept}</span>}
        </div>
        {helperText && !errorMessage && <p id={helperId} className="file-upload__helper">{helperText}</p>}
        {errorMessage && <p id={errorId} className="file-upload__error" role="alert">{errorMessage}</p>}
        <div id={statusId} aria-live="polite" aria-atomic="true" className="sr-only">
          {files.length > 0 && `${files.length} file${files.length !== 1 ? 's' : ''} uploaded`}
        </div>
        {showFileList && files.length > 0 && <FileList files={files} onRemove={handleRemoveFile} getFileIcon={getFileIcon} formatFileSize={formatFileSize} compact />}
      </div>
    );
  }

  // VARIANT: Picture card (image grid with previews)
  if (variant === 'picture-card') {
    return (
      <div className={`file-upload file-upload--picture-card ${fullWidth ? 'file-upload--full-width' : ''} ${className || ''}`}>
        {label && <label className="file-upload__label">{label}</label>}
        {hiddenInput}
        <div className="file-upload__picture-grid">
          {files.map((uploadedFile) => (
            <div key={uploadedFile.id} className={`file-upload__picture-item ${uploadedFile.status === 'error' ? 'file-upload__picture-item--error' : ''}`}>
              {uploadedFile.preview ? (
                <img src={uploadedFile.preview} alt={uploadedFile.file.name} className="file-upload__picture-preview" />
              ) : (
                <div className="file-upload__picture-placeholder">
                  <Icon name={getFileIcon(uploadedFile.file)} size={32} />
                </div>
              )}
              <div className="file-upload__picture-overlay">
                {uploadedFile.status === 'uploading' && (
                  <div className="file-upload__picture-progress">
                    <div className="file-upload__picture-progress-bar" style={{ width: `${uploadedFile.progress}%` }} />
                  </div>
                )}
                {uploadedFile.status === 'analyzing' && (
                  <div className="file-upload__picture-analyzing">
                    <Icon name="watson" size={20} />
                    <span>Analyzing...</span>
                  </div>
                )}
                {(uploadedFile.status === 'complete' || uploadedFile.status === 'pending') && (
                  <div className="file-upload__picture-actions">
                    <button className="file-upload__picture-action" onClick={() => handleRemoveFile(uploadedFile.id)} aria-label="Remove">
                      <Icon name="trash-can" size={16} />
                    </button>
                  </div>
                )}
                {uploadedFile.status === 'error' && (
                  <div className="file-upload__picture-error">
                    <Icon name="warning--filled" size={20} />
                  </div>
                )}
              </div>
              {uploadedFile.aiAnalysis && (
                <div className="file-upload__picture-ai">
                  {uploadedFile.aiAnalysis.category && <Chip label={uploadedFile.aiAnalysis.category} size="small" variant="default" />}
                </div>
              )}
            </div>
          ))}
          {(multiple || files.length === 0) && files.length < maxFiles && (
            <button
              className={`file-upload__picture-add ${disabled ? 'file-upload__picture-add--disabled' : ''}`}
              onClick={!disabled ? handleBrowseClick : undefined}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              disabled={disabled}
              aria-label={isDragActive ? 'Drop files here to upload' : 'Add files - drag and drop or click to browse'}
            >
              <Icon name="add" size={24} />
              <span>Upload</span>
            </button>
          )}
        </div>
        {helperText && !errorMessage && <p id={helperId} className="file-upload__helper">{helperText}</p>}
        {errorMessage && <p id={errorId} className="file-upload__error" role="alert">{errorMessage}</p>}
        <div id={statusId} aria-live="polite" aria-atomic="true" className="sr-only">
          {files.length > 0 && `${files.length} file${files.length !== 1 ? 's' : ''} uploaded`}
        </div>
      </div>
    );
  }

  // VARIANT: Horizontal (dropzone on left, file list on right)
  if (variant === 'horizontal') {
    return (
      <div className={`file-upload file-upload--horizontal ${fullWidth ? 'file-upload--full-width' : ''} ${className || ''}`}>
        {label && <label className="file-upload__label">{label}</label>}
        {hiddenInput}
        <div className="file-upload__horizontal-container">
          {/* Left side: Dropzone */}
          <div className="file-upload__horizontal-dropzone">
            <div
              ref={dropzoneRef}
              className={`file-upload__dropzone ${isDragActive ? 'file-upload__dropzone--active' : ''} ${disabled ? 'file-upload__dropzone--disabled' : ''} ${error ? 'file-upload__dropzone--error' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={!disabled ? handleBrowseClick : undefined}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={isDragActive ? 'Drop files here to upload' : 'Upload files - drag and drop files here or click to browse'}
              aria-describedby={getAriaDescribedBy()}
              aria-invalid={error || !!errorMessage}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBrowseClick(); } }}
            >
              <div className="file-upload__content">
                <div className="file-upload__icon">
                  <Icon name={isDragActive ? 'download' : 'upload'} size={24} />
                </div>
                <div className="file-upload__text">
                  <span className="file-upload__primary-text">
                    {isDragActive ? 'Drop files here' : dropzoneText || 'Drag and drop files'}
                  </span>
                  <span className="file-upload__secondary-text">
                    {dropzoneSubtext ? (
                      dropzoneSubtext.includes('{browse}') ? (
                        <>
                          {dropzoneSubtext.split('{browse}')[0]}
                          <span className="file-upload__browse-link">click to browse</span>
                          {dropzoneSubtext.split('{browse}')[1]}
                        </>
                      ) : dropzoneSubtext
                    ) : (
                      <>or <span className="file-upload__browse-link">click to browse</span> your files</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: File list */}
          {showFileList && files.length > 0 && (
            <div className="file-upload__horizontal-filelist">
              <h3 className="file-upload__horizontal-title">Uploaded files</h3>
              <FileList files={files} onRemove={handleRemoveFile} getFileIcon={getFileIcon} formatFileSize={formatFileSize} enableAI={enableAI} />
            </div>
          )}
        </div>
        {helperText && !errorMessage && <p id={helperId} className="file-upload__helper">{helperText}</p>}
        {errorMessage && <p id={errorId} className="file-upload__error" role="alert">{errorMessage}</p>}
        <div id={statusId} aria-live="polite" aria-atomic="true" className="sr-only">
          {files.length > 0 && `${files.length} file${files.length !== 1 ? 's' : ''} uploaded`}
        </div>
      </div>
    );
  }

  // DEFAULT VARIANT: Dropzone
  const sizeClasses = { sm: 'file-upload--sm', md: 'file-upload--md', lg: 'file-upload--lg' };

  return (
    <div className={`file-upload file-upload--dropzone ${fullWidth ? 'file-upload--full-width' : ''} ${className || ''}`}>
      {label && <label className="file-upload__label">{label}</label>}
      {hiddenInput}
      <div
        ref={dropzoneRef}
        className={`file-upload__dropzone ${sizeClasses[size]} ${isDragActive ? 'file-upload__dropzone--active' : ''} ${disabled ? 'file-upload__dropzone--disabled' : ''} ${error ? 'file-upload__dropzone--error' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!disabled ? handleBrowseClick : undefined}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={isDragActive ? 'Drop files here to upload' : 'Upload files - drag and drop files here or click to browse'}
        aria-describedby={getAriaDescribedBy()}
        aria-invalid={error || !!errorMessage}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBrowseClick(); } }}
      >
        <div className="file-upload__content">
          <div className="file-upload__icon">
            <Icon name={isDragActive ? 'download' : 'upload'} size={24} />
          </div>
          <div className="file-upload__text">
            <span className="file-upload__primary-text">
              {isDragActive ? 'Drop files here' : dropzoneText || 'Drag and drop files'}
            </span>
            <span className="file-upload__secondary-text">
              {dropzoneSubtext ? (
                dropzoneSubtext.includes('{browse}') ? (
                  <>
                    {dropzoneSubtext.split('{browse}')[0]}
                    <span className="file-upload__browse-link">click to browse</span>
                    {dropzoneSubtext.split('{browse}')[1]}
                  </>
                ) : dropzoneSubtext
              ) : (
                <>or <span className="file-upload__browse-link">click to browse</span> your files</>
              )}
            </span>
          </div>
        </div>
      </div>
      {helperText && !errorMessage && <p id={helperId} className="file-upload__helper">{helperText}</p>}
      {errorMessage && <p id={errorId} className="file-upload__error" role="alert">{errorMessage}</p>}
      <div id={statusId} aria-live="polite" aria-atomic="true" className="sr-only">
        {files.length > 0 && `${files.length} file${files.length !== 1 ? 's' : ''} uploaded`}
      </div>
      {showFileList && files.length > 0 && <FileList files={files} onRemove={handleRemoveFile} getFileIcon={getFileIcon} formatFileSize={formatFileSize} enableAI={enableAI} />}
    </div>
  );
};

// File List Component
interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  getFileIcon: (file: File) => string;
  formatFileSize: (bytes: number) => string;
  compact?: boolean;
  enableAI?: boolean;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove, getFileIcon, formatFileSize, compact, enableAI }) => {
  const handleKeyDown = (e: React.KeyboardEvent, fileId: string) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      onRemove(fileId);
    }
  };

  return (
    <ul className={`file-upload__file-list ${compact ? 'file-upload__file-list--compact' : ''}`} role="list" aria-label="Uploaded files" aria-live="polite" aria-relevant="additions text">
      {files.map((uploadedFile) => (
        <li
          key={uploadedFile.id}
          className={`file-upload__file-item ${uploadedFile.status === 'error' ? 'file-upload__file-item--error' : ''} ${uploadedFile.status === 'complete' ? 'file-upload__file-item--complete' : ''} ${compact ? 'file-upload__file-item--compact' : ''}`}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, uploadedFile.id)}
          aria-label={`${uploadedFile.file.name}, ${formatFileSize(uploadedFile.file.size)}, ${uploadedFile.status}${uploadedFile.error ? `, error: ${uploadedFile.error}` : ''}`}
          aria-busy={uploadedFile.status === 'uploading' || uploadedFile.status === 'analyzing'}
        >
        {uploadedFile.preview && !compact ? (
          <img src={uploadedFile.preview} alt="" className="file-upload__file-thumb" />
        ) : (
          <div className="file-upload__file-icon">
            <Icon name={getFileIcon(uploadedFile.file)} size={compact ? 16 : 20} />
          </div>
        )}

        <div className="file-upload__file-info">
          <span className="file-upload__file-name">{uploadedFile.file.name}</span>
          <span className="file-upload__file-meta">
            {formatFileSize(uploadedFile.file.size)}
            {uploadedFile.error && <span className="file-upload__file-error"> • {uploadedFile.error}</span>}
            {uploadedFile.status === 'analyzing' && <span className="file-upload__file-analyzing"> • AI analyzing...</span>}
          </span>
          {uploadedFile.status === 'uploading' && (
            <div className="file-upload__progress">
              <div className="file-upload__progress-bar" style={{ width: `${uploadedFile.progress}%` }} />
            </div>
          )}
          {enableAI && uploadedFile.aiAnalysis && (
            <div className="file-upload__file-ai">
              {uploadedFile.aiAnalysis.tags?.slice(0, 3).map((tag, i) => (
                <Chip key={i} label={tag} size="small" variant="default" />
              ))}
              {uploadedFile.aiAnalysis.summary && (
                <span className="file-upload__file-ai-summary">{uploadedFile.aiAnalysis.summary}</span>
              )}
            </div>
          )}
        </div>

        <div className="file-upload__file-status">
          {uploadedFile.status === 'complete' && <Icon name="checkmark--filled" size={16} className="file-upload__status-icon--success" />}
          {uploadedFile.status === 'error' && <Icon name="warning--filled" size={16} className="file-upload__status-icon--error" />}
          {uploadedFile.status === 'uploading' && <span className="file-upload__progress-text">{uploadedFile.progress}%</span>}
          {uploadedFile.status === 'analyzing' && <Icon name="watson" size={16} className="file-upload__status-icon--ai" />}
        </div>

        <button
          className="file-upload__remove-btn"
          onClick={() => onRemove(uploadedFile.id)}
          aria-label={`Remove ${uploadedFile.file.name}`}
        >
          <Icon name="close" size={14} />
        </button>
      </li>
    ))}
  </ul>
  );
};

export default FileUpload;
