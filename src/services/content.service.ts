import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { ContactInfoData, HolidayEntry } from '../types/admin'

const CONTACT_INFO_DOC = 'content/contactInfo'

function migrateHolidayClosure(raw: any): ContactInfoData['holidayClosure'] {
  const base = {
    enabled: !!raw?.enabled,
    icon: raw?.icon,
  }
  if (Array.isArray(raw?.entries)) {
    return { ...base, entries: raw.entries as HolidayEntry[] }
  }
  const legacyText: string = typeof raw?.text === 'string' ? raw.text : ''
  const entries: HolidayEntry[] = legacyText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, idx) => ({
      id: `legacy-${idx}-${Date.now()}`,
      text: line,
      startDate: '',
      closed: /geschlossen/i.test(line),
      enabled: true,
    }))
  return { ...base, entries }
}

export async function getContactInfo(): Promise<ContactInfoData | null> {
  try {
    const docRef = doc(db, CONTACT_INFO_DOC)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        hours: data.hours,
        holidayClosure: migrateHolidayClosure(data.holidayClosure),
        updatedAt:
          data.updatedAt instanceof Timestamp
            ? data.updatedAt.toDate()
            : undefined,
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching contact info:', error)
    throw error
  }
}

function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v) => stripUndefined(v)) as unknown as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v !== undefined) out[k] = stripUndefined(v)
    }
    return out as T
  }
  return value
}

export async function updateContactInfo(
  data: Omit<ContactInfoData, 'updatedAt'>
): Promise<void> {
  try {
    const docRef = doc(db, CONTACT_INFO_DOC)
    await setDoc(docRef, {
      ...stripUndefined(data),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating contact info:', error)
    throw error
  }
}
