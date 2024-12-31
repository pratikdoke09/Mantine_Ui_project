import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Select a Product.</div>
}
