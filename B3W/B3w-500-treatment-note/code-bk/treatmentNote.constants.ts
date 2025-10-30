import { camelCase } from 'lodash'
import { TREATMENT_NOTE_STATUS, TREATMENT_NOTE_TYPE } from '../types'
import { RiHistoryLine, RiQuillPenLine, RiStickyNoteLine } from '@remixicon/react'

export const TREATMENT_NOTE_STATUS_CONFIG = {
  [TREATMENT_NOTE_STATUS.DRAFT]: {
    value: TREATMENT_NOTE_STATUS.DRAFT,
    label: `label.${camelCase(TREATMENT_NOTE_STATUS.DRAFT)}`,
    color: 'text-sub-600',
    bgColor: 'bg-faded-lighter'
  },
  [TREATMENT_NOTE_STATUS.FINALIZED]: {
    value: TREATMENT_NOTE_STATUS.FINALIZED,
    label: `label.${camelCase(TREATMENT_NOTE_STATUS.FINALIZED)}`,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  }
} as const

export const TREATMENT_NOTE_STATUS_LIST = Object.keys(TREATMENT_NOTE_STATUS)
  .filter(k => isNaN(Number(k)))
  .map(k => ({
    value: k as keyof typeof TREATMENT_NOTE_STATUS,
    label: `label.${camelCase(String((TREATMENT_NOTE_STATUS as any)[k]))}`
  })) as Array<{ value: keyof typeof TREATMENT_NOTE_STATUS, label: string }>

export const NOTE_TYPE_CONFIG = {
  [TREATMENT_NOTE_TYPE.SOAP]: {
    label: 'SOAP Note',
    description: 'Subjective, Objective, Assessment, Plan'
  },
  [TREATMENT_NOTE_TYPE.OVULATION_MONITORING]: {
    label: 'Ovulation Monitoring',
    description: 'Cycle tracking and monitoring'
  },
  [TREATMENT_NOTE_TYPE.GENERAL]: {
    label: 'General Note',
    description: 'General treatment note'
  }
} as const

export enum TREATMENT_NOTE_TAB {
  NOTE_INFORMATION = 'NOTE_INFORMATION',
  ADDENDUM = 'ADDENDUM',
  VERSION_HISTORY = 'VERSION_HISTORY',
}

export const TREATMENT_NOTE_TAB_LABELS: Record<TREATMENT_NOTE_TAB, string> = {
  [TREATMENT_NOTE_TAB.NOTE_INFORMATION]: 'label.noteInformation',
  [TREATMENT_NOTE_TAB.ADDENDUM]: 'label.addendums',
  [TREATMENT_NOTE_TAB.VERSION_HISTORY]: 'label.versionHistory'
}

export const TREATMENT_NOTE_TAB_LIST = Object.values(TREATMENT_NOTE_TAB).map((tab, index) => {
  return {
    value: tab, // Ex: 'NOTE_INFORMATION', 'ADDENDUM', ...
    label: TREATMENT_NOTE_TAB_LABELS[tab] // Ex: 'Note Information', 'Addendum', ...
  }
})

export const TREATMENT_NOTE_TAB_ICON_MAP = {
  [TREATMENT_NOTE_TAB.NOTE_INFORMATION]: RiStickyNoteLine,
  [TREATMENT_NOTE_TAB.ADDENDUM]: RiQuillPenLine,
  [TREATMENT_NOTE_TAB.VERSION_HISTORY]: RiHistoryLine
}

export enum TREATMENT_NOTE_TEMPLATES {
  BLANK_TEMPLATE = 'BLANK_TEMPLATE',
  INITIAL_FERTILITY_CONSULTATION = 'INITIAL_FERTILITY_CONSULTATION',
  CYCLE_MONITORING = 'CYCLE_MONITORING',
  IUI_PROCEDURE = 'IUI_PROCEDURE',
  IVF_RETRIEVAL_TRANSFER = 'IVF_RETRIEVAL_TRANSFER'
}
// Template display names
export const TEMPLATE_DISPLAY_NAMES: Record<TreatmentNoteTemplateId, string> = {
  [TREATMENT_NOTE_TEMPLATES.BLANK_TEMPLATE]: 'treatmentNote.blankTemplate',
  [TREATMENT_NOTE_TEMPLATES.INITIAL_FERTILITY_CONSULTATION]: 'treatmentNote.initialFertilityConsultation',
  [TREATMENT_NOTE_TEMPLATES.CYCLE_MONITORING]: 'treatmentNote.cycleMonitoring',
  [TREATMENT_NOTE_TEMPLATES.IUI_PROCEDURE]: 'treatmentNote.iuiProcedure',
  [TREATMENT_NOTE_TEMPLATES.IVF_RETRIEVAL_TRANSFER]: 'treatmentNote.ivfRetrievalTransfer'
}

export type TreatmentNoteTemplateId = typeof TREATMENT_NOTE_TEMPLATES[keyof typeof TREATMENT_NOTE_TEMPLATES]

// Default SOAP sections
export const SOAP_SECTIONS = ['subjective', 'objective', 'assessment', 'plan'] as const
export type SoapSectionKey = typeof SOAP_SECTIONS[number]

// Rich text editor toolbar config
export const RICHTEXT_TOOLBAR_CONFIG = {
  options: ['inline', 'list', 'textAlign', 'link', 'history'],
  inline: {
    options: ['bold', 'italic', 'underline']
  },
  list: {
    options: ['unordered', 'ordered']
  },
  textAlign: {
    options: ['left', 'center', 'right', 'justify']
  },
  link: {
    options: ['link']
  },
  history: {
    options: ['undo', 'redo']
  }
} as const
