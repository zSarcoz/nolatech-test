'use client'

import { useState, useEffect } from 'react'

export function useGetFromStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  storeCallBack: (state: T) => F
) {
  const result = store(storeCallBack) as F
  const [state, setState] = useState<F>()
  useEffect(() => {
    setState(result)
  }, [result])
  return state
}
