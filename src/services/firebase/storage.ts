import { storage } from '@/services/firebase'
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage'

const STORAGE_IMAGE_SIZES = ['640x640', '1280x1280']

export const createImage = async (path: string, image: string) => {
  const storageRef = ref(storage, path)
  await uploadString(storageRef, image, 'data_url')
}

export const deleteImage = async (path: string) => {
  for (const size of STORAGE_IMAGE_SIZES) {
    const storageRef = ref(storage, `${path}_${size}`)
    await deleteObject(storageRef)
  }
}

export const downloadImage = (path: string, size: 'small' | 'large') => {
  const format = size === 'small' ? STORAGE_IMAGE_SIZES[0] : STORAGE_IMAGE_SIZES[1]
  const storageRef = ref(storage, `${path}_${format}`)
  const url = getDownloadURL(storageRef)
  return url
}
