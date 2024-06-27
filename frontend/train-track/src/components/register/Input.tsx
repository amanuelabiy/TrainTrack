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
    <div className="flex-col">
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      ></input>
    </div>
  );
}

export default Input;
