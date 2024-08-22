import { forwardRef, type Ref } from "react";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="flex-col mt-5">
        <label
          className="block text-foreground text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          {...props}
          className="bg-gray-50 border border-gray-300 rounded-lg w-96 p-2.5 text-black"
        />
      </div>
    );
  }
);

export default Input;
