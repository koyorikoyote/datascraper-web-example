import type { Dispatch, SetStateAction } from "react"

export type HubDomainState = [string | null, Dispatch<SetStateAction<string | null>>]