import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({
  message = "Something went wrong.",
}: ErrorMessageProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
      <AlertTriangle size={20} className="text-red-500" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
