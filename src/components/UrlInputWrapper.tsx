'use client'

import React from 'react'
import { UrlInput } from '@/components/UrlInput'
import { ScrapedData } from '@/types'

// 1. Define the props interface with a specific type for onDataScraped
export interface UrlInputWrapperProps {
  onDataScraped: (data: ScrapedData) => void
}

// 2. Create the UrlInputWrapper component
export const UrlInputWrapper: React.FC<UrlInputWrapperProps> = ({ onDataScraped }) => {
  // 3. Render the UrlInput component and pass the onDataScraped prop
  return <UrlInput onDataScraped={onDataScraped} />
}