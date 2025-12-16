import { LegislationDocument } from '../types/legislation.types';
// We'll import demo data after we create it
// import legislationData from '../data/demo-legislation/nsw-housing-sepp-2021.json';

class LegislationService {
  async loadDocument(documentId: string): Promise<LegislationDocument> {
    // For now, return demo data - we'll replace this after creating the JSON file
    return this.getDemoDocument();
  }

  async listAvailableDocuments(): Promise<Array<{id: string, title: string}>> {
    return [
      { id: 'nsw-sepp-housing-2021', title: 'State Environmental Planning Policy (Housing) 2021' },
      { id: 'building-code-2024', title: 'National Construction Code 2024' },
      { id: 'fire-safety-standards', title: 'Fire Safety Standards' },
      { id: 'accessibility-requirements', title: 'Accessibility Requirements' }
    ];
  }

  getSectionById(document: LegislationDocument, sectionId: string): any {
    const findSection = (sections: any[], id: string): any => {
      for (const section of sections) {
        if (section.id === id) return section;
        if (section.subsections) {
          const found = findSection(section.subsections, id);
          if (found) return found;
        }
      }
      return null;
    };
    return findSection(document.sections, sectionId);
  }

  // Demo data method - will be replaced when we load from JSON
  getDemoDocument(): LegislationDocument {
    return {
      id: 'nsw-sepp-housing-2021',
      title: 'State Environmental Planning Policy (Housing) 2021',
      version: '2021.1',
      effectiveDate: '2021-10-01',
      jurisdiction: 'NSW',
      documentType: 'regulation',
      metadata: {
        lastUpdated: '2024-01-15',
        source: 'NSW Planning Portal',
        agency: 'Department of Planning and Environment'
      },
      sections: [
        {
          id: 'planning-controls',
          sectionNumber: '4.1',
          title: 'Planning Controls',
          level: 0,
          content: [
            {
              id: 'block-setback-requirements',
              type: 'paragraph',
              text: 'Buildings must comply with minimum setback requirements of 3 metres from the front boundary and 1.5 metres from side boundaries.',
              lineNumber: 25,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '4.1.2(a)'
              }
            },
            {
              id: 'block-height-limits',
              type: 'paragraph',
              text: 'Building height must not exceed 11 metres or 3 storeys, whichever is the lesser.',
              lineNumber: 27,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '4.1.3'
              }
            }
          ]
        },
        {
          id: 'fire-safety',
          sectionNumber: '5.2',
          title: 'Fire Safety Requirements',
          level: 0,
          content: [
            {
              id: 'block-fire-access',
              type: 'paragraph',
              text: 'Fire service access must be provided in accordance with the applicable Australian Standards.',
              lineNumber: 45,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '5.2.1'
              }
            },
            {
              id: 'block-emergency-vehicle',
              type: 'paragraph',
              text: 'Emergency vehicle access must be provided with minimum 4 metre width clearance to all parts of the building.',
              lineNumber: 47,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '5.2.2'
              }
            }
          ]
        },
        {
          id: 'accessibility',
          sectionNumber: '6.1',
          title: 'Accessibility Requirements',
          level: 0,
          content: [
            {
              id: 'block-disability-access',
              type: 'paragraph',
              text: 'Buildings must provide accessible paths of travel and comply with the Disability Discrimination Act 1992.',
              lineNumber: 65,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '6.1.1'
              }
            }
          ]
        },
        {
          id: 'parking',
          sectionNumber: '7.1',
          title: 'Parking Requirements',
          level: 0,
          content: [
            {
              id: 'block-parking-requirements',
              type: 'paragraph',
              text: 'Parking must be provided at a minimum rate of 1.5 spaces per dwelling unit plus 1 visitor space per 4 dwelling units.',
              lineNumber: 85,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '7.1.2'
              }
            }
          ]
        },
        {
          id: 'infrastructure',
          sectionNumber: '8.1',
          title: 'Infrastructure Requirements',
          level: 0,
          content: [
            {
              id: 'block-stormwater-drainage',
              type: 'paragraph',
              text: 'Stormwater drainage system must connect to public infrastructure and include on-site detention where required.',
              lineNumber: 105,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '8.1.1'
              }
            }
          ]
        },
        {
          id: 'heritage',
          sectionNumber: '9.1',
          title: 'Heritage Considerations',
          level: 0,
          content: [
            {
              id: 'block-heritage-assessment',
              type: 'paragraph',
              text: 'A heritage assessment is required for buildings constructed before 1940 or within a heritage conservation area.',
              lineNumber: 125,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '9.1.3'
              }
            }
          ]
        },
        {
          id: 'energy',
          sectionNumber: '10.1',
          title: 'Energy Efficiency',
          level: 0,
          content: [
            {
              id: 'block-energy-efficiency',
              type: 'paragraph',
              text: 'Buildings must achieve a minimum 6-star NatHERS energy rating and comply with energy efficiency provisions.',
              lineNumber: 145,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '10.1.1'
              }
            }
          ]
        },
        {
          id: 'landscaping',
          sectionNumber: '11.1',
          title: 'Landscaping and Open Space',
          level: 0,
          content: [
            {
              id: 'block-landscaping-general',
              type: 'paragraph',
              text: 'Landscaping must be provided to enhance the streetscape and provide adequate private and communal open space for residents.',
              lineNumber: 165,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '11.1.1'
              }
            },
            {
              id: 'block-tree-preservation',
              type: 'paragraph',
              text: 'Existing trees with a trunk diameter of 150mm or greater must be retained where feasible, or replaced with trees of equivalent canopy value.',
              lineNumber: 167,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '11.1.2'
              }
            },
            {
              id: 'block-open-space-ratio',
              type: 'paragraph',
              text: 'A minimum of 25% of the site area must be retained as landscaped open space, excluding driveways and parking areas.',
              lineNumber: 169,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '11.1.3'
              }
            }
          ]
        },
        {
          id: 'waste-management',
          sectionNumber: '12.1',
          title: 'Waste Management',
          level: 0,
          content: [
            {
              id: 'block-waste-storage',
              type: 'paragraph',
              text: 'Adequate waste storage areas must be provided in accordance with the relevant local council requirements and Australian Standards.',
              lineNumber: 185,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '12.1.1'
              }
            },
            {
              id: 'block-waste-collection',
              type: 'paragraph',
              text: 'Waste collection points must be accessible to collection vehicles and located to minimise impacts on residential amenity.',
              lineNumber: 187,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '12.1.2'
              }
            },
            {
              id: 'block-recycling-facilities',
              type: 'paragraph',
              text: 'Separate storage areas for recyclable materials must be provided and clearly marked for resident use.',
              lineNumber: 189,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '12.1.3'
              }
            }
          ]
        },
        {
          id: 'noise-privacy',
          sectionNumber: '13.1',
          title: 'Noise and Privacy',
          level: 0,
          content: [
            {
              id: 'block-acoustic-privacy',
              type: 'paragraph',
              text: 'Buildings must be designed to provide adequate acoustic privacy between dwellings and from external noise sources.',
              lineNumber: 205,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '13.1.1'
              }
            },
            {
              id: 'block-visual-privacy',
              type: 'paragraph',
              text: 'Windows and balconies must be designed to minimise overlooking of adjacent private open space areas.',
              lineNumber: 207,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '13.1.2'
              }
            },
            {
              id: 'block-noise-mitigation',
              type: 'paragraph',
              text: 'Where developments are located near busy roads or commercial areas, appropriate noise mitigation measures must be implemented.',
              lineNumber: 209,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '13.1.3'
              }
            }
          ]
        },
        {
          id: 'solar-access',
          sectionNumber: '14.1',
          title: 'Solar Access and Natural Ventilation',
          level: 0,
          content: [
            {
              id: 'block-solar-access-living',
              type: 'paragraph',
              text: 'Living rooms and private open spaces must receive a minimum of 3 hours direct sunlight between 9am and 3pm on June 21.',
              lineNumber: 225,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '14.1.1'
              }
            },
            {
              id: 'block-cross-ventilation',
              type: 'paragraph',
              text: 'At least 60% of dwellings must be naturally cross-ventilated with openable windows on at least two facades.',
              lineNumber: 227,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '14.1.2'
              }
            },
            {
              id: 'block-overshadowing',
              type: 'paragraph',
              text: 'Buildings must not overshadow more than 25% of the private open space of adjoining residential properties at midday on June 21.',
              lineNumber: 229,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '14.1.3'
              }
            }
          ]
        },
        {
          id: 'water-management',
          sectionNumber: '15.1',
          title: 'Water Management and BASIX',
          level: 0,
          content: [
            {
              id: 'block-basix-compliance',
              type: 'paragraph',
              text: 'All residential developments must achieve BASIX compliance for water, thermal comfort and energy efficiency.',
              lineNumber: 245,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '15.1.1'
              }
            },
            {
              id: 'block-water-sensitive-design',
              type: 'paragraph',
              text: 'Water sensitive urban design principles must be incorporated including rainwater harvesting and greywater systems where feasible.',
              lineNumber: 247,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '15.1.2'
              }
            },
            {
              id: 'block-flood-planning',
              type: 'paragraph',
              text: 'Developments in flood-prone areas must comply with flood planning requirements and include appropriate flood mitigation measures.',
              lineNumber: 249,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '15.1.3'
              }
            }
          ]
        },
        {
          id: 'construction-management',
          sectionNumber: '16.1',
          title: 'Construction Management',
          level: 0,
          content: [
            {
              id: 'block-construction-hours',
              type: 'paragraph',
              text: 'Construction work must be limited to Monday to Friday 7am to 6pm, Saturday 8am to 1pm, with no work on Sundays or public holidays.',
              lineNumber: 265,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '16.1.1'
              }
            },
            {
              id: 'block-site-management',
              type: 'paragraph',
              text: 'Construction sites must be properly hoarded and maintained to ensure public safety and minimise impacts on neighbouring properties.',
              lineNumber: 267,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '16.1.2'
              }
            },
            {
              id: 'block-traffic-management',
              type: 'paragraph',
              text: 'A traffic management plan must be submitted for developments that may impact traffic flow or pedestrian safety during construction.',
              lineNumber: 269,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '16.1.3'
              }
            }
          ]
        },
        {
          id: 'compliance-monitoring',
          sectionNumber: '17.1',
          title: 'Compliance and Monitoring',
          level: 0,
          content: [
            {
              id: 'block-inspections-required',
              type: 'paragraph',
              text: 'Mandatory inspections are required at excavation, foundation, frame, enclosure and final stages of construction.',
              lineNumber: 285,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '17.1.1'
              }
            },
            {
              id: 'block-compliance-certificate',
              type: 'paragraph',
              text: 'A compliance certificate from a qualified building certifier must be provided prior to occupation of any dwelling.',
              lineNumber: 287,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '17.1.2'
              }
            },
            {
              id: 'block-defects-liability',
              type: 'paragraph',
              text: 'Developers must provide warranty coverage and defects liability for a minimum period of 6 years for structural defects.',
              lineNumber: 289,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '17.1.3'
              }
            }
          ]
        },
        {
          id: 'affordable-housing',
          sectionNumber: '18.1',
          title: 'Affordable Housing Contributions',
          level: 0,
          content: [
            {
              id: 'block-affordable-housing-levy',
              type: 'paragraph',
              text: 'Developments of 10 or more dwellings must provide affordable housing contributions as specified by the relevant planning authority.',
              lineNumber: 305,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '18.1.1'
              }
            },
            {
              id: 'block-affordable-housing-alternatives',
              type: 'paragraph',
              text: 'Contributions may be provided as on-site affordable housing, off-site provision, or monetary contributions at the discretion of the consent authority.',
              lineNumber: 307,
              selectable: true,
              metadata: {
                emphasis: 'conditional',
                clause: '18.1.2'
              }
            }
          ]
        },
        {
          id: 'section-1',
          sectionNumber: '1',
          title: 'Preliminary',
          level: 0,
          content: [
            {
              id: 'block-1-1',
              type: 'paragraph',
              text: 'This Policy aims to provide a consistent planning framework for housing across NSW.',
              lineNumber: 1,
              selectable: true,
              metadata: {
                emphasis: 'mandatory'
              }
            },
            {
              id: 'block-1-2',
              type: 'paragraph',
              text: 'The objectives of this Policy are to increase housing supply and choice.',
              lineNumber: 2,
              selectable: true,
              metadata: {
                clause: '1.1(a)'
              }
            }
          ],
          subsections: [
            {
              id: 'section-1-1',
              sectionNumber: '1.1',
              title: 'Name of Policy',
              level: 1,
              content: [
                {
                  id: 'block-1-1-1',
                  type: 'paragraph',
                  text: 'This Policy is the State Environmental Planning Policy (Housing) 2021.',
                  lineNumber: 3,
                  selectable: true,
                  metadata: {
                    emphasis: 'definition'
                  }
                }
              ]
            },
            {
              id: 'section-1-2',
              sectionNumber: '1.2',
              title: 'Commencement',
              level: 1,
              content: [
                {
                  id: 'block-1-2-1',
                  type: 'paragraph',
                  text: 'This Policy commences on 1 October 2021.',
                  lineNumber: 4,
                  selectable: true
                }
              ]
            }
          ]
        },
        {
          id: 'section-2',
          sectionNumber: '2',
          title: 'Application of Policy',
          level: 0,
          content: [
            {
              id: 'block-2-1',
              type: 'paragraph',
              text: 'This Policy applies to land in all zones except environmental protection zones.',
              lineNumber: 5,
              selectable: true,
              metadata: {
                emphasis: 'mandatory',
                clause: '2.1'
              }
            },
            {
              id: 'block-2-2',
              type: 'note',
              text: 'Note: Refer to the standard instrument for zone definitions.',
              lineNumber: 6,
              selectable: false
            }
          ]
        },
        {
          id: 'section-3',
          sectionNumber: '3',
          title: 'Housing Development Standards',
          level: 0,
          content: [
            {
              id: 'block-3-1',
              type: 'paragraph',
              text: 'Development must comply with the following minimum standards:',
              lineNumber: 7,
              selectable: true,
              metadata: {
                emphasis: 'mandatory'
              }
            },
            {
              id: 'block-3-2',
              type: 'list',
              text: 'a) minimum lot size of 300 square metres',
              lineNumber: 8,
              selectable: true,
              metadata: {
                listType: 'ordered',
                clause: '3.1(a)'
              }
            },
            {
              id: 'block-3-3',
              type: 'list',
              text: 'b) minimum building setbacks of 3 metres from front boundary',
              lineNumber: 9,
              selectable: true,
              metadata: {
                listType: 'ordered',
                clause: '3.1(b)'
              }
            },
            {
              id: 'block-3-4',
              type: 'list',
              text: 'c) maximum building height of 9 metres',
              lineNumber: 10,
              selectable: true,
              metadata: {
                listType: 'ordered',
                clause: '3.1(c)'
              }
            }
          ]
        }
      ]
    };
  }
}

export const legislationService = new LegislationService();