import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/text-area";
import type { ContactTemplateUpdate } from "@/interfaces";

/**
 * All fields that appear in both Create- & Edit-Contact forms.
 *
 * Props:
 *   t   – i18n translator
 *   data – optional default values (for edit mode)
 */
interface Props {
  t: (key: string) => string;
  data?: Partial<ContactTemplateUpdate>;
}

const phoneKeys   = ["phone1", "phone2", "phone3"] as const;
const zipKeys     = ["zip1", "zip2"] as const;
const addressKeys = ["address1", "address2", "address3"] as const;

function getDef<T extends keyof ContactTemplateUpdate>(
  data: Partial<ContactTemplateUpdate> | undefined,
  key: T
) {
  return data?.[key] ?? "";
}

export const ContactFormFields: React.FC<Props> = ({ t, data = {} }) => (
  <>
    {/* NAME ------------------------------------------------------ */}
    <div className="grid gap-3">
      <Label htmlFor="last">{t("contact.lastName")}</Label>
      <Input id="last" name="last" defaultValue={data.last} />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="first">{t("contact.firstName")}</Label>
      <Input id="first" name="first" defaultValue={data.first} />
    </div>

    {/* KANA ------------------------------------------------------ */}
    <div className="grid gap-3">
      <Label htmlFor="last_kana">{t("contact.lastKana")}</Label>
      <Input id="last_kana" name="last_kana" defaultValue={data.last_kana} />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="first_kana">{t("contact.firstKana")}</Label>
      <Input id="first_kana" name="first_kana" defaultValue={data.first_kana} />
    </div>

    {/* HIRA ------------------------------------------------------ */}
    <div className="grid gap-3">
      <Label htmlFor="last_hira">{t("contact.lastHira")}</Label>
      <Input id="last_hira" name="last_hira" defaultValue={data.last_hira} />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="first_hira">{t("contact.firstHira")}</Label>
      <Input id="first_hira" name="first_hira" defaultValue={data.first_hira} />
    </div>

    {/* EMAIL ----------------------------------------------------- */}
    <div className="grid gap-3">
      <Label htmlFor="email">{t("contact.email")}</Label>
      <Input id="email" name="email" type="email" defaultValue={data.email} />
    </div>

    {/* COMPANY / DEPARTMENT ------------------------------------- */}
    <div className="grid gap-3">
      <Label htmlFor="company">{t("contact.company")}</Label>
      <Input id="company" name="company" defaultValue={data.company} />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="department">{t("contact.department")}</Label>
      <Input id="department" name="department" defaultValue={data.department} />
    </div>

    {/* URL ------------------------------------------------------- */}
    <div className="grid gap-3">
      <Label htmlFor="url">{t("contact.url")}</Label>
      <Input id="url" name="url" type="url" defaultValue={data.url} />
    </div>

    {/* PHONES ---------------------------------------------------- */}
    {phoneKeys.map((p) => (                                            
      <div key={p} className="grid gap-3">
        <Label htmlFor={p}>{t(`contact.${p}`)}</Label>
        <Input id={p} name={p} defaultValue={getDef(data, p)} />
      </div>
    ))}

    {/* ZIP ------------------------------------------------------- */}
    {zipKeys.map((z) => (                                              
      <div key={z} className="grid gap-3">
        <Label htmlFor={z}>{t(`contact.${z}`)}</Label>
        <Input id={z} name={z} defaultValue={getDef(data, z)} />
      </div>
    ))}

    {/* ADDRESSES ------------------------------------------------- */}
    {addressKeys.map((a) => (                                          
      <div key={a} className="grid gap-3">
        <Label htmlFor={a}>{t(`contact.${a}`)}</Label>
        <Input id={a} name={a} defaultValue={getDef(data, a)} />
      </div>
    ))}

    {/* SUBJECT / BODY ------------------------------------------- */}
    <div className="grid gap-3">
      <Label htmlFor="subject">{t("contact.subject")}</Label>
      <Input id="subject" name="subject" defaultValue={data.subject} />
    </div>
    <div className="grid gap-3">
      <Label htmlFor="body">{t("contact.body")}</Label>
      <Textarea
        id="body"
        name="body"
        rows={6}
        placeholder={t("contact.body")}
        defaultValue={data.body}
      />
    </div>
  </>
);
