import { Button } from '@components/buttons'
import { Icon } from '@iconify/react'

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="flex-center size-full flex-col gap-6">
      <Icon className="size-12 text-red-500" icon="tabler:alert-triangle" />
      <p className="text-center text-lg font-medium text-red-500">{message}</p>
      <Button variant="secondary" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  )
}

export default ErrorScreen
