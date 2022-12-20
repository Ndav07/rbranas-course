import DomainEvent from "./Domain-event"

export default interface Handler {
  name: string
  handle(event: DomainEvent): Promise<void>
}