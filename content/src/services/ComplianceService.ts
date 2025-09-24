import { ChecklistItem, ComplianceChecklist } from '../types/checklist.types';

export interface ComplianceStatistics {
  total: number;
  compliant: number;
  nonCompliant: number;
  notApplicable: number;
  pending: number;
  complianceRate: number;
}

export interface CategoryStatistics {
  name: string;
  count: number;
  compliant: number;
  percentage: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Service class for compliance-related business logic
 */
export class ComplianceService {
  /**
   * Calculate compliance statistics for a set of checklist items
   */
  static calculateStatistics(items: ChecklistItem[]): ComplianceStatistics {
    const total = items.length;
    
    if (total === 0) {
      return {
        total: 0,
        compliant: 0,
        nonCompliant: 0,
        notApplicable: 0,
        pending: 0,
        complianceRate: 0
      };
    }
    
    const compliant = items.filter(item => item.status === 'compliant').length;
    const nonCompliant = items.filter(item => item.status === 'non-compliant').length;
    const notApplicable = items.filter(item => item.status === 'not-applicable').length;
    const pending = items.filter(item => item.status === 'pending').length;
    
    const complianceRate = Math.round((compliant / total) * 100);
    
    return {
      total,
      compliant,
      nonCompliant,
      notApplicable,
      pending,
      complianceRate
    };
  }
  
