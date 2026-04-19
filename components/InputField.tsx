export default function InputField({ placeholder, onChange }: any) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      className="border p-2 mt-2 w-full"
      onChange={onChange}
    />
  );
}