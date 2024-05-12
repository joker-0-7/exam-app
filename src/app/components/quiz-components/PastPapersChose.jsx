import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function PastPapersChose({ data, checked, onChange }) {
  console.log(checked);
  return (
    <RadioGroup defaultValue={data.quizName}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={data.quizName}
          id={data.quizName}
          checked={checked}
          onClick={onChange}
        />
        <Label htmlFor={data.quizName}>{data.quizName}</Label>
      </div>
    </RadioGroup>
  );
}

export default PastPapersChose;
