import { Card, Textarea } from '@/components/ui';

const MAX_LENGTH = 300;

export function CustomerNoteField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Card className="p-4">
      <label htmlFor="customer-note" className="block">
        <span className="block text-[13px] font-semibold text-theme-primary">
          Note for the business
          <span className="ml-1 font-normal text-theme-secondary">(optional)</span>
        </span>
        <span className="mt-1 block text-[11px] text-theme-secondary">
          Add preferences or a short message to include with your WhatsApp order.
        </span>
      </label>
      <Textarea
        id="customer-note"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={MAX_LENGTH}
        rows={3}
        placeholder="Deliver it to No 10, Dele Ashiru street,okota Lagos."
        className="mt-3 block bg-[var(--bg-base)] text-[13px]"
      />
      <span className="mt-1 block text-right text-[10px] text-theme-secondary">
        {value.length}/{MAX_LENGTH}
      </span>
    </Card>
  );
}
