import React from 'react';
import { fileTypeSvgs, getFileTypeSvg } from './fileTypeSvgs';

export type FileTypeVariant = 
  | 'folder' | 'acc' | 'ae' | 'ai' | 'an' | 'avi' | 'bim' | 'bmp' | 'cad' | 'csv'
  | 'dat' | 'doc' | 'doch' | 'docm' | 'docx' | 'dot' | 'doth' | 'dotx' | 'dw' | 'dwg'
  | 'dxl' | 'eml' | 'eps' | 'f4a' | 'f4v' | 'flv' | 'fs' | 'gif' | 'html' | 'ifc'
  | 'indd' | 'jpeg' | 'jpg' | 'jpp' | 'log' | 'm4v' | 'mbd' | 'mbox' | 'midi' | 'mkv'
  | 'mov' | 'mp3' | 'mp4' | 'mpeg' | 'mpg' | 'mpp' | 'mppx' | 'mpt' | 'mpw' | 'mpx'
  | 'msg' | 'mspdi' | 'ods' | 'oga' | 'ogg' | 'ogv' | 'one' | 'ost' | 'pdf' | 'php'
  | 'png' | 'pot' | 'poth' | 'potm' | 'pps' | 'ppsx' | 'ppt' | 'ppth' | 'pptm' | 'pptx'
  | 'prem' | 'ps' | 'psd' | 'pst' | 'pub' | 'pubh' | 'pubm' | 'pwz' | 'read' | 'rp'
  | 'rtf' | 'skt' | 'sql' | 'svg' | 'swf' | 'tif' | 'tiff' | 'txt' | 'url' | 'vcf'
  | 'vdx' | 'vob' | 'vob-1' | 'vsd' | 'vsdm' | 'vsdx' | 'vss' | 'vssm' | 'vssx' | 'vst'
  | 'vstm' | 'vstx' | 'vsx' | 'vtx' | 'wav' | 'webm' | 'wma' | 'wmv' | 'xd' | 'xls'
  | 'xlsm' | 'xlsx' | 'xltm' | 'xltx' | 'zip';

interface FileTypeProps {
  /** File type variant to display */
  type?: FileTypeVariant;
  /** Size of the icon in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

const FileType: React.FC<FileTypeProps> = ({ type = 'folder', size = 36, className }) => {
  // Get the SVG content for the specified file type
  const svgContent = getFileTypeSvg(type);

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default FileType;