"use client";
import { useParams,useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const questionId = params.id;
  const status = searchParams.get('success');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
  <div className="bg-gray-800 rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
    <div
      className={`text-6xl mb-4 ${
        status === "true" ? "text-green-400" : "text-red-400"
      }`}
    >
      {status === "true" ? "🎉" : "❌"}
    </div>
    <h1
      className={`text-3xl font-bold mb-4 ${
        status === "true" ? "text-green-400" : "text-red-400"
      }`}
    >
      {status === "true" ? "Accepted!" : "Wrong Answer"}
    </h1>
    {status === "true" ? (
      <p className="text-green-200">
        Excellent! Keep up the good work.
      </p>
    ) : (
      <p className="text-red-200">
        Try again or check your code for errors.
      </p>
    )}
    <button
      onClick={() => router.push(`/question/${questionId}`)}
      className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
    >
      Go Back to Questions
    </button>
  </div>
</div>
  );
}