  /**
   * Calculate compliance statistics by category
   */
  static calculateCategoryStatistics(items: ChecklistItem[]): CategoryStatistics[] {
    const categories = new Map<string, { count: number; compliant: number }>();
    
    items.forEach(item => {
      const category = item.sourceRef?.category || 'Uncategorized';
      const existing = categories.get(category) || { count: 0, compliant: 0 };
      
      categories.set(category, {
        count: existing.count + 1,
        compliant: existing.compliant + (item.status === 'compliant' ? 1 : 0)
      });
    });
    
    return Array.from(categories.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        compliant: data.compliant,
        percentage: Math.round((data.compliant / data.count) * 100)
      }))
      .sort((a, b) => b.count - a.count);
  }
  
  /**
   * Validate a checklist item
   */
  static validateChecklistItem(item: ChecklistItem): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Required field validation
    if (!item.content || item.content.trim() === '') {
      errors.push('Content is required');
    }
    
    if (!item.sourceRef) {
      errors.push('Source reference is required');
    } else {
      if (!item.sourceRef.document) {
        errors.push('Source document is required');
      }
      if (!item.sourceRef.section) {
        errors.push('Source section is required');
      }
    }
    
    // Warning validations
    if (item.status === 'non-compliant' && (!item.notes || item.notes.trim() === '')) {
      warnings.push('Non-compliant items should have notes explaining the issue');
    }
    
    if (item.type === 'heading' && item.children && item.children.length === 0) {
      warnings.push('Heading items should have child items');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * Validate an entire checklist
   */
  static validateChecklist(checklist: ComplianceChecklist): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (!checklist.title || checklist.title.trim() === '') {
      errors.push('Checklist title is required');
    }
    
    if (!checklist.items || checklist.items.length === 0) {
      errors.push('Checklist must contain at least one item');
    }
    
    // Validate each item
    checklist.items.forEach((item, index) => {
      const itemValidation = this.validateChecklistItem(item);
      itemValidation.errors.forEach(error => {
        errors.push(`Item ${index + 1}: ${error}`);
      });
      itemValidation.warnings.forEach(warning => {
        warnings.push(`Item ${index + 1}: ${warning}`);
      });
    });
    
    // Check for duplicate items
    const contentSet = new Set<string>();
    checklist.items.forEach((item, index) => {
      if (contentSet.has(item.content)) {
        warnings.push(`Item ${index + 1}: Duplicate content detected`);
      }
      contentSet.add(item.content);
    });
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * Get compliance status color
   */
  static getStatusColor(status: ChecklistItem['status']): string {
    const colors = {
      'compliant': '#5DA10C',      // Green
      'non-compliant': '#DA1E28',  // Red
      'not-applicable': '#8D8D8D', // Gray
      'pending': '#F1C21B'          // Yellow
    };
    
    return colors[status] || colors.pending;
  }
  
  /**
   * Get compliance status icon name
   */
  static getStatusIcon(status: ChecklistItem['status']): string {
    const icons = {
      'compliant': 'checkmark-filled',
      'non-compliant': 'close-filled',
      'not-applicable': 'subtract',
      'pending': 'time'
    };
    
    return icons[status] || icons.pending;
  }
  
  /**
   * Calculate risk score based on non-compliance
   */
  static calculateRiskScore(items: ChecklistItem[]): 'low' | 'medium' | 'high' | 'critical' {
    const stats = this.calculateStatistics(items);
    
    if (stats.total === 0) return 'low';
    
    const nonComplianceRate = (stats.nonCompliant / stats.total) * 100;
    
    if (nonComplianceRate >= 50) return 'critical';
    if (nonComplianceRate >= 30) return 'high';
    if (nonComplianceRate >= 10) return 'medium';
    return 'low';
  }
  
  /**
   * Filter items by status
   */
  static filterByStatus(items: ChecklistItem[], status: ChecklistItem['status']): ChecklistItem[] {
    return items.filter(item => item.status === status);
  }
  
  /**
   * Filter items by category
   */
  static filterByCategory(items: ChecklistItem[], category: string): ChecklistItem[] {
    return items.filter(item => item.sourceRef?.category === category);
  }
  
  /**
   * Sort items by various criteria
   */
  static sortItems(
    items: ChecklistItem[], 
    sortBy: 'status' | 'category' | 'date' | 'order'
  ): ChecklistItem[] {
    const sortedItems = [...items];
    
    switch (sortBy) {
      case 'status':
        const statusOrder = ['non-compliant', 'pending', 'compliant', 'not-applicable'];
        return sortedItems.sort((a, b) => 
          statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
        );
        
      case 'category':
        return sortedItems.sort((a, b) => 
          (a.sourceRef?.category || '').localeCompare(b.sourceRef?.category || '')
        );
        
      case 'date':
        return sortedItems.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
      case 'order':
      default:
        return sortedItems.sort((a, b) => a.order - b.order);
    }
  }
  
  /**
   * Generate compliance summary text
   */
  static generateSummary(checklist: ComplianceChecklist): string {
    const stats = this.calculateStatistics(checklist.items);
    const risk = this.calculateRiskScore(checklist.items);
    
    let summary = `Compliance Checklist: ${checklist.title}\n`;
    summary += `Created: ${new Date(checklist.createdAt).toLocaleDateString()}\n`;
    summary += `Last Updated: ${new Date(checklist.updatedAt).toLocaleDateString()}\n\n`;
    
    summary += `Total Items: ${stats.total}\n`;
    summary += `Compliance Rate: ${stats.complianceRate}%\n`;
    summary += `Risk Level: ${risk.toUpperCase()}\n\n`;
    
    summary += `Status Breakdown:\n`;
    summary += `- Compliant: ${stats.compliant}\n`;
    summary += `- Non-Compliant: ${stats.nonCompliant}\n`;
    summary += `- Pending: ${stats.pending}\n`;
    summary += `- Not Applicable: ${stats.notApplicable}\n`;
    
    return summary;
  }
  
  /**
   * Export checklist to JSON format
   */
  static exportToJSON(checklist: ComplianceChecklist): string {
    return JSON.stringify(checklist, null, 2);
  }
  
  /**
   * Export checklist to CSV format
   */
  static exportToCSV(checklist: ComplianceChecklist): string {
    const headers = ['ID', 'Content', 'Status', 'Category', 'Document', 'Section', 'Notes', 'Created By', 'Created At'];
    const rows = checklist.items.map(item => [
      item.id,
      `"${item.content.replace(/"/g, '""')}"`,
      item.status,
      item.sourceRef?.category || '',
      item.sourceRef?.document || '',
      item.sourceRef?.section || '',
      `"${(item.notes || '').replace(/"/g, '""')}"`,
      item.createdBy,
      item.createdAt
    ]);
    
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }
}