import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function PastPapersChose({ data, checked, onChange }) {

  return (
    <RadioGroup defaultValue={data.name}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={data.name}
          id={data.name}
          checked={checked}
          onClick={onChange}
        />
        <Label htmlFor={data.name}>{data.name}</Label>
      </div>
    </RadioGroup>
  );
}

export default PastPapersChose;
