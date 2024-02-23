import { AppwriteException } from '@/lib/appwrite'
import useStore from '@/state/useStore'
import { Alert } from '@/types/feedback'
import { nanoid } from 'nanoid'

type HandleError = (error: unknown, title: Alert['title'], defaultMessage: Alert['text'], severity?: Alert['severity']) => void

type UseHandleError = () => {
  handleError: HandleError
}
const useHandleError: UseHandleError = () => {
  const addAlert = useStore((state) => state.addAlert)

  const handleError:HandleError = (error, title, defaultMessage, severity) => {
    if (error instanceof AppwriteException) {
      addAlert({
        id: nanoid(),
        title,
        text: error.message,
        severity: severity || 'error'
      })
    } else {
      addAlert({
        id: nanoid(),
        title,
        text: defaultMessage,
        severity: severity || 'error'
      })
    }
  }

  return {
    handleError
  }
}

export default useHandleError
