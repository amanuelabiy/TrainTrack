import { InputProps } from "@/types/accountTypes";

// export interface InputProps {
//   id: string;
//   label: string;
//   type: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string;
// }

function Input({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  name,
}: InputProps) {
  return (
    <div className="flex-col mt-9 ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300  rounded-lg w-96 p-2.5"
        placeholder={placeholder}
        required
      ></input>
    </div>
  );
}

export default Input;
