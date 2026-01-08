export interface ContactTemplateBase {
    id: number
    last: string
    first: string
    last_kana: string
    first_kana: string
    last_hira: string
    first_hira: string
    email: string
    company: string
    department: string
    url: string
    phone1: string
    phone2: string
    phone3: string
    zip1: string
    zip2: string
    address1: string
    address2: string
    address3: string
    subject: string
    body: string
}

export interface HubspotContact {
    id: string
    email: string
    firstname?: string
    lastname?: string
    phone?: string
}

export type ContactTemplateCreate = Omit<ContactTemplateBase, 'id'>
export type ContactTemplateUpdate = ContactTemplateBase