import { useState, useCallback, useEffect } from 'react';
import { Selection, ContentBlock } from '../types/checklist.types';

export const useTextSelection = () => {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleSelection = useCallback((event: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (!text) return;

    const range = selection.getRangeAt(0);
    const startElement = range.startContainer.parentElement;
    const endElement = range.endContainer.parentElement;
    
    // Get more context for better selection display
    const startBlockElement = startElement?.closest('[data-block-id]');
    const endBlockElement = endElement?.closest('[data-block-id]');
    
    const newSelection: Selection = {
      id: `sel-${Date.now()}-${Math.random()}`,
      text,
      startLine: parseInt(startElement?.dataset.lineNumber || '0'),
      endLine: parseInt(endElement?.dataset.lineNumber || '0'),
      sectionId: startElement?.closest('[data-section-id]')?.getAttribute('data-section-id') || '',
      blocks: [],
      timestamp: Date.now(),
      // Add context for better preview
      startBlockId: startBlockElement?.getAttribute('data-block-id') || '',
      endBlockId: endBlockElement?.getAttribute('data-block-id') || '',
      range: {
        startOffset: range.startOffset,
        endOffset: range.endOffset
      }
    };

    if (isShiftPressed) {
      setSelections(prev => [...prev, newSelection]);
    } else {
      setSelections([newSelection]);
    }

    // Don't remove selection immediately - let it fade naturally
    // This provides better visual feedback
    setTimeout(() => {
      if (window.getSelection()) {
        window.getSelection()?.removeAllRanges();
      }
    }, 300);
  }, [isShiftPressed]);

  const mergeSelections = useCallback((): Selection | null => {
    if (selections.length < 2) return selections[0] || null;

    const sorted = [...selections].sort((a, b) => a.timestamp - b.timestamp);
    
    return {
      id: `merged-${Date.now()}`,
      text: sorted.map(s => s.text).join('\n'),
      startLine: Math.min(...sorted.map(s => s.startLine)),
      endLine: Math.max(...sorted.map(s => s.endLine)),
      sectionId: sorted[0].sectionId,
      blocks: sorted.flatMap(s => s.blocks),
      timestamp: Date.now()
    };
  }, [selections]);

  const clearSelections = useCallback(() => {
    setSelections([]);
  }, []);

  const removeSelection = useCallback((selectionId: string) => {
    setSelections(prev => prev.filter(s => s.id !== selectionId));
  }, []);

  const handleBlockSelection = useCallback((block: ContentBlock, sectionId: string, isSelected: boolean, isMultiSelect: boolean, isShiftSelect: boolean, allBlocks?: ContentBlock[]) => {
    const newSelection: Selection = {
      id: `block-${block.id}-${Date.now()}`,
      text: block.text,
      startLine: block.lineNumber,
      endLine: block.lineNumber,
      sectionId: sectionId,
      blocks: [block],
      timestamp: Date.now(),
      startBlockId: block.id,
      endBlockId: block.id
    };

    setSelections(prev => {
      // Handle Shift+click range selection
      if (isShiftSelect && prev.length > 0 && allBlocks) {
        const lastSelection = prev[prev.length - 1];
        const lastBlockIndex = allBlocks.findIndex(b => b.id === lastSelection.startBlockId);
        const currentBlockIndex = allBlocks.findIndex(b => b.id === block.id);
        
        if (lastBlockIndex !== -1 && currentBlockIndex !== -1) {
          const startIndex = Math.min(lastBlockIndex, currentBlockIndex);
          const endIndex = Math.max(lastBlockIndex, currentBlockIndex);
          
          // Create selections for all blocks in range
          const rangeSelections: Selection[] = [];
          for (let i = startIndex; i <= endIndex; i++) {
            const rangeBlock = allBlocks[i];
            const existingIndex = prev.findIndex(s => s.startBlockId === rangeBlock.id);
            
            // Only add if not already selected
            if (existingIndex === -1) {
              rangeSelections.push({
                id: `block-${rangeBlock.id}-${Date.now()}-${i}`,
                text: rangeBlock.text,
                startLine: rangeBlock.lineNumber,
                endLine: rangeBlock.lineNumber,
                sectionId: sectionId,
                blocks: [rangeBlock],
                timestamp: Date.now(),
                startBlockId: rangeBlock.id,
                endBlockId: rangeBlock.id
              });
            }
          }
          
          return [...prev, ...rangeSelections];
        }
      }

      // Regular multi-select or single select
      const existingIndex = prev.findIndex(s => s.startBlockId === block.id);
      if (existingIndex >= 0) {
        // Remove if already selected (toggle off)
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        // Add to selection (toggle on)
        return [...prev, newSelection];
      }
    });
  }, []);

  return {
    selections,
    handleSelection,
    handleBlockSelection,
    mergeSelections,
    clearSelections,
    removeSelection,
    isMultiSelect: isShiftPressed
  };
};