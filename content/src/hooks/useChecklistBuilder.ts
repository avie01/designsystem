import { useState, useCallback, useEffect } from 'react';
import { ChecklistItem, ComplianceChecklist } from '../types/checklist.types';

export const useChecklistBuilder = (bcNumber?: string) => {
  const [checklist, setChecklist] = useState<ComplianceChecklist>({
    id: `checklist-${Date.now()}`,
    name: `Compliance Checklist - ${bcNumber || 'Draft'}`,
    projectId: '',
    bcNumber: bcNumber || '',
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    owner: 'Current User',
    department: 'Planning & Development'
  });

  useEffect(() => {
    if (bcNumber) {
      const savedChecklist = localStorage.getItem(`checklist-${bcNumber}`);
      if (savedChecklist) {
        try {
          setChecklist(JSON.parse(savedChecklist));
        } catch (error) {
          console.error('Error loading saved checklist:', error);
        }
      }
    }
  }, [bcNumber]);

  const addItem = useCallback((item: ChecklistItem) => {
    setChecklist(prev => ({
      ...prev,
      items: [...prev.items, { ...item, order: prev.items.length }],
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const updateItem = useCallback((itemId: string, updates: Partial<ChecklistItem>) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      ),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const saveChecklist = useCallback(() => {
    if (bcNumber) {
      localStorage.setItem(`checklist-${bcNumber}`, JSON.stringify(checklist));
      console.log('Checklist saved:', checklist);
    }
  }, [checklist, bcNumber]);

  const exportChecklist = useCallback((format: 'pdf' | 'excel' | 'json') => {
    switch (format) {
      case 'json':
        const dataStr = JSON.stringify(checklist, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `checklist-${bcNumber}-${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
        
      case 'pdf':
        alert('PDF export would be implemented with jsPDF library');
        break;
        
      case 'excel':
        alert('Excel export would be implemented with SheetJS library');
        break;
    }
  }, [checklist, bcNumber]);

  return {
    checklist,
    addItem,
    updateItem,
    removeItem,
    saveChecklist,
    exportChecklist
  };
};