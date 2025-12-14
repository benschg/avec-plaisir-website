import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { ContactInfoData } from '../types/admin'

const CONTACT_INFO_DOC = 'content/contactInfo'

export async function getContactInfo(): Promise<ContactInfoData | null> {
  try {
    const docRef = doc(db, CONTACT_INFO_DOC)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        hours: data.hours,
        holidayClosure: data.holidayClosure,
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

export async function updateContactInfo(
  data: Omit<ContactInfoData, 'updatedAt'>
): Promise<void> {
  try {
    const docRef = doc(db, CONTACT_INFO_DOC)
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating contact info:', error)
    throw error
  }
}
