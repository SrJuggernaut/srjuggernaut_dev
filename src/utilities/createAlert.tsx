import { nanoid } from 'nanoid'

import { Alert } from '@contexts/app/appContext'

export type CreateAlert = ({ text, severity }: { text: Alert['text'], severity: Alert['severity'] }) => Alert

const createAlert: CreateAlert = ({ text, severity }) => {
  return {
    id: nanoid(),
    severity,
    text
  }
}

export default createAlert